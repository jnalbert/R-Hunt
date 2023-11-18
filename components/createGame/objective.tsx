import React, { FC } from 'react'
import { View, StyleSheet, Image } from 'react-native';
import { ObjectiveType } from '../../app/(tabs)/creategame/create';
import { Text } from 'react-native-paper';

const styles = StyleSheet.create({
  wrapper: {
    marginTop: 10,
    marginBottom: 10,
    display: "flex",
    width: "80%",
    alignItems: 'center',
    flexDirection: "row",
    justifyContent: "center",
  },
  objImage: {
    // width: "100%",
    height: 100,
    width: 100,
    marginLeft: 40,
    // height: 250,
    // backgroundColor: "red",
  },
});

const Objective: FC<ObjectiveType> = ({number, photoUrl}) => {
  return (
    <View style={styles.wrapper} >
      <Text variant='titleLarge'># {number}</Text>
      <Image style={styles.objImage} source={{ uri: photoUrl }} />
    </View>
  )
}

export default Objective;