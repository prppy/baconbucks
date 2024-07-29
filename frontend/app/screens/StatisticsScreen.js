import React, { useState, useEffect, useContext, useCallback } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from "react-native";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { PieChart, LineChart } from "react-native-chart-kit";
import { Context } from "../components/GlobalContext";
import colors from "../config/colors";

const screenWidth = Dimensions.get("window").width;

const StatisticsDashboardScreen = () => {
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

    const [timeFilter, setTimeFilter] = useState("month");
    const [netWorth, setNetWorth] = useState(0);
    const [netWorthHistory, setNetWorthHistory] = useState([]);
    const [showNetWorthGraph, setShowNetWorthGraph] = useState(false);
    const [piggyBankData, setPiggyBankData] = useState([]);
    const [walletFilter, setWalletFilter] = useState("all");
    const [walletOptions, setWalletOptions] = useState([]);

    useFocusEffect(
        useCallback(() => {
            fetchStatisticsData();
        }, [timeFilter, walletFilter])
    );

    const fetchStatisticsData = async () => {
        try {
            const json = await fetchData(
                `user/get-statistics/?time=${timeFilter}&wallet=${walletFilter}`
            );
            setNetWorth(json.net_worth);
            setNetWorthHistory(json.net_worth_history);
            setPiggyBankData(json.piggy_bank);
            setWalletOptions(json.wallet_options);
        } catch (error) {
            console.error("Error fetching statistics data:", error);
        }
    };

    const handleNetWorthClick = () => {
        setShowNetWorthGraph(!showNetWorthGraph);
    };

    const handleTimeFilterChange = (filter) => {
        setTimeFilter(filter);
    };

    const handleWalletFilterChange = (filter) => {
        setWalletFilter(filter);
    };

    return (
        <SafeAreaView style={[styles.background, styles.centered]}>
            <Text style={styles.headertext}>Statistics Dashboard</Text>
            <View style={styles.inner}>
                <ScrollView contentContainerStyle={styles.scrollViewContent}>
                    <View style={styles.filterContainer}>
                        <TouchableOpacity
                            onPress={() => handleTimeFilterChange("week")}
                            style={[
                                styles.typeButton,
                                timeFilter === "week" &&
                                    styles.selectedTypeButton,
                            ]}
                        >
                            <Text style={styles.label}>Week</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleTimeFilterChange("month")}
                            style={[
                                styles.typeButton,
                                timeFilter === "month" &&
                                    styles.selectedTypeButton,
                            ]}
                        >
                            <Text style={styles.label}>Month</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleTimeFilterChange("year")}
                            style={[
                                styles.typeButton,
                                timeFilter === "year" &&
                                    styles.selectedTypeButton,
                            ]}
                        >
                            <Text style={styles.label}>Year</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => handleTimeFilterChange("all")}
                            style={[
                                styles.typeButton,
                                timeFilter === "all" &&
                                    styles.selectedTypeButton,
                            ]}
                        >
                            <Text style={styles.label}>All</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.netWorthContainer}>
                        <Text style={styles.netWorthText}>Net Worth</Text>
                        <TouchableOpacity onPress={handleNetWorthClick}>
                            {showNetWorthGraph ? (
                                <LineChart
                                    data={{
                                        labels: netWorthHistory.map(
                                            (item) => item.label
                                        ),
                                        datasets: [
                                            {
                                                data: netWorthHistory.map(
                                                    (item) => item.value
                                                ),
                                            },
                                        ],
                                    }}
                                    width={screenWidth - 40}
                                    height={220}
                                    chartConfig={chartConfig}
                                />
                            ) : (
                                <Text style={styles.netWorthAmount}>
                                    {netWorth}
                                </Text>
                            )}
                        </TouchableOpacity>
                    </View>

                    <View style={styles.piggyBankContainer}>
                        <Text style={styles.piggyBankHeader}>Piggy Bank</Text>
                        <View style={styles.filterContainer}>
                            <TouchableOpacity
                                onPress={() => handleWalletFilterChange("all")}
                            >
                                <Text
                                    style={
                                        walletFilter === "all"
                                            ? styles.activeFilter
                                            : styles.filter
                                    }
                                >
                                    All Wallets
                                </Text>
                            </TouchableOpacity>
                            {walletOptions.map((wallet) => (
                                <TouchableOpacity
                                    key={wallet.id}
                                    onPress={() =>
                                        handleWalletFilterChange(wallet.id)
                                    }
                                >
                                    <Text
                                        style={
                                            walletFilter === wallet.id
                                                ? styles.activeFilter
                                                : styles.filter
                                        }
                                    >
                                        {wallet.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                        <PieChart
                            data={piggyBankData}
                            width={screenWidth - 40}
                            height={220}
                            chartConfig={chartConfig}
                            accessor="amount"
                            backgroundColor="transparent"
                            paddingLeft="15"
                            absolute
                        />
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const chartConfig = {
    backgroundGradientFrom: "#1E2923",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#08130D",
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
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
        centered: {
            alignItems: "center",
            justifyContent: "center",
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
        scrollViewContent: {
            alignItems: "center",
            paddingBottom: 50,
        },
        filterContainer: {
            flexDirection: "row",
            marginBottom: 20,
            justifyContent: "space-between",
            alignContent: "center",
            width: "100%",
        },
        typeButton: {
            width: "22.5%",
            alignItems: "center",
            padding: 12,
            borderWidth: 2,
            borderColor: themeColors.buttons,
            borderRadius: 40,
        },
        selectedTypeButton: {
            backgroundColor: themeColors.buttons,
        },
        label: {
            fontSize: 15,
            color: themeColors.headertext,
        },
        filter: {
            color: themeColors.secondary,
            fontSize: fontSizes.medium,
            marginHorizontal: 5,
        },
        activeFilter: {
            color: themeColors.primary,
            fontSize: fontSizes.medium,
            marginHorizontal: 5,
        },
        netWorthContainer: {
            alignItems: "center",
        },
        netWorthText: {
            fontWeight: "bold",
            fontSize: 15,
            color: themeColors.buttons,
            marginBottom: 10,
        },
        netWorthAmount: {
            color: themeColors.primary,
            fontSize: fontSizes.large,
            marginVertical: 10,
        },
        piggyBankContainer: {
            marginVertical: 20,
            alignItems: "center",
        },
        piggyBankHeader: {
            color: themeColors.primary,
            fontSize: fontSizes.medium,
        },
    });

export default StatisticsDashboardScreen;
