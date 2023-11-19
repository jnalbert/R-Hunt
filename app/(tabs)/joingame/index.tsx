import React, {useState} from 'react'
import {
    View,
    Text,
    StyleSheet,

} from 'react-native'
import ScreenWrapperComp from '../../../components/shared/ScreenWrapperComp';
import { Button, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { searchThroughDocs } from '../../../firebase/firebase.function';


export default function joingame () {
  const router = useRouter()
  const joinGameClick =async () => {
    const gameID = await searchThroughDocs(userIn);

    // router.push("/game")
    if (!gameID) {
      alert(
        "Game not found Bitch"
      )
      return
    } 
      router.push( { pathname: "/joingame/lobby", params: { gameId: gameID  } });
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
  