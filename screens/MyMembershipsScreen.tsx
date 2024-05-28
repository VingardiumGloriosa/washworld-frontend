import React, { useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { fetchMembershipTypesData, addMembership, removeMembership, togglePauseMembership } from "../state/slices/membershipsSlice";
import ArrowIcon from "../assets/svg/leftArrow.svg";
import { RootState, AppDispatch } from "../state/store";

const MyMembershipsScreen = () => {
  const navigation = useNavigation();
  const dispatch: AppDispatch = useDispatch();

  const { membershipTypes, loading, error, activeMembership, isPaused } = useSelector((state: RootState) => state.memberships);
  const { currentUser } = useSelector((state: RootState) => state.users);

  useEffect(() => {
    console.log("currentUser:", currentUser);
    dispatch(fetchMembershipTypesData());
  }, [dispatch, currentUser]);

  useEffect(() => {
    console.log("Active membership:", activeMembership);
  }, [activeMembership]);

  const handlePauseMembership = () => {
    console.log("Pausing membership for", currentUser?.id);
    if (currentUser) {
      dispatch(togglePauseMembership({ userId: currentUser.id, isPaused }));
    }
  };

  const handleCancelMembership = () => {
    console.log("Cancelling membership for", currentUser?.id);
    if (currentUser) {
      dispatch(removeMembership(currentUser.id));
    }
  };

  const handleUpdateMembership = (membershipTypeId: number) => {
    console.log("Updating membership for", currentUser?.id, "to", membershipTypeId);
    if (currentUser) {
      if (currentUser.membership_id) {
        Alert.alert("Cannot Update Membership", "You must cancel your current membership before updating to a new one.", [{ text: "OK" }]);
      } else {
        dispatch(addMembership({ userId: currentUser.id, membershipTypeId }));
      }
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
      <View style={styles.container}>
        <TouchableOpacity style={styles.arrowContainer} onPress={() => navigation.goBack()}>
          <ArrowIcon width={25} height={25} fill={"#808285"} />
        </TouchableOpacity>
        <Image source={require("../assets/images/profile-pic.png")} style={styles.profileImage} />
        <Text style={styles.carrieTitle}>{currentUser?.username}</Text>
        <Text style={styles.membershipsTitle}>My Memberships</Text>
        {activeMembership ? (
          <View>
            <View style={[styles.membershipContainer, isPaused && styles.pausedMembership]}>
              <View style={styles.leftContainer}>
                <Text style={styles.membershipText}>{activeMembership.name}</Text>
                {isPaused && <Text style={styles.pausedText}>Paused</Text>}
              </View>
              <View style={styles.rightContainer}>
                <Text style={styles.priceText}>
                  {activeMembership.price} {activeMembership.currency} /month
                </Text>
              </View>
            </View>
            <Text style={styles.membershipsTitle}>Next payment charge is due May 8th Active since 2023 December 8th</Text>
            <Text style={styles.membershipDesription}>Billing Details</Text>
            <Text style={styles.membershipDesription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam egestas turpis libero, placerat pharetra lectus vestibulum a. Donec elementum, metus vitae porttitor efficitur, mauris ex hendrerit velit, vel tempus lorem turpis vitae
              arcu.
            </Text>
          </View>
        ) : (
          <Text style={styles.noMembershipText}>You don't have an active subscription.</Text>
        )}

        {activeMembership && (
          <View style={styles.membershipContainer}>
            <TouchableOpacity style={styles.leftContainer} onPress={handlePauseMembership}>
              <Text style={styles.membershipText}>{isPaused ? "Resume" : "Pause"}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rightContainerOrange} onPress={handleCancelMembership}>
              <Text style={styles.priceText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        )}

        {/*This is the same as the code above, but with a hardcoded membership type*/}

        {/* <View style={styles.membershipContainer}>
          <View style={styles.leftContainer}>
            <Text style={styles.membershipText}>Premium Plus (1 car)</Text>
          </View>

          <View style={styles.rightContainer}>
            <Text style={styles.priceText}>99kr. /month</Text>
          </View>
        </View>

        <Text style={styles.membershipsTitle}>Next payment charge is due May 8th Active since 2023 December 8th</Text>
        <Text style={styles.membershipDesription}>Billing Details</Text>
        <Text style={styles.membershipDesription}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam egestas turpis libero, placerat pharetra lectus vestibulum a. Donec elementum, metus vitae porttitor efficitur, mauris ex hendrerit velit, vel tempus lorem turpis vitae arcu.
        </Text>
        <View style={styles.membershipContainer}>
          <TouchableOpacity style={styles.leftContainer}>
            <Text style={styles.membershipText}>Pause</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.rightContainerOrange} onPress={handleCancelMembership}>
            <Text style={styles.priceText}>Cancel</Text>
          </TouchableOpacity>
        </View> */}

        {/*end of hardcoded membership type*/}

        {/*all memberships*/}

        <Text style={styles.membershipsTitle2}>Upgrade/downgrade membership</Text>
        {membershipTypes.map((membership) => (
          <TouchableOpacity key={membership.id} style={styles.membershipContainer} onPress={() => handleUpdateMembership(membership.id)}>
            <View style={styles.leftContainer}>
              <Text style={styles.membershipText}>{membership.name}</Text>
            </View>
            <View style={styles.rightContainer}>
              <Text style={styles.priceText}>
                {membership.price} {membership.currency} /month
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 16,
  },
  arrowContainer: {
    position: "absolute",
    top: 60,
    left: 20,
    zIndex: 10,
    backgroundColor: "#F2F3F4",
    height: 40,
    width: 40,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  profileImage: {
    width: 248,
    height: 248,
    alignSelf: "center",
    marginTop: 80,
    borderRadius: 200,
  },
  carrieTitle: {
    color: "#1E1E1E",
    fontFamily: "Gilroy-ExtraBold",
    fontSize: 20,
    textAlign: "center",
    marginTop: 20,
  },
  membershipsTitle: {
    color: "#57585A",
    fontFamily: "Gilroy-ExtraBold",
    fontSize: 14,
    textAlign: "left",
    marginTop: 10,
  },
  membershipContainer: {
    flexDirection: "row",
    marginTop: 20,
    overflow: "hidden",
    backgroundColor: "#F2F3F4",
  },
  pausedMembership: {
    opacity: 0.5,
  },
  leftContainer: {
    flex: 3, // Adjusted to 60%
    backgroundColor: "#F2F3F4", // Gray background
    paddingVertical: 25,
    justifyContent: "center", // Center text vertically
  },
  rightContainer: {
    flex: 2, // Adjusted to 40%
    backgroundColor: "#34B566",
    justifyContent: "center",
    transform: [{ skewX: "-30deg" }],
    marginRight: -20,
    paddingRight: 15,
  },
  membershipText: {
    color: "#1E1E1E",
    fontFamily: "Gilroy-Regular",
    fontSize: 18,
    textAlign: "center", // Center text horizontally
  },
  pausedText: {
    fontWeight: "bold",
    color: "#ff0000",
    fontFamily: "Gilroy-Regular",
    fontSize: 18,
    textAlign: "center",
  },
  priceText: {
    color: "#fff",
    fontFamily: "Gilroy-Regular",
    fontSize: 18,
    textAlign: "center", // Center text horizontally
    transform: [{ skewX: "30deg" }],
  },
  membershipDesription: {
    color: "#57585A",
    fontFamily: "Gilroy-Regular",
    fontSize: 14,
    textAlign: "left",
    marginTop: 10,
  },
  rightContainerOrange: {
    flex: 2, // Adjusted to 40%
    backgroundColor: "#F36A21",
    justifyContent: "center",
    transform: [{ skewX: "-30deg" }],
    marginRight: -20,
    paddingRight: 15,
  },
  membershipsTitle2: {
    color: "#57585A",
    fontFamily: "Gilroy-ExtraBold",
    fontSize: 14,
    textAlign: "left",
    marginTop: 50,
  },
  noMembershipText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#1E1E1E",
    fontFamily: "Gilroy-Regular",
  },
});

export default MyMembershipsScreen;
