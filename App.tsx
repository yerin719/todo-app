import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  NativeSyntheticEvent,
  TextInputSubmitEditingEventData,
  ScrollView,
} from "react-native";
import { theme } from "./colors";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

type Todos = {
  [key: string]: { text: string; isWork: boolean };
};

export default function App() {
  const [isWork, setIsWork] = useState(true);
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todos>({});

  useEffect(() => {
    (async () => {
      await loadTodos();
    })();
  }, []);

  const onSaveTodos = async (todos: Todos) => {
    await AsyncStorage.setItem("todos", JSON.stringify(todos));
  };

  const loadTodos = async () => {
    const todos = await AsyncStorage.getItem("todos");

    if (todos) {
      setTodos(JSON.parse(todos));
    }
  };

  const onPressTravel = () => {
    setIsWork(false);
  };
  const onPressWork = () => {
    setIsWork(true);
  };
  const onChangeText = (text: string) => {
    setText(text);
  };
  const addTodo = async (
    e: NativeSyntheticEvent<TextInputSubmitEditingEventData>,
  ) => {
    const { text } = e.nativeEvent;
    if (!text) return;

    const newTodo = Object.assign({}, todos, {
      [Date.now()]: { text, isWork },
    });

    setTodos(newTodo);
    await onSaveTodos(newTodo);
    setText("");
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
        onSubmitEditing={addTodo}
        returnKeyType="done"
        value={text}
        onChangeText={onChangeText}
        style={styles.input}
        placeholder={isWork ? "Add a To Do" : "Where do you want to go"}
      />
      <ScrollView>
        {Object.keys(todos).map((key) => {
          const todo = todos[key];

          return todos[key].isWork === isWork ? (
            <View style={styles.todo} key={key}>
              <Text style={styles.todoText}>{todo.text}</Text>
            </View>
          ) : null;
        })}
      </ScrollView>
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
  todo: {
    backgroundColor: "white",
    paddingHorizontal: 20,
    paddingVertical: 15,
    borderRadius: 20,
    marginTop: 10,
  },
  todoText: {
    fontWeight: "500",
  },
});
