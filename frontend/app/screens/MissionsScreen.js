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

            {/* RANDOM */}
            <View style={styles.quizbox} >
                <Text style={styles.rowheader}>Random</Text>
                <Text 
                    style={styles.rowcontent} 
                    numberOfLines={2}>
                        Not sure where to get started? Try out any topic here!
                    </Text>
                <TouchableOpacity onPress={handleQuiz}>
                    <Ionicons
                    name='chevron-forward'
                    size={30}
                    color={themeColors.buttons}/>
                </TouchableOpacity>
            </View>

            {/* CPF */}
            <View style={styles.quizbox} > 
                <Text style={styles.rowheader}>CPF</Text>
                <Text 
                    style={styles.rowcontent} 
                    numberOfLines={2}>
                        Test your knowledge of the Central Provision Fund (CPF).
                    </Text>
                <TouchableOpacity>
                    <Ionicons
                    name='chevron-forward'
                    size={30}
                    color={themeColors.buttons}/>
                </TouchableOpacity>
            </View>

            {/* TAX */}
            <View style={styles.quizbox} >
                <Text style={styles.rowheader}>Tax</Text>
                <Text 
                    style={styles.rowcontent} 
                    numberOfLines={2}>
                        Learn about tax in Singapore!
                    </Text>
                <TouchableOpacity>
                    <Ionicons
                    name='chevron-forward'
                    size={30}
                    color={themeColors.buttons}/>
                </TouchableOpacity>
            </View>

            {/* BANKING */}
            <View style={styles.quizbox} >
                <Text style={styles.rowheader}>Banking</Text>
                <Text 
                    style={styles.rowcontent} 
                    numberOfLines={2}>
                        Do you know what these banking terms mean?
                    </Text>
                <TouchableOpacity>
                    <Ionicons
                    name='chevron-forward'
                    size={30}
                    color={themeColors.buttons}/>
                </TouchableOpacity>
            </View>

            {/* INSURANCE */}
            <View style={styles.quizbox} >
                <Text style={styles.rowheader}>Insurance</Text>
                <Text 
                    style={styles.rowcontent} 
                    numberOfLines={2}>
                        Have you bought your insurance today?
                    </Text>
                <TouchableOpacity>
                    <Ionicons
                    name='chevron-forward'
                    size={30}
                    color={themeColors.buttons}/>
                </TouchableOpacity>
            </View>
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
        },
        quizbox: {
            padding: 20,
            backgroundColor: themeColors.row,
            borderColor: "#ccc",
            borderRadius: 20,
            shadowColor: "#171717",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 20,
            width: '85%',
            height: 100,
            margin: 5,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            top: 60,
        },
        rowheader: {
            color: themeColors.headertext,
            fontSize: fontSizes.eighteen,
            position: 'absolute',
            top: 15,
            left: 20,
        },
        rowcontent: {
            color: themeColors.headertext,
            fontSize: fontSizes.fourteen,
            position: 'absolute',
            top: 45,
            left: 20,
            width: 250,
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
