import React from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from "../config/colors";

export default function SettingsScreen(props) {
    const navigation = useNavigation();

    const handleMyAccount = () => {
        navigation.navigate("MyAccount");
    };

    const handleAccessibility = () => {
        navigation.navigate("Accessibility");
    };

    const handleLogOut = () => {
        navigation.replace("LogIn");
    };

    return (
        <SafeAreaView style={styles.background}>
            <View style={styles.pfp}></View>
            <TouchableOpacity style={styles.editpfp}>
                <Ionicons name="pencil" size={15} color={'white'} />
            </TouchableOpacity>
            <Text style={styles.username}>Username</Text>

            <View style={styles.row}>
                <TouchableOpacity style={styles.button} onPress={handleMyAccount}>
                    <Ionicons name="person-outline" size={20} color={'black'} />
                    <Text style={styles.myaccbtnText}>My Account</Text>
                    <Ionicons name="chevron-forward-sharp" size={20} color={'#808080'} />
                </TouchableOpacity>

                <View style={styles.separator} />

                <TouchableOpacity style={styles.button} onPress={handleAccessibility}>
                    <Ionicons name="accessibility-outline" size={20} color={'black'} />
                    <Text style={styles.accessbtnText}>Accessibility</Text>
                    <Ionicons name="chevron-forward-sharp" size={20} color={'#808080'} />
                </TouchableOpacity>

                <View style={styles.separator} />

                <TouchableOpacity style={styles.button} onPress={handleLogOut}>
                    <Ionicons name="log-out-outline" size={20} color={'black'} />
                    <Text style={styles.logoutbtnText}>Log Out</Text>
                    <Ionicons name="chevron-forward-sharp" size={20} color={'#808080'} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.lightPink,
        justifyContent: 'flex-start',
    },
    row: {
        width: '90%',
        marginBottom: 20,
        justifyContent: 'center',
        marginTop: 20,
        marginLeft: 20,
        borderRadius: 10,
        backgroundColor: '#f6dde7',
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    button: {
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
        paddingLeft: 20,
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#808080',
    },
    myaccbtnText: {
        color: 'black',
        fontSize: 16,
        marginLeft: 20,
        marginRight: 175,
    },
    accessbtnText: {
        color: 'black',
        fontSize: 16,
        marginLeft: 20,
        marginRight: 170,
    },
    logoutbtnText: {
        color: 'black',
        fontSize: 16,
        marginLeft: 20,
        marginRight: 200,
    },
    pfp: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: '#ccc',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'relative',
        left: 50,
        top: 30,
    },
    username: {
        fontSize: 20,
        position: 'relative',
        left: 180,
        bottom: 80,
    },
    editpfp: {
        width: 24,
        height: 24,
        borderRadius: 12,
        backgroundColor: colors.darkPink,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        left: 120,
        top: 5,
    },
})