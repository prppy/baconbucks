import React, { useState, useContext } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Modal,
    ScrollView,
    StyleSheet,
    TouchableWithoutFeedback,
    SafeAreaView,
    KeyboardAvoidingView,
    Keyboard,
    Alert
} from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useNavigation, useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";

import { Context } from "../components/GlobalContext";
import colors from "../config/colors";

const NewTransactionScreen = () => {
    const globalContext = useContext(Context);
    const { fetchData, isLightTheme } = globalContext;

    const route = useRoute();
    const { walletId, walletName } = route.params;

    const navigation = useNavigation();

    const themeColors = isLightTheme ? colors.light : colors.dark;

    const styles = createStyles(themeColors);

    const [amount, setAmount] = useState("");
    const [type, setType] = useState("Expense");
    const [category, setCategory] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [date, setDate] = useState(new Date());
    const [repeating, setRepeating] = useState("N");
    const [repeatingName, setRepeatingName] = useState("Never");
    const [description, setDescription] = useState("");
    const [categoryModalVisible, setCategoryModalVisible] = useState(false);
    const [repeatingModalVisible, setRepeatingModalVisible] = useState(false);
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

    const repeatingOptions = [
        { id: "N", name: "Never" },
        { id: "D", name: "Daily" },
        { id: "W", name: "Weekly" },
        { id: "M", name: "Monthly" },
        { id: "Y", name: "Yearly" },
    ];

    const handleDateConfirm = (selectedDate) => {
        console.log(selectedDate)
        setDate(selectedDate);
        setDatePickerVisibility(false);
    };

    const formatDateForDjango = (isoDateString) => {
        const date = new Date(isoDateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
        const day = String(date.getDate()).padStart(2, '0');
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
        // Check if all required fields are filled
        if (!amount || !category || !date || !description || !type || !repeating) {
            Alert.alert("Validation Error", "Please fill in all required fields.");
            return; // Exit the function early if validation fails
        }
    
        try {
            // Format date as required by Django
            const formattedDate = formatDateForDjango(date.toISOString());
    
            const body = JSON.stringify({
                date: formattedDate,
                amount: parseFloat(amount), // Ensure amount is a number
                type: type === "Expense" ? "EX" : "EA",
                category: category,
                repeating: repeating,
                wallet: walletId,
                description: description
            });
    
            // Fetch request to your API
            const response = await fetchData("log/create-trans/", "POST", body);
    
            // Check if the response is successful (status code in the range 200-299)
            if (!response.ok) {
                const errorData = await response.json(); // Assuming the server responds with a JSON error message
                throw new Error(errorData.detail || 'An error occurred'); // Customize based on your error structure
            }
    
            // Navigate to FinanceTracker on success
            navigation.navigate("FinanceTracker");
        } catch (error) {
            // Handle errors and provide feedback
            Alert.alert("Transaction Error", error.message || "An unexpected error occurred.");
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
                    />
                </View>

                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: 20,
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
                        paddingHorizontal: 20,
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
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingHorizontal: 20,
                    }}
                >
                    <Text style={styles.label}>Repeating</Text>

                    <TouchableOpacity
                        onPress={() => setRepeatingModalVisible(true)}
                    >
                        <Text style={styles.label}>{repeatingName}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.line}></View>

                <View
                    style={{
                        flexDirection: "column",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        paddingHorizontal: 20,
                    }}
                >
                    <TextInput
                        value={description}
                        onChangeText={setDescription}
                        placeholder="Notes"
                        placeholderTextColor={themeColors.buttons}
                        multiline={true}
                        style={[
                            {
                                width: "100%",
                                height: 200,
                                color: themeColors.buttons,
                                justifyContent: "flex-start",
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
                                        size={24}
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

                <Modal
                    visible={repeatingModalVisible}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={styles.modalContainer}>
                        {repeatingOptions.map((rep, index) => (
                            <TouchableOpacity
                                key={index}
                                style={styles.repItem}
                                onPress={() => {
                                    setRepeating(rep.id);
                                    setRepeatingName(rep.name);
                                    setRepeatingModalVisible(false);
                                }}
                            >
                                <Text style={styles.label}>{rep.name}</Text>
                            </TouchableOpacity>
                        ))}
                    </View>
                </Modal>

                <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={handleDateConfirm}
                    onCancel={() => setDatePickerVisibility(false)}
                />
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const createStyles = (themeColors) =>
    StyleSheet.create({
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
        typeSelector: {
            flexDirection: "row",
            marginBottom: 20,
            justifyContent: "center",
            alignContent: "center",
            paddingTop: 60,
        },
        typeButton: {
            width: "30%",
            alignItems: "center",
            padding: 12,
            borderWidth: 2,
            borderColor: themeColors.buttons,
            borderRadius: 40,
            marginHorizontal: 20,
        },
        selectedTypeButton: {
            backgroundColor: themeColors.buttons,
        },
        typeText: {
            fontSize: 16,
        },
        amountBox: {
            justifyContent: "center",
            alignContent: "center",
            flexDirection: "row",
            alignSelf: "center",
        },
        amountInput: {
            fontSize: 32,
            fontWeight: "bold",
            marginBottom: 16,
            textAlign: "center",
            borderBottomWidth: 1,
            borderColor: themeColors.buttons,
            color: themeColors.buttons,
            paddingHorizontal: 20,
        },
        label: {
            fontSize: 18,
            marginVertical: 8,
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
            fontSize: 15,
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
            fontSize: 16,
        },
        line: {
            borderBottomColor: themeColors.buttons,
            borderBottomWidth: 1,
            marginVertical: 10,
            marginHorizontal: 20,
        },
    });

export default NewTransactionScreen;