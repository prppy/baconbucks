import React from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import colors from "../config/colors";


export default function HomeScreen(props) {
    const navigation = useNavigation();

    const handleSavings = () => {
        navigation.navigate("Savings");
    }
    const handleSpendings = () => {
        navigation.navigate("Spendings");
    }

    return (
        <SafeAreaView style={styles.background}>
            <Text>you spent $xyz this month! </Text>
            <View style={styles.piechart}></View>
            <View style={styles.both}>
                <TouchableOpacity
                    onPress={handleSavings}>
                    <View style={styles.savings}>
                        <Text>savings</Text>
                        <View style= {styles.box}></View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSpendings}>
                    <View  style={styles.savings}>
                        <Text>spendings</Text>
                        <View style= {styles.box}></View>
                    </View>
                </TouchableOpacity>
                
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1, 
        backgroundColor: colors.lightPink,
        justifyContent: "center",  
        alignItems: "center", 
    },

    piechart: {
        width: 300,
        height: 300, 
        borderRadius: 150,
        backgroundColor: colors.darkPink,
        margin: 20, 
    },

    both: {
        height: 200,
        width: Dimensions.get('window').width,
        flexDirection: "row",
        justifyContent: "space-around",
        borderWidth: 1,
    },

    savings: {
        width: 150, 
        heigth: 200,
    },

    box: {
        width: 150,
        height: 150, 
        backgroundColor: colors.darkPink,
        borderRadius: 10,
    },
})