import * as Location from "expo-location";
import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  SafeAreaView
} from "react-native";
import { Fontisto } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const API_KEY = "de6256127a0797eb709e91273c5a5d1a";

const icons = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atomosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);

  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync(); // 앱을 사용하는 동안 위치정보 허용 여부
    // 허용하지 않았을 시
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false },
    );
    setCity(location[0].city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric`,
    );
    const json = await response.json();
    setDays(json.daily);
  };

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.city}>
        <Text style={styles.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {days.length === 0 ? (
          <View style={styles.day}>
            <ActivityIndicator color='white' size='large' />
          </View>
        ) : (
          days.map((day, index) => (
            <View key={index} style={styles.day}>
                <Text style={styles.icon}>
                  <Fontisto
                    name={icons[day.weather[0].main]}
                    size={230}
                    color='white'
                  />
                </Text>
              <Text style={styles.temp}>
                {parseFloat(day.temp.day).toFixed(1)}
              </Text>
              <Text style={styles.description}>{day.weather[0].main}</Text>
            </View>
          ))
        )}
      </ScrollView>
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
    // backgroundColor: "#8774F7",
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
    // backgroundColor: "darkgrey",
  },
  icon: {
    // flex: 2,
    // backgroundColor: "#8774F7",
  },
  temp: {
    // flex: 1,
    // marginTop: 20,
    fontSize: 100,
    fontWeight: "600",
    color: "#fefefe",
  },
  description: {
    flex: 1,
    fontSize: 30,
    fontWeight: "600",
    color: "#fefefe",
  },
});
