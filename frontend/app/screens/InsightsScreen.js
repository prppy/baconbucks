import React, { useState, useContext } from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import PieChart from 'react-native-pie-chart';
import colors from "../config/colors";
import { Context } from "../components/GlobalContext";


export default function InsightsScreen(props) {
    const navigation = useNavigation();
    const globalContext = useContext(Context);
    const { userObj, isLightTheme, isLargeFont, defaultFontSizes, getLargerFontSizes } = globalContext;
    const themeColors = isLightTheme ? colors.light : colors.dark;
    const fontSizes = isLargeFont ? getLargerFontSizes() : defaultFontSizes;
    const styles = createStyles(themeColors, fontSizes);

    const handleSavings = () => {
        navigation.navigate("Earnings");
    }
    const handleSpendings = () => {
        navigation.navigate("Spendings");
    }

    const widthAndHeight = 250;
    const series = [50, 30, 20];
    const sliceColor = ["#DF4B75", '#c84369', '#e56e90'];

    const [boxVisible, setBoxVisible] = useState(null);

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.headertext}>Insights</Text>
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
                    backgroundColor: boxVisible === 1 ? "#DF4B75" : '#eb93ac'
                  }]}
                onPress={() => setBoxVisible(1)}
                >
                    <Text style={styles.subheader}>Expenses</Text>
                </TouchableOpacity>
                <View style={styles.spacing}></View>
                <TouchableOpacity
                style={[styles.subheaderbtn,, {
                    backgroundColor: boxVisible === 2 ? "#DF4B75" : '#eb93ac'
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
            
            
        </SafeAreaView>
    );
}

const createStyles = (themeColors, fontSizes) => StyleSheet.create({
    background: {
        flex: 1, 
        backgroundColor: themeColors.background,
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
        fontSize: fontSizes.sixteen,
        marginLeft: 15,
        marginTop: 10,
        fontWeight: 'bold',
        color: themeColors.headertext,
    },

    box: {
        width: 170,
        height: 150, 
        backgroundColor: themeColors.row,
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
    },
    headertext: {
        fontSize: fontSizes.twenty,
        position: 'absolute',
        top: 70,
        left: 30,
        fontWeight: 'bold',
        color: themeColors.headertext,
    },

    summarytext: {
        fontSize: fontSizes.fifteen,
        paddingLeft: 30,
        marginRight: 'auto',
        marginTop: 60,
        color: themeColors.headertext,
    },
    subheadercontainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        width: '90%',
        alignItems: 'center',
    },
    spacing:{
        width: 7,
        color: themeColors.background
    },
    subheaderbtn: {
        backgroundColor: themeColors.buttons,
        padding: 10,
        borderRadius: 5,
    },
    subheader: {
        color: '#fff',
        fontSize: fontSizes.sixteen,
    },
    expensebox: {
        height: 50,
        width: '90%',
        color: themeColors.row,
        justifyContent: 'center',
        alignItems: 'flex-start',
        marginLeft: 10,
    },
    expensecontainer: {
        width: '90%',
        backgroundColor: themeColors.row,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        borderRadius: 5,
        marginTop: 10,
    },
    expensetext: {
        fontSize: fontSizes.sixteen,
        color: themeColors.headertext,
    },
    separator: {
        width: '100%',
        height: 1,
        backgroundColor: '#808080',
    }
})