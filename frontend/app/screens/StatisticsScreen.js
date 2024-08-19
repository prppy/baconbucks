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

    const [timeFilter, setTimeFilter] = useState("all");
    const [netWorth, setNetWorth] = useState(0);
    const [netWorthHistory, setNetWorthHistory] = useState([]);
    const [showNetWorthGraph, setShowNetWorthGraph] = useState(false);
    const [piggyBankDataEA, setPiggyBankDataEA] = useState([]);
    const [piggyBankDataEX, setPiggyBankDataEX] = useState([]);
    const [walletFilter, setWalletFilter] = useState("all");
    const [walletOptions, setWalletOptions] = useState([]);
    const [error, setError] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [chartWidth, setChartWidth] = useState(0);

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
            setPiggyBankDataEA(json.piggy_bank_earnings);
            setPiggyBankDataEX(json.piggy_bank_expenditures);
            setWalletOptions(json.wallet_options);
        } catch (error) {
            console.error("Error fetching statistics data:", error);
            setError(error.message || "Failed to fetch trans data");
        } finally {
            setIsLoading(false);
        }
    };

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

    const chartDataEA = (piggyBankDataEA || []).map((item) => ({
        name: item.name,
        amount: item.amount,
        color: item.color,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
    }));

    const chartDataEX = (piggyBankDataEX || []).map((item) => ({
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

    const chartConfig = {
        backgroundGradientFrom: "#ffffff", // or use transparent for no gradient
        backgroundGradientFromOpacity: 0, // ensures no opacity for background gradient
        backgroundGradientTo: "#ffffff", // or use transparent for no gradient
        backgroundGradientToOpacity: 0, // ensures no opacity for background gradient
        color: () => themeColors.buttons,
        strokeWidth: 2,
        barPercentage: 0.5,
        useShadowColorFromDataset: false, // optional, removes shadow
    };

    return (
        <SafeAreaView style={[styles.background, styles.centered]}>
            <Text style={styles.headertext}>Statistics Dashboard</Text>
            <View style={styles.inner}>
                <ScrollView
                    contentContainerStyle={styles.scrollViewContent}
                    showsVerticalScrollIndicator={true}
                >
                    <View
                        style={styles.filterContainer}
                        onLayout={(event) =>
                            setChartWidth(event.nativeEvent.layout.width)
                        }
                    >
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
                        <TouchableOpacity
                            onPress={() => handleTimeFilterChange("week")}
                            style={[
                                styles.typeButton,
                                timeFilter === "week" &&
                                    styles.selectedTypeButton,
                                { width: "22.5%" },
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
                    </View>

                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={true}
                        contentContainerStyle={styles.walletOptionsContainer}
                    >
                        <TouchableOpacity
                            onPress={() => handleWalletFilterChange("all")}
                            style={[
                                styles.walletButton,
                                walletFilter === "all" &&
                                    styles.selectedWalletButton,
                            ]}
                        >
                            <Text
                                style={[styles.label, { marginHorizontal: 15 }]}
                            >
                                All
                            </Text>
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
                                <Text style={styles.label}>{wallet.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    <View style={styles.line}></View>

                    <TouchableOpacity
                        onPress={handleNetWorthClick}
                        style={{ width: "100%" }}
                    >
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
                                width={chartWidth}
                                height={220}
                                chartConfig={chartConfig}
                            />
                        ) : (
                            <View
                                style={{
                                    width: "70%",
                                    height: 200,
                                    backgroundColor: themeColors.row,
                                    alignSelf: "center",
                                    alignItems: "center",
                                    justifyContent: "space-between",
                                    borderRadius: 10,
                                    shadowColor: "#171717",
                                    shadowOffset: { width: 0, height: 2 },
                                    shadowOpacity: 0.5,
                                    shadowRadius: 2,
                                    marginBottom: 20,
                                    padding: 20,
                                }}
                            >
                                <Text style={styles.netWorthText}>
                                    Net Worth
                                </Text>
                                <Text
                                    style={{
                                        fontSize: fontSizes.thirty,
                                        fontWeight: "bold",
                                    }}
                                >
                                    {netWorth}
                                </Text>
                                <Text>Click</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                    <View style={styles.line}></View>

                    <Text style={styles.netWorthText}>
                        Piggy Bank (Expenditure)
                    </Text>

                    <PieChart
                        data={chartDataEX}
                        width={chartWidth}
                        height={200}
                        chartConfig={chartConfig}
                        accessor="amount"
                        backgroundColor="transparent"
                        paddingLeft="0"
                    />
                    <View style={styles.line}></View>

<Text style={styles.netWorthText}>
    Piggy Bank (Income)
</Text>

<PieChart
    data={chartDataEA}
    width={chartWidth}
    height={200}
    chartConfig={chartConfig}
    accessor="amount"
    backgroundColor="transparent"
    paddingLeft="0"
/>
                </ScrollView>
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
        centered: {
            alignItems: "center",
            justifyContent: "center",
        },
        headertext: {
            fontSize: fontSizes.twenty,
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
            fontSize: fontSizes.thirteen,
            color: themeColors.headertext,
        },
        netWorthText: {
            fontSize: fontSizes.eighteen,
            fontWeight: "bold",
            color: themeColors.buttons,
            alignSelf: "center",
            marginBottom: 10,
        },
        netWorthAmount: {
            fontSize: fontSizes.eighteen,
            color: themeColors.primary,
            textAlign: "center",
            marginVertical: 10,
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
        line: {
            borderBottomColor: themeColors.buttons,
            borderBottomWidth: 1,
            marginVertical: 10,
            marginHorizontal: 20,
            width: "100%",
        },
    });

export default StatisticsDashboardScreen;
