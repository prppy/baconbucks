import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button } from "react-native";
import moment from 'moment';
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function ChallengesScreen(props) {
    const todayDate = moment().format('MMMM Do YYYY');
    const navigation = useNavigation();
    const handleQuiz = (day) => {
        navigation.navigate("Quiz");
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.dateText}>{todayDate}</Text>
            <View style={styles.box}>
                <Text style={styles.infoText}>Today's challenge!</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleQuiz}>
                        <Ionicons name="arrow-forward-circle-outline" size={35} color={colors.darkPink} />
                    </TouchableOpacity>
                </View>
            </View>
            
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.lightPink,
        paddingLeft: 20,
        paddingTop: 10,
    },
    box: {
        width: '100%',
        padding: 20,
        backgroundColor: '#f6dde7',
        borderColor: '#ccc',
        borderRadius: 10,
        // shadowColor: '#000',
        // shadowOffset: { width: 0, height: 2 },
        // shadowOpacity: 0.8,
        // shadowRadius: 2,
        // elevation: 5,
        marginTop: 10,
        height: 120,
        alignItems: 'left',
      },
      dateText: {
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 200,
        marginTop: 15,
      },
      infoText: {
        fontSize: 16,
        color: '#333',
        marginLeft: 5,
      },
      buttonContainer: {
        position: 'absolute',
        top: 70,
        right: 20,
    },
});