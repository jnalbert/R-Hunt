import React, {useState} from 'react'
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,

} from 'react-native'
import ScreenWrapperComp from '../../../components/shared/ScreenWrapperComp';
import { Button, TextInput, Divider, List, Menu } from 'react-native-paper';
import { useRouter } from 'expo-router';
import { addUserToGameDoc, searchThroughDocs } from '../../../firebase/firebase.function';
import { _getUserId, authSignOut } from '../../context/auth.store';
import { auth, db } from '../../../firebase/Firebase.Config';
import { Ionicons,AntDesign, MaterialIcons, MaterialCommunityIcons    } from '@expo/vector-icons';



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


  const f = () => {
    console.log("you pressed");
  }
  
  const Expander = ({iconName, name}) => {

    return (
      <TouchableOpacity onPress={f} style={{padding:4, display: 'flex', flexDirection: 'row',justifyContent: 'space-between', gap: 1, paddingTop: 5}}>
        
        <View style={{display: 'flex', flexDirection: 'row'}}>
        <MaterialCommunityIcons style={{marginTop: -2}} name={iconName} size={24} color="black" />
          <Text> {name} </Text>
        </View>

        <TouchableOpacity style={{marginRight: 10}}>
          <AntDesign name="right" size={22} color="black" />
        </TouchableOpacity>
        
      </TouchableOpacity>
    );
  };
  
  const [expanded, setExpanded] = React.useState(true);

  const handlePress = () => setExpanded(!expanded);
    return (
        <ScreenWrapperComp>
            <View style={{display: 'flex', flexDirection: 'column', width: '100%', alignItems:'center',  justifyContent: 'space-between', height:'100%'}}>

              {/* Add user profile picture */}

              <View style={{display:'flex', flexDirection: 'column',width: '80%', paddingTop:20}}>
                
                <Expander iconName = "account-outline" name= "Account"/>
                <Divider style={{margin:10, borderWidth:0.2, borderColor:'gray'}}/>
                <Expander iconName = "bell-outline" name= "Notification"/>
                <Divider style={{margin:10,borderWidth:0.2, borderColor:'gray'}}/>
                <Expander iconName = "eye" name= "Appearance"/>
                <Divider style={{margin:10,borderWidth:0.2, borderColor:'gray'}}/>
                <Expander iconName = "lock-check-outline" name= "Privacy&Security"/>
                <Divider style={{margin:10,borderWidth:0.2, borderColor:'gray'}}/>
                <Expander iconName = "headphones" name= "Help & Support"/>
                <Divider style={{margin:10,borderWidth:0.2, borderColor:'gray'}}/>
                <Expander iconName = "account-question-outline" name= "About"/>
                <Divider style={{margin:10,borderWidth:0.2, borderColor:'gray'}}/>
              </View>


              {/* Button to join the ga)me */}
              <View>
                <Button mode='contained' icon="plus" onPress={logout}>
                    Log out
                </Button>
              </View>
              

    
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
  