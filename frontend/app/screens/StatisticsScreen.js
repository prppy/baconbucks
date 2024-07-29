import React, { useState, useEffect, useContext, useCallback } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    ActivityIndicator,
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

    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);

    useFocusEffect(
        useCallback(() => {
            fetchStatisticsData();
        }, [timeFilter, walletFilter])
    );

    const fetchStatisticsData = async () => {
        setIsLoading(true);
        try {
            const json = await fetchData(
                `user/get-statistics/?time=${timeFilter}&wallet=${walletFilter}`
            );
            setNetWorth(json.net_worth);
            setNetWorthHistory(json.net_worth_history);
            setPiggyBankData(json.piggy_bank);
            setWalletOptions(json.wallet_options);

            console.log("Net Worth History:", netWorthHistory);
            console.log("Piggy Bank Data:", piggyBankData);
        } catch (error) {
            console.error("Error fetching statistics data:", error);
            setError(error.message || "Failed to fetch trans data");
        } finally {
            setIsLoading(false);
        }
    };

    const { net_worth, net_worth_history, piggy_bank, wallet_options } =
        piggyBankData;

    const chartData = piggy_bank.map((item) => ({
        name: item.name,
        amount: item.amount,
        color: item.color,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
    }));

    const handleNetWorthClick = () => {
        setShowNetWorthGraph(!showNetWorthGraph);
    };

    const handleTimeFilterChange = (filter) => {
        setTimeFilter(filter);
    };

    const handleWalletFilterChange = (filter) => {
        setWalletFilter(filter);
    };

    const categories = [
        { id: "SL", name: "Salary", icon: "cash-outline" },
        { id: "GR", name: "Groceries", icon: "cart-outline" },
        { id: "TR", name: "Transport", icon: "train-outline" },
        { id: "RE", name: "Rent", icon: "home-outline" },
        { id: "FD", name: "Food", icon: "fast-food-outline" },
        { id: "EN", name: "Entertainment", icon: "tv-outline" },
        { id: "TU", name: "TopUp", icon: "refresh-outline" },
    ];

    const getCategory = (id) =>
        categories.find((category) => category.id === id);

    const formattedData = piggyBankData.map((item) => {
        const category = getCategory(item.category);
        return {
            name: category ? category.name : item.category,
            amount: item.amount,
            color: category ? category.color : "#ccc", // Use valid color or placeholder if no category found
        };
    });

    if (isLoading) {
        return (
            <SafeAreaView
                style={[
                    styles.background,
                    { justifyContent: "center", alignContent: "center" },
                ]}
            >
                <ActivityIndicator
                    size="large"
                    color={themeColors.headertext}
                />
            </SafeAreaView>
        );
    }

    if (error) {
        return (
            <SafeAreaView
                style={[
                    styles.background,
                    { justifyContent: "center", alignContent: "center" },
                ]}
            >
                <Text>{error}</Text>
            </SafeAreaView>
        );
    }

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
                                    width="100%"
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
                        <Text style={styles.netWorthText}>Piggy Bank</Text>
                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={true}
                            contentContainerStyle={
                                styles.walletOptionsContainer
                            }
                        >
                            <TouchableOpacity
                                onPress={() => handleWalletFilterChange("all")}
                                style={[
                                    styles.walletButton,
                                    walletFilter === "all" &&
                                        styles.selectedWalletButton,
                                ]}
                            >
                                <Text style={styles.label}>All Wallets</Text>
                            </TouchableOpacity>

                            {walletOptions.map((wallet) => (
                                <TouchableOpacity
                                    key={wallet.id}
                                    onPress={() =>
                                        handleWalletFilterChange(wallet.id)
                                    }
                                    style={[
                                        styles.walletButton,
                                        walletFilter === wallet.id &&
                                            styles.selectedWalletButton,
                                    ]}
                                >
                                    <Text style={styles.label}>
                                        {wallet.name}
                                    </Text>
                                </TouchableOpacity>
                            ))}
                        </ScrollView>

                        <PieChart
                            data={chartData}
                            width={screenWidth}
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
            alignSelf: "center",
        },
        activeFilter: {
            color: themeColors.primary,
            fontSize: fontSizes.medium,
            marginHorizontal: 5,
        },
        netWorthContainer: {
            width: "100%",
            marginBottom: 20,
        },
        netWorthText: {
            fontSize: 18,
            fontWeight: "bold",
            color: themeColors.buttons,
            alignSelf: "center",
            marginBottom: 20,
        },
        netWorthAmount: {
            fontSize: fontSizes.large,
            color: themeColors.primary,
            textAlign: "center",
            marginVertical: 10,
        },
        piggyBankContainer: {
            width: "100%",
            alignItems: "center",
        },
        walletOptionsContainer: {
            flexDirection: "row",
            marginBottom: 20,
            justifyContent: "space-between",
            alignContent: "center",
        },
        walletButton: {
            alignItems: "center",
            alignContent: "center",
            padding: 12,
            borderWidth: 2,
            borderColor: themeColors.buttons,
            borderRadius: 40,
            marginRight: 10,
        },
        selectedWalletButton: {
            backgroundColor: themeColors.buttons,
        },
    });

export default StatisticsDashboardScreen;
