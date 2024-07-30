import React, { useState, useContext } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Button,
    ScrollView,
    TouchableWithoutFeedback,
} from "react-native";
import moment from "moment";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import { Context } from "../components/GlobalContext";

const MissionsScreen = () => {
    const navigation = useNavigation();
    const globalContext = useContext(Context);
    const {
        fetchData,
        isLightTheme,
        isLargeFont,
        defaultFontSizes,
        getLargerFontSizes,
    } = globalContext;

    const themeColors = isLightTheme ? colors.light : colors.dark;
    const fontSizes = isLargeFont ? getLargerFontSizes() : defaultFontSizes;
    const styles = createStyles(themeColors, fontSizes);

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.headertext}>Missions</Text>
            <View style={styles.inner}>
                <View>
                    <Text>Challenges</Text>
                </View>
            </View>
        </SafeAreaView>
    );
};

const createStyles = (themeColors, fontSizes) =>
    StyleSheet.create({
        background: {
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: themeColors.background,
            padding: 20,
        },
        headertext: {
            fontSize: 20,
            fontWeight: "bold",
            position: "absolute",
            top: 70,
            left: 30,
            color: themeColors.headertext,
            paddingBottom: 20,
        },
        inner: {
            paddingTop: 60,
            width: "100%",
            padding: 30,
            flex: 1,
        },
        addreminder: {
            position: "absolute",
            bottom: 30,
            right: 30,
        },
        modalContent: {
            backgroundColor: themeColors.background,
            padding: 20,
            borderRadius: 10,
        },
        modalHeader: {
            fontSize: fontSizes.eighteen,
            alignSelf: "center",
            fontWeight: "bold",
        },
        modaltext: {
            fontSize: fontSizes.fifteen,
            marginBottom: 10,
            fontWeight: "bold",
        },
        savebtn: {
            backgroundColor: themeColors.buttons,
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
        },
        btntext: {
            color: themeColors.background,
            textAlign: "center",
            fontSize: fontSizes.text,
            fontWeight: "bold",
        },
        reminder: {
            backgroundColor: themeColors.row,
            borderRadius: 10,
            marginRight: 30,
            marginTop: 25,
            padding: 10,
        },
        reminderHeader: {
            fontSize: fontSizes.fifteen,
            fontWeight: "bold",
            marginBottom: 10,
        },
    });

export default MissionsScreen;
