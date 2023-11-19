import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import ScreenWrapperComp from "../../../components/shared/ScreenWrapperComp";
import { useLocalSearchParams } from "expo-router";
import { Button, Text } from "react-native-paper";
import { GameDBType } from "../../../firebase/types/DBTypes";
import { getGameInfoFromDB } from "../../../firebase/firebase.function";
import { useAppTheme } from "../../_layout";
import { _getUserId } from "../../context/auth.store";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase/Firebase.Config';

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
    //get input from gamecode join game, look for game code inside Game collection, if it doesn't exist return error, if it does exist send user to lobby, with the game ID.

    // send user to lobby with this: router.push( { pathname: "/creategame/lobby", params: { gameId: gameId  } });
    // (app\(tabs)\creategame\create.tsx)
    // do it with joinGameDoc function, "const gameId = await joinGameDoc(gameInfo);"
    /*
    Where the shit is at:
    searchThroughDocs: firebase.function.ts
    */



    
    


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
    const uuid = await _getUserId();
    // console.log(tradeId, "trade")
    const unsub = onSnapshot(doc(db, "games", gameId.gameId as string || ""), (doc) => {
      if (doc.exists()) {
        const gameInfo = doc.data() as GameDBType;
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
  }, [])

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
      >
        Close Game
      </Button>
    </ScreenWrapperComp>
  );
};

export default lobby;
