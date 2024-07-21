import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, TouchableWithoutFeedback } from "react-native";
import { useNavigation } from '@react-navigation/native';

// import colors from '../config/colors';
import { Context } from '../components/GlobalContext';
import { Keyboard } from 'react-native';

export default function LogInScreen() {
    const globalContext = useContext(Context);
    const { domain, setUserObj, setToken, setRefresh, fetchData, userObj } = globalContext;

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("")

    const [secure, setSecure] = useState(true);

    const navigation = useNavigation();

    const handleLogIn = async () => {
        try {
            body = JSON.stringify({
                "username": username,
                "password": password
            })

            console.log('Fetch Body:', body);

            // log-in
            let logInResponse = await fetch(`${domain}/user/login/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: body
            });

            if (!logInResponse.ok) {
                let errorResponse = await logInResponse.json();
                throw errorResponse;
            }

            let loginJson = await logInResponse.json();
            console.log('Login Response:', loginJson);

            // set access and refresh token
            setToken(loginJson.access);
            setRefresh(loginJson.refresh);
            console.log('User logged in successfully.');

            // fetch user data using the token
            const user = await fetchData('user/get-user/');
            console.log('User Data:', user);
    
            // set userObj in state
            setUserObj(user);

        } catch (logInError) {
            const errorMessages = Object.keys(logInError).map(key => {
                return `${key}: ${logInError[key].join(', ')}`;
            });
            console.log(errorMessages);
            setError(errorMessages);
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
        backgroundColor: "#DF4B75",
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
        color: "#F4D5E1", 
    }, 

    username: {
        fontFamily: "System", 
        fontSize: 15,
        color: "#DF4B75", 
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
        backgroundColor: "#F4D5E1",
        marginBottom: 20
    },

    loginbutn: {
        width: 100, 
        height: 30,
        backgroundColor: "#F4D5E1",
        borderRadius: 4,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    }, 

    logintext: {
        fontSize: 15, 
        color: "#DF4B75",
    }
})