import React from "react";
import { Text } from "react-native";
import { Header } from "react-native-elements";
export default function HeaderBar() {
  return (
    <Header
      backgroundColor={"#e4e7ee"}
      centerComponent={
        <Text
          style={{
            color: "#2D333A",
            fontSize: 16,
            fontWeight: "600",
          }}>
          CBOX Users
        </Text>
      }
      containerStyle={{ borderBottomColor: "transparent" }}
      statusBarProps={{ translucent: true }}
    />
  );
}
