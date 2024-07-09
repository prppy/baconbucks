import React, { useContext, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";

import colors from "../config/colors";
import { Context } from "../components/GlobalContext";

export default function SettingsScreen(props) {

    const globalContext = useContext(Context);
    const { setuserObj, userObj, isLightTheme, toggleTheme, theme } = globalContext;
    const navigation = useNavigation();
    const themeColors = isLightTheme ? colors.light : colors.dark;
    const styles = createStyles(themeColors);

    const [isPressed, setIsPressed] = useState(false); //for the dark mode icon

    const handlePress = () => {
        toggleTheme();
        setIsPressed(!isPressed);
    }; //handles the change in icon when toggling from light mode to dark mode

    const handleLogOut = () => {
        setuserObj();
    }; 

    const [isModal1Visible, setModal1Visible] = useState(false);
    const [isModal2Visible, setModal2Visible] = useState(false);
    const [isModal3Visible, setModal3Visible] = useState(false);

    const toggleModal1 = () => setModal1Visible(!isModal1Visible); //username
    const toggleModal2 = () => setModal2Visible(!isModal2Visible); //email
    const toggleModal3 = () => setModal3Visible(!isModal3Visible); //password

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.headertext}>Settings</Text>

            {/* Profile pic */}
            <View style={styles.pfp}></View>
            <TouchableOpacity style={styles.editpfp}>
                <Ionicons 
                    name="pencil" 
                    size={18} 
                    color={themeColors.whitetext} />
            </TouchableOpacity>
            
            {/* Username */}
            <View style={styles.row}>
                <Text style={styles.rowheader}>username</Text>
                <Text style={styles.rowcontent}>{userObj.username}</Text>
                <TouchableOpacity style={styles.button} onPress={toggleModal1}>
                    <Ionicons 
                        name='pencil'
                        size={20}
                        color={themeColors.settingsicons}
                    />
                </TouchableOpacity>
            </View> 
            <Modal 
            isVisible={isModal1Visible} 
            onBackdropPress={toggleModal1}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalHeader}>New username</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Type here"
                        // value={username}
                        // onChangeText={setnewusername}
                        secureTextEntry="false"
                        autoCapitalize='none'
                        maxLength={50}
                    />
                    <TouchableOpacity style={styles.savebtn}>
                        <Text style={styles.btntext}>Save</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Email */}
            <View style={styles.row}>
                <Text style={styles.rowheader}>email</Text>
                <Text style={styles.rowcontent}>{userObj.email}</Text>
                <TouchableOpacity style={styles.button} onPress={toggleModal2}>
                    <Ionicons 
                        name='pencil'
                        size={20}
                        color={themeColors.settingsicons}
                    />
                </TouchableOpacity>
            </View> 
            <Modal 
            isVisible={isModal2Visible} 
            onBackdropPress={toggleModal2}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalHeader}>New email</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Type here"
                        // value={username}
                        // onChangeText={setnewusername}
                        secureTextEntry="false"
                        autoCapitalize='none'
                        maxLength={100}
                    />
                    <TouchableOpacity style={styles.savebtn}>
                        <Text style={styles.btntext}>Save</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Password */}
            <View style={styles.row}>
                <Text style={styles.rowheader}>password</Text>
                <Text style={styles.rowcontent}>{userObj.password}</Text>
                
                <TouchableOpacity style={styles.button} onPress={toggleModal3}>
                    <Ionicons 
                        name='pencil'
                        size={20}
                        color={themeColors.settingsicons}
                    />
                </TouchableOpacity>
            </View> 
            <Modal 
            isVisible={isModal3Visible} 
            onBackdropPress={toggleModal3}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalHeader}>New password</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Type here"
                        // value={username}
                        // onChangeText={setnewusername}
                        secureTextEntry="false"
                        autoCapitalize='none'
                        maxLength={50}
                    />
                    <TouchableOpacity style={styles.savebtn}>
                        <Text style={styles.btntext}>Save</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Dark mode */}
            <View style={styles.row}>
                <Text style={styles.rowheader}>accessibility</Text>
                <Text style={styles.rowcontent}>dark mode</Text>
                <TouchableOpacity style={styles.button} onPress={handlePress}>
                    <Ionicons 
                        name={isLightTheme ? 'sunny-outline' : 'moon-outline'}
                        size={22}
                        color={themeColors.settingsicons}
                    />
                </TouchableOpacity>
            </View> 

            {/* Font size */}
            <View style={styles.row}>
                <Text style={styles.rowheader}>accessibility</Text>
                <Text style={styles.rowcontent}>font size</Text>
                <TouchableOpacity style={styles.button}>
                    <Ionicons 
                        name='resize'
                        size={20}
                        color={themeColors.settingsicons}
                    />
                </TouchableOpacity>
            </View> 

            {/* Delete my account */}
            <View style={styles.row}>
                <Text style={styles.rowheader}>my account</Text>
                <Text style={styles.rowcontent}>delete account</Text>
                <TouchableOpacity style={styles.button}>
                    <Ionicons 
                        name='trash-outline'
                        size={20}
                        color={themeColors.settingsicons}
                    />
                </TouchableOpacity>
            </View>

            {/* Logout */}
            <TouchableOpacity style={styles.logoutbtn} onPress={handleLogOut}>
                <Ionicons 
                    name="log-out-outline" 
                    size={20}
                    color={'white'} />
                <Text style={styles.logouttext}>Log Out</Text>
            </TouchableOpacity>
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
    row: {
        width: '90%',
        marginTop: 5,
        borderRadius: 10,
        backgroundColor: themeColors.row,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 20,
        height: 65,
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
        backgroundColor: themeColors.buttons,
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
        color: themeColors.headertext,
    },
    button: {
        marginTop: 'auto',
        marginBottom: 'auto',
    },
    rowheader: {
        color: themeColors.headertext,
        fontSize: 14,
        position: 'absolute',
        top: 10,
        left: 20,
    },
    rowcontent: {
        color: themeColors.headertext,
        fontSize: 18,
        position: 'absolute',
        top: 32,
        left: 20,
    },
    logoutbtn: {
        flexDirection: 'row',
        width: '30%',
        justifyContent: 'center',
        alignItems: 'center',
        height: '7%',
        backgroundColor: themeColors.buttons,
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        marginTop: 15,
    },
    logouttext: {
        fontSize: 15,
        color: 'white',
        padding: 5,
    },
    modalContent: {
        width: 300, 
        height: 170,
        borderRadius: 10,
        backgroundColor: '#F4D5E1',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    btntext: {
        color: 'white',
        fontSize: 16,
    },
    modalHeader: {
        fontSize: 18,
        marginRight: 'auto',
    },
    modaltext: {
        fontSize: 15,
        padding: 10,
    },
    savebtn: {
        width: 80,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#df4b75',
        borderRadius: 5,
        marginTop: 20,
    },
    input: {
        backgroundColor: 'white',
        borderRadius: 5,
        height: 40,
        width: '100%',
        marginTop: 10,
        padding: 10,
    }
})