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
  Image,
} from "react-native";
import * as Font from "expo-font";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const API_KEY = "de6256127a0797eb709e91273c5a5d1a";

const icons = {
  Clouds: require("./assets/icon/Cloudy.png"),
  Clear: require("./assets/icon/Sun.png"),
  Atomosphere: require("./assets/icon/Partly-Cloudy.png"),
  Snow: require("./assets/icon/Snow.png"),
  Rain: require("./assets/icon/Rainy.png"),
  Drizzle: require("./assets/icon/Partly-Drizzling.png"),
  Thunderstorm: require("./assets/icon/Thunderstorm.png"),
};

const today = new Date();
const time = {
  year: today.getFullYear(), // 현재 년도
  month: today.getMonth() + 1, // 현재 월
  day: today.getDay(), // 현재 요일
  date: today.getDate(), // 현재 날짜
  hours: today.getHours(), // 현재 시간
  minutes: today.getMinutes(), //현재 분
};
const Day = (time) => {
  if (time.day === 0) return "Sunday";
  if (time.day === 1) return "Monday";
  if (time.day === 2) return "Tuesday";
  if (time.day === 3) return "Wednesday";
  if (time.day === 4) return "Thursday";
  if (time.day === 5) return "Friday";
  if (time.day === 6) return "Saturday";
};
const Month = (time) => {
  const month = time.month;
  if (month === 1) return "Jan";
  if (month === 2) return "Feb";
  if (month === 3) return "Mar";
  if (month === 4) return "Apr";
  if (month === 5) return "May";
  if (month === 6) return "Jun";
  if (month === 7) return "Jul";
  if (month === 8) return "Aug";
  if (month === 9) return "Sep";
  if (month === 10) return "Oct";
  if (month === 11) return "Nov";
  if (month === 12) return "Dec";
};

export default function App() {
  const [city, setCity] = useState("Loading...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const [isReady, setIsReady] = useState(false);

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
    // console.log(json);
    setDays(json.daily);
  };

  useEffect(async () => {
    await Font.loadAsync({
      fredoka: require("./assets/fonts/FredokaOne-Regular.ttf"),
      cafe24ssurround: require("./assets/fonts/Cafe24Ssurround.ttf"),
    });
    setIsReady(true);
  }, []);

  useEffect(() => {
    getWeather();
  }, []);

  return (
    <View style={styles.container}>
      {isReady && (
        <View style={styles.city}>
          <Text style={styles.cityName}>{city}</Text>
        </View>
      )}
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
              <Image style={styles.icon} source={icons[day.weather[0].main]} />
              <Text style={styles.temp}>
                {parseFloat(day.temp.day).toFixed(1) + "°"}
              </Text>
              <Text style={styles.description}>{day.weather[0].main}</Text>
              <Text style={styles.date}>
                {Day(time)}, {time.date} {Month(time)}
              </Text>
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
    fontFamily: "fredoka",
    flex: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontFamily: "cafe24ssurround",
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
    // backgroundColor: "#8774F7",
    width: "80%",
    height: "50%",
    resizeMode: "contain",
  },
  temp: {
    // marginTop: 20,
    fontFamily: "fredoka",
    fontSize: 100,
    fontWeight: "600",
    color: "#fefefe",
  },
  description: {
    fontFamily: "fredoka",
    fontSize: 30,
    fontWeight: "600",
    color: "#fefefe",
  },
  date: {
    fontFamily: "fredoka",
    fontSize: 20,
    color: "#fefefe",
  },
});
