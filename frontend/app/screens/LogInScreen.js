import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from '@react-navigation/native';

import colors from '../config/colors';
import { Context } from '../components/GlobalContext';
import { Keyboard } from 'react-native';

export default function LogInScreen() {
    const globalContext = useContext(Context);
    const { isLoggedIn, setIsLoggedIn, domain, userObj, setUserObj, setToken } = globalContext;

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")

    const [secure, setSecure] = useState(true);

    const navigation = useNavigation();

    const handleLogIn = () => {

        if (username && password) {
            let body = JSON.stringify({
                'username': username,
                'password': password
            })

            fetch(`${domain}/api/v1.0/user/login-user/`, { 
                method: 'POST' , 
                headers: { 'Content-Type': 'application/json' },
                body: body
            })
            .then(res => {
                if (res.ok) {
                    return res.json()
                } else {
                    setError("Username and Password does not match")
                    throw res.json()
                }
            })
            .then(json => {
                setUserObj(json)
                setToken(json.access)
                setIsLoggedIn(true)
            })
            .catch(error => {
                console.log(error);
            });
        } else {
            setError("Username or Password is empty");
        }
    };

    const handleSignUp = () => {
        navigation.navigate("SignUp");
    };

    const handleSecure = () => {
        setSecure(!secure);
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <SafeAreaView style={styles.background}>
                <KeyboardAvoidingView style={styles.background} 
                behavior='padding'>
                    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                        <>
                            <Image 
                                style={styles.logo} 
                                source={require('../assets/images/LOGO_Light.png')} 
                            />
                            <Text style={[styles.text, {marginBottom: 20}]}>You are {(isLoggedIn) ? "" : "not"} logged in</Text>
                            <Text style={styles.text}>Username or Email</Text>
                            <View style={styles.textbox}>
                                <TextInput
                                    style={styles.username}
                                    placeholder="Type here"
                                    placeholderTextColor={styles.username.color}
                                    value={username}
                                    onChangeText={setUserName}
                                    secureTextEntry={false} 
                                    autoCapitalize='none'
                                />
                            </View>
                            <Text style={styles.text}>Password</Text>
                            <View style={styles.textbox}>
                                <TextInput
                                    style={[styles.username, {alignItems: 'center'}]}
                                    placeholder="Type here"
                                    placeholderTextColor={styles.username.color}
                                    value={password}
                                    onChangeText={setPassword}
                                    secureTextEntry={secure} 
                                    autoCapitalize='none'
                                />
                            </View>

                            <Text style={[styles.text, { marginBottom: 20 }]}>{error}</Text>

                            <TouchableOpacity style={styles.loginbutn} onPress={handleLogIn}>
                                <Text style={styles.logintext}>Log in</Text>
                            </TouchableOpacity>
                            
                            <Text style={styles.text}>Don't have an account yet?</Text>
                            <TouchableOpacity onPress={handleSignUp}>
                                <Text style={[styles.text, { textDecorationLine: "underline" }]}>Sign up now!</Text>
                            </TouchableOpacity>
                        </>
                    </TouchableWithoutFeedback>
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