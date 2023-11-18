import { View, Text, Pressable, TouchableHighlight, Alert } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router';
import { authSignIn, authSignUp } from '../context/auth.store';
import ScreenWrapperComp from '../../components/shared/ScreenWrapperComp';



export default function login() {
  const router = useRouter();
  return (
    <ScreenWrapperComp>
      <TouchableHighlight onPress={async () => {
        console.log("here")
          const resp = await authSignIn("jnalbert879@gmail.com", "Louis16");
          if (resp?.user) {
            router.replace("/first");
          } else {
            console.log(resp.error)
            Alert.alert("Login Error", resp.error?.message)
          }
        }}>
            
        <Text style={{fontSize: 50, color: "red"}}>login</Text>
      </TouchableHighlight>

    </ScreenWrapperComp>
  )
}