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

const ViewTransactionScreen = (props) => {
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
    const { transaction } = route.params;
    const { id } = transaction;

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

    const fetchTransData = async () => {
        setIsLoading(true);
        try {
            const json = await fetchData(`log/get-trans/${id}/`);
            console.log(json);
            setTransData(json);

        } catch (error) {
            setError(error.message || "Failed to fetch transaction data");
        } finally {
            setIsLoading(false);
        }
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
                <Text style={styles.headertext}>
                    View Transaction #{id} Details
                </Text>
                <View style={styles.inner}>
                    <Text>Account</Text>
                    <Text>{transData.wallet}</Text>
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

export default ViewTransactionScreen;
