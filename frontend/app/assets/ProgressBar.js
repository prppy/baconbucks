import React from "react";
import { View, Animated, StyleSheet } from "react-native";
import data from "./QuizData";
import colors from "../config/colors";

export default ProgressBar = ({ progress }) => {
    // Get the total number of questions from the quiz data
    const allQuestions = data;

    const progressAnim = progress.interpolate({
        inputRange: [0, allQuestions.length],
        outputRange: ['0%', '100%'],
    });

    return (
        <View style={styles.progressBarContainer}>
            <Animated.View
                style={[
                    styles.progressBar,
                    { width: progressAnim },
                ]}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    progressBarContainer: {
        width: '80%',
        height: 5,
        borderRadius: 5,
        backgroundColor: '#00000020',
        marginBottom: 10,
    },
    progressBar: {
        height: 5,
        borderRadius: 5,
        backgroundColor: "#DF4B75",
    },
});