import React from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import colors from "../config/colors";

export default function SettingsScreen(props) {
    const navigation = useNavigation();

    const handleMyAccount = () => {
        navigation.navigate("My Account");
    };

    const handleAccessibility = () => {
        navigation.navigate("Accessibility");
    };

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.row}>
                {/* Buttons for My Account and Accessibility */}
                <TouchableOpacity style={styles.button} onPress={handleMyAccount}>
                    <Text style={styles.buttonText}>My Account</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={handleAccessibility}>
                    <Text style={styles.buttonText}>Accessibility</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'top',
        padding: 20,
        backgroundColor: colors.lightPink,
    },
    row: {
        width: '100%',
        marginBottom: 20,
        justifyContent: 'space-between',
    },
    button: {
        backgroundColor: colors.darkPink,
        width: '100%',
        alignItems: 'flex-start',
        height: 50,
        justifyContent: 'center',
        paddingLeft: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
})