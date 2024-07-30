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
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
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

    const ReminderItem = React.memo(({ item }) => (
        <View style={styles.reminderContainer}>
            <Text style={styles.reminderText}>{item.name}</Text>
            <Text style={styles.reminderText}>{item.description}</Text>
        </View>
    ));

    const fetchAllReminders = useCallback(async () => {
        try {
            const json = await fetchData("log/get-all-rem/"); // Adjust the endpoint if needed
            const allReminders = json.reduce((acc, reminder) => {
                const date = formatDateForDjango(reminder.date);
                if (!acc[date]) acc[date] = [];
                acc[date].push({
                    id: reminder.id,
                    name: reminder.name,
                    description: reminder.description,
                });
                return acc;
            }, {});

            setItems(allReminders);

            // Update markedDates with dot marks
            const newMarkedDates = Object.keys(allReminders).reduce((acc, date) => {
                acc[date] = {
                    marked: true,
                    dotColor: themeColors.buttons,
                };
                return acc;
            }, {});

            setMarkedDates(newMarkedDates);
        } catch (error) {
            console.error("Error fetching all reminders:", error);
        }
    }, [fetchData, themeColors.buttons]);

    useEffect(() => {
        fetchAllReminders();
    }, [fetchAllReminders]);

    const fetchRemData = useCallback(
        async (date) => {
            try {
                const formattedDate = formatDateForDjango(date);
                const json = await fetchData(`log/get-all-rem/${formattedDate}/`);
                const formattedItems = json.map((reminder) => ({
                    id: reminder.id,
                    name: reminder.name,
                    description: reminder.description,
                }));

                setItems((prevItems) => ({
                    ...prevItems,
                    [date]: formattedItems,
                }));
            } catch (error) {
                console.error("Error fetching reminders:", error);
                // Handle empty dates gracefully
                setItems((prevItems) => ({
                    ...prevItems,
                    [date]: [],
                }));
            }
        },
        [fetchData]
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

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.headertext}>Reminders</Text>
            <View style={styles.inner}>
                <Agenda
                    style={styles.agenda}
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
                        <View style={styles.reminderContainer}>
                            <Text style={styles.reminderText}>No reminders</Text>
                        </View>
                    )}
                    rowHasChanged={(r1, r2) => r1 !== r2}
                    onDayPress={(day) => {
                        setSelectedDate(day.dateString);
                        setReminderDate(new Date(day.dateString)); // Update reminderDate with selected date
                    }}
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
                            <Text style={styles.label}>
                                {reminderDate.toLocaleDateString()}
                            </Text>
                        </View>
                    </View>
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

const createStyles = (themeColors, fontSizes) => StyleSheet.create({
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
    agenda: {
        backgroundColor: "themeColors.background",
        borderWidth: 1,
        borderColor: themeColors.buttons,
        borderRadius: 16,
    },
    reminderContainer: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: themeColors.row,
    },
    reminderText: {
        fontSize: fontSizes.text,
        color: themeColors.text,
    },
    emptyDate: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        height: 150,
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
        fontSize: fontSizes.header,
        color: themeColors.headertext,
        marginBottom: 10,
    },
    label: {
        fontSize: fontSizes.text,
        color: themeColors.text,
    },
    savebtn: {
        backgroundColor: themeColors.buttons,
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
    },
    btntext: {
        color: themeColors.background,
        textAlign: "center",
        fontSize: fontSizes.text,
    },
});

export default ReminderScreen;