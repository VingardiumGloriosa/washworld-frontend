import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  FlatList,
  Text,
  StyleSheet,
  ActivityIndicator,
  Image,
  View,
} from "react-native";
import Title from "../components/Title";
import NotificationIcon from "../assets/svg/notification.svg";
import NotificationCard from "../components/NotificationCard";

// Separate fetch function for notifications
const fetchNotifications = async () => {
  try {
    return [
      {
        id: "1",
        title: "Double Loyalty Points",
        description:
          "Visit our new wash hall for double loyalty points until May 30th",
        image: require("../assets/images/hall.jpeg"),
      },
      {
        id: "2",
        title: "Scheduled Maintenance",
        description:
          "Our service will be offline for scheduled maintenance on June 5th",
      },
      {
        id: "3",
        title: "New Feature Release",
        description: "Check out the new features in our latest app update!",
      },
    ];
  } catch (e) {
    throw new Error("Failed to fetch notifications.");
  }
};

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadNotifications = async () => {
      try {
        const data = await fetchNotifications();
        setNotifications(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    loadNotifications();
  }, []);

  const deleteNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  const renderNotification = ({ item }) => (
    <NotificationCard
      ImageComponent={
        item.image ? (
          <Image source={item.image} style={{ width: "100%", height: 200 }} />
        ) : null
      }
      title={item.title}
      description={item.description}
      onDelete={() => deleteNotification(item.id)}
    />
  );

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.center}>
        <Text>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Title
        text="Notifications"
        Icon={NotificationIcon}
        width={30}
        height={30}
      />
      <FlatList
        data={notifications}
        renderItem={renderNotification}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
      <Text style={styles.manageButton}>{"Manage Notifications"}</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f0f0f0",
  },
  list: {
    padding: 10,
  },
  manageButton: {
    backgroundColor: "#34B566",
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    paddingVertical: 15,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 30,
    fontFamily: "Gilroy-Regular",
  },
  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NotificationScreen;
