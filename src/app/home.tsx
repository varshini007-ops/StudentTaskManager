
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const STORAGE_KEY = "student_tasks";

export default function HomeScreen() {
  const router = useRouter();

  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);

  useFocusEffect(
    useCallback(() => {
      const loadStats = async () => {
        try {
          const savedTasks = await AsyncStorage.getItem(STORAGE_KEY);
          const tasks = savedTasks ? JSON.parse(savedTasks) : [];

          setTotalTasks(tasks.length);

          const completed = tasks.filter(
            (task: any) => task.completed
          ).length;

          setCompletedTasks(completed);
        } catch (error) {
          console.log("Error loading task statistics:", error);
        }
      };

      loadStats();
    }, [])
  );

  const pendingTasks = totalTasks - completedTasks;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Student Task Manager</Text>
      <Text style={styles.welcome}>Welcome Back!</Text>
      <Text style={styles.subtitle}>
        Manage your daily tasks easily.
      </Text>

      <View style={styles.statsContainer}>
        <View style={styles.card}>
          <Text style={styles.number}>{totalTasks}</Text>
          <Text style={styles.cardText}>Total Tasks</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.number}>{completedTasks}</Text>
          <Text style={styles.cardText}>Completed</Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.number}>{pendingTasks}</Text>
          <Text style={styles.cardText}>Pending</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.primaryButton}
        onPress={() => router.push("/tasks")}
      >
        <Text style={styles.buttonText}>View My Tasks</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => router.push("/add-task")}
      >
        <Text style={styles.secondaryButtonText}>+ Add New Task</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6FF",
    padding: 25,
    justifyContent: "center",
  },
  heading: {
    fontSize: 27,
    fontWeight: "bold",
    color: "#283593",
    textAlign: "center",
    marginBottom: 25,
  },
  welcome: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#222",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 15,
    color: "#666",
    textAlign: "center",
    marginTop: 8,
    marginBottom: 30,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 35,
  },
  card: {
    backgroundColor: "#FFFFFF",
    width: "31%",
    paddingVertical: 22,
    borderRadius: 15,
    alignItems: "center",
    elevation: 3,
  },
  number: {
    fontSize: 25,
    fontWeight: "bold",
    color: "#3949AB",
  },
  cardText: {
    fontSize: 12,
    color: "#555",
    marginTop: 8,
  },
  primaryButton: {
    backgroundColor: "#3949AB",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  secondaryButton: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#3949AB",
  },
  secondaryButtonText: {
    color: "#3949AB",
    fontSize: 16,
    fontWeight: "bold",
  },
});
