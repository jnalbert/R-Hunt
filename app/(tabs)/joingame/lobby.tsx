import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet, Alert } from "react-native";
import ScreenWrapperComp from "../../../components/shared/ScreenWrapperComp";
import { router, useLocalSearchParams } from "expo-router";
import { Button, Text } from "react-native-paper";
import { GameDBType } from "../../../firebase/types/DBTypes";
import { useAppTheme } from "../../_layout";
import { _getUserId } from "../../context/auth.store";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase/Firebase.Config';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
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
    finished: false,
  });

  const handleGameChange = async () => {
    const uuid = await _getUserId();
    console.log("\n\n\n\n\nnot running this!!!!!!!!");

    let gameInfo1 = null;
    const unsub = onSnapshot(doc(db, "games", gameId.gameId as string || ""), (doc) => {
      console.log("should only see this");
      if (doc.exists()) {
        gameInfo1 = doc.data() as GameDBType;
        console.log("gameinfo1111");
        console.log(gameInfo1);

        setGameInfo(gameInfo1);
        
        // console.log("gameinfo after update");
        // console.log(gameInfo);
        
        if (gameInfo1.ready || gameInfo1.currCount === gameInfo1.maxPlayers) {
          router.push( { pathname: "/game", params: { gameId: gameId.gameId  } });
        }
      } else {
        console.log("critical error: document not found");
      }
      
    })
    console.log("gameinfo1!!");
    console.log(gameInfo1);
    console.log("did we respond to the game closing???" + gameInfo1.finished);


    if (gameInfo1 != null && gameInfo1.finished) { //the game has ended!!!
      console.log("The game has ended!");
      Alert.alert("The Game Has been Closed!!!");
      router.push({ pathname: "/joingame"});

    }

    console.log("finished with handlegamechange");

    return unsub;
  }

  useEffect(() => {
    console.log("\n\n\n\n\nalso shouldn't be seeing this");
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
    </ScreenWrapperComp>
  );
};

export default lobby;
