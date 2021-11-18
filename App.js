import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      <View style={styles.weather}>
        <View style={styles.day}>
          <Text style={styles.temp}>16</Text>
          <Text style={styles.description}>Sunny</Text>
        </View>
      </View>
      <StatusBar style='light' />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D0921",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    color: "#fefefe",
    fontSize: 50,
    fontWeight: "600",
  },
  weather: {
    flex: 4,
    backgroundColor: "#8774F7",
  },
  day: {
    flex: 1,
    alignItems: "center",
  },
  temp: {
    marginTop: 180,
    fontSize: 140,
    fontWeight: "600",
    color: "#fefefe"
  },
  description: {
    fontSize: 30,
    fontWeight: "600",
    color: "#fefefe"
  }
});
