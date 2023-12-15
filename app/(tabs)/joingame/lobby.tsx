import React, { FC, useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import ScreenWrapperComp from "../../../components/shared/ScreenWrapperComp";
import { router, useLocalSearchParams } from "expo-router";
import { Button, Text } from "react-native-paper";
import { GameDBType } from "../../../firebase/types/DBTypes";
import { useAppTheme } from "../../_layout";
import { _getUserId } from "../../context/auth.store";
import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { db } from '../../../firebase/Firebase.Config';
import { getGameInfoFromDB } from "../../../firebase/firebase.function";


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,

    
    borderWidth: 4,
    borderColor: "red",
    borderRadius: 20,
  },
});

const lobby: FC = () => {
  // const gameId = useLocalSearchParams();

  const params = useLocalSearchParams();

  const {gameId} = params;


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
    const unsub = onSnapshot(doc(db, "games", gameId as string || ""), (doc) => {
      if (doc.exists()) {
        const gameInfo = doc.data() as GameDBType;
        console.log("doc exits", gameInfo)
        setGameInfo(gameInfo);
        if (gameInfo.ready || gameInfo.currCount === gameInfo.maxPlayers) {
          router.push( { pathname: "/game", params: { gameId: gameId  } });
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

  const leaveGame = async () => {
    let newinfo = {...gameInfo};
    newinfo.currCount -= 1;
    setGameInfo(newinfo);

    setDoc(doc(db, `games/${gameInfo.id}`), newinfo);

    router.push("/joingame");
  }

  return (
    <ScreenWrapperComp>
      <View style={styles.wrapper}>
        <Text variant="displaySmall" style={{marginTop: 30, color: primary, borderWidth: 1,
    borderColor: "red",}}>Game Name: {gameInfo.name}</Text>
        <Text variant="titleLarge" style={{marginTop: 30, borderWidth: 1,
    borderColor: "red",}}>Game Code: {gameInfo.gameCode}</Text>
        <Text variant="headlineMedium" style={{marginTop: 30, fontWeight: '500', borderWidth: 1,
    borderColor: "red",}}>{gameInfo.currCount} / {gameInfo.maxPlayers}</Text>
        <Text variant="titleMedium" style={{marginTop: 30, borderWidth: 1,
    borderColor: "red",}}>players have joined</Text>

        <Button
          icon="account-arrow-left"
          mode="contained"
          style={{
            marginTop: 20,
            width: "60%",
            alignSelf: "center",
            position: "absolute",
            bottom: 20,
          }}
          onPress={leaveGame}
        >
          Leave Game
        </Button>

      </View>
    </ScreenWrapperComp>
  );
};

export default lobby;
