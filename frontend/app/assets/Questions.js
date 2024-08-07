import React, { useState, useContext } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Context } from "../components/GlobalContext";

export default Questions = ({ index, question, totalQuestions }) => {
    const globalContext = useContext(Context);
    const { isLightTheme, isLargeFont, defaultFontSizes, getLargerFontSizes } =
        globalContext;
    const themeColors = isLightTheme ? colors.light : colors.dark;
    const fontSizes = isLargeFont ? getLargerFontSizes() : defaultFontSizes;
    const styles = createStyles(themeColors, fontSizes);

    return (
        <View style={styles.container}>
            {/* Question Counter */}
            <View style={styles.counterRow}>
                <Text style={styles.indexText}>{index + 1}</Text>
                <Text style={styles.totalText}> / {totalQuestions}</Text>
            </View>

            {/* Question */}
            <Text style={styles.questionText}>{question}</Text>
        </View>
    );
};

const createStyles = (themeColors, fontSizes) =>
    StyleSheet.create({
        container: {
            padding: 10,
            width: "100%", 
        },
        counterRow: {
            flexDirection: "row",
            marginBottom: 10,
        },
        indexText: {
            color: themeColors.headertext,
            fontSize: fontSizes.fifteen,
            opacity: 0.6,
        },
        totalText: {
            color: themeColors.headertext,
            fontSize: fontSizes.fifteen,
            opacity: 0.6,
        },
        questionText: {
            color: themeColors.headertext,
            fontSize: fontSizes.eighteen,
            textAlign: "center",
        },
    });
