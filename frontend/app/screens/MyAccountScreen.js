import React, { useContext, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from "../config/colors";
import { Context } from "../components/GlobalContext";

export default function MyAccountScreen(props) {
    const globalContext = useContext(Context);
    const { setIsLoggedIn, userObj } = globalContext;
    const navigation = useNavigation();

    const [isPressed, setIsPressed] = useState(false);

    const handlePress = () => {
        setIsPressed(!isPressed);
    };

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.headertext}>My Account</Text>
            <View style={styles.pfp}></View>
            <TouchableOpacity style={styles.editpfp}>
                <Ionicons name="pencil" size={18} color={'white'} />
            </TouchableOpacity>
            <Text style={styles.username}>{userObj.username}</Text>
            <View style={styles.row}>
                <Text style={styles.rowheader}>username</Text>
                <Text style={styles.rowcontent}>{userObj.username}</Text>
                <TouchableOpacity style={styles.button}>
                    <Ionicons name="pencil" size={20} color={'#808080'} />
                </TouchableOpacity>
            </View> 
            <View style={styles.row}>
                <Text style={styles.rowheader}>email</Text>
                <Text style={styles.rowcontent}>{userObj.email}</Text>
                <TouchableOpacity style={styles.button}>
                    <Ionicons name="pencil" size={20} color={'#808080'} />
                </TouchableOpacity>
            </View> 
            <View style={styles.row}>
                <Text style={styles.rowheader}>password</Text>
                <Text style={styles.rowcontent}>{userObj.password}</Text>
                <TouchableOpacity style={styles.button} onPress={handlePress}>
                    {isPressed ? (
                        <Ionicons name='eye-outline' size={22} color={'#808080'}/>
                    ) : (
                        <Ionicons name='eye-off-outline' size={22} color={'#808080'}/>
                    )}
                </TouchableOpacity>
                <TouchableOpacity style={styles.button}>
                    <Ionicons name="pencil" size={20} color={'#808080'} />
                </TouchableOpacity>
            </View> 
            <TouchableOpacity style={styles.delbtn}>
                <Ionicons name="trash-outline" size={20} color={'white'} />
                <Text style={styles.deltbntext}>Delete My Account</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        padding: 20,
        backgroundColor: colors.lightPink,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    row: {
        width: '90%',
        marginTop: 5,
        borderRadius: 10,
        backgroundColor: '#f6dde7',
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 20,
        height: 70,
    },
    pfp: {
        width: 120,
        height: 120,
        borderRadius: 60,
        backgroundColor: '#ccc',
        marginTop: 70,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
    },
    editpfp: {
        width: 26,
        height: 26,
        borderRadius: 13,
        backgroundColor: colors.darkPink,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: 90,
        bottom: 30,
    },
    headertext: {
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        top: 70,
        left: 30,
    },
    username: {
        fontSize: 30,
        bottom: 10,
    },
    button: {
        marginTop: 'auto',
        marginBottom: 'auto',
        padding: 5,
    },
    rowheader: {
        color: 'black',
        fontSize: 14,
        position: 'absolute',
        top: 10,
        left: 20,
    },
    rowcontent: {
        color: 'black',
        fontSize: 18,
        position: 'absolute',
        top: 32,
        left: 20,
    },
    delbtn: {
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '7%',
        backgroundColor: colors.darkPink,
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        marginTop: 150,
    },
    deltbntext: {
        fontSize: 15,
        color: 'white',
        padding: 5,
    }
})