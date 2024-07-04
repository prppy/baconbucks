import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, Keyboard, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView } from "react-native";
import { useNavigation } from '@react-navigation/native';

import colors from '../config/colors';
import { Context } from '../components/GlobalContext';

export default function SignUpScreen(props) {

    const globalContext = useContext(Context);
    const { setIsLoggedIn, domain, setUserObj, setToken } = globalContext;

    const [username, setUserName] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [confirm, setConfirm] = React.useState("");
    const [error, setError] = useState("");

    const navigation = useNavigation();


    const handleLogIn = () => {
        navigation.goBack();
    };

    const handleSignUp = () => {
        if (confirm === password) {
            let body = JSON.stringify({
                "username": username,
                "email": email,
                "password": password
            });
    
            fetch(`${domain}/api/v1.0/user/create-user/`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: body
            })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    setError("User already exists"); // Handle specific error case
                    throw res.json(); // Throw to skip the next then block
                }
            })
            .then(json => {
                setUserObj(json);
                setToken(json.access);
                setIsLoggedIn(true);
            })
            .catch(error => {
                console.error('Error during sign-up:', error);
                return error.json(); // Log the actual error response
            })
            .then(json => {
                console.log('Error JSON:', json); // Log the JSON response from error
            });
        } else {
            setError("Passwords do not match!"); // Moved inside the else block
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <KeyboardAvoidingView style={styles.background} behavior='padding'>
                <Image 
                    style={styles.logo} 
                    source={require('../assets/images/LOGO_Light.png')} />

                <Text style={styles.text}>Username</Text>
                <View style={styles.textbox}>
                    <TextInput
                        style={styles.username}
                        placeholder="Type here"
                        placeholderTextColor={styles.username.color}
                        value={username}
                        onChangeText={setUserName}
                        secureTextEntry="false" 
                        autoCapitalize='none'
                        maxLength={32}
                        keyboardType='ascii-capable'
                    ></TextInput>
                </View>

                <Text style={styles.text}>Email</Text>
                <View style={styles.textbox}>
                    <TextInput
                        style={styles.username}
                        placeholder="Type here"
                        placeholderTextColor={styles.username.color}
                        value={email}
                        onChangeText={setEmail}
                        secureTextEntry="false" 
                        autoCapitalize='none'
                        keyboardType='ascii-capable'
                    ></TextInput>
                </View>

                <Text style={styles.text}>Password</Text>
                <View style={styles.textbox}>
                    <TextInput
                        style={styles.username}
                        placeholder="Type here"
                        placeholderTextColor={styles.username.color}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry="true" 
                        autoCapitalize='none'
                        minLength={8}
                        keyboardAppearance='dark'
                    ></TextInput>
                </View>

                <Text style={styles.text}>Confirm Password</Text>
                <View style={styles.textbox}>
                    <TextInput
                        style={styles.username}
                        placeholder="Type here"
                        placeholderTextColor={styles.username.color}
                        value={confirm}
                        onChangeText={setConfirm}
                        secureTextEntry="true" 
                        autoCapitalize='none'
                        minLength={8}
                    ></TextInput>
                </View>

                <Text style={[styles.text, { marginBottom: 20 }]}>{error}</Text>

                <TouchableOpacity style={styles.loginbutn}
                        onPress={handleSignUp}>
                            <Text style={styles.logintext}>Sign up!</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={handleLogIn}>
                    <Text style={[styles.text, { textDecorationLine: "underline" }]}>Back to Log In</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
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