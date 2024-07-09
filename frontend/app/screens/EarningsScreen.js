import React, { useState, useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { Context } from "../components/GlobalContext";
import colors from "../config/colors";

export default function EarningsScreen(props) {
    const globalContext = useContext(Context);
    const { userObj, isLightTheme } = globalContext;
    const themeColors = isLightTheme ? colors.light : colors.dark;
    const styles = createStyles(themeColors);

    return (
        <SafeAreaView style={styles.background}>
            <Text>You Earned ${} this month! </Text>
        </SafeAreaView>
    );
}


const createStyles = (themeColors) => StyleSheet.create({
    background: {
        flex: 1, 
        backgroundColor: themeColors.background,
        justifyContent: "center",  
        alignItems: "center", 
    },

    test: {
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: themeColors.background,
        width: 400, 
        height: 400, 
    },
    text: {
        fontFamily: "System", 
        fontSize: 15, 
        color: themeColors.background, 
    }, 
})