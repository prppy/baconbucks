import React from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity } from "react-native";

import colors from '../config/colors';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen(props) {
    const [username, setUserName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirm, setConfirm] = React.useState("");

    const navigation = useNavigation();

    const handleSignUp = () => {
        navigation.replace("HomeTabs");
    };

    const handleLogIn = () => {
        navigation.goBack();
    };

    return (
        <SafeAreaView  style={styles.background}>
            <Image 
                style={styles.logo} 
                source={require('../assets/images/LOGO_Light.png')} />
            <Text style={styles.text}>Username</Text>
            <View style={styles.textbox}>
                <TextInput
                    style={styles.username}
                    placeholder="Type here"
                    value={username}
                    onChangeText={setUserName}
                    secureTextEntry="false" 
                    autoCapitalize='none'
                    maxLength={20}
                    keyboardType='ascii-capable'
                ></TextInput>
            </View>
            <Text style={styles.text}>Email</Text>
            <View style={styles.textbox}>
                <TextInput
                    style={styles.username}
                    placeholder="Type here"
                    value={email}
                    onChangeText={setEmail}
                    secureTextEntry="false" 
                    autoCapitalize='none'
                    maxLength={20}
                    keyboardType='ascii-capable'
                ></TextInput>
            </View>
            <Text style={styles.text}>Password</Text>
            <View style={styles.textbox}>
                <TextInput
                    style={styles.username}
                    placeholder="Type here"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry="true" 
                    autoCapitalize='none'
                    maxLength={20}
                    keyboardAppearance=''
                ></TextInput>
            </View>
            <Text style={styles.text}>Confirm Password</Text>
            <View style={styles.textbox}>
                <TextInput
                    style={styles.username}
                    placeholder="Type here"
                    value={confirm}
                    onChangeText={setConfirm}
                    secureTextEntry="true" 
                    autoCapitalize='none'
                    maxLength={20}
                ></TextInput>
            </View>
            <TouchableOpacity style={styles.loginbutn}
                    onPress={handleSignUp}>
                        <Text style={styles.logintext}>Sign up!</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleLogIn}>
                <Text style={styles.text}>Back to Log In</Text>
            </TouchableOpacity>
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
        marginBottom: 20
    },

    text: {
        fontFamily: "System", 
        fontSize: 15, 
        color: colors.lightPink, 
    }, 

    username: {
        fontFamily: "System", 
        fontSize: 15,
        color: colors.darkPink, 
    }, 

    padding: {
        width: 290, 
        height: 25,
        alignContent: "center", 
        justifyContent: "center", 
    }, 

    textbox: {
        alignContent: "center", 
        justifyContent: "center", 
        alignItems: "center", 
        width: 300, 
        height: 30,
        borderRadius: 4, 
        backgroundColor: colors.lightPink,
        marginBottom: 20
    },

    loginbutn: {
        width: 100, 
        height: 30,
        backgroundColor: colors.lightPink,
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    }, 

    logintext: {
        fontSize: 15, 
        color: colors.darkPink,
    }
})