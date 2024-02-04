import React, { useEffect, useState } from "react";
import { View, FlatList, StyleSheet, Image } from "react-native";
import { Checkbox, Card, Title, Paragraph } from "react-native-paper";
import { AntDesign } from "@expo/vector-icons";
import ScreenWrapperComp from "../../../components/shared/ScreenWrapperComp";
import { _getUserId } from "../../context/auth.store";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from '../../../firebase/Firebase.Config';
import { LocationState } from "../locationState";
import { ObjectiveDBType, PlayerInGameDB } from "../../../firebase/types/DBTypes";
import { getGameObjectives } from '../../../firebase/firebase.function';

interface interalObjectiveDBType extends ObjectiveDBType {
  isChecked: boolean;
  id: string;
  
}

const ObjectivesList = () => {
  const [objectives, setObjectives] = useState<interalObjectiveDBType[]>([]);

  const {gameId} = LocationState.useState();

  const handleGameChange = async () => {
    const uuid = await _getUserId();
    // console.log(tradeId, "trade")
    const unsub = onSnapshot(doc(db, `games/${gameId}/players`, uuid as string || ""), (doc) => {
      if (doc.exists()) {
        const playerGameInfo = doc.data() as PlayerInGameDB;
        // console.log("doc exits", playerGameInfo)
        if (!objectives) return;
        playerGameInfo.objectsCompleted.forEach((obj) => {
          setObjectives((prevObjectives) =>
            prevObjectives.map((objective) =>
              objective.id === obj
                ? { ...objective, isChecked: true }
                : objective
            )
          );
        })
      }
      
    })
    return unsub
  }

  useEffect(() => {
    // set check list listener
    const getObjectives = async () => {
      if(gameId) {
        const objectives = await getGameObjectives(gameId);
        // console.log(objectives)
        const objectivesWithCheck = objectives.map((obj) => {
          return {...obj, isChecked: false, id: obj.id}
        })
        // console.log(objectivesWithCheck)
        setObjectives(objectivesWithCheck);
        handleGameChange();
      }
    }
    getObjectives();
  }, [])

  useEffect(() => {
    // sort the objectives so the checked ones are at the bottom
    if(!objectives) return;
    setObjectives((prevObjectives) =>
      prevObjectives.sort((a, b) => {
        if (a.isChecked) {
          return 1;
        } else {
          return -1;
        }
      })
    );
  }, [objectives])

  const renderItem = ({ item }) => {
    const backgroundColor = item.isChecked ? "#00ff00" : "#e90404b3";
  return (
    <Card style={[styles.card, {backgroundColor: backgroundColor}]}>
      <Card.Content>
        <View style={styles.row}>
          <View style={{marginLeft: 20}}>
            {!item.isChecked ? (
              <AntDesign name="close" size={24} color="black" />
            ) : (
              <AntDesign name="check" size={24} color="black" />
            )}
          </View>
          <Title style={{marginLeft: 30}}># 1</Title>
          <Image
            source={{ uri: item.image }}
            style={[styles.image, { marginLeft: 45 }]}
          />
        </View>
      </Card.Content>
    </Card>
  );
            }

  return (
    <ScreenWrapperComp>
      <FlatList
        style={{ marginTop: 40 }}
        data={objectives}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </ScreenWrapperComp>
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
    width: 300,
    justifyContent: "space-between"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    marginVertical: 10,
  },
});

export default ObjectivesList;
