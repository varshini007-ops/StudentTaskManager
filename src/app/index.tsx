
import { useRouter } from "expo-router";
import {
  Image,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";

import CustomButton from "../components/ui/CustomButton";

export default function HomeScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <View style={styles.circle}>
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text style={styles.title}>
        Student Task Manager
      </Text>

      <Text style={styles.subtitle}>
        Organize your tasks.{"\n"}
        Manage your time. Achieve your goals.
      </Text>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>
          Stay Organized!
        </Text>

        <Text style={styles.cardText}>
          Keep track of your daily tasks and
          complete your work on time.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <CustomButton
          title="Get Started →"
          onPress={() => router.push("/login")}
        />
      </View>

      <Text style={styles.footer}>
        Learn • Plan • Achieve
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F3FF",
    alignItems: "center",
    justifyContent: "center",
    padding: 25,
  },

  circle: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "#DDD6FE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 30,
  },

  image: {
    width: 90,
    height: 90,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4C1D95",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 16,
    color: "#6B6480",
    textAlign: "center",
    lineHeight: 25,
    marginTop: 15,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 22,
    borderRadius: 18,
    width: "100%",
    marginTop: 40,
    elevation: 3,
  },

  cardTitle: {
    fontSize: 19,
    fontWeight: "bold",
    color: "#5B21B6",
    marginBottom: 10,
  },

  cardText: {
    fontSize: 15,
    color: "#666078",
    lineHeight: 23,
  },

  buttonContainer: {
    width: "100%",
    marginTop: 30,
  },

  footer: {
    color: "#8B83A3",
    marginTop: 35,
    fontSize: 13,
  },
});
