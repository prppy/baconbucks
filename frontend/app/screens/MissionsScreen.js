import React, { useState, useContext } from "react";
import {
    SafeAreaView,
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
    ScrollView,
    Dimensions,
} from "react-native";
import moment from "moment";
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Modal from "react-native-modal";
import { Context } from "../components/GlobalContext";

export default function MissionsScreen(props) {
    const todayDate = moment().format("MMMM Do YYYY");
    const navigation = useNavigation();
    const handleQuiz = (day) => {
        navigation.replace("Quiz");
    };

    const [isModal1Visible, setModal1Visible] = useState(false);
    const [isModal2Visible, setModal2Visible] = useState(false);
    const [isModal3Visible, setModal3Visible] = useState(false);

    const toggleModal1 = () => {
        setModal1Visible(!isModal1Visible);
    };
    const toggleModal2 = () => setModal2Visible(!isModal2Visible);
    const toggleModal3 = () => setModal3Visible(!isModal3Visible);

    const globalContext = useContext(Context);
    const {
        userObj,
        isLightTheme,
        isLargeFont,
        defaultFontSizes,
        getLargerFontSizes,
    } = globalContext;
    const themeColors = isLightTheme ? colors.light : colors.dark;
    const fontSizes = isLargeFont ? getLargerFontSizes() : defaultFontSizes;
    const styles = createStyles(themeColors, fontSizes);

    const [viewDimensions, setViewDimensions] = useState({
        width: 0,
        height: 0,
    });

    const handleViewLayout = (event) => {
        const { width, height } = event.nativeEvent.layout;
        setViewDimensions({ width, height });
        console.log("View Dimensions:", { width, height });
    };

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.headertext}>Missions</Text>
            <View style={styles.inner}>
                <View style={styles.quizbox}>
                    <View style={{ flex: 1 }} onLayout={handleViewLayout}>
                        <Image
                            source={require("../assets/images/quizroadmap.png")}
                            style={styles.roadmap}
                        />
                        <View
                            style={[
                                styles.buttonContainer,
                                {
                                    top: viewDimensions.height * 0.065,
                                    left: 0,
                                },
                            ]}
                        >
                            <TouchableOpacity onPress={toggleModal1}>
                                <Ionicons
                                    name="location-sharp"
                                    size={50}
                                    color={"#DF4B75"}
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={[
                                styles.buttonContainer,
                                {
                                    top: viewDimensions.height * 0.29,
                                    left: viewDimensions.width * 0.575,
                                },
                            ]}
                        >
                            <TouchableOpacity onPress={toggleModal2}>
                                <Ionicons
                                    name="location-sharp"
                                    size={50}
                                    color={"#DF4B75"}
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={[
                                styles.buttonContainer,
                                {
                                    top: viewDimensions.height * 0.65,
                                    left: viewDimensions.width * 0.2,
                                },
                            ]}
                        >
                            <TouchableOpacity onPress={toggleModal3}>
                                <Ionicons
                                    name="location-sharp"
                                    size={50}
                                    color={"#DF4B75"}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>

            <Modal isVisible={isModal1Visible} onBackdropPress={toggleModal1}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalHeader}>Quiz 1: CPF</Text>
                    <Text style={styles.modaltext}>
                        Test your knowledge of the Central Provision Fund (CPF).
                    </Text>
                    <TouchableOpacity
                        onPress={handleQuiz}
                        style={styles.playbtn}
                    >
                        <Text style={styles.btntext}>Play</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal isVisible={isModal2Visible} onBackdropPress={toggleModal2}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalHeader}>Quiz 2: Tax</Text>
                    <Text style={styles.modaltext}>
                        Learn about tax in Singapore!
                    </Text>
                    <TouchableOpacity
                        onPress={handleQuiz}
                        style={styles.playbtn}
                    >
                        <Text style={styles.btntext}>Play</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
            <Modal isVisible={isModal3Visible} onBackdropPress={toggleModal3}>
                <View style={styles.modalContent}>
                    <Text style={styles.modalHeader}>Quiz 3: Banking</Text>
                    <Text style={styles.modaltext}>
                        Do you know what these banking terms mean?
                    </Text>
                    <TouchableOpacity
                        onPress={handleQuiz}
                        style={styles.playbtn}
                    >
                        <Text style={styles.btntext}>Play</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const createStyles = (themeColors, fontSizes) =>
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
            marginBottom: 30,
        },
        challengebox: {
            width: "90%",
            padding: 20,
            backgroundColor: themeColors.row,
            borderColor: "#ccc",
            borderRadius: 10,
            shadowColor: "#171717",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 5,
            marginTop: 60,
            height: 120,
            alignItems: "left",
        },
        quizbox: {
            flex: 1,
            padding: 30,
            backgroundColor: themeColors.row,
            borderColor: "#ccc",
            borderRadius: 10,
            shadowColor: "#171717",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 20,
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
        roadmap: {
            height: "100%",
            aspectRatio: 0.707070707070707,
            alignSelf: "center",
        },
        modalContent: {
            width: fontSizes.twohundred,
            height: fontSizes.twohundred,
            borderRadius: 10,
            backgroundColor: "#F4D5E1",
            justifyContent: "flex-start",
            alignItems: "center",
            padding: 20,
            marginLeft: "auto",
            marginRight: "auto",
        },
        btntext: {
            color: "white",
            fontSize: fontSizes.sixteen,
        },
        modalHeader: {
            fontSize: fontSizes.twenty,
        },
        modaltext: {
            fontSize: fontSizes.fifteen,
            padding: 10,
        },
        playbtn: {
            width: 80,
            height: 30,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#df4b75",
            borderRadius: 5,
            marginTop: "auto",
        },
        buttonContainer: {
            position: "absolute",
        },
    });
