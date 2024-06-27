import React from "react";
import { View, StyleSheet, Text } from "react-native";
import data from "./QuizData";

export default Questions = ({ index, question, totalQuestions }) => {
  return (
      <View style={styles.container}>
          {/* Question Counter */}
          <View style={styles.counterRow}>
              <Text style={styles.indexText}>{index + 1}</Text>
              <Text style={styles.totalText}>/ {totalQuestions}</Text>
          </View>

          {/* Question */}
          <Text style={styles.questionText}>{question}</Text>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
      padding: 20,
  },
  counterRow: {
      flexDirection: 'row',
      alignItems: 'flex-end',
      marginBottom: 10,
  },
  indexText: {
      color: '#333',
      fontSize: 15,
      opacity: 0.6,
      marginRight: 2,
  },
  totalText: {
      color: '#333',
      fontSize: 13,
      opacity: 0.6,
  },
  questionText: {
      color: '#333',
      fontSize: 18,
      textAlign: 'center',
  },
});
