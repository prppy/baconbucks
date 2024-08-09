import React, { useState, useContext, useCallback } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from "react-native";
import colors from "../config/colors";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
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
        updateUserDetails,
    } = globalContext;
    const themeColors = isLightTheme ? colors.light : colors.dark;
    const fontSizes = isLargeFont ? getLargerFontSizes() : defaultFontSizes;
    const styles = createStyles(themeColors, fontSizes);

    const handleNavigateToQuiz = (quizID) => {
        navigation.navigate("QuizScreen", { QuizID: quizID });
    };

    useFocusEffect(
        useCallback(() => {
            updateUserDetails();
        }, [])
    );

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.headertext}>Missions</Text>
            <View style={styles.inner}>
                <View style={styles.quizbox}>
                    <View
                        style={[
                            styles.centered,
                            {
                                flexDirection: "row",
                                width: "50%",
                                justifyContent: "space-around",
                            },
                        ]}
                    >
                        <Ionicons
                            name="server-outline"
                            size={35}
                            color={themeColors.buttons}
                        ></Ionicons>
                        <View style={styles.centered}>
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontSize: fontSizes.eighteen,
                                    color: themeColors.buttons,
                                }}
                            >
                                Bacoin
                            </Text>
                            <Text
                                style={{
                                    fontSize: fontSizes.eighteen,
                                    marginTop: 10,
                                    color: themeColors.headertext,
                                }}
                            >
                                {userObj.bacoin}
                            </Text>
                        </View>
                    </View>
                    <View style={styles.verticalline}></View>
                    <View
                        style={[
                            styles.centered,
                            {
                                flexDirection: "row",
                                width: "50%",
                                justifyContent: "space-around",
                            },
                        ]}
                    >
                        <Ionicons
                            name="trophy-outline"
                            size={35}
                            color={themeColors.buttons}
                        ></Ionicons>
                        <View style={styles.centered}>
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontSize: fontSizes.eighteen,
                                    color: themeColors.buttons,
                                }}
                            >
                                Rank
                            </Text>
                            <Text
                                style={{
                                    fontSize: fontSizes.eighteen,
                                    marginTop: 10,
                                    color: themeColors.headertext,
                                }}
                            >
                                {userObj.rank}
                            </Text>
                        </View>
                    </View>
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

                    <TouchableOpacity style={{ alignSelf: "center" }}>
                        <Ionicons
                            name="chevron-forward"
                            size={30}
                            color={themeColors.buttons}
                            onPress={() => handleNavigateToQuiz(Math.floor(Math.random() * 2) + 6)}
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

                    <TouchableOpacity style={{ alignSelf: "center" }}>
                        <Ionicons
                            name="chevron-forward"
                            size={30}
                            color={themeColors.buttons}
                            onPress={() => handleNavigateToQuiz(Math.floor(Math.random() * 2) + 10)}
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

                    <TouchableOpacity style={{ alignSelf: "center" }}>
                        <Ionicons
                            name="chevron-forward"
                            size={30}
                            color={themeColors.buttons}
                            onPress={() => handleNavigateToQuiz(Math.floor(Math.random() * 2) + 8)}
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

                    <TouchableOpacity style={{ alignSelf: "center" }}>
                        <Ionicons
                            name="chevron-forward"
                            size={30}
                            color={themeColors.buttons}›
                            onPress={() => handleNavigateToQuiz(Math.floor(Math.random() * 2) + 12)}
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
            alignItems: "stretch",
            justifyContent: "center",
            alignContent: "center",
        },
        rowheader: {
            color: themeColors.headertext,
            fontSize: fontSizes.eighteen,
            marginBottom: 5,
            fontWeight: "bold",
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
        verticalline: {
            borderLeftWidth: 1,
            borderLeftColor: themeColors.buttons,
        },
    });
