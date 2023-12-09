import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import ScreenWrapperComp from "../../../components/shared/ScreenWrapperComp";
import { useLocalSearchParams } from "expo-router";
import { Button, Text } from "react-native-paper";
import { GameDBType } from "../../../firebase/types/DBTypes";
import {getGameInfoFromDB } from "../../../firebase/firebase.function";
import { useAppTheme } from "../../_layout";
import { _getUserId } from "../../context/auth.store";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase/Firebase.Config';
import { router } from "expo-router";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "80%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
});

const lobby: FC = () => {
  const gameId = useLocalSearchParams();

  const [gameInfo, setGameInfo] = useState<GameDBType>({
    name: "",
    currCount: 0,
    id: "",
    numObjectives: 0,
    ready: false,
    winner: "",
    gameCode: "",
    maxPlayers: 0,
  });

  const handleGameChange = async () => {
    // const uuid = await _getUserId(); //never used???
    // console.log(tradeId, "trade")
    const unsub = onSnapshot(doc(db, "games", gameId.gameId as string || ""), (doc) => {
      if (doc.exists()) {
        const gameInfo = doc.data() as GameDBType; //everytime lobby component renders, useEffect runs, meaning this runs and you fetch data from doc, and you check for that.
        console.log("doc exits", gameInfo)
        setGameInfo(gameInfo);
        if (gameInfo.ready || gameInfo.currCount === gameInfo.maxPlayers) {
          console.log("game is ready")
        }
      }
      
    })
    return unsub
  }

  useEffect(() => {
    handleGameChange();
  }, []) //wtf? So somehow, the "onSnapShot" listener for document change is running CONSTANTLY NON STOP? How is this happening? How tf is the component rerendering and triggering useEffect everytime the document changes??
  //but it doesn't matter --- this is how you get up to date info from a doc apparently.



  const closeGame = async() => {
    // ... //first, set games/gameID.gameState to "closed".
    router.push( { pathname: "/creategame/create" }); // push yourself to the create page.
    Alert.alert("The Game Has been Closed!!!"); // 

  }

  const {
    colors: { primary },
  } = useAppTheme();
  return (
    <ScreenWrapperComp>
      <View style={styles.wrapper}>
        <Text variant="displaySmall" style={{marginTop: 30, color: primary}}>Game Name: {gameInfo.name}</Text>
        <Text variant="titleLarge" style={{marginTop: 30}}>Game Code: {gameInfo.gameCode}</Text>
        <Text variant="headlineMedium" style={{marginTop: 30, fontWeight: '500'}}>{gameInfo.currCount} / {gameInfo.maxPlayers}</Text>
        <Text variant="titleMedium" style={{marginTop: 30}}>players have joined</Text>
      </View>
      <Button
        mode="contained"
        style={{
          marginTop: 20,
          width: "60%",
          alignSelf: "center",
          position: "absolute",
          bottom: 0,
        }}
        onPress={closeGame}
      >
        Close Game
      </Button>
    </ScreenWrapperComp>
  );
};

export default lobby;
