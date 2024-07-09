import React, { useState, useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, ScrollView} from "react-native";
import moment from 'moment';
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import { Context } from "../components/GlobalContext";

export default function CommunityScreen(props) {
    const navigation = useNavigation();
    const globalContext = useContext(Context);
    const { userObj, isLightTheme } = globalContext;
    const themeColors = isLightTheme ? colors.light : colors.dark;
    const styles = createStyles(themeColors);

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.headertext}>Community</Text>
            <View style={styles.row}>
                <Text style={styles.rank}>1</Text>
                <View style={styles.pfp}></View>
                <Text style={styles.username}>{userObj.username}</Text>
                <Text style={styles.bacoin}>{userObj.bacoin}</Text>
            </View>
        </SafeAreaView>
    )
};

const createStyles = (themeColors) => StyleSheet.create({
    background: {
        flex: 1,
        padding: 20,
        backgroundColor: themeColors.background,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    headertext: {
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        top: 70,
        left: 30,
        color: themeColors.headertext,
    },
    row: {
        width: '100%',
        marginTop: 60,
        borderRadius: 10,
        backgroundColor: themeColors.row,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: 30,
        height: 80,
    },
    rank: {
        fontSize: 20,
    },
    pfp: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: '#ccc',
        marginTop: 70,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        position: 'absolute',
        left: 60,
    },
    username: {
        fontSize: 20,
        position: 'absolute',
        left: 120,
    },
    bacoin: {
        fontSize: 20,
        position: 'absolute',
        left: 330,
    }
})