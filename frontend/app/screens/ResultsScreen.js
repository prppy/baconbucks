import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button } from "react-native";
import colors from "../config/colors";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ResultsScreen(props) {
    const navigation = useNavigation();
    const route = useRoute();
    const { score } = route.params;

    const handleRetry = () => {
        navigation.replace('ChallengesScreen');
    };

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

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.lightPink,
    },
    container: {
        backgroundColor: colors.lightPink,
        width: "90%",
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
    },
    title: {
        fontSize: 50,
        color: colors.darkPink,
    },
    textWrapper: {
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginVertical: 30,
    },
    score: {
        fontSize: 100,
        color: colors.darkPink,
        fontWeight: "bold",
    },
    btnReset: {
        backgroundColor: colors.darkPink,
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