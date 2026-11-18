
import { StyleSheet, Text, View } from "react-native";

export default function CustomList({ title }: any) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>• {title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#DDD6FE",
  },

  title: {
    fontSize: 16,
    color: "#4C1D95",
  },
});
