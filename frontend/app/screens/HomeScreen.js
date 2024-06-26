import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PieChart from 'react-native-pie-chart';
import colors from "../config/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function HomeScreen(props) {
    const navigation = useNavigation();

    const handleSavings = () => {
        navigation.navigate("Earnings");
    }
    const handleSpendings = () => {
        navigation.navigate("Spendings");
    }

    const widthAndHeight = 250;
    const series = [50, 30, 20];
    const sliceColor = [colors.darkPink, '#c84369', '#e56e90'];

    const [boxVisible, setBoxVisible] = useState(null);

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.headertext}>Home</Text>
            <Text style={styles.summarytext}>You spent $50 today! </Text>
            <View style={styles.piechart}>
                <PieChart
                widthAndHeight={widthAndHeight}
                series={series}
                sliceColor={sliceColor}
                />
            </View>

            <View style={styles.subheadercontainer}>
                <TouchableOpacity
                style={[styles.subheaderbtn,, {
                    backgroundColor: boxVisible === 1 ? colors.darkPink : '#eb93ac'
                  }]}
                onPress={() => setBoxVisible(1)}
                >
                    <Text style={styles.subheader}>Expenses</Text>
                </TouchableOpacity>
                <View style={styles.spacing}></View>
                <TouchableOpacity
                style={[styles.subheaderbtn,, {
                    backgroundColor: boxVisible === 2 ? colors.darkPink : '#eb93ac'
                  }]}
                onPress={() => setBoxVisible(2)}
                >
                    <Text style={styles.subheader}>Statistics</Text>
                </TouchableOpacity>
            </View>

            
      {boxVisible === 1 && (
        <View style={styles.expensecontainer}>
          <View style={styles.expensebox}>
            <Text style={styles.expensetext}> $5 Lunch</Text>
          </View>
          <View style={styles.separator} />
          <View style={styles.expensebox}>
            <Text style={styles.expensetext}> $10 Transport</Text>
          </View>
        </View>
      )}
      {boxVisible === 2 && (
        <View style={styles.both}>
                <TouchableOpacity
                    onPress={handleSavings}>
                    <View style= {styles.box}>
                        <Text style={styles.catheader}>Savings</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={handleSpendings}>
                    <View style= {styles.box}>
                        <Text style={styles.catheader}>Spendings</Text>
                    </View>
                </TouchableOpacity>
                
            </View>
      )}

            <View style={styles.buttonContainer}>
            <TouchableOpacity >
                <Ionicons name="add-circle" size={35} color={colors.darkPink} />
            </TouchableOpacity>
            </View>
            
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    background: {
        flex: 1, 
        backgroundColor: colors.lightPink,
        justifyContent: "flex-start",  
        alignItems: "center", 
    },

    piechart: {
        width: 300,
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },

    both: {
        height: 200,
        width: '90%',
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 10,
    },

    catheader: {
        fontSize: 16,
        marginLeft: 15,
        marginTop: 10,
        fontWeight: 'bold',
    },

    box: {
        width: 170,
        height: 150, 
        backgroundColor: '#f6dde7',
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    headertext: {
        fontSize: 20,
        marginRight: 270,
        marginTop: 15,
        fontWeight: 'bold',
    },

    summarytext: {
        fontSize: 15,
        marginRight: 175,
        marginTop: 10,
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    subheadercontainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '90%',
        alignItems: 'center',
    },
    spacing:{
        width: 7,
        color: colors.lightPink,
    },
    subheaderbtn: {
        backgroundColor: colors.darkPink,
        padding: 10,
        borderRadius: 5,
    },
    subheader: {
        color: '#fff',
        fontSize: 16,
    },
    expensebox: {
        height: 50,
        width: '90%',
        color: 'f6dde7',
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 10,
    },
    expensecontainer: {
        width: '90%',
        backgroundColor: '#f6dde7',
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        borderRadius: 5,
        marginTop: 10,
    },
    expensetext: {
        fontSize: 16,
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#808080',
    }
})