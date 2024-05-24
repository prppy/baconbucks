import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image } from "react-native";

import colors from '../config/colors';

export default function LogInScreen(props) {
    return (
        <SafeAreaView style={styles.background}>
            <Image 
                style={styles.logo} 
                source={require('../assets/images/LOGO_Light.png')} />
            <Text style={styles.text}>Username</Text>
            <View style={styles.textbox}></View>
            <Text style={styles.text}>Password</Text>
            <View style={styles.textbox}></View>
            <Text style={styles.text}>Don't have an account yet?</Text>
            <Text style={styles.text}>Sign up now!</Text>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1, 
        backgroundColor: colors.darkPink,
        justifyContent: "center",  
        alignItems: "center", 
    },

    logo: {
        alignContent: "center", 
        width: 300, 
        height: 140,
    },

    text: {
        fontFamily: "System", 
        fontSize: "15", 
    }, 

    textbox: {
        alignContent: "center", 
        width: 300, 
        height: 25,
        borderRadius: 4, 
        backgroundColor: colors.lightPink,
    },
})