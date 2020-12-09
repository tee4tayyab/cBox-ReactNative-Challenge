import React, { useEffect, useState } from "react";
import { Text, StyleSheet, View, Dimensions, ActivityIndicator, FlatList, SafeAreaView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addUsers, filterUsers, toFilterUsers } from "../redux/actions/dispatchers";
import axios from "axios";
import HeaderBar from "../components/Header";
import { CheckBox } from "react-native-elements";
const { width, height } = Dimensions.get("window");

const TYPE_COLORS = {
  0: "#48BEFF",
  1: "#3DFAFF",
  2: "#43C59E",
  3: "#3D7068",
  4: "#14453D",
};
// filter users on the basis of types selected.
const multiFilter = (arr, filters) => {
  const filterKeys = Object.keys(filters);
  return arr.filter((eachObj) => {
    return filterKeys.every((eachKey) => {
      if (!filters[eachKey].length) {
        return true; // passing an empty filter means that filter is ignored.
      }
      return filters[eachKey].includes(eachObj[eachKey]);
    });
  });
};
//Get Random Color Function.
const getRandomColor = () => {
  return TYPE_COLORS[Math.ceil(Math.random() * 5)];
};

function CBOXUsers() {
  const [loading, setLoadingState] = useState(false); //loading state for Activity Indicator
  const [types, setTypes] = useState([
    {
      typeId: 0,
      name: "Type 0",
      selected: false,
    },
    {
      typeId: 1,
      name: "Type 1",
      selected: false,
    },
    {
      typeId: 2,
      name: "Type 2",
      selected: false,
    },
    {
      typeId: 3,
      name: "Type 3",
      selected: false,
    },
    {
      typeId: 4,
      name: "Type 4",
      selected: false,
    },
  ]); //Types of Filters
  const [recentSelectedType, setRecentSelectedType] = useState(null); //recently selected type filter

  const users = useSelector((state) => state.users.users); //State Hook for Redux
  const filteredUsers = useSelector((state) => state.filteredUsers.filteredUsers); //State Hook for Redux
  const toFilter = useSelector((state) => state.toFilter.toFilter); //State Hook for Redux

  const dispatch = useDispatch(); //Dispatch Hook for Redux.

  useEffect(() => {
    apiRequest();
  }, []);

  useEffect(() => {}, [users, filteredUsers]);

  //API CALL TO FETCH DATA
  const apiRequest = async () => {
    try {
      setLoadingState(true);
      let response = await axios.get("http://www.mocky.io/v2/5d889c8a3300002c0ed7da42");
      if (response.data) {
        dispatch(addUsers(response.data.items));
        setLoadingState(false);
      }
    } catch (error) {
      console.log("error : ", error);
      setLoadingState(false);
    }
  };

  //On Pressing Check Box to Filter Users based on Types.
  const onCheckBoxPressed = (item) => {
    let allTypes = types.filter((element) => {
      if (element.typeId == item.typeId) {
        element.selected = !item.selected;
        setRecentSelectedType(item.typeId);
      }
      return element;
    });
    setTypes(allTypes);
    let toFilterValues = [];
    types.forEach((ele) => {
      if (ele.selected) {
        toFilterValues.push(ele.typeId);
      }
    });
    dispatch(toFilterUsers(toFilterValues));
    dispatch(filterUsers(multiFilter(users, { type: toFilterValues })));
  };

  //Render Flatlist of Filter Types.
  const renderItem = ({ item, index }) => {
    return <CheckBox key={index} title={item.name} textStyle={{ fontSize: 14, fontWeight: "600" }} checked={item.selected} onPress={() => onCheckBoxPressed(item)} right={true} wrapperStyle={{ height: 40 }} containerStyle={styles.checkBoxContainer} />;
  };

  //Render Flatlist of Users
  const renderUsers = ({ item, index }) => {
    return (
      <View key={index} style={styles.item}>
        <View style={{ backgroundColor: getRandomColor(), width: 15, marginLeft: 10, height: 160, alignSelf: "center" }} />
        <View style={styles.detailsWallet}>
          <View>
            <Text style={styles.username}>{item.fullName}</Text>
            <Text style={styles.email}>{item.email}</Text>
          </View>
          <View style={styles.walletContainer}>
            <View style={styles.badgeAmountContainer}>
              <View style={styles.badge}>
                <Text style={styles.badgeNumber}>1</Text>
              </View>
              <Text style={styles.walletText}>{item.wallet1}</Text>
            </View>
            <View style={styles.badgeAmountContainer}>
              <View style={styles.badge}>
                <Text style={styles.badgeNumber}>2</Text>
              </View>
              <Text style={styles.walletText}>{item.wallet2}</Text>
            </View>
            <View style={styles.badgeAmountContainer}>
              <View style={styles.badge}>
                <Text style={styles.badgeNumber}>3</Text>
              </View>
              <Text style={styles.walletText}>{item.wallet3}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {/* Header Component with Search Bar and Filter dropdown */}
      <HeaderBar />
      {/* Section List to show Sections of Album */}
      {/* Show Loader while Fetching Data from API Call */}
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
          <ActivityIndicator color={"#2D333A"} size='large' style={{ alignSelf: "center" }} />
        </View>
      ) : (
        <SafeAreaView style={{ flex: 1 }}>
          {/* Types CheckBoxes Horizontal Flatlist */}
          <FlatList data={types} renderItem={renderItem} showsHorizontalScrollIndicator={false} contentContainerStyle={styles.checkBoxFlatListContainer} extraData={recentSelectedType} horizontal={true} keyExtractor={(item, index) => index.toString()} />
          {/* User's Flatlist */}
          <FlatList data={filteredUsers.length == 0 && toFilter.length == 0 ? users : filteredUsers} renderItem={renderUsers} extraData={users} keyExtractor={(item, index) => index.toString()} />
        </SafeAreaView>
      )}
    </View>
  );
}

export default CBOXUsers;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    flex: 1,
    width: width * 0.96,
    height: 180,
    marginTop: 10,
    backgroundColor: "#e4e7ed",
    borderRadius: 5,
    overflow: "hidden",
    alignSelf: "center",
    flexDirection: "row",
  },
  username: {
    fontSize: 14,
    fontWeight: "600",
  },
  email: {
    fontSize: 13,
  },
  detailsWallet: {
    flex: 1,
    padding: 10,
    justifyContent: "space-between",
  },
  badgeAmountContainer: {
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
  },
  badge: {
    backgroundColor: "#a3a3a3",
    height: 70,
    width: 70,
    borderRadius: 70,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  walletText: {
    fontSize: 16,
  },
  walletContainer: {
    height: 100,
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  badgeNumber: {
    fontSize: 20,
    fontWeight: "600",
  },
  headerContainer: {
    width: "95%",
    height: 30,
    alignSelf: "center",
    paddingLeft: 20,
    backgroundColor: "#2D333A",
    borderRadius: 3,
    marginTop: 3,
  },
  checkBoxFlatListContainer: {
    borderBottomColor: "#2D333A",
    borderBottomWidth: 0.4,
    justifyContent: "space-between",
    paddingVertical: 5,
    flexGrow: 1,
  },
  checkBoxContainer: {
    height: 40,
    width: 100,
    padding: 0,
    justifyContent: "center",
    backgroundColor: "transparent",
    borderColor: "transparent",
  },
});
