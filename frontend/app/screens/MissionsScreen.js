import React, { useState, useContext } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from "react-native";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Context } from "../components/GlobalContext";

export default function MissionsScreen(props) {
    const navigation = useNavigation();

    const globalContext = useContext(Context);
    const {
        userObj,
        isLightTheme,
        isLargeFont,
        defaultFontSizes,
        getLargerFontSizes,
    } = globalContext;
    const themeColors = isLightTheme ? colors.light : colors.dark;
    const fontSizes = isLargeFont ? getLargerFontSizes() : defaultFontSizes;
    const styles = createStyles(themeColors, fontSizes);

    const handleNavigateToQuiz = (quizID) => {
        navigation.navigate("QuizScreen", { QuizID: quizID });
    };

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.headertext}>Missions</Text>
            <View style={styles.inner}>
                {/* RANDOM */}
                <View style={styles.quizbox}>
                    <View style={{ width: "90%" }}>
                        <Text style={styles.rowheader}>Random</Text>
                        <Text style={styles.rowcontent} numberOfLines={2}>
                            Not sure where to get started? Try out any topic
                            here!
                        </Text>
                    </View>

                    <TouchableOpacity>
                        <Ionicons
                            name="chevron-forward"
                            size={30}
                            color={themeColors.buttons}
                        />
                    </TouchableOpacity>
                </View>

                {/* CPF */}
                <View style={styles.quizbox}>
                    <View style={{ width: "90%" }}>
                        <Text style={styles.rowheader}>CPF</Text>
                        <Text style={styles.rowcontent} numberOfLines={2}>
                            Test your knowledge of the Central Provision Fund
                            (CPF).
                        </Text>
                    </View>

                    <TouchableOpacity>
                        <Ionicons
                            name="chevron-forward"
                            size={30}
                            color={themeColors.buttons}
                            onPress={() => handleNavigateToQuiz(7)}
                        />
                    </TouchableOpacity>
                </View>

                {/* TAX */}
                <View style={styles.quizbox}>
                    <View style={{ width: "90%" }}>
                        <Text style={styles.rowheader}>Tax</Text>
                        <Text style={styles.rowcontent} numberOfLines={2}>
                            Learn about tax in Singapore!
                        </Text>
                    </View>

                    <TouchableOpacity>
                        <Ionicons
                            name="chevron-forward"
                            size={30}
                            color={themeColors.buttons}
                            onPress={() => handleNavigateToQuiz(10)}
                        />
                    </TouchableOpacity>
                </View>

                {/* BANKING */}
                <View style={styles.quizbox}>
                    <View style={{ width: "90%" }}>
                        <Text style={styles.rowheader}>Banking</Text>
                        <Text style={styles.rowcontent} numberOfLines={2}>
                            Do you know what these banking terms mean?
                        </Text>
                    </View>

                    <TouchableOpacity>
                        <Ionicons
                            name="chevron-forward"
                            size={30}
                            color={themeColors.buttons}
                            onPress={() => handleNavigateToQuiz(8)}
                        />
                    </TouchableOpacity>
                </View>

                {/* INSURANCE */}
                <View style={styles.quizbox}>
                    <View style={{ width: "90%" }}>
                        <Text style={styles.rowheader}>Insurance</Text>
                        <Text style={styles.rowcontent} numberOfLines={2}>
                        Have you bought your insurance yet?
                        </Text>
                    </View>

                    <TouchableOpacity>
                        <Ionicons
                            name="chevron-forward"
                            size={30}
                            color={themeColors.buttons}
                            onPress={() => handleNavigateToQuiz(12)}
                        />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
}

const createStyles = (themeColors, fontSizes) =>
    StyleSheet.create({
        background: {
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: themeColors.background,
            padding: 20,
        },
        centered: {
            alignItems: "center",
            justifyContent: "center",
        },
        inner: {
            paddingTop: 60,
            width: "100%",
            padding: 30,
            flex: 1,
        },
        quizbox: {
            padding: 20,
            backgroundColor: themeColors.row,
            borderColor: "#ccc",
            borderRadius: 20,
            shadowColor: "#171717",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 20,
            marginBottom: 10,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
        },
        rowheader: {
            color: themeColors.headertext,
            fontSize: fontSizes.eighteen,
            marginBottom: 5,
        },
        rowcontent: {
            color: themeColors.headertext,
            fontSize: fontSizes.fourteen,
        },
        headertext: {
            fontSize: fontSizes.twenty,
            fontWeight: "bold",
            position: "absolute",
            top: 70,
            left: 30,
            color: themeColors.headertext,
        },
        modalContent: {
            width: fontSizes.twohundred,
            height: fontSizes.twohundred,
            borderRadius: 10,
            backgroundColor: "#F4D5E1",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 20,
            marginLeft: "auto",
            marginRight: "auto",
        },
        btntext: {
            color: "white",
            fontSize: fontSizes.sixteen,
        },
        modalHeader: {
            fontSize: fontSizes.twenty,
        },
        modaltext: {
            fontSize: fontSizes.fifteen,
            padding: 10,
        },
        playbtn: {
            width: 80,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#df4b75",
            borderRadius: 5,
            marginTop: "auto",
        },
        buttonContainer: {
            position: "absolute",
        },
    });
