import React, { useState, useContext } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
    SafeAreaView,
    Keyboard,
    Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Context } from "../components/GlobalContext";
import colors from "../config/colors";

const NewReminderScreen = () => {
    const globalContext = useContext(Context);
    const {
        fetchData,
        isLightTheme,
        isLargeFont,
        defaultFontSizes,
        getLargerFontSizes,
    } = globalContext;

    const navigation = useNavigation();
    const route = useRoute();

    const themeColors = isLightTheme ? colors.light : colors.dark;
    const fontSizes = isLargeFont ? getLargerFontSizes() : defaultFontSizes;
    const styles = createStyles(themeColors, fontSizes);

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <SafeAreaView style={styles.background}>
                <Text style={styles.headertext}>New Reminder</Text>
                <View style={styles.inner}></View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const createStyles = (themeColors, fontSizes) =>
    StyleSheet.create({
        background: {
            flex: 1,
            justifyContent: "flex-start",
            backgroundColor: themeColors.background,
            padding: 0,
            flexDirection: "column",
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
        typeSelector: {
            flexDirection: "row",
            marginBottom: 20,
            justifyContent: "space-evenly",
            alignContent: "center",
            width: "100%",
        },
        typeButton: {
            width: "30%",
            alignItems: "center",
            padding: 12,
            borderWidth: 2,
            borderColor: themeColors.buttons,
            borderRadius: 40,
        },
        selectedTypeButton: {
            backgroundColor: themeColors.buttons,
        },
        typeText: {
            fontSize: 16,
            color: themeColors.revbuttons,
        },
        amountBox: {
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "row",
            alignSelf: "center",
        },
        amountInput: {
            fontSize: 32,
            fontWeight: "bold",
            marginBottom: 16,
            textAlign: "center",
            borderBottomWidth: 1,
            borderColor: themeColors.buttons,
            color: themeColors.buttons,
            paddingHorizontal: 20,
        },
        label: {
            fontSize: 18,
            marginVertical: 8,
            color: themeColors.headertext,
        },
        input: {
            borderWidth: 1,
            borderColor: "#ccc",
            marginBottom: 16,
        },
        modalContainer: {
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            paddingHorizontal: 15,
        },
        grid: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            width: "90%",
            alignSelf: "center",
        },
        gridItem: {
            width: "30%",
            aspectRatio: 1,
            alignItems: "center",
            marginBottom: 20,
            backgroundColor: themeColors.row,
            justifyContent: "center",
            alignContent: "center",
            borderRadius: 10,
        },
        repItem: {
            alignItems: "center",
            marginBottom: 20,
            backgroundColor: themeColors.row,
            justifyContent: "center",
            alignContent: "center",
            borderRadius: 10,
            width: "70%",
        },
        modalItem: {
            marginTop: 8,
            fontSize: 15,
        },

        saveButton: {
            alignItems: "center",
            padding: 12,
            backgroundColor: themeColors.buttons,
            borderRadius: 4,
            width: "50%",
            alignSelf: "center",
        },
        saveButtonText: {
            color: "#fff",
            fontSize: 16,
        },
        line: {
            borderBottomColor: themeColors.buttons,
            borderBottomWidth: 1,
            marginVertical: 10,
        },
    });

export default NewReminderScreen;
