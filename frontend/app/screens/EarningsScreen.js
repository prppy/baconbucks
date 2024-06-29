import React from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";

import colors from "../config/colors";

export default function EarningsScreen(props) {

    return (
        <SafeAreaView style={styles.background}>
            <Text>You Earned ${} this month! </Text>
        </SafeAreaView>
    );
}


const styles = StyleSheet.create({
    background: {
        flex: 1, 
        backgroundColor: colors.lightPink,
        justifyContent: "center",  
        alignItems: "center", 
    },

    test: {
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: colors.lightPink,
        width: 400, 
        height: 400, 
    },
    text: {
        fontFamily: "System", 
        fontSize: 15, 
        color: colors.lightPink, 
    }, 
})