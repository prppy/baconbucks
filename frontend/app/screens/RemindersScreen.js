import React, { useCallback, useEffect, useState, useContext } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    TextInput,
    Alert,
    SafeAreaView,
    StyleSheet,
    ActivityIndicator,
    Keyboard,
    TouchableWithoutFeedback
} from "react-native";
import { Agenda, calendarTheme } from "react-native-calendars";
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import { useFocusEffect } from "@react-navigation/native";

import { Context } from "../components/GlobalContext";

const ReminderScreen = () => {
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
    const [loading, setLoading] = useState(false);

    const handleNewRem = async () => {
        if (reminderName === "" || reminderDate === "") {
            Alert.alert("Error", "Please input all fields.");
            return;
        }

        setLoading(true);

        try {
            const formattedDate = formatDateForDjango(
                reminderDate.toISOString()
            );
            const body = {
                name: reminderName,
                date: formattedDate,
                description: reminderDesc,
            };

            await fetchData("log/create-rem/", "POST", body);

            // Update the reminders for the selected date
            fetchAllReminders();

            // Reset the modal fields
            setReminderName("");
            setReminderDesc("");
            setReminderDate(new Date());

            // Close the modal
            toggleModal();
        } catch (error) {
            console.error("Error during create-rem:", error);
            Alert.alert(
                "Error",
                "Failed to create reminder. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            fetchAllReminders();
        }, [])
    );

    const fetchAllReminders = async () => {
        try {
            const json = await fetchData("log/get-all-rem/");
            const reminders = await formatRemindersForAgenda(json);
            setItems(reminders);
        } catch (error) {
            console.log(error);
        }
    };

    const formatDateForDjango = (isoDateString) => {
        const date = new Date(isoDateString);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are 0-based
        const day = String(date.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
    };

    const formatRemindersForAgenda = async (reminders) => {
        const formattedData = {};

        reminders.forEach((reminder) => {
            const { date, ...rest } = reminder;

            if (!formattedData[date]) {
                formattedData[date] = [];
            }
            formattedData[date].push(rest);
        });

        return formattedData;
    };

    const toggleModal = () => {
        setIsVisible(!isVisible);
    };

    const dismissKeyboard = () => {
        Keyboard.dismiss();
    };

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.headertext}>Reminders</Text>
            <View style={styles.inner}>
                <Agenda
                    items={items}
                    renderItem={(item, isFirst) => (
                        <TouchableOpacity style={styles.reminder}>
                            <Text style={styles.reminderHeader}>
                                {item.name}
                            </Text>
                            <Text style={styles.reminderText}>
                                {item.description}
                            </Text>
                        </TouchableOpacity>
                    )}
                    showClosingKnob={true}
                    showOnlySelectedDayItems={true}
                    renderEmptyData={() => (
                        <View
                            style={{
                                flex: 1,
                                alignItems: "center",
                                justifyContent: "center",
                            }}
                        >
                            <View
                                style={{
                                    width: "70%",
                                    justifyContent: "center",
                                    alignContent: "center",
                                    alignItems: "center",
                                    backgroundColor: themeColors.row,
                                    borderRadius: 10,
                                    padding: 10,
                                }}
                            >
                                <Text style={styles.reminderHeader}>
                                    No Reminders
                                </Text>
                                <Text style={{ color: themeColors.headertext }}>
                                    Add a new Reminder
                                </Text>
                            </View>
                        </View>
                    )}
                    onDayPress={(day) =>
                        setReminderDate(new Date(day.dateString))
                    }
                    theme={{
                        ...calendarTheme,
                        agendaDayTextColor: themeColors.buttons,
                        agendaDayNumColor: themeColors.buttons,
                        agendaTodayColor: themeColors.buttons,
                        textDayFontFamily: "System",
                        textMonthFontFamily: "System",
                        textDayHeaderFontFamily: "System",
                        calendarBackground: themeColors.row,
                        selectedDayBackgroundColor: themeColors.buttons,
                        dotColor: themeColors.buttons,
                        textDisabledColor: themeColors.background,
                        dayTextColor: themeColors.headertext,
                        monthTextColor: themeColors.buttons,
                        textMonthFontWeight: "bold",
                        textSectionTitleColor: themeColors.revbuttons,
                        textDayHeaderFontWeight: "bold",
                        todayTextColor: themeColors.buttons,
                    }}
                    style={{ borderRadius: 20 }}
                />
            </View>
            <TouchableOpacity style={styles.addreminder} onPress={toggleModal}>
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
                <TouchableWithoutFeedback onPress={dismissKeyboard}>
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
                            <Text style={styles.modaltext}>Name</Text>
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
                                    styles.modaltext,
                                ]}
                            />
                            <Text style={styles.modaltext}>Description</Text>
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
                                    styles.modaltext,
                                ]}
                            />
                            <Text style={styles.modaltext}>Date</Text>
                            <View
                                style={{
                                    width: "100%",
                                    color: themeColors.buttons,
                                    justifyContent: "flex-start",
                                    backgroundColor: themeColors.row,
                                    padding: 10,
                                    borderRadius: 10,
                                }}
                            >
                                <Text
                                    style={[
                                        styles.modaltext,
                                        {
                                            color: themeColors.buttons,
                                            marginBottom: 0,
                                        },
                                    ]}
                                >
                                    {reminderDate.toLocaleDateString()}
                                </Text>
                            </View>
                        </View>

                        <TouchableOpacity
                            style={styles.savebtn}
                            onPress={handleNewRem}
                            disabled={loading} // Disable button while loading
                        >
                            {loading ? (
                                <ActivityIndicator
                                    size="small"
                                    color="#ffffff"
                                />
                            ) : (
                                <Text style={styles.btntext}>Save</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </TouchableWithoutFeedback>
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
            fontSize: fontSizes.eighteen,
            alignSelf: "center",
            fontWeight: "bold",
            color: themeColors.headertext,
        },
        modaltext: {
            fontSize: fontSizes.fifteen,
            marginBottom: 10,
            fontWeight: "bold",
            color: themeColors.headertext,
        },
        savebtn: {
            backgroundColor: themeColors.buttons,
            padding: 10,
            borderRadius: 10,
            marginTop: 10,
            width: "50%",
            alignSelf: "center",
        },
        btntext: {
            color: themeColors.background,
            textAlign: "center",
            fontSize: fontSizes.text,
            fontWeight: "bold",
        },
        reminder: {
            backgroundColor: themeColors.row,
            borderRadius: 10,
            marginRight: 30,
            marginTop: 25,
            padding: 10,
        },
        reminderHeader: {
            fontSize: fontSizes.fifteen,
            fontWeight: "bold",
            marginBottom: 10,
            color: themeColors.headertext,
        },
        reminderText: {
            color: themeColors.headertext,
        },
    });

export default ReminderScreen;
