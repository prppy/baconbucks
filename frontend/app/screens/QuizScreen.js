import React, { useState, useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, Animated, ScrollView } from "react-native";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import data from "../assets/QuizData";
import ProgressBar from "../assets/ProgressBar";
import Questions from "../assets/Questions";
import { Context } from "../components/GlobalContext";

export default function QuizScreen(props) {
    const navigation = useNavigation();
    const allQuestions = data;
    const globalContext = useContext(Context);
    const { userObj, isLightTheme } = globalContext;
    const themeColors = isLightTheme ? colors.light : colors.dark;
    const styles = createStyles(themeColors);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [progress, setProgress] = useState(new Animated.Value(1));
    const [fadeAnim, setFadeAnim] = useState(new Animated.Value(1));

    const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
    const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
    const [correctOption, setCorrectOption] = useState(null);
    const [score, setScore] = useState(0);

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setCurrentOptionSelected(null);
        setCorrectOption(null);
        setIsOptionsDisabled(false);
    };

    const validateAnswer = (selectedOption) => {
        if (!isOptionsDisabled) {
            let correct_option = allQuestions[currentQuestionIndex]["correct_option"];

            setCurrentOptionSelected(selectedOption);
            setCorrectOption(correct_option);
            setIsOptionsDisabled(true);
            if (selectedOption === correct_option) {
                setScore(score + 1);
            }
        }
    };

    const handleNext = () => {
        if (currentQuestionIndex === allQuestions.length - 1) {
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
                {allQuestions[currentQuestionIndex]?.options.map((option, index) => (
                    <Animated.View
                        key={index}
                        style={{
                            opacity: fadeAnim,
                            transform: [
                                {
                                    translateY: fadeAnim.interpolate({
                                        inputRange: [0, 1],
                                        outputRange: [(150 / 4) * (index + 10), 0], // 0 : 150, 0.5 : 75, 1 : 0
                                    }),
                                },
                            ],
                        }}
                    >
                        <TouchableOpacity
                            onPress={() => validateAnswer(option)}
                            style={[
                                styles.optionsText,
                                {
                                    backgroundColor: isOptionsDisabled
                                        ? option === correctOption
                                            ? "#98ce90"
                                            : option === currentOptionSelected
                                            ? "#db7873" //red
                                            : "#d4d4d5" //gray
                                        : "#d4d4d5",
                                },
                            ]}
                        >
                            <Text style={styles.optionText}>{option}</Text>
                        </TouchableOpacity>
                    </Animated.View>
                ))}
            </View>
        );
    };

    return (
        <SafeAreaView style={styles.safeArea}>
                <View style={styles.container}>
                    <View style={styles.subContainer}>
                        <ProgressBar progress={progress} />
                        <Questions
                            index={currentQuestionIndex}
                            question={allQuestions[currentQuestionIndex]?.question}
                            totalQuestions={allQuestions.length}
                        />
                    </View>
                    {renderOptions()}
                </View>
                <View style={styles.nextButtonContainer}>
                    <TouchableOpacity
                        style={[
                            styles.btnNext,
                            {
                                backgroundColor: !currentOptionSelected ? "#cfcdcc" : "#DF4B75",
                            },
                        ]}
                        disabled={!currentOptionSelected}
                        onPress={handleNext}
                    >
                        <Text style={[styles.btnNextText, 
                            {
                                color: !currentOptionSelected ? "black" : 'white',
                            },
                        ]}>NEXT</Text>
                    </TouchableOpacity>
                </View>
        </SafeAreaView>
    );
}

const createStyles = (themeColors) => StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: themeColors.background,
    },
    container: {
        flex: 1,
        paddingVertical: 20,
        paddingHorizontal: 20,
        justifyContent: 'centre',
    },
    subContainer: {
        marginTop: 10,
        marginVertical: 10,
        padding: 40,
        borderTopRightRadius: 40,
        borderRadius: 10,
        backgroundColor: '#f6dde7',
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
        borderRadius: 5,
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
        fontSize: 16,
        color: "black",
        textAlign: "center",
    },
    nextButtonContainer: {
        position: "absolute",
        marginTop: 570,
        right: 20,
        shadowColor: "#171717",
        shadowOffset: { width: -3, height: 3 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },
    btnNext: {
        borderRadius: 10,
        paddingVertical: 13,
        paddingHorizontal: 20,
    },
    btnNextText: {
        color: "#333",
        fontSize: 17,
        letterSpacing: 1.1,
    },
});