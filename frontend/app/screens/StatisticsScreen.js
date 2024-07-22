import React, { useState, useContext } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PieChart from "react-native-pie-chart";

import colors from "../config/colors";
import { Context } from "../components/GlobalContext";

const StatisticsScreen = () => {
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

    const [type, setType] = useState("Expense");

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.headertext}>Statistics Dashboard</Text>
            <View style={styles.inner}>
                <View style={styles.typeSelector}>
                    <TouchableOpacity
                        onPress={() => setType("Expense")}
                        style={[
                            styles.typeButton,
                            type === "Expense" && styles.selectedTypeButton,
                        ]}
                    >
                        <Text style={styles.typeText}>EXPENSE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => setType("Income")}
                        style={[
                            styles.typeButton,
                            type === "Income" && styles.selectedTypeButton,
                        ]}
                    >
                        <Text style={styles.typeText}>INCOME</Text>
                    </TouchableOpacity>
                </View>
                <Text>testing</Text>
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
        typeSelector: {
            flexDirection: "row",
            marginBottom: 20,
            justifyContent: "center",
            alignContent: "center",
        },
        typeButton: {
            width: "30%",
            alignItems: "center",
            padding: 12,
            borderWidth: 2,
            borderColor: themeColors.buttons,
            borderRadius: 40,
            marginHorizontal: 20,
        },
        selectedTypeButton: {
            backgroundColor: themeColors.buttons,
        },
        typeText: {
            fontSize: 16,
            color: themeColors.revbuttons,
        },
    });

export default StatisticsScreen;
