import React, { useState, useEffect, useContext } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    Modal,
    Picker,
    ActivityIndicator,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import PieChart from "react-native-pie-chart";
import LineChart from 'react-native-chart-kit'; // Import the chart library
import DatePicker from 'react-native-datepicker'; // Import the date picker library

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
    const [dateRange, setDateRange] = useState("week");
    const [wallet, setWallet] = useState("all");
    const [netWorth, setNetWorth] = useState(0);
    const [categoryData, setCategoryData] = useState([]);
    const [netWorthTrend, setNetWorthTrend] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchStatistics();
    }, [type, dateRange, wallet]);

    const fetchStatistics = async () => {
        setIsLoading(true);
        try {
            const json = await fetchData("user/get-statistics/", "POST", { type, dateRange, wallet });
            setNetWorth(json.net_worth);
            setCategoryData(json.category_data);
            setNetWorthTrend(json.net_worth_trend);
        } catch (error) {
            console.error("Error fetching statistics:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const pieChartData = categoryData.map(cat => ({
        name: cat.category,
        amount: cat.amount,
        color: cat.color,
        legendFontColor: "#7F7F7F",
        legendFontSize: 15,
    }));

    const chartConfig = {
        backgroundGradientFrom: themeColors.background,
        backgroundGradientTo: themeColors.background,
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        style: {
            borderRadius: 16,
        },
    };

    if (isLoading) {
        return (
            <SafeAreaView style={styles.background}>
                <ActivityIndicator size="large" color={themeColors.headertext} />
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.headertext}>Statistics Dashboard</Text>
            <View style={styles.inner}>
                <View style={styles.filters}>
                    <Picker
                        selectedValue={type}
                        style={styles.picker}
                        onValueChange={(itemValue) => setType(itemValue)}
                    >
                        <Picker.Item label="Expense" value="Expense" />
                        <Picker.Item label="Income" value="Income" />
                    </Picker>
                    <Picker
                        selectedValue={dateRange}
                        style={styles.picker}
                        onValueChange={(itemValue) => setDateRange(itemValue)}
                    >
                        <Picker.Item label="Week" value="week" />
                        <Picker.Item label="Month" value="month" />
                        <Picker.Item label="Year" value="year" />
                        <Picker.Item label="All" value="all" />
                    </Picker>
                    <Picker
                        selectedValue={wallet}
                        style={styles.picker}
                        onValueChange={(itemValue) => setWallet(itemValue)}
                    >
                        <Picker.Item label="All Wallets" value="all" />
                        {/* Add wallet options here */}
                    </Picker>
                </View>
                <Text style={styles.netWorth}>Net Worth: {netWorth}</Text>
                {/* Display trend line graph for Net Worth */}
                <LineChart
                    data={{
                        labels: netWorthTrend.map(point => point.date),
                        datasets: [{
                            data: netWorthTrend.map(point => point.value),
                        }],
                    }}
                    width={Dimensions.get("window").width - 40}
                    height={220}
                    chartConfig={chartConfig}
                    bezier
                />
                {/* Display Pie Chart for Category Breakdown */}
                <PieChart
                    width={Dimensions.get("window").width - 40}
                    height={220}
                    chartConfig={chartConfig}
                    data={pieChartData}
                />
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
            color: themeColors.headertext,
            paddingBottom: 20,
        },
        inner: {
            paddingTop: 60,
            width: "100%",
            padding: 30,
            flex: 1,
        },
        filters: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
        },
        picker: {
            width: 100,
            height: 50,
        },
        netWorth: {
            fontSize: 20,
            fontWeight: "bold",
            marginBottom: 20,
        },
    });

export default StatisticsScreen;