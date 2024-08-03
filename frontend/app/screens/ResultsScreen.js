import React, { useState, useContext, useEffect } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Button,
} from "react-native";
import colors from "../config/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Context } from "../components/GlobalContext";

export default function ResultsScreen(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const { score, QuizID } = route.params;

    const handleRetry = () => {
        navigation.replace("MissionsScreen");
    };

    const globalContext = useContext(Context);
    const {
        fetchData,
        isLightTheme,
        isLargeFont,
        defaultFontSizes,
        getLargerFontSizes,
    } = globalContext;
    const themeColors = isLightTheme ? colors.light : colors.dark;
    const fontSizes = isLargeFont ? getLargerFontSizes() : defaultFontSizes;
    const styles = createStyles(themeColors, fontSizes);

    const [error, setError] = useState(null);

    const createNewPlay = async () => {
        try {
            const body = {
                quiz: QuizID,
                score: score
            }
            console.log(body)
            const json = await fetchData(`quiz/create-play/`, "POST", body)
        } catch (error) {
            console.error("Error creating new play:", error);
            setError(error.message || "Failed to create play");
        }
    };

    useEffect(() => {
        createNewPlay();
    }, [score, QuizID, fetchData]);

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Your Score</Text>
                <View style={styles.textWrapper}>
                    <Text style={styles.score}>{score}</Text>
                    <Text style={styles.score}> / 3</Text>
                </View>
                <TouchableOpacity style={styles.btnReset} onPress={handleRetry}>
                    <Text style={styles.btnText}>Retry</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const createStyles = (themeColors, fontSizes) =>
    StyleSheet.create({
        background: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: themeColors.background,
        },
        container: {
            backgroundColor: themeColors.background,
            width: "90%",
            borderRadius: 20,
            padding: 20,
            alignItems: "center",
        },
        title: {
            fontSize: 50,
            color: themeColors.buttons,
        },
        textWrapper: {
            flexDirection: "row",
            justifyContent: "flex-start",
            alignItems: "center",
            marginVertical: 30,
        },
        score: {
            fontSize: 100,
            color: themeColors.buttons,
            fontWeight: "bold",
        },
        btnReset: {
            backgroundColor: themeColors.buttons,
            paddingHorizontal: 5,
            paddingVertical: 15,
            width: "50%",
            borderRadius: 15,
        },
        btnText: {
            textAlign: "center",
            color: "#ffffff",
            fontSize: 20,
            letterSpacing: 1,
        },
    });
