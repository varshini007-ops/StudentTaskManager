
import { useRouter } from "expo-router";
import { useState } from "react";
import {
    Alert,
    Pressable,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

export default function LoginScreen() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (email.trim() === "" || password.trim() === "") {
      Alert.alert(
        "Error",
        "Please enter email and password"
      );
    } else {
      router.replace("/home");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📚</Text>

      <Text style={styles.title}>Welcome Back!</Text>

      <Text style={styles.subtitle}>
        Login to manage your daily tasks
      </Text>

      <Text style={styles.label}>Email Address</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />

      <Text style={styles.label}>Password</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        secureTextEntry={true}
        value={password}
        onChangeText={setPassword}
      />

      <Pressable
        style={styles.button}
        onPress={handleLogin}
      >
        <Text style={styles.buttonText}>Login</Text>
      </Pressable>

      <Pressable
        onPress={() => router.back()}
        style={styles.backButton}
      >
        <Text style={styles.backText}>← Back</Text>
      </Pressable>

      <Text style={styles.footer}>
        Student Task Manager
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F3FF",
    justifyContent: "center",
    padding: 25,
  },

  icon: {
    fontSize: 55,
    textAlign: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4C1D95",
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    color: "#777",
    textAlign: "center",
    marginTop: 10,
    marginBottom: 35,
  },

  label: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#4C1D95",
    marginBottom: 8,
    marginTop: 15,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#DDD6FE",
  },

  button: {
    backgroundColor: "#6D28D9",
    padding: 17,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },

  backButton: {
    alignItems: "center",
    marginTop: 20,
  },

  backText: {
    color: "#6D28D9",
    fontSize: 16,
  },

  footer: {
    textAlign: "center",
    color: "#888",
    marginTop: 35,
  },
});
