import React from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";

import colors from "../config/colors";

export default function SavingsScreen(props) {
    <SafeAreaView>
        <View style={styles.test}>
            <Text>savings screen goes here</Text>
        </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    test: {
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: colors.lightPink,
        flex: 1,
    }
})