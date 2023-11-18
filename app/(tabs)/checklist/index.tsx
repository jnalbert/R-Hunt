import React, { useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Checkbox, Card, Title, Paragraph } from 'react-native-paper';

const ObjectivesList = () => {
  const [objectives, setObjectives] = useState([
    { id: '1', isChecked: false, number: 'Objective 1', image: "./assets/images/chickenimage.png" },
    { id: '2', isChecked: false, number: 'Objective 2', image: "https://unsplash.com/images/animals/chicken" },
    { id: '3', isChecked: false, number: 'Objective 1', image: "https://unsplash.com/images/animals/chicken" },
    { id: '4', isChecked: false, number: 'Objective 2', image: "https://unsplash.com/images/animals/chicken" },
    { id: '5', isChecked: false, number: 'Objective 1', image: "https://unsplash.com/images/animals/chicken" },
    // Add more objectives as needed
  ]);

  const handleCheck = (id) => {
    setObjectives((prevObjectives) =>
      prevObjectives.map((objective) =>
        objective.id === id ? { ...objective, isChecked: !objective.isChecked } : objective
      )
    );
  };

  const renderItem = ({ item }) => (
    <Card style={styles.card}>
      <Card.Content>
        <View style={styles.row}>
          <Checkbox
            status={item.isChecked ? 'checked' : 'unchecked'}
            onPress={() => handleCheck(item.id)}
          />
          <Title>{item.number}</Title>
        </View>
        {/* Display your image here */}
        {/* <Image source={{ uri: item.image }} style={styles.image} /> */}
        <Paragraph>Image: {item.image}</Paragraph>
      </Card.Content>
    </Card>
  );

  return (
    <FlatList
      data={objectives}
      renderItem={renderItem}
      keyExtractor={(item) => item.id}
    />
  );
};

const styles = StyleSheet.create({
  card: {
    margin: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginVertical: 10,
  },
});

export default ObjectivesList;