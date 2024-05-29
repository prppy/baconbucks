import React from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";

import colors from "../config/colors";

export default function HomeScreen(props) {
    return (
        <SafeAreaView 
            style={styles.background}>
                <View></View>
            <Text style = {{marginBottom: 20}}>you spent $xyz this month! </Text>
            <View style={styles.piechart}></View>
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

    piechart: {
        width: 300,
        height: 300, 
        borderRadius: 150,
        backgroundColor: colors.darkPink
    }
})