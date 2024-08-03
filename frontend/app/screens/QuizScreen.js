import React, { useState, useEffect, useContext } from "react";
import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    Animated,
    ActivityIndicator,
    StyleSheet,
} from "react-native";
import colors from "../config/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import ProgressBar from "../assets/ProgressBar";
import Questions from "../assets/Questions";
import { Context } from "../components/GlobalContext";

export default function QuizScreen(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const { QuizID } = route.params;

    const globalContext = useContext(Context);
    const {
        isLightTheme,
        isLargeFont,
        defaultFontSizes,
        getLargerFontSizes,
        fetchData,
    } = globalContext;

    const themeColors = isLightTheme ? colors.light : colors.dark;
    const fontSizes = isLargeFont ? getLargerFontSizes() : defaultFontSizes;
    const styles = createStyles(themeColors, fontSizes);

    const [quizData, setQuizData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [progress, setProgress] = useState(new Animated.Value(1));
    const [fadeAnim, setFadeAnim] = useState(new Animated.Value(1));
    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [score, setScore] = useState(0);

    useEffect(() => {
        fetchQuizData();
    }, [QuizID]);

    const fetchQuizData = async () => {
        try {
            const json = await fetchData(`quiz/get-quiz/${QuizID}/`);
            setQuizData(json);
        } catch (error) {
            console.error("Error fetching quiz data:", error);
            setError(error.message || "Failed to fetch quiz data");
        } finally {
            setLoading(false);
        }
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionsDisabled(false);
    };

    const validateAnswer = (selectedOption) => {
        if (!isOptionsDisabled) {
            let correct_option = quizData.questions[
                currentQuestionIndex
            ].options.find((option) => option.is_correct).option_text;

            setCurrentOptionSelected(selectedOption);
            setCorrectOption(correct_option);
            setIsOptionsDisabled(true);
            if (selectedOption === correct_option) {
                setScore(score + 1);
            }
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex === quizData.questions.length - 1) {
            navigation.replace("Results", { score: score });
        } else {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setCurrentOptionSelected(null);
            setCorrectOption(null);
            setIsOptionsDisabled(false);
        }
        Animated.parallel([
            Animated.timing(progress, {
                toValue: currentQuestionIndex + 2,
                duration: 2000,
                useNativeDriver: false,
            }),
            Animated.sequence([
                Animated.timing(fadeAnim, {
                    toValue: 0,
                    duration: 100,
                    useNativeDriver: false,
                }),
                Animated.timing(fadeAnim, {
                    toValue: 1,
                    duration: 1900,
                    useNativeDriver: false,
                }),
            ]),
        ]).start();
    };

    const renderOptions = () => {
        return (
            <View style={styles.optionsContainer}>
                {quizData.questions[currentQuestionIndex]?.options.map(
                    (option, index) => (
                        <Animated.View
                            key={index}
                            style={{
                                opacity: fadeAnim,
                                transform: [
                                    {
                                        translateY: fadeAnim.interpolate({
                                            inputRange: [0, 1],
                                            outputRange: [
                                                (150 / 4) * (index + 10),
                                                0,
                                            ], // 0 : 150, 0.5 : 75, 1 : 0
                                        }),
                                    },
                                ],
                            }}
                        >
                            <TouchableOpacity
                                onPress={() =>
                                    validateAnswer(option.option_text)
                                }
                                style={[
                                    styles.optionsText,
                                    {
                                        backgroundColor: isOptionsDisabled
                                            ? option.option_text ===
                                              correctOption
                                                ? "#98ce90"
                                                : option.option_text ===
                                                  currentOptionSelected
                                                ? "#db7873" //red
                                                : "#d4d4d5" //gray
                                            : "#d4d4d5",
                                    },
                                ]}
                            >
                                <Text style={styles.optionText}>
                                    {option.option_text}
                                </Text>
                            </TouchableOpacity>
                        </Animated.View>
                    )
                )}
            </View>
        );
    };

    if (loading) {
        return (
            <SafeAreaView style={[styles.background, styles.centered]}>
                <ActivityIndicator size="large" color={themeColors.primary} />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={[styles.background, styles.centered]}>
                <Text style={styles.errorText}>Error fetching quiz data</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.headertext}>
                Current Quiz: {quizData.quiz_name}
            </Text>
            <View style={styles.inner}>
                <View style={styles.subContainer}>
                    <ProgressBar progress={progress} />
                    <Questions
                        index={currentQuestionIndex}
                        question={
                            quizData.questions[currentQuestionIndex]
                                ?.question_name
                        }
                        totalQuestions={quizData.questions.length}
                    />
                </View>
                {renderOptions()}

                <View style={styles.nextButtonContainer}>
                    <TouchableOpacity
                        style={{
                            backgroundColor: !currentOptionSelected
                                ? "#cfcdcc"
                                : "#DF4B75",
                                width: "100%", 
                                alignContent: "center",
                                borderRadius: 10
                        }}
                        disabled={!currentOptionSelected}
                        onPress={handleNext}
                    >
                        <Text
                            style={[
                                styles.btnNextText,
                                {
                                    color: !currentOptionSelected
                                        ? "black"
                                        : "white",
                                },
                            ]}
                        >
                            NEXT
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const createStyles = (themeColors, fontSizes) =>
    StyleSheet.create({
        background: {
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: themeColors.background,
            padding: 20,
        },
        centered: {
            alignItems: "center",
            justifyContent: "center",
        },
        headertext: {
            fontSize: fontSizes.twenty,
            fontWeight: "bold",
            position: "absolute",
            top: 70,
            left: 30,
            color: themeColors.headertext,
            paddingBottom: 20,
        },
        centered: {
            alignItems: "center",
            justifyContent: "center",
        },

        inner: {
            paddingTop: 60,
            width: "100%",
            padding: 30,
            flex: 1,
        },
        subContainer: {
            marginVertical: 10,
            padding: 40,
            borderRadius: 20,
            backgroundColor: themeColors.row,
            alignItems: "center",
            shadowColor: "#171717",
            shadowOffset: { width: -6, height: 6 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
        },
        optionsContainer: {
            marginTop: 15,
        },
        optionsText: {
            borderRadius: 10,
            alignItems: "center",
            justifyContent: "center",
            padding: 10,
            paddingHorizontal: 30,
            marginVertical: 10,
            shadowColor: "#171717",
            shadowOffset: { width: -3, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
        },
        optionText: {
            fontSize: fontSizes.sixteen,
            color: "black",
            textAlign: "center",
        },
        nextButtonContainer: {
            shadowColor: "#171717",
            shadowOffset: { width: -3, height: 3 },
            shadowOpacity: 0.2,
            shadowRadius: 3,
            width: "40%",
            alignSelf: "center", 
            marginTop: 10
        },
        btnNextText: {
            color: "#333",
            fontSize: fontSizes.sixteen,
            letterSpacing: 1.1,
            alignSelf: "center", 
            margin: 10
        },
    });
