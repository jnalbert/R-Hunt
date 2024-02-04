import { View, StyleSheet, Image, Alert } from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { authSignUp } from "../context/auth.store";
import ScreenWrapperComp from "../../components/shared/ScreenWrapperComp";
import { Button, TextInput } from "react-native-paper";
import { MediaTypeOptions, launchImageLibraryAsync } from "expo-image-picker";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";

export interface SignUpFormState {
  name: string;
  username: string;
  password: string;
  photoUrl: string;
}

export default function login() {
  const router = useRouter();
  const [formState, setFormState] = useState<SignUpFormState>({
    name: "",
    username: "",
    password: "",
    photoUrl: "",
  });

  const onSignUpPress = async () => {
    if (!formState.name) {
      Alert.alert("Please enter a name");
      return;
    }
    if (!formState.username) {
      Alert.alert("Please enter a username");
      return;
    }
    if (!formState.password) {
      Alert.alert("Please enter a password");
      return;
    }
    if (!formState.photoUrl) {
      Alert.alert("Please select a profile picture");
      return;
    }
    if (formState.password.length < 6) {
      Alert.alert("Passwords needs to be 6 characters long");
      return;
    }
    


    const res = await authSignUp(formState);
    if (res.error) { 
      Alert.alert(res.error);
      return;
    }

    router.push("/");
  };

  const handlePickProfilePicture = async () => {
    let result = await launchImageLibraryAsync({
      mediaTypes: MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 0.5,
    });

    if (!result.canceled) {
      const manipulatedImage = await manipulateAsync(
        result.assets[0].uri,
        [{ resize: { height: 400 } }],
        { compress: 0.4, format: SaveFormat.JPEG }
      );
      setFormState({ ...formState, photoUrl: manipulatedImage.uri });
    }
  };
  return (
    <ScreenWrapperComp>
      <View style={{marginTop: '5%', alignItems: 'center', marginBottom: '5%'}}>
        <TouchableOpacity style={styles.profilePicture} onPress={handlePickProfilePicture}>
          {!formState.photoUrl ? (
            <AntDesign name="user" size={60} color="#989797" />
          ) : (
            <Image style={{ height: '100%', width: '100%' }} source={{ uri: formState.photoUrl }} />
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.wrapper}>
        <TextInput
          label="Username"
          value={formState.username}
          onChangeText={(text) =>
            setFormState({ ...formState, username: text })
          }
          style={styles.textbox}
          mode="outlined"
        />

        <TextInput
          label="Full Name"
          value={formState.name}
          onChangeText={(text) =>
            setFormState({ ...formState, name: text })
          }
          style={styles.textbox}
          mode="outlined"
        />

        <TextInput
          label="Password"
          value={formState.password}
          onChangeText={(text1) =>
            setFormState({ ...formState, password: text1 })
          }
          style={styles.textbox}
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
        onPress={onSignUpPress}
      >
        Sign up
      </Button>

      <Button
        style={{ marginTop: 10 }}
        onPress={async () => {
          router.push("/login");
        }}
      >
        Sign in
      </Button>
    </ScreenWrapperComp>
  );
}

const styles = StyleSheet.create({
  textbox: {
    marginTop: 10,
    alignItems: "flex-start",
    alignSelf: "stretch",
    backgroundColor: "white",
    whitespace: "nowrap",
    overflow: "visible",
    border: "60px solid red",
  },
  wrapper: {
    width: "80%",
    justifyContent: "flex-start",
  },
  profilePicture: {
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    height: 100,
    width: 100,
    backgroundColor: "#dcd4d4",
    overflow: "hidden",
  },
});
