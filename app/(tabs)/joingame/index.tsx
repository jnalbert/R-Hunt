import React, {useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    Alert,

} from 'react-native'
import ScreenWrapperComp from '../../../components/shared/ScreenWrapperComp';
import { Button, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { addUserToGameDoc, searchThroughDocs } from '../../../firebase/firebase.function';
import { _getUserId } from '../../context/auth.store';
import { requestForegroundPermissionsAsync } from 'expo-location';


export default function joingame () {
  const router = useRouter()
  const joinGameClick =async () => {
    const gameID = await searchThroughDocs(userIn);

    // router.push("/game")
    if (!gameID) {
      alert(
        "Game not found"
      )
      return
    } 

    let locationStats = await requestForegroundPermissionsAsync();
    if (locationStats.status !== "granted") {
      Alert.alert("Permission to access location was denied");
      return;
    }
    

    console.log("Are we pushing them to right place???");
    router.push( { pathname: "/joingame/lobby", params: { gameId: gameID  } });
    //everytime someone joins: Create a new player doc, and add it to Gamedoc. ID of the player doc = userID.
    addUserToGameDoc(gameID, await _getUserId());

  }
  const [userIn, setInput] = useState("");

    return (
        <ScreenWrapperComp>
            <View style={styles.container}>
            <Text style={styles.title}>Enter Game Code</Text>
    
            {/* Input for entering the game code */}
            <TextInput 
                style={styles.input}
                placeholder='Enter Game Code'
                value={userIn}
                onChangeText={(text) => setInput(text)}
            />
    
            {/* Button to join the ga)me */}
            <Button mode='contained' icon="plus" onPress={joinGameClick}>
                Join Game
            </Button>
    
            </View>
        </ScreenWrapperComp>
      );
    };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      marginBottom: 20,
    },
    input: {
      height: 40,
      width: '80%',
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 20,
      paddingHorizontal: 10,
    },
  });
  