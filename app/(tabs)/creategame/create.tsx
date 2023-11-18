import { Button, Divider, Text, TextInput } from "react-native-paper";
import ScreenWrapperComp from "../../../components/shared/ScreenWrapperComp";
import { useAppTheme } from "../../_layout";
import React, { FC, useEffect, useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { MediaTypeOptions, getCameraPermissionsAsync, launchCameraAsync, requestCameraPermissionsAsync } from "expo-image-picker";
import Objective from "../../../components/createGame/objective";
import { getCurrentPositionAsync, requestForegroundPermissionsAsync } from "expo-location";

const styles = StyleSheet.create({
  wrapper: {
    // flex: 1,
    width: "80%",
    justifyContent: "flex-start",
    // alignItems: 'center',
  },
  objectivesWrapper: {
    width: "100%",
    maxHeight: 300,
    // padding: 10,
  },
});

export interface ObjectiveType {
  photoUrl: string;
  number: number;
  longitude: number;
  latitude: number;
}

export interface GameInfo {
  name: string;
  playerCount: number;
  objectives: ObjectiveType[];
}

export default function CreateScreen() {
  const {
    colors: { secondary },
  } = useAppTheme();

  const [gameInfo, setGameInfo] = useState<GameInfo>({
    name: "",
    playerCount: 0,
    objectives: [],
  });

  useEffect(() => {
    (async () => {
      const { status } = await requestCameraPermissionsAsync();
    })();
  }, []);

  const onAddObjective = async () => {

    const {status} = await getCameraPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Sorry, we need camera roll permissions to make this work!");
      return
    }

    // get location persmissions
    let locationStats = await requestForegroundPermissionsAsync();
      if (locationStats.status !== 'granted') {
        Alert.alert('Permission to access location was denied');
        return;
      }

    // open the camera
    const imageUrl = await launchCameraAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsMultipleSelection: false,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    })
    if (imageUrl.canceled) return;
    // add a new objective to the objectives array
    const location = await getCurrentPositionAsync({timeInterval: 300});


    console.log(location)
    setGameInfo({
      ...gameInfo,
      objectives: [
        ...gameInfo.objectives,
        {
          photoUrl: imageUrl.assets[0].uri,
          number: gameInfo.objectives.length + 1,
          longitude: location.coords.longitude,
          latitude: location.coords.latitude,
        },
      ],
    });
  }

  const createGamePress = () => {
    if (gameInfo.name === "") return Alert.alert("Please enter a game name");
    if (gameInfo.playerCount === 0)
      return Alert.alert("Please enter a player count");
    if (gameInfo.objectives.length === 0)
      return Alert.alert("Please add at least one objective");

    console.log(gameInfo);
  }

  return (
    <ScreenWrapperComp>
      <View style={styles.wrapper}>
        <TextInput
          mode="outlined"
          label="Game Name"
          value={gameInfo.name}
          onChangeText={(text) => setGameInfo({ ...gameInfo, name: text })}
        />
        <TextInput
          style={{ marginTop: 15 }}
          mode="outlined"
          label="Player Count"
          value={
            gameInfo.playerCount.toString() === "0"
              ? ""
              : gameInfo.playerCount.toString()
          }
          onChangeText={(text) =>
            setGameInfo({ ...gameInfo, playerCount: Number(text) })
          }
        />
        <Text
          variant="titleLarge"
          style={{ color: secondary, fontWeight: "600", marginTop: 20 }}
        >
          Objectives
        </Text>
        <Divider style={{ marginRight: 10, marginTop: 5, marginBottom: 10 }} />
        <ScrollView style={styles.objectivesWrapper} >
          {gameInfo.objectives.length === 0 && <Text variant="bodySmall">No objectives added</Text>}
          {gameInfo.objectives.map((obj, index) => (
            <Objective key={index} {...obj} />
          ))}
        </ScrollView>
        <Button
          icon="camera"
          mode="outlined"
          style={{ marginTop: 20, width: "60%", alignSelf: "center" }}
          onPress={onAddObjective}
        >
          Add Objective
        </Button>
      </View>
      <Button
        icon="camera"
        mode="contained"
        style={{
          marginTop: 20,
          width: "60%",
          alignSelf: "center",
          position: "absolute",
          bottom: 0,
        }}
        onPress={createGamePress}
      >
        Create Game
      </Button>
    </ScreenWrapperComp>
  );
}
