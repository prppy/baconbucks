import React from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";

import colors from "../config/colors";

export default function SavingsScreen(props) {
    <SafeAreaView style={styles.background}>
            <Text>savings screen goes here</Text>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    background: {
        flex: 1, 
        backgroundColor: colors.darkPink,
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
})