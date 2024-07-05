import React, { useState } from "react";
import { SafeAreaView, StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Button, ScrollView} from "react-native";
import moment from 'moment';
import colors from "../config/colors";
import { useNavigation } from "@react-navigation/native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Modal from "react-native-modal";

export default function ChallengesScreen(props) {
    const todayDate = moment().format('MMMM Do YYYY');
    const navigation = useNavigation();
    const handleQuiz = (day) => {
        navigation.replace("Quiz");
    };

    const [isModal1Visible, setModal1Visible] = useState(false);
    // const [isModal2Visible, setModal2Visible] = useState(false);
    // const [isModal3Visible, setModal3Visible] = useState(false);

    const toggleModal1 = () => {
        console.log('Modal visibility before toggle:', isModal1Visible);
        setModal1Visible(!isModal1Visible);
        console.log('Modal visibility after toggle:', !isModal1Visible);
      };
    // const toggleModal2 = () => setModal2Visible(!isModal2Visible);
    // const toggleModal3 = () => setModal3Visible(!isModal3Visible);

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.headertext}>Challenges</Text>
            
            <View style={styles.challengebox}>
                <Text style={styles.dateText}>{todayDate}</Text>
                    <Text style={styles.infoText}>Save $5 today!</Text>
            </View>

            <View style={styles.quizbox}>
                <Text style={styles.dateText}>Quiz Hub</Text>
                <Text style={styles.infoText}>Learn how to manage your finances with our mini quizzes!</Text>
                <Image source={require('../assets/images/quizroadmap.png')} style={styles.roadmap} />
                <View style={styles.buttonContainer1}>
                    <TouchableOpacity onPress={toggleModal1}>
                        <Ionicons name="location-sharp" size={50} color={colors.darkPink} />
                    </TouchableOpacity>
                    
                </View>
                

                <View style={styles.buttonContainer2}>
                    <TouchableOpacity onPress={handleQuiz}>
                        <Ionicons name="location-sharp" size={50} color={colors.darkPink} />
                    </TouchableOpacity>
                </View>

                <View style={styles.buttonContainer3}>
                    <TouchableOpacity onPress={handleQuiz}>
                        <Ionicons name="location-sharp" size={50} color={colors.darkPink} />
                    </TouchableOpacity>
                </View>
            </View>

            <Modal 
            isVisible={isModal1Visible} 
            onBackdropPress={toggleModal1}
            >
                <View style={styles.modalContent}>
                    <Text style={styles.modalHeader}>Quiz 1: CPF</Text>
                    <Text style={styles.modaltext}>Test your knowledge of the Central Provision Fund (CPF).</Text>
                    <TouchableOpacity onPress={handleQuiz} style={styles.playbtn}>
                        <Text style={styles.btntext}>Play</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: colors.lightPink,
        padding: 20,
    },
    challengebox: {
        width: '90%',
        padding: 20,
        backgroundColor: '#f6dde7',
        borderColor: '#ccc',
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        marginTop: 10,
        height: 120,
        alignItems: 'left',
      },
      quizbox: {
        width: '90%',
        padding: 20,
        backgroundColor: '#f6dde7',
        borderColor: '#ccc',
        borderRadius: 10,
        shadowColor: '#171717',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 2,
        elevation: 5,
        marginTop: 10,
        height: 380,
        alignItems: 'left',
        position: 'relative',
      },
      dateText: {
        fontSize: 18,
        fontWeight: 'bold',
      },
      infoText: {
        fontSize: 16,
        color: '#333',
        marginTop: 10,
      },
    buttonContainer1: {
        position: 'absolute',
        top: 120,
        right: 220,
    },
    buttonContainer2: {
        position: 'absolute',
        top: 200,
        right: 160,
    },
    buttonContainer3: {
        position: 'absolute',
        top: 280,
        right: 100,
    },
    headertext: {
        fontSize: 20,
        marginRight: 235,
        marginTop: 15,
        fontWeight: 'bold',
    },
    roadmap: {
        width: '100%',
        resizeMode: 'contain',
        bottom: 50,
    },
    modalContent: {
        width: 200, 
        height: 200,
        borderRadius: 10,
        backgroundColor: colors.lightPink,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 20,
        marginLeft: 75,
    },
    btntext: {
        color: 'white',
        fontSize: 16,
    },
    modalHeader: {
        fontSize: 20,
    },
    modaltext: {
        fontSize: 15,
    },
    playbtn: {
        width: 80,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.darkPink,
        marginTop: 50,
        borderRadius: 5,
    }
});