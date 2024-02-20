import React, {useState} from 'react'
import {
    View,
    Text,
    StyleSheet,

} from 'react-native'
import ScreenWrapperComp from '../../../components/shared/ScreenWrapperComp';
import { Button, TextInput } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { addUserToGameDoc, searchThroughDocs } from '../../../firebase/firebase.function';
import { _getUserId, authSignOut } from '../../context/auth.store';
import { auth, db } from '../../../firebase/Firebase.Config';



export default function joingame () {
  const router = useRouter();
  // const joinGameClick =async () => {
  //   const gameID = await searchThroughDocs(userIn);

  //   // router.push("/game")
  //   if (!gameID) {
  //     alert(
  //       "Game not found"
  //     )
  //     return
  //   } 
  //     router.push( { pathname: "/joingame/lobby", params: { gameId: gameID  } });
  //     //everytime someone joins: Create a new player doc, and add it to Gamedoc. ID of the player doc = userID.
  //     addUserToGameDoc(gameID, await _getUserId());

  // }
  // const [userIn, setInput] = useState("");


  const logout = async () => {
    // console.log("pre signout: ");
    // console.log(auth.currentUser);
    await authSignOut();
    // console.log("post signout: ");
    // console.log(auth.currentUser);

    router.push('/(auth)/login');
  }

  
  

    return (
        <ScreenWrapperComp>
            <View style={styles.container}>

              {/* Add user profile picture */}


              {/* Button to join the ga)me */}
              <Button mode='contained' icon="plus" onPress={logout}>
                  Log out
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
  