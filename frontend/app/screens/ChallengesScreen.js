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
        navigation.replace("Quiz");
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headertext}>Challenges</Text>
            
            <View style={styles.challengebox}>
                <Text style={styles.dateText}>{todayDate}</Text>
                    <Text style={styles.infoText}>Save $5 today!</Text>
            </View>

            <View style={styles.quizbox}>
                <Text style={styles.dateText}>Quiz Hub</Text>
                <Text style={styles.infoText}>Learn about financial management with a mini quiz.</Text>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity onPress={handleQuiz}>
                        <Ionicons name="arrow-forward" size={30} color={colors.darkPink} />
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
    challengebox: {
        width: '90%',
        padding: 20,
        backgroundColor: '#f6dde7',
        borderColor: '#ccc',
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        marginTop: 10,
        height: 120,
        alignItems: 'left',
      },
      quizbox: {
        width: '90%',
        padding: 20,
        backgroundColor: '#f6dde7',
        borderColor: '#ccc',
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        marginTop: 10,
        height: 140,
        alignItems: 'left',
      },
      dateText: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      infoText: {
        fontSize: 16,
        color: '#333',
        marginTop: 10,
      },
      buttonContainer: {
        position: 'absolute',
        top: 90,
        right: 20,
    },
    headertext: {
        fontSize: 20,
        marginRight: 235,
        marginTop: 15,
        fontWeight: 'bold',
    },
});