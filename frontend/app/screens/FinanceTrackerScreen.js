import React, { useState, useContext, useCallback } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    ActivityIndicator,
    TextInput,
    Alert,
} from "react-native";
import Modal from "react-native-modal";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Context } from "../components/GlobalContext";
import colors from "../config/colors";

const FinanceTrackerScreen = () => {
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

    const [walletName, setWalletName] = useState("");
    const [walletData, setWalletData] = useState([]);
    const [totalIncome, setTotalIncome] = useState(0);
    const [totalExpense, setTotalExpense] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();
    const [isVisible, setIsVisible] = useState(false);
    const [visibleWalletId, setVisibleWalletId] = useState(null); // New state for visibility

    const toggleModal = () => {
        setIsVisible(!isVisible);
    };

    useFocusEffect(
        useCallback(() => {
            fetchWalletData();
        }, [])
    );

    const categories = [
        { id: "SL", icon: "cash-outline" },
        { id: "GR", icon: "cart-outline" },
        { id: "TR", icon: "train-outline" },
        { id: "RE", icon: "home-outline" },
        { id: "FD", icon: "fast-food-outline" },
        { id: "EN", icon: "tv-outline" },
        { id: "TU", icon: "refresh-outline" },
    ];

    const getCategoryIcon = (categoryId) => {
        const category = categories.find((cat) => cat.id === categoryId);
        return category ? category.icon : "help-outline";
    };

    const fetchWalletData = async () => {
        setIsLoading(true);
        try {
            const json = await fetchData("user/get-wallet/");
            setWalletData(json.wallets);
            setTotalIncome(json.total_income);
            setTotalExpense(json.total_expense);
            setTotalBalance(json.total_balance);
        } catch (error) {
            setError(error.message || "Failed to fetch wallet data");
        } finally {
            setIsLoading(false);
        }
    };

    const flattenedData = walletData.flatMap((wallet) => [
        {
            type: "wallet",
            id: wallet.id,
            name: wallet.name,
            transactions: wallet.transactions,
        },
        ...(visibleWalletId === wallet.id
            ? wallet.transactions.map((trans) => ({
                  type: "transaction",
                  walletId: wallet.id,
                  id: trans.id,
                  date: trans.date,
                  amount: trans.amount,
                  category: trans.category,
                  transType: trans.type,
              }))
            : []),
    ]);

    const renderItem = ({ item }) => {
        if (item.type === "wallet") {
            return (
                <View>
                    <View style={styles.walletBox}>
                        <TouchableOpacity
                            onPress={() => handleNavigateToWallet(item)}
                            style={{
                                width: "75%",
                                flexDirection: "row",
                                alignItems: "center",
                            }}
                        >
                            <Ionicons
                                name="wallet-outline"
                                size={25}
                                color={themeColors.buttons}
                            />
                            <Text style={{ marginLeft: 15, color: themeColors.headertext, fontSize: fontSizes.sixteen }}>{item.name}</Text>
                        </TouchableOpacity>
                        <View
                            style={{
                                flexDirection: "row",
                                width: "25%",
                                justifyContent: "space-evenly",
                            }}
                        >
                            <TouchableOpacity
                                onPress={() =>
                                    handleNavigateToNewTransaction(
                                        item.id,
                                        item.name
                                    )
                                }
                            >
                                <Ionicons
                                    name="add-circle-outline"
                                    size={25}
                                    color={themeColors.buttons}
                                />
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => handleViewRecent(item.id)}
                            >
                                <Ionicons
                                    name="folder-open-outline"
                                    size={25}
                                    color={themeColors.buttons}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        } else if (item.type === "transaction") {
            const amountColor =
                item.transType === "EX"
                    ? "red"
                    : item.transType === "EA"
                    ? "green"
                    : themeColors.text;
            return (
                <TouchableOpacity onPress={() => handleNavigateToTransaction(item)}>
                    <View style={styles.transBox}>
                        <Ionicons
                            name={getCategoryIcon(item.category)}
                            size={24}
                            color={themeColors.buttons}
                        />
                        <Text style={styles.transaction}>{item.date}</Text>
                        <Text
                            style={[styles.transaction, { color: amountColor }]}
                        >
                            {item.amount}
                        </Text>
                    </View>
                </TouchableOpacity>
            );
        }
        return null;
    };

    const handleViewRecent = (walletId) => {
        setVisibleWalletId(visibleWalletId === walletId ? null : walletId);
    };

    const handleNewWallet = async () => {
        console.log(walletName);

        if (walletName === "") {
            Alert.alert("Error", "Please input a name.");
            return;
        }

        try {
            const body = { name: walletName };
            console.log(JSON.stringify(body));

            const json = await fetchData("user/create-wallet/", "POST", body);
            console.log(json);
            setIsVisible(false);
            setWalletName("");
            fetchWalletData();
        } catch (error) {
            console.error("Error during create-wallet:", error);
            Alert.alert("Error", "Failed to create wallet. Please try again.");
        }
    };

    const handleNavigateToWallet = (item) => {
        console.log(item);
        navigation.navigate("ViewWallet", { wallet: item });
    };

    const handleNavigateToTransaction = (item) => {
        console.log(item);
        navigation.navigate("ViewTransaction", { transaction: item });
    };

    const handleNavigateToNewTransaction = (walletId, walletName) => {
        navigation.navigate("NewTransaction", { walletId, walletName });
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
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

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <SafeAreaView style={[styles.background, styles.centered]}>
                <Text style={styles.headertext}>Finance Tracker</Text>

                <View style={styles.inner}>
                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            marginBottom: 20,
                        }}
                    >
                        <View style={styles.centered}>
                            <Text style={{ fontWeight: "bold", fontSize: fontSizes.eighteen, color: themeColors.headertext }}>
                                BALANCE
                            </Text>
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    fontSize: fontSizes.eighteen,
                                    marginTop: 10,
                                    color: themeColors.headertext,
                                }}
                            >
                                {totalBalance}
                            </Text>
                        </View>
                        <View style={styles.verticalline}></View>
                        <View style={styles.centered}>
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    color: "green",
                                    fontSize: fontSizes.eighteen,
                                }}
                            >
                                INCOME
                            </Text>
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    color: "green",
                                    fontSize: fontSizes.eighteen,
                                    marginTop: 10,
                                }}
                            >
                                {totalIncome}
                            </Text>
                        </View>
                        <View style={styles.verticalline}></View>
                        <View style={styles.centered}>
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    color: "red",
                                    fontSize: fontSizes.eighteen,
                                }}
                            >
                                EXPENSE
                            </Text>
                            <Text
                                style={{
                                    fontWeight: "bold",
                                    color: "red",
                                    fontSize: fontSizes.eighteen,
                                    marginTop: 10,
                                }}
                            >
                                {totalExpense}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            flex: 1,
                            borderColor: themeColors.buttons,
                            borderRadius: 10,
                        }}
                    >
                        <FlatList
                            data={flattenedData}
                            keyExtractor={(item) => `${item.type}-${item.id}`}
                            renderItem={renderItem}
                        />
                    </View>
                    <View
                        style={{
                            height: 40,
                            justifyContent: "center",
                            marginTop: 20,
                        }}
                    >
                        <Text
                            style={{
                                fontWeight: "bold",
                                fontSize: fontSizes.thirteen,
                                color: themeColors.buttons,
                                width: '80%',
                                lineHeight: 20,
                            }}
                            numberOfLines={2}
                        >
                            Add a Wallet and Transactions to begin!
                        </Text>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.addwallet}
                    onPress={toggleModal}
                >
                    <Ionicons
                        name="add-circle"
                        size={35}
                        color={themeColors.buttons}
                    />
                </TouchableOpacity>
                <Modal
                    isVisible={isVisible}
                    onBackdropPress={toggleModal}
                    backdropColor={themeColors.backdrop}
                    backdropOpacity={0.3}
                >
                    <View style={styles.modalContent}>
                        <Text style={styles.modalHeader}>New Wallet</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Type here"
                            value={walletName}
                            onChangeText={setWalletName}
                            autoCapitalize="none"
                            maxLength={32}
                        />
                        <TouchableOpacity
                            style={styles.savebtn}
                            onPress={handleNewWallet}
                        >
                            <Text style={styles.btntext}>Save</Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </SafeAreaView>
        </TouchableWithoutFeedback>
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
            fontSize: fontSizes.twenty,
            fontWeight: "bold",
            position: "absolute",
            top: 70,
            left: 30,
            color: themeColors.headertext,
            paddingBottom: 20,
        },

        walletBox: {
            height: 70,
            backgroundColor: themeColors.row,
            borderRadius: 10,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
            padding: 20,
        },

        walletText: {
            fontSize: fontSizes.twenty,
            color: themeColors.headertext,
        },
        transBox: {
            width: "90%",
            height: 65,
            backgroundColor: themeColors.row,
            padding: 20,
            borderRadius: 10,
            marginBottom: 10,
            alignItems: "center",
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
        },
        modalContent: {
            width: 300,
            height: 170,
            borderRadius: 10,
            backgroundColor: "#F4D5E1",
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            padding: 20,
            marginLeft: "auto",
            marginRight: "auto",
        },
        modalHeader: {
            fontSize: fontSizes.eighteen,
            marginRight: "auto",
        },
        modaltext: {
            fontSize: fontSizes.fifteen,
            padding: 10,
        },
        addwallet: {
            position: "absolute",
            bottom: 30,
            right: 30,
        },
        input: {
            backgroundColor: "white",
            borderRadius: 5,
            height: 40,
            width: "100%",
            marginTop: 10,
            padding: 10,
        },
        savebtn: {
            width: 80,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#df4b75",
            borderRadius: 5,
            marginTop: 20,
        },
        btntext: {
            color: "white",
            fontSize: fontSizes.sixteen,
        },
        verticalline: {
            borderLeftWidth: 1,
            borderLeftColor: themeColors.buttons,
        },
        centered: {
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
        },
        inner: {
            paddingTop: 60,
            width: "100%",
            padding: 30,
            flex: 1,
        },
    });

export default FinanceTrackerScreen;
