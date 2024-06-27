import React, { useContext, useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

import colors from '../config/colors';
import { Context } from '../components/GlobalContext';

export default function LogInScreen() {
    const globalContext = useContext(Context);
    const { isLoggedIn, setIsLoggedIn } = globalContext;

    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const [secure, setSecure] = useState(true);

    const navigation = useNavigation();

    const handleLogIn = () => {
        navigation.replace("HomeTabs");
        setIsLoggedIn(true)
    };

    const handleSignUp = () => {
        navigation.navigate("SignUp");
    };

    return (
        <SafeAreaView style={styles.background}>
            <Image 
                style={styles.logo} 
                source={require('../assets/images/LOGO_Light.png')} 
            />
            <Text>You are {(isLoggedIn) ? "" : "not"} logged in</Text>
            <Text style={styles.text}>Username</Text>
            <View style={styles.textbox}>
                <TextInput
                    style={styles.username}
                    placeholder="Type here"
                    value={username}
                    onChangeText={setUserName}
                    secureTextEntry={false} 
                    autoCapitalize='none'
                    maxLength={20}
                />
            </View>
            <Text style={styles.text}>Password</Text>
            <View style={styles.textbox}>
                <TextInput
                    style={styles.username}
                    placeholder="Type here"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry={secure} 
                    autoCapitalize='none'
                />
            </View>
            <TouchableOpacity style={styles.loginbutn} onPress={handleLogIn}>
                <Text style={styles.logintext}>Log in</Text>
            </TouchableOpacity>
            
            <Text style={styles.text}>Don't have an account yet?</Text>
            <TouchableOpacity onPress={handleSignUp}>
                <Text style={styles.text}>Sign up now!</Text>
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