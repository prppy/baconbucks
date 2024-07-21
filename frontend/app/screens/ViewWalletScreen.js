import React, { useState, useContext, useCallback } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    TouchableWithoutFeedback,
    TextInput,
    TouchableOpacity,
    Button,
    FlatList,
    Keyboard,
    Alert,
    ActivityIndicator,
} from "react-native";
import {
    useNavigation,
    useRoute,
    useFocusEffect,
} from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import colors from "../config/colors";
import { Context } from "../components/GlobalContext";

const ViewWalletScreen = (props) => {
    const globalContext = useContext(Context);
    const {
        fetchData,
        isLightTheme,
        isLargeFont,
        defaultFontSizes,
        getLargerFontSizes,
    } = globalContext;

    const route = useRoute();
    const navigation = useNavigation();
    const { wallet } = route.params;
    const { name, balance, id } = wallet;

    const themeColors = isLightTheme ? colors.light : colors.dark;
    const styles = createStyles(themeColors);

    const [isLoading, setIsLoading] = useState(true);
    const [transData, setTransData] = useState();
    const [error, setError] = useState();

    useFocusEffect(
        useCallback(() => {
            fetchTransData();
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

    const fetchTransData = async () => {
        setIsLoading(true);
        try {
            const json = await fetchData(`log/get-all-trans/${id}/`);
            setTransData(json);
        } catch (error) {
            setError(error.message || "Failed to fetch transaction data");
        } finally {
            setIsLoading(false);
        }
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
            <SafeAreaView style={styles.background}>
                <Text style={styles.headertext}>View {name}</Text>
                <View style={styles.inner}>
                    <View
                        style={{
                            width: "70%",
                            height: 100,
                            backgroundColor: themeColors.row,
                            alignSelf: "center",
                            alignItems: "center",
                            justifyContent: "center",
                            borderRadius: 10,
                            shadowColor: themeColors.settingsicons,
                            shadowOffset: { width: 5, height: 10 },
                            shadowOpacity: 0.5,
                            shadowRadius: 2,
                            marginBottom: 20,
                        }}
                    >
                        <Text>BALANCE</Text>
                        <Text style={{ fontSize: 30, fontWeight: "bold" }}>
                            xxx.xx
                        </Text>
                    </View>

                    <Text>Transaction History</Text>
                    <FlatList
                        data={transData}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={({ item }) => {
                            const amountColor =
                                item.type === "EX"
                                    ? "red"
                                    : item.type === "EA"
                                    ? "green"
                                    : themeColors.text;

                            return (
                                <View style={styles.transBox}>
                                    <Ionicons
                                        name={getCategoryIcon(item.category)}
                                        size={24}
                                        color={themeColors.buttons}
                                    />
                                    <Text style={styles.transaction}>
                                        {item.date}
                                    </Text>
                                    <Text
                                        style={[
                                            styles.transaction,
                                            { color: amountColor },
                                        ]}
                                    >
                                        {item.amount}
                                    </Text>
                                </View>
                            );
                        }}
                    />

                    <TouchableOpacity
                        style={[styles.addwallet, { bottom: 80 }]}
                    >
                        <Ionicons
                            name="pencil-outline"
                            size={40}
                            color={themeColors.buttons}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.addwallet}
                        onPress={() => handleNavigateToNewTransaction(id, name)}
                    >
                        <Ionicons
                            name="add-circle-outline"
                            size={40}
                            color={themeColors.buttons}
                        />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const createStyles = (themeColors) =>
    StyleSheet.create({
        background: {
            flex: 1,
            justifyContent: "flex-start",
            alignItems: "center",
            backgroundColor: themeColors.background,
            padding: 20,
        },
        inner: {
            paddingTop: 60,
            width: "100%",
            padding: 30,
            flex: 1,
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
        transBox: {
            width: "100%",
            height: 65,
            backgroundColor: themeColors.row,
            padding: 20,
            borderRadius: 10,
            marginVertical: 10,
            alignItems: "center",
            alignSelf: "center",
            flexDirection: "row",
            justifyContent: "space-between",
            alignContent: "center",
        },
        addwallet: {
            position: "absolute",
            bottom: 30,
            right: 30,
        },
    });

export default ViewWalletScreen;
