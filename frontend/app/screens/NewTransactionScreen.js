import React, { useState, useContext } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    StyleSheet,
    TouchableWithoutFeedback,
    SafeAreaView,
    Keyboard,
    Alert,
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Context } from "../components/GlobalContext";
import colors from "../config/colors";

const NewTransactionScreen = () => {
    const globalContext = useContext(Context);
    const {
        fetchData,
        isLightTheme,
        isLargeFont,
        defaultFontSizes,
        getLargerFontSizes,
    } = globalContext;

    const navigation = useNavigation();
    const route = useRoute();
    const { walletId, walletName } = route.params;

    const themeColors = isLightTheme ? colors.light : colors.dark;
    const fontSizes = isLargeFont ? getLargerFontSizes() : defaultFontSizes;
    const styles = createStyles(themeColors, fontSizes);

    const [amount, setAmount] = useState("");
    const [type, setType] = useState("Expense");
    const [category, setCategory] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [date, setDate] = useState(new Date());
    const [description, setDescription] = useState("");
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const categories = [
        { id: "SL", name: "Salary", icon: "cash-outline" },
        { id: "GR", name: "Groceries", icon: "cart-outline" },
        { id: "TR", name: "Transport", icon: "train-outline" },
        { id: "RE", name: "Rent", icon: "home-outline" },
        { id: "FD", name: "Food", icon: "fast-food-outline" },
        { id: "EN", name: "Entertainment", icon: "tv-outline" },
        { id: "TU", name: "TopUp", icon: "refresh-outline" },
    ];

    const handleDateConfirm = (selectedDate) => {
        setDate(selectedDate);
        setDatePickerVisibility(false);
    };

    const formatDateForDjango = (isoDateString) => {
        const date = new Date(isoDateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const handleAmountChange = (input) => {
        // remove any non-digit characters
        const sanitizedInput = input.replace(/\D/g, "");
        // if input is empty, set amount to ""
        if (sanitizedInput === "") {
            setAmount("");
            return;
        }
        // Format input to be in the format 0.00
        const formattedAmount = (parseFloat(sanitizedInput) / 100).toFixed(2);
        setAmount(formattedAmount);
    };

    const handleNewTransaction = async () => {
        if (!amount || !category || !date || !type) {
            Alert.alert(
                "Validation Error",
                "Please fill in all required fields."
            );
            return;
        }

        try {
            const formattedDate = formatDateForDjango(date.toISOString());
            const body = {
                date: formattedDate,
                amount: parseFloat(amount),
                type: type === "Expense" ? "EX" : "EA",
                category: category,
                wallet: walletId,
                description: description,
            };

            console.log(JSON.stringify(body));

            const responseJSON = await fetchData(
                "log/create-trans/",
                "POST",
                body
            );

            navigation.navigate("FinanceTracker");
        } catch (error) {
            Alert.alert(
                "Transaction Error",
                error.message || "An unexpected error occurred."
            );
        }
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <TouchableWithoutFeedback onPress={dismissKeyboard}>
            <SafeAreaView style={styles.background}>
                <Text style={styles.headertext}>
                    New Transaction for {walletName}
                </Text>
                <View style={styles.inner}>
                    <View style={styles.typeSelector}>
                        <TouchableOpacity
                            onPress={() => setType("Expense")}
                            style={[
                                styles.typeButton,
                                type === "Expense" && styles.selectedTypeButton,
                            ]}
                        >
                            <Text style={styles.typeText}>EXPENSE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => setType("Income")}
                            style={[
                                styles.typeButton,
                                type === "Income" && styles.selectedTypeButton,
                            ]}
                        >
                            <Text style={styles.typeText}>INCOME</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.amountBox}>
                        <TextInput
                            style={styles.amountInput}
                            placeholder="0.00"
                            keyboardType="numeric"
                            value={amount}
                            onChangeText={handleAmountChange}
                            placeholderTextColor={themeColors.headertext}
                            
                        />
                    </View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Text style={styles.label}>Category</Text>

                        <TouchableOpacity
                            onPress={() => setCategoryModalVisible(true)}
                        >
                            <Text style={styles.label}>
                                {categoryName || "Select Category"}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.line}></View>

                    <View
                        style={{
                            flexDirection: "row",
                            justifyContent: "space-between",
                            alignItems: "center",
                        }}
                    >
                        <Text style={styles.label}>Date</Text>

                        <TouchableOpacity
                            onPress={() => setDatePickerVisibility(true)}
                        >
                            <Text style={styles.label}>
                                {date.toLocaleDateString()}
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.line}></View>

                    <View
                        style={{
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: 10
                        }}
                    >
                        <TextInput
                            value={description}
                            onChangeText={setDescription}
                            placeholder="Notes"
                            placeholderTextColor={themeColors.buttons}
                            autoCapitalize="none"
                            multiline={true}
                            style={[
                                {
                                    width: "100%",
                                    height: 200,
                                    color: themeColors.buttons,
                                    justifyContent: "flex-start",
                                    backgroundColor: themeColors.row,
                                    padding: 10,
                                    borderRadius: 10,
                                },
                                styles.label,
                            ]}
                        />
                    </View>

                    <TouchableOpacity
                        style={styles.saveButton}
                        onPress={handleNewTransaction}
                    >
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>

                    {/* Modals */}
                    <Modal
                        visible={categoryModalVisible}
                        transparent={true}
                        animationType="slide"
                    >
                        <View style={styles.modalContainer}>
                            <View style={styles.grid}>
                                {categories.map((cat, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={styles.gridItem}
                                        onPress={() => {
                                            setCategory(cat.id);
                                            setCategoryName(cat.name);
                                            setCategoryModalVisible(false);
                                        }}
                                    >
                                        <Ionicons
                                            name={cat.icon}
                                            size={35}
                                            color={themeColors.buttons}
                                        />
                                        <Text style={styles.modalItem}>
                                            {cat.name}
                                        </Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        </View>
                    </Modal>

                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleDateConfirm}
                        onCancel={() => setDatePickerVisibility(false)}
                    />
                </View>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const createStyles = (themeColors, fontSizes) => StyleSheet.create({
        background: {
            flex: 1,
            justifyContent: "flex-start",
            backgroundColor: themeColors.background,
            padding: 0,
            flexDirection: "column",
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
        typeSelector: {
            flexDirection: "row",
            marginBottom: 20,
            justifyContent: "space-evenly",
            alignContent: "center",
            width: "100%",
        },
        typeButton: {
            width: "30%",
            alignItems: "center",
            padding: 12,
            borderWidth: 2,
            borderColor: themeColors.buttons,
            borderRadius: 40,
        },
        selectedTypeButton: {
            backgroundColor: themeColors.buttons,
        },
        typeText: {
            fontSize: 16,
            color: themeColors.revbuttons,
        },
        amountBox: {
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "row",
            alignSelf: "center",
        },
        amountInput: {
            fontSize: fontSizes.thirty,
            fontWeight: "bold",
            marginBottom: 16,
            textAlign: "center",
            borderBottomWidth: 1,
            borderColor: themeColors.buttons,
            color: themeColors.headertext,
            paddingHorizontal: 20,
        },
        label: {
            fontSize: fontSizes.eighteen,
            marginVertical: 8,
            color: themeColors.headertext,
        },
        input: {
            borderWidth: 1,
            borderColor: "#ccc",
            marginBottom: 16,
        },
        modalContainer: {
            flex: 1,
            justifyContent: "center",
            alignContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            paddingHorizontal: 15,
        },
        grid: {
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "space-between",
            alignItems: "center",
            width: "90%",
            alignSelf: "center",
        },
        gridItem: {
            width: "30%",
            aspectRatio: 1,
            alignItems: "center",
            marginBottom: 20,
            backgroundColor: themeColors.row,
            justifyContent: "center",
            alignContent: "center",
            borderRadius: 10,
        },
        repItem: {
            alignItems: "center",
            marginBottom: 20,
            backgroundColor: themeColors.row,
            justifyContent: "center",
            alignContent: "center",
            borderRadius: 10,
            width: "70%",
        },
        modalItem: {
            marginTop: 8,
            fontSize: fontSizes.fifteen,
        },

        saveButton: {
            alignItems: "center",
            padding: 12,
            backgroundColor: themeColors.buttons,
            borderRadius: 4,
            width: "50%",
            alignSelf: "center",
        },
        saveButtonText: {
            color: "#fff",
            fontSize: fontSizes.sixteen,
        },
        line: {
            borderBottomColor: themeColors.buttons,
            borderBottomWidth: 1,
            marginVertical: 10,
        },
    });

export default NewTransactionScreen;
