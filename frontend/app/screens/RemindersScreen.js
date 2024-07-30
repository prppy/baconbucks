import React, { useState, useEffect, useContext, useCallback } from "react";
import {
    View,
    Text,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    TextInput,
    Alert,
} from "react-native";
import { Agenda } from "react-native-calendars";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import DateTimePickerModal from "react-native-modal-datetime-picker";

import { Context } from "../components/GlobalContext";

const ReminderItem = React.memo(({ item }) => (
    <View style={styles.reminderContainer}>
        <Text style={styles.reminderText}>{item.name}</Text>
        <Text style={styles.reminderText}>{item.description}</Text>
    </View>
));

const ReminderScreen = () => {
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

    const [items, setItems] = useState({});
    const [selectedDate, setSelectedDate] = useState("");
    const [markedDates, setMarkedDates] = useState({});
    const [isVisible, setIsVisible] = useState(false);
    const [reminderName, setReminderName] = useState("");
    const [reminderDesc, setReminderDesc] = useState("");
    const [reminderDate, setReminderDate] = useState(new Date());
    const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

    const fetchRemData = useCallback(
        async (date) => {
            try {
                const json = await fetchData(`log/get-all-rem/?date=${date}/`);
                const formattedItems = json.map((reminder) => ({
                    id: reminder.id,
                    name: reminder.name,
                    description: reminder.description,
                }));

                setItems((prevItems) => ({
                    ...prevItems,
                    [date]: formattedItems,
                }));

                // Update markedDates with dot marks
                setMarkedDates((prevMarkedDates) => ({
                    ...prevMarkedDates,
                    [date]: {
                        marked: true,
                        dotColor: themeColors.buttons,
                    },
                }));
            } catch (error) {
                console.error("Error fetching reminders:", error);
            }
        },
        [fetchData, themeColors.buttons]
    );

    useEffect(() => {
        if (selectedDate) {
            fetchRemData(selectedDate);
        }
    }, [selectedDate, fetchRemData]);

    const handleNewRem = async () => {
        if (reminderName === "" || reminderDate === "") {
            Alert.alert("Error", "Please input all fields.");
            return;
        }

        try {
            const formattedDate = formatDateForDjango(reminderDate.toISOString());
            const body = { name: reminderName, date: formattedDate, description: reminderDesc };

            const json = await fetchData("log/create-rem/", "POST", body);

            // Update the reminders for the selected date
            fetchRemData(formattedDate);

            // Reset the modal fields
            setReminderName("");
            setReminderDesc("");
            setReminderDate(new Date());

            // Close the modal
            toggleModal();

        } catch (error) {
            console.error("Error during create-rem:", error);
            Alert.alert("Error", "Failed to create reminder. Please try again.");
        }
    };

    const formatDateForDjango = (isoDateString) => {
        const date = new Date(isoDateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const toggleModal = () => {
        setIsVisible(!isVisible);
    };

    const handleDateConfirm = (selectedDate) => {
        setReminderDate(selectedDate);
        setDatePickerVisibility(false);
    };

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.headertext}>Reminders</Text>
            <View style={styles.inner}>
                <Agenda
                    style={{
                        backgroundColor: themeColors.background,
                        height: 350,
                        borderWidth: 1,
                        borderColor: themeColors.buttons,
                        borderRadius: 10,
                    }}
                    theme={{
                        calendarBackground: themeColors.background,
                        textSectionTitleColor: themeColors.headertext,
                        selectedDayBackgroundColor: themeColors.row,
                        selectedDayTextColor: themeColors.buttons,
                        todayTextColor: themeColors.buttons,
                        dayTextColor: themeColors.headertext,
                        dotColor: themeColors.buttons,
                        selectedDotColor: themeColors.row,
                        arrowColor: themeColors.buttons,
                        monthTextColor: themeColors.headertext,
                        textDayFontFamily: "System",
                        textMonthFontFamily: "System",
                        textDayHeaderFontFamily: "System",
                    }}
                    items={items}
                    markedDates={markedDates}
                    selected={selectedDate}
                    renderItem={(item) => <ReminderItem item={item} />}
                    renderEmptyDate={() => (
                        <View style={styles.emptyDate}>
                            <Text>No reminders</Text>
                        </View>
                    )}
                    rowHasChanged={(r1, r2) => r1 !== r2}
                    onDayPress={(day) => setSelectedDate(day.dateString)}
                />
            </View>
            <TouchableOpacity style={styles.addreminder} onPress={toggleModal}>
                <Ionicons
                    name="add-circle"
                    size={40}
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
                    <Text style={styles.modalHeader}>New Reminder</Text>
                    <View
                        style={{
                            flexDirection: "column",
                            justifyContent: "space-between",
                            alignItems: "flex-start",
                            marginBottom: 10,
                            width: "100%",
                        }}
                    >
                        <Text style={styles.label}>Name</Text>
                        <TextInput
                            value={reminderName}
                            onChangeText={setReminderName}
                            placeholder="Type Here"
                            placeholderTextColor={themeColors.buttons}
                            autoCapitalize="none"
                            multiline={true}
                            style={[
                                {
                                    width: "100%",
                                    color: themeColors.buttons,
                                    justifyContent: "flex-start",
                                    backgroundColor: themeColors.row,
                                    padding: 10,
                                    borderRadius: 10,
                                },
                                styles.label,
                            ]}
                        />
                        <Text style={styles.label}>Description</Text>
                        <TextInput
                            value={reminderDesc}
                            onChangeText={setReminderDesc}
                            placeholder="Type Here"
                            placeholderTextColor={themeColors.buttons}
                            autoCapitalize="none"
                            multiline={true}
                            style={[
                                {
                                    width: "100%",
                                    color: themeColors.buttons,
                                    justifyContent: "flex-start",
                                    backgroundColor: themeColors.row,
                                    padding: 10,
                                    borderRadius: 10,
                                },
                                styles.label,
                            ]}
                        />
                        <Text style={styles.label}>Date</Text>
                        <TouchableOpacity
                            onPress={() => setDatePickerVisibility(true)}
                            style={{
                                width: "100%",
                                color: themeColors.buttons,
                                justifyContent: "flex-start",
                                backgroundColor: themeColors.row,
                                padding: 10,
                                borderRadius: 10,
                            }}
                        >
                            <Text style={styles.label}>
                                {reminderDate.toLocaleDateString()}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <DateTimePickerModal
                        isVisible={isDatePickerVisible}
                        mode="date"
                        onConfirm={handleDateConfirm}
                        onCancel={() => setDatePickerVisibility(false)}
                    />
                    <TouchableOpacity
                        style={styles.savebtn}
                        onPress={handleNewRem}
                    >
                        <Text style={styles.btntext}>Save</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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
        reminderContainer: {
            backgroundColor: "#fff",
            padding: 10,
            marginVertical: 10,
            borderRadius: 10,
            backgroundColor: themeColors.background,
        },
        reminderText: {
            fontSize: fontSizes.font,
            color: themeColors.headertext,
        },
        addreminder: {
            position: "absolute",
            bottom: 30,
            right: 30,
        },
        modalContent: {
            backgroundColor: themeColors.background,
            padding: 20,
            borderRadius: 10,
        },
        modalHeader: {
            fontSize: 20,
            fontWeight: "bold",
            color: themeColors.headertext,
            marginBottom: 20,
        },
        label: {
            fontSize: 16,
            color: themeColors.headertext,
            marginBottom: 10,
        },
        savebtn: {
            marginTop: 20,
            backgroundColor: themeColors.buttons,
            paddingVertical: 10,
            paddingHorizontal: 20,
            borderRadius: 5,
        },
        btntext: {
            color: "#fff",
            fontSize: 16,
            textAlign: "center",
        },
        emptyDate: {
            height: 15,
            flex: 1,
            paddingTop: 30,
        },
    });

export default ReminderScreen;