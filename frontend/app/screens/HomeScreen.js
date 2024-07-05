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
                <Modal 
                    isVisible={isVisible} 
                    onBackdropPress={toggleModal}
                    backdropColor="black"
                    backdropOpacity={0.3}
                >
                    <View style={styles.modalContent}>
                        <TouchableOpacity onPress={handleNewWallet} style={{paddingBottom: 20}}>
                            <View style={styles.modalContainer}>
                                <Text style={styles.modaltext}>Add Wallet</Text>
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={handleNewTransaction} >
                            <View style={styles.modalContainer}>
                                <Text style={styles.modaltext}>Add Transaction</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
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
    modalContent: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 150, 
        height: 40,
        borderRadius: 5,
        backgroundColor: colors.lightPink,
        justifyContent: 'center',
        alignItems: 'flex-start',
        left: 100, 
        top: 190,
    },
    modaltext: {
        marginLeft: 10,
        fontSize: 15,
    }
})
