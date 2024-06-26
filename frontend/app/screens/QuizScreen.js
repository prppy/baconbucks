import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, Animated } from "react-native";
import moment from 'moment';
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";


export default function ChallengesScreen(props) {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [userAnswers, setUserAnswers] = useState([]);

    const questions = [
        {
            question: "In Singapore, what is the deadline for filing personal income tax returns for the previous year for most individuals?",
            options: ["18 April", "18 June", "31 December", "31 March"],
            correctAnswer: "18 April"
        },
        {
            question: "What is the minimum age requirement to open an individual Central Provident Fund (CPF) account in Singapore?",
            options: ["16", "18", "20", "21"],
            correctAnswer: "18"
        },
        // Add more questions here
    ];

    const handleOptionSelect = (option) => {
        setUserAnswers([...userAnswers, option]);
    };

    const handleNextQuestion = () => {
        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            // Quiz completed, navigate to results screen or display results
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.quizContainer}>
                <Text style={styles.question}>{questions[currentQuestion].question}</Text>
                {questions[currentQuestion].options.map((option, index) => (
                    <Button
                        key={index}
                        title={option}
                        onPress={() => handleOptionSelect(option)}
                    />
                ))}
                <Button
                    title="Next"
                    onPress={handleNextQuestion}
                />
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.lightPink,
    },
    quizContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '80%',
        marginTop: 20,
    },
    question: {
        fontSize: 18,
        marginBottom: 20,
    },
});