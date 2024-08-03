import React, { useState, useEffect, useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View, ScrollView } from "react-native";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import { Context } from "../components/GlobalContext";

export default function CommunityScreen(props) {
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

    const [leaderboard, setLeaderboard] = useState([]);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            const json = await fetchData(`user/leaderboard/`);
            setLeaderboard(json);
        } catch (error) {}
    };

    if (isLoading) {
        return (
            <SafeAreaView style={[styles.background, styles.centered]}>
                <ActivityIndicator
                    size="large"
                    color={themeColors.headertext}
                />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView style={[styles.background, styles.centered]}>
                <Text>{error}</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.headertext}>Community</Text>
            <ScrollView style={styles.inner}>
                {leaderboard.map((user, index) => (
                    <View style={styles.row} key={index}>
                        <Text style={styles.rank}>{user.rank}</Text>
                        <View style={styles.pfp}></View>
                        <View style={{ flex: 1 }}>
                            <Text style={styles.username}>{user.username}</Text>
                        </View>
                        <Text style={styles.bacoin}>{user.bacoin}</Text>
                    </View>
                ))}
            </ScrollView>
        </SafeAreaView>
    );
}

const createStyles = (themeColors, fontSizes) =>
    StyleSheet.create({
        background: {
            flex: 1,
            padding: 20,
            backgroundColor: themeColors.background,
            justifyContent: "flex-start",
            alignItems: "center",
        },
        headertext: {
            fontSize: fontSizes.twenty,
            fontWeight: "bold",
            position: "absolute",
            top: 70,
            left: 30,
            color: themeColors.headertext,
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
        row: {
            width: "100%",
            borderRadius: 20,
            backgroundColor: themeColors.row,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            padding: 20,
            height: 80,
            marginBottom: 20,
        },
        rank: {
            fontSize: fontSizes.twenty,
        },
        pfp: {
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: "#ccc",
            shadowColor: "#171717",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            marginHorizontal: 15,
        },
        username: {
            fontSize: fontSizes.twenty,
        },
        bacoin: {
            fontSize: fontSizes.twenty,
            marginLeft: 15,
        },
    });
