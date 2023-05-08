import { createStackNavigator } from '@react-navigation/stack'
import { screens } from '../RouteItems'
import { useEffect, useState } from "react";
import { Text, FlatList, SafeAreaView, StyleSheet } from "react-native";
import InputTask from  "~/components/InputTask"
import Task from "~/components/Task";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import { StatusBar } from "expo-status-bar";

const Stack = createStackNavigator()

function Home () {
  const [todos, setTodos] = useState([]);
  const userid=1
  const fecha = new Date().toISOString()
  useEffect(() => {
    fetchTodos()
    .catch(e => {
      console.error(e)
      return e;
  })
  }, []);
  async function fetchTodos() {
    // const response = await fetch("http://192.168.100.209:8080/todos/"+userid, {
    const response = await fetch("http://192.168.100.209:8080/todos/"+userid+"/2023-05-05", {
    // const response = await fetch("https://apiexpress-hu67.onrender.com/todos/"+userid+"/"+fecha.split("T")[0], {
    // const response = await fetch("https://apiexpress-hu67.onrender.com/todos/"+userid+"/"+fecha.split("T")[0], {
      headers: {
        "x-api-key": "abcdef123456",
      },
    });
    const data = await response.json();
    setTodos(data);
  }

  function clearTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleTodo(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id
          ? { ...todo, completed: todo.completed === 1 ? 0 : 1 }
          : todo
      )
    );
  }
  return (
  // <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //   <Text>Home perdido screen!</Text>
    <BottomSheetModalProvider>
      <StatusBar />
      <SafeAreaView style={styles.container}>
      
        <FlatList
          data={todos}
          contentContainerStyle={styles.contentContainerStyle}
          keyExtractor={(todo) => todo.id}
          renderItem={({ item }) => (
            <Task {...item} toggleTodo={toggleTodo} clearTodo={clearTodo} />
          )}
          ListHeaderComponent={() => <Text style={styles.title}>RETOS</Text>}
        />
        <InputTask todos={todos} setTodos={setTodos} />
      </SafeAreaView>
    </BottomSheetModalProvider>
  // </View>
)}

export default function HomeStackNavigator () {
  return (
    <Stack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name={screens.Home} component={Home} />
    </Stack.Navigator>
  )
}

// export default HomeStackNavigator

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#E9E9EF",
  },
  contentContainerStyle: {
    padding: 15,
  },
  title: {
    fontWeight: "800",
    fontSize: 28,
    marginBottom: 15,
  },
});