import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Provider } from "react-redux";

import configureStore from "./store";
import CBOXUsers from "./source/screens/CBOXUsers";
import { StatusBar } from "expo-status-bar";

const store = configureStore();
function App() {
  return (
    <Provider store={store}>
      <StatusBar style='dark' />
      <CBOXUsers />
    </Provider>
  );
}
export default App;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
