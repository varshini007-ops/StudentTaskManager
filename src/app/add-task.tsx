
import AsyncStorage from "@react-native-async-storage/async-storage";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Alert,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

const STORAGE_KEY = "student_tasks";

type Priority = "High" | "Medium" | "Low";
type Category = "Study" | "Assignment" | "Project" | "Personal";

export default function AddTaskScreen() {
  const router = useRouter();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [priority, setPriority] = useState<Priority>("Medium");
  const [category, setCategory] = useState<Category>("Study");

  const handleAddTask = async () => {
    if (title.trim() === "") {
      Alert.alert("Error", "Please enter task title");
      return;
    }

    try {
      const savedTasks = await AsyncStorage.getItem(STORAGE_KEY);
      const tasks = savedTasks ? JSON.parse(savedTasks) : [];

      const newTask = {
        id: Date.now(),
        title: title.trim(),
        description: description.trim(),
        completed: false,
        dueDate: dueDate.toISOString(),
        priority,
        category,
      };

      tasks.unshift(newTask);

      await AsyncStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(tasks)
      );

      Alert.alert("Success", "Task added successfully!", [
        {
          text: "OK",
          onPress: () => router.replace("/tasks"),
        },
      ]);
    } catch (error) {
      Alert.alert("Error", "Unable to add task");
      console.log(error);
    }
  };

  const onDateChange = (event: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
    }

    if (selectedDate) {
      setDueDate(selectedDate);
    }
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <Text style={styles.heading}>Add New Task</Text>
      <Text style={styles.subtitle}>
        Create and organize your tasks
      </Text>

      <Text style={styles.label}>Task Title</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter task title"
        value={title}
        onChangeText={setTitle}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.descriptionInput}
        placeholder="Enter task description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Due Date</Text>

      <Pressable
        style={styles.dateButton}
        onPress={() => setShowDatePicker(true)}
      >
        <Text style={styles.dateText}>
          📅 {dueDate.toLocaleDateString("en-IN")}
        </Text>
        <Text style={styles.changeText}>Select Date</Text>
      </Pressable>

      {showDatePicker && (
        <DateTimePicker
          value={dueDate}
          mode="date"
          display="default"
          minimumDate={new Date()}
          onChange={onDateChange}
        />
      )}

      <Text style={styles.label}>Priority</Text>

      <View style={styles.priorityContainer}>
        {(["High", "Medium", "Low"] as Priority[]).map((item) => (
          <Pressable
            key={item}
            style={[
              styles.priorityButton,
              priority === item && styles.selectedPriority,
              item === "High" && styles.highBorder,
              item === "Medium" && styles.mediumBorder,
              item === "Low" && styles.lowBorder,
            ]}
            onPress={() => setPriority(item)}
          >
            <Text
              style={[
                styles.priorityText,
                priority === item && styles.selectedPriorityText,
              ]}
            >
              {item}
            </Text>
          </Pressable>
        ))}
      </View>

      <Text style={styles.label}>Category</Text>

      <View style={styles.categoryContainer}>
        {(["Study", "Assignment", "Project", "Personal"] as Category[]).map(
          (item) => (
            <Pressable
              key={item}
              style={[
                styles.categoryButton,
                category === item && styles.selectedCategory,
              ]}
              onPress={() => setCategory(item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  category === item && styles.selectedCategoryText,
                ]}
              >
                {item}
              </Text>
            </Pressable>
          )
        )}
      </View>

      <Pressable
        style={styles.addButton}
        onPress={handleAddTask}
      >
        <Text style={styles.addButtonText}>Save Task</Text>
      </Pressable>

      <Pressable
        style={styles.backButton}
        onPress={() => router.back()}
      >
        <Text style={styles.backText}>← Cancel</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F3FF",
  },
  content: {
    padding: 22,
    paddingTop: 45,
    paddingBottom: 40,
  },
  heading: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4C1D95",
  },
  subtitle: {
    color: "#777",
    marginTop: 8,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#4C1D95",
    marginBottom: 9,
    marginTop: 16,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    fontSize: 15,
    borderWidth: 1,
    borderColor: "#DDD6FE",
    color: "#333",
  },
  descriptionInput: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 15,
    fontSize: 15,
    height: 90,
    textAlignVertical: "top",
    borderWidth: 1,
    borderColor: "#DDD6FE",
    color: "#333",
  },
  dateButton: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#DDD6FE",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    color: "#4C1D95",
    fontSize: 16,
    fontWeight: "600",
  },
  changeText: {
    color: "#6D28D9",
    fontSize: 13,
  },
  priorityContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  priorityButton: {
    flex: 1,
    padding: 13,
    marginHorizontal: 4,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  highBorder: {
    borderColor: "#EF4444",
  },
  mediumBorder: {
    borderColor: "#F59E0B",
  },
  lowBorder: {
    borderColor: "#16A34A",
  },
  selectedPriority: {
    backgroundColor: "#6D28D9",
    borderColor: "#6D28D9",
  },
  priorityText: {
    color: "#4C1D95",
    fontWeight: "bold",
  },
  selectedPriorityText: {
    color: "#FFFFFF",
  },
  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  categoryButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#DDD6FE",
  },
  selectedCategory: {
    backgroundColor: "#6D28D9",
    borderColor: "#6D28D9",
  },
  categoryText: {
    color: "#4C1D95",
    fontWeight: "bold",
  },
  selectedCategoryText: {
    color: "#FFFFFF",
  },
  addButton: {
    backgroundColor: "#6D28D9",
    padding: 17,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 30,
  },
  addButtonText: {
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
});
