
import { StyleSheet, Text, View } from "react-native";

export default function CustomCard({ title, description }: any) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>

      <Text style={styles.description}>
        {description}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    borderRadius: 15,
    marginBottom: 15,
    elevation: 3,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#5B21B6",
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    color: "#666078",
    lineHeight: 22,
  },
});
