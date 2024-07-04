import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";
import colors from "../config/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";


export default function HomeScreen(props) {
    const navigation = useNavigation();

    const [ isVisible, setIsVisible ] = useState(false)

    const toggleModal = () =>{
        setIsVisible(!isVisible);
    }

    const handleNewTransaction = () => {
        navigation.navigate("Add New Transaction");
        setIsVisible(false)
    }

    const handleNewWallet = () => {
        navigation.navigate("Add New Wallet");
        setIsVisible(false);
    }

    return (
        <SafeAreaView style={styles.background}>
            <Text style={styles.headertext}>Home</Text>

            <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={toggleModal}>
                <Ionicons name="add-circle" size={50} color={colors.darkPink} />
            </TouchableOpacity>
            <Modal isVisible={isVisible} onBackdropPress={toggleModal}>
                <TouchableOpacity onPress={handleNewWallet} style={{paddingBottom: 20}}>
                    <View style={styles.modalContainer}>
                        <Text>Add Wallet</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleNewTransaction}>
                    <View style={styles.modalContainer}>
                        <Text>Add Transaction</Text>
                    </View>
                </TouchableOpacity>
            </Modal>
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
    headertext: {
        fontSize: 20,
        marginRight: 270,
        marginTop: 15,
        fontWeight: 'bold',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
    },
    modalContainer: {
        width: 150, 
        height: 30,
        borderRadius: 4,
        backgroundColor: colors.lightPink,
    }
})