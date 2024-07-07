import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, Keyboard, TouchableOpacity, TouchableWithoutFeedback, KeyboardAvoidingView, Alert } from "react-native";
import { useNavigation } from '@react-navigation/native';

import colors from '../config/colors';
import { Context } from '../components/GlobalContext';

export default function SignUpScreen(props) {

    const globalContext = useContext(Context);
    const { domain, setUserObj, setToken, fetchData } = globalContext;

    const [username, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm, setConfirm] = useState("");
    const [error, setError] = useState("");

    const navigation = useNavigation();


    const handleSignUp = async () => {
        try {
            let body = JSON.stringify({ 
                "username": username, 
                "email": email, 
                "password": password, 
                "confirm_password": confirmPassword
            });
    
            console.log('Fetch Body:', body);
    
            // sign-up
            let signUpResponse = await fetch(`${domain}/api/v1.0/user/signup/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            });
    
            if (!signUpResponse.ok) {
                let errorResponse = await signUpResponse.json();
                throw errorResponse;
            }
    
            let signUpJson = await signUpResponse.json();
            console.log('Sign Up Response:', signUpJson);
    
            // login after successful sign-up
            let loginBody = JSON.stringify({
                "username": username, 
                "password": password
            });
    
            console.log('Fetch Log In Body:', loginBody);
    
            let loginResponse = await fetch(`${domain}/api/v1.0/user/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: loginBody
            });
    
            if (!loginResponse.ok) {
                let loginError = await loginResponse.json();
                throw loginError;
            }
    
            let loginJson = await loginResponse.json();
            console.log('Login Response:', loginJson);
    
            // set access token
            setToken(loginJson.access);
            console.log('User created successfully and logged in.');
    
            // fetch user data using the token
            const user = await fetchData('api/v1.0/user/get-user/', 'GET');
            console.log('User Data:', user);
    
            // set userObj in state
            setUserObj(user);

    
        } catch (signUpError) {
            const errorMessages = Object.keys(signUpError).map(key => {
                return `${key}: ${signUpError[key].join(', ')}`;
            });
            console.log(errorMessages);
            setError(errorMessages);
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <SafeAreaView>
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
            </SafeAreaView>
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