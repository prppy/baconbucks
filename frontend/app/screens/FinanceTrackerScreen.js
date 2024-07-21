import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View, FlatList, TouchableOpacity, TouchableWithoutFeedback, Keyboard, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';

import { Context } from "../components/GlobalContext";
import colors from "../config/colors";

const FinanceTrackerScreen = () => {
    const navigation = useNavigation();

    const globalContext = useContext(Context);
    const { fetchData, isLightTheme } = globalContext;

    const themeColors = isLightTheme ? colors.light : colors.dark;

    const styles = createStyles(themeColors);

    const [walletData, setWalletData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState();

    useEffect(() => {
            fetchWalletData();
    }, []);

    const fetchWalletData = async () => {
        setIsLoading(true);
        try {
            const json = await fetchData("user/get-wallet/");
            setWalletData(json);
        } catch (error) {
            setError(error.message || "Failed to fetch wallet data");
        } finally {
            setIsLoading(false);
        }
    };

    const handleNavigateToWallet = (item) => {
        navigation.navigate('Wallet', { wallet: item });
    };

    const handleNavigateToNewTransaction = (walletId, walletName) => {
        navigation.navigate('NewTransaction', { walletId, walletName });
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    if (isLoading) {
        return (
            <SafeAreaView style={[styles.background, styles.centered]}>
                <ActivityIndicator size="large" color={themeColors.headertext} />
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
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <SafeAreaView style={[styles.background, styles.centered]}>
                <Text style={styles.headertext}>Home</Text>

                <View style={{ paddingTop: 60 }}>
                    <FlatList
                        data={walletData}
                        keyExtractor={item => item.id.toString()}
                        renderItem={({ item }) => (
                            <View>
                                <View style={styles.walletBox}>
                                    <TouchableOpacity onPress={() => handleNavigateToWallet(item)}>
                                        <Text style={styles.walletName}>{item.name}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => handleNavigateToNewTransaction(item.id, item.name)}>
                                        <Ionicons name="add-circle-outline" size={30} color={themeColors.buttons} />
                                    </TouchableOpacity> 
                                </View>
                                <FlatList
                                    data={item.transactions}
                                    keyExtractor={item => item.id.toString()}
                                    renderItem={({ item }) => (
                                        <View style={styles.transBox}>
                                            <Text style={styles.transaction}>{item.amount} {item.date}</Text>
                                        </View>
                                    )}
                                />
                            </View>
                        )}
                    />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const createStyles = (themeColors) => StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: themeColors.background,
        padding: 20,
        flexDirection: "column"
    },

    headertext: {
        fontSize: 20,
        fontWeight: 'bold',
        position: 'absolute',
        top: 70,
        left: 30,
        color: themeColors.headertext,
        paddingBottom: 20
    },

    walletBox: { 
        width: 300, 
        height: 70, 
        backgroundColor: "white", 
        padding: 20, 
        borderRadius: 10, 
        flexDirection: "row", 
        justifyContent: "space-between",
        alignItems: "center"
    }, 

    walletText: {
        fontSize: 20
    }, 
    transBox: { 
        width: 250, 
        height: 55, 
        backgroundColor: "grey", 
        padding: 20, 
        borderRadius: 10 
    }, 
});

export default FinanceTrackerScreen;