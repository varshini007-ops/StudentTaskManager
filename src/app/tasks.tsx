
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    View,
} from "react-native";

type Task = {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  dueDate?: string;
  priority?: "High" | "Medium" | "Low";
};

type FilterType = "All" | "Pending" | "Completed";

const STORAGE_KEY = "student_tasks";

const defaultTasks: Task[] = [
  { id: 1, title: "Complete Java Assignment", description: "", completed: false },
  { id: 2, title: "Study React Native", description: "", completed: false },
  { id: 3, title: "Practice Aptitude", description: "", completed: true },
  { id: 4, title: "Complete Project Work", description: "", completed: false },
  { id: 5, title: "Revise DBMS Topics", description: "", completed: true },
];

export default function TasksScreen() {
  const router = useRouter();

  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");
  const [selectedFilter, setSelectedFilter] =
    useState<FilterType>("All");

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    try {
      const savedTasks = await AsyncStorage.getItem(STORAGE_KEY);

      if (savedTasks !== null) {
        setTasks(JSON.parse(savedTasks));
      } else {
        setTasks(defaultTasks);
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(defaultTasks)
        );
      }
    } catch (error) {
      console.log("Loading error:", error);
    } finally {
      setLoading(false);
    }
  };

  const saveTasks = async (updatedTasks: Task[]) => {
    setTasks(updatedTasks);

    try {
      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(updatedTasks)
      );
    } catch (error) {
      Alert.alert("Error", "Unable to save changes");
      loadTasks();
    }
  };

  const toggleTask = (id: number) => {
    const updatedTasks = tasks.map((item) =>
      item.id === id
        ? { ...item, completed: !item.completed }
        : item
    );

    saveTasks(updatedTasks);
  };

  const deleteTask = (id: number) => {
    Alert.alert(
      "Delete Task",
      "Are you sure you want to delete this task?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            const updatedTasks = tasks.filter(
              (item) => item.id !== id
            );
            saveTasks(updatedTasks);
          },
        },
      ]
    );
  };

  const completedCount = tasks.filter(
    (item) => item.completed
  ).length;

  const filteredTasks = tasks.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchText.toLowerCase()) ||
      item.description.toLowerCase().includes(searchText.toLowerCase());

    const matchesFilter =
      selectedFilter === "All" ||
      (selectedFilter === "Pending" && !item.completed) ||
      (selectedFilter === "Completed" && item.completed);

    return matchesSearch && matchesFilter;
  });

  const getPriorityColor = (priority?: string) => {
    if (priority === "High") return "#EF4444";
    if (priority === "Medium") return "#F59E0B";
    if (priority === "Low") return "#16A34A";
    return "#777777";
  };

  if (loading) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" color="#6D28D9" />
        <Text>Loading Tasks...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>My Tasks 📋</Text>
      <Text style={styles.subtitle}>
        Manage your daily activities
      </Text>

      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total Tasks: {tasks.length}
        </Text>
        <Text style={styles.summaryText}>
          Completed: {completedCount}
        </Text>
        <Text style={styles.summaryText}>
          Pending: {tasks.length - completedCount}
        </Text>
      </View>

      <TextInput
        style={styles.searchInput}
        placeholder="🔍 Search tasks..."
        placeholderTextColor="#888"
        value={searchText}
        onChangeText={setSearchText}
      />

      <Text style={styles.filterHeading}>Filter Tasks</Text>

      <View style={styles.filterContainer}>
        {(["All", "Pending", "Completed"] as FilterType[]).map(
          (filter) => (
            <Pressable
              key={filter}
              style={[
                styles.filterButton,
                selectedFilter === filter && styles.activeFilter,
              ]}
              onPress={() => setSelectedFilter(filter)}
            >
              <Text
                style={[
                  styles.filterText,
                  selectedFilter === filter && styles.activeFilterText,
                ]}
              >
                {filter}
              </Text>
            </Pressable>
          )
        )}
      </View>

      <Text style={styles.resultText}>
        Showing {filteredTasks.length} task(s)
      </Text>

      {filteredTasks.length === 0 ? (
        <Text style={styles.emptyText}>
          No matching tasks found.
        </Text>
      ) : (
        filteredTasks.map((item) => (
          <View key={item.id} style={styles.taskCard}>
            <Pressable
              style={styles.taskContent}
              onPress={() => toggleTask(item.id)}
            >
              <Text style={styles.check}>
                {item.completed ? "☑️" : "⬜"}
              </Text>

              <View style={styles.taskDetails}>
                <Text
                  style={[
                    styles.taskTitle,
                    item.completed && styles.completed,
                  ]}
                >
                  {item.title}
                </Text>

                {item.description !== "" && (
                  <Text style={styles.description}>
                    {item.description}
                  </Text>
                )}

                {item.dueDate && (
                  <Text style={styles.dueDate}>
                    📅 Due: {new Date(item.dueDate).toLocaleDateString("en-IN")}
                  </Text>
                )}

                {item.priority && (
                  <Text
                    style={[
                      styles.priority,
                      { color: getPriorityColor(item.priority) },
                    ]}
                  >
                    ● {item.priority} Priority
                  </Text>
                )}
              </View>
            </Pressable>

            <Pressable
              style={styles.deleteButton}
              onPress={() => deleteTask(item.id)}
            >
              <Text style={styles.deleteText}>🗑️</Text>
            </Pressable>
          </View>
        ))
      )}

      <Pressable
        style={styles.button}
        onPress={() => router.push("/add-task")}
      >
        <Text style={styles.buttonText}>+ Add New Task</Text>
      </Pressable>

      <Pressable
        style={styles.backButton}
        onPress={() => router.replace("/home")}
      >
        <Text style={styles.backText}>← Back to Home</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#F5F3FF",
  },
  container: {
    flex: 1,
    backgroundColor: "#F5F3FF",
    padding: 22,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4C1D95",
    marginTop: 35,
  },
  subtitle: {
    color: "#777",
    marginTop: 8,
    marginBottom: 25,
  },
  summary: {
    backgroundColor: "#DDD6FE",
    padding: 18,
    borderRadius: 15,
    marginBottom: 20,
  },
  summaryText: {
    color: "#4C1D95",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 4,
  },
  searchInput: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#DDD6FE",
    marginBottom: 20,
    color: "#333",
  },
  filterHeading: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4C1D95",
    marginBottom: 12,
  },
  filterContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  filterButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 10,
    paddingHorizontal: 17,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#DDD6FE",
  },
  activeFilter: {
    backgroundColor: "#6D28D9",
    borderColor: "#6D28D9",
  },
  filterText: {
    color: "#6D28D9",
    fontWeight: "600",
  },
  activeFilterText: {
    color: "#FFFFFF",
  },
  resultText: {
    color: "#777",
    marginBottom: 12,
  },
  taskCard: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 14,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
  },
  taskContent: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  check: {
    fontSize: 22,
    marginRight: 12,
  },
  taskDetails: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 15,
    color: "#4C1D95",
    fontWeight: "600",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "#999",
  },
  description: {
    color: "#888",
    fontSize: 13,
    marginTop: 5,
  },
  dueDate: {
    color: "#555",
    fontSize: 13,
    marginTop: 8,
  },
  priority: {
    fontSize: 13,
    fontWeight: "bold",
    marginTop: 6,
  },
  deleteButton: {
    padding: 8,
  },
  deleteText: {
    fontSize: 21,
  },
  emptyText: {
    color: "#777",
    textAlign: "center",
    marginTop: 35,
    fontSize: 16,
  },
  button: {
    backgroundColor: "#6D28D9",
    padding: 17,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 15,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    marginTop: 20,
    marginBottom: 30,
    alignItems: "center",
  },
  backText: {
    color: "#6D28D9",
    fontSize: 16,
  },
});
