import { View, Text, Pressable, TouchableHighlight, Alert } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { authSignIn, authSignUp } from '../context/auth.store';
import ScreenWrapperComp from '../../components/shared/ScreenWrapperComp';

import { Button } from 'react-native-paper';
import { addNewUserToDB } from '../../firebase/firebase.function';
import { TextInput } from 'react-native-paper';
import {StyleSheet } from 'react-native';


export default function login() {
  const router = useRouter();

  const [text, setText] = React.useState("");
  const [text1, setText1] = React.useState("");


  return (
    <ScreenWrapperComp>

      
      

      
      <Button icon="camera" mode="contained" onPress={() => addNewUserToDB("John1 ", "John Zhou", "JohnZ9865", "noprofilephoto")}>
            HELLOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO
      </Button>

      <Button onPress={async () => {
        router.push('/(tabs)/creategame/create');
      }}>
          Go to create
      </Button>
      
      <View style={styles.wrapper}>
        <TextInput
          label="Username"
          value={text}
          onChangeText={text => setText(text)}
          style={styles.textbox}
          mode="outlined"
        />

        <TextInput
          label="Password"
          value={text1}
          onChangeText={text1 => setText1(text1)}
          style={{marginTop:15}}
          mode="outlined"
        />
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
        onPress={() => authSignIn(text, text1)}
      >
        Sign in
      </Button>
      
    </ScreenWrapperComp>
  )
}

const styles = StyleSheet.create({
  textbox: {
    // flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'flex-start',
    alignSelf: 'stretch',
    backgroundColor: 'white',
    whitespace: 'nowrap',
    overflow: 'visible',
    border: '60px solid red',
  },
  wrapper: {
    // flex: 1,
    width: "80%",
    justifyContent: "flex-start",
    // alignItems: 'center',
  },

  // padding: {

  // },

  // input: {
  //   flex: 1,
  // },
  // button: {
  //   flex: 0,
  // },
});
