import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HomeScreen(props) {
    const navigation = useNavigation();

    const handleNewTranaction = () => {
        navigation.navigate("Add New Transaction");
    }

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.headertext}>Home</Text>

            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={handleNewTranaction}>
                <Ionicons name="add-circle" size={35} color={colors.darkPink} />
            </TouchableOpacity>
            </View>
            
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1, 
        backgroundColor: colors.lightPink,
        justifyContent: "flex-start",  
        alignItems: "center", 
    },
    headertext: {
        fontSize: 20,
        marginRight: 270,
        marginTop: 15,
        fontWeight: 'bold',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
})