import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { theme } from "./colors";
import { useState } from "react";

export default function App() {
  const [isWork, setIsWork] = useState(true);
  const [text, setText] = useState("");

  const onPressTravel = () => {
    setIsWork(false);
  };
  const onPressWork = () => {
    setIsWork(true);
  };
  const onChangeText = (text: string) => {
    setText(text);
  };

  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <View style={styles.header}>
        <TouchableOpacity onPress={onPressWork}>
          <Text
            style={{
              ...styles.headerBtn,
              color: isWork ? "white" : theme.gray,
            }}
          >
            Work
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onPressTravel}>
          <Text
            style={{
              ...styles.headerBtn,
              color: !isWork ? "white" : theme.gray,
            }}
          >
            Travel
          </Text>
        </TouchableOpacity>
      </View>
      <TextInput
        onChangeText={onChangeText}
        style={styles.input}
        placeholder={isWork ? "Add a To Do" : "Where do you want to go"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bg,
    paddingHorizontal: 20,
  },
  header: {
    justifyContent: "space-between",
    flexDirection: "row",
    marginTop: 100,
  },
  headerBtn: {
    fontSize: 38,
    fontWeight: "600",
    color: "#fff",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    marginTop: 10,
  },
});
