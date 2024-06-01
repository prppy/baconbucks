import React from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import colors from "../config/colors";

export default function SettingsScreen(props) {
    const navigation = useNavigation();

    const handleMyAccount = () => {
        navigation.navigate("MyAccount");
    };

    const handleAccessibility = () => {
        navigation.navigate("Accessibility");
    };

    return (
        <SafeAreaView style={styles.container}>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginBottom: 20,
    },
    button: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        width: '45%',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
})