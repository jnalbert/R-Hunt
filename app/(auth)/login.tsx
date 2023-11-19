import { View, Text, Pressable, TouchableHighlight, Alert } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { authSignIn, authSignOut, authSignUp } from '../context/auth.store';
import ScreenWrapperComp from '../../components/shared/ScreenWrapperComp';

import { Button } from 'react-native-paper';
import { TextInput } from 'react-native-paper';
import {StyleSheet } from 'react-native';


export default function login() {
  const router = useRouter();

  const [formState, setFormState] = React.useState({username: '', password: ''});

  const singIntClick = async () => {
    if (!formState.username) {
      Alert.alert('Please enter a username');
      return;
    }
    if (!formState.password) {
      Alert.alert('Please enter a password');
      return;
    }
    formState.username = formState.username + '@gmail.com';
    // await authSignOut();
    const res = await authSignIn(formState.username, formState.password)
    if (res.error) {
      Alert.alert(res.error);
      return;
    } 
    router.push('/');
  }


  return (
    <ScreenWrapperComp>
      
      <View style={styles.wrapper}>
        <TextInput
          label="Username"
          value={formState.username}
          onChangeText={text => setFormState(
            {...formState, username: text}
          )}
          style={styles.textbox}
          mode="outlined"
        />

        <TextInput
          label="Password"
          value={formState.password}
          onChangeText={text1 => setFormState(
            {...formState, password: text1}
          )}
          style={{marginTop:15}}
          mode="outlined"
        />
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
        onPress={singIntClick}
      >
        Sign in
      </Button>

      <Button style={{marginTop: 10}} onPress={async () => {
        router.push('/signup');
      }}>
          Sign up
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
