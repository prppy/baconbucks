import React, { useContext, useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";
import { Context } from "../components/GlobalContext";
import colors from "../config/colors";

export default function SettingsScreen(props) {
    const globalContext = useContext(Context);
    const { setUserObj, userObj, isLightTheme, toggleTheme, isLargeFont, defaultFontSizes, getLargerFontSizes, toggleFontSize } = globalContext;
    const navigation = useNavigation();
    const themeColors = isLightTheme ? colors.light : colors.dark;
    const fontSizes = isLargeFont ? getLargerFontSizes() : defaultFontSizes;
    const styles = createStyles(themeColors, fontSizes);

    const [isPressed, setIsPressed] = useState(false); // for the dark mode icon
    const [isModal1Visible, setModal1Visible] = useState(false); // font size modal
    const [selectedFontSize, setSelectedFontSize] = useState(isLargeFont ? 'Larger' : 'Default'); // State to track selected font size
    const handlePress = () => {
        toggleTheme();
        setIsPressed(!isPressed);
    };

    const handleFontSizeChange = (size) => {
        if (size === 'Larger') {
            if (!isLargeFont) {
                toggleFontSize();
            }
        } else {
            if (isLargeFont) {
                toggleFontSize();
            }
        }
        setSelectedFontSize(size);
    };

    const handleLogOut = () => {
        setUserObj(null);
    };

    const handleMyAccount = () => {
        navigation.navigate("My Account");
    };

    const toggleModal1 = () => setModal1Visible(!isModal1Visible);

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.headertext}>Settings</Text>

            {/* Profile pic */}
            <View style={styles.pfp}>
                <Ionicons 
                    name='person-circle-outline'
                    size={130}
                    color={themeColors.settingsicons}
                /> 
            </View>

            <Text style={styles.username}>{userObj?.username || "Username"}</Text>
            
            {/* My Account */}
            <View style={styles.row}>
                <Text style={styles.rowheader}>my account</Text>
                <Text style={styles.rowcontent}>profile</Text>
                <TouchableOpacity style={styles.button} onPress={handleMyAccount}>
                    <Ionicons 
                        name='chevron-forward-sharp'
                        size={20}
                        color={themeColors.settingsicons}
                    />
                </TouchableOpacity>
            </View> 

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
                <TouchableOpacity style={styles.button} onPress={toggleModal1}>
                    <Ionicons 
                        name='resize'
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
                    <Text style={styles.modalHeader}>Select font size</Text>
                    <TouchableOpacity 
                        style={styles.modalOptions}
                        onPress={() => handleFontSizeChange('Default')}
                        disabled={selectedFontSize === 'Default'}
                    >
                        <Ionicons 
                            name={selectedFontSize === 'Default' ? 'radio-button-on-outline' : 'radio-button-off-outline'}
                            size={20}
                            color='black'
                        />
                        <Text style={styles.modaltext}>Default</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        style={styles.modalOptions}
                        onPress={() => handleFontSizeChange('Larger')}
                        disabled={selectedFontSize === 'Larger'}
                    >
                        <Ionicons 
                            name={selectedFontSize === 'Larger' ? 'radio-button-on-outline' : 'radio-button-off-outline'}
                            size={20}
                            color='black'
                        />
                        <Text style={styles.modaltext}>Large</Text>
                    </TouchableOpacity>
                    
                </View>
            </Modal>

            {/* Logout */}
            <TouchableOpacity style={styles.logoutbtn} onPress={handleLogOut}>
                <Ionicons 
                    name="log-out-outline" 
                    size={20}
                    color={'white'} 
                />
                <Text style={styles.logouttext}>Log Out</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}

const createStyles = (themeColors, fontSizes) => StyleSheet.create({
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
        marginTop: 70,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        marginBottom: 10,
    },
    headertext: {
        fontSize: fontSizes.twenty,
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
        fontSize: fontSizes.fourteen,
        position: 'absolute',
        top: 10,
        left: 20,
    },
    rowcontent: {
        color: themeColors.headertext,
        fontSize: fontSizes.eighteen,
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
        fontSize: fontSizes.fifteen,
        color: 'white',
        padding: 5,
    },
    modalContent: {
        width: 300, 
        height: 160,
        borderRadius: 10,
        backgroundColor: '#F4D5E1',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 20,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    modalHeader: {
        fontSize: fontSizes.eighteen,
        marginRight: 'auto',
        padding: 5,
    },
    modaltext: {
        fontSize: fontSizes.fifteen,
        padding: 5,
    },
    username: {
        fontSize: fontSizes.twentyfour,
        marginBottom: 10,
        color: themeColors.headertext,
    },
    modalOptions: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 5,
    }
});
