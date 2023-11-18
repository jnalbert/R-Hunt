import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  FlatList,
} from 'react-native';

interface Objective {
    isfound: boolean;
    number: number;
    imageurl: string;
}

function ObjectiveComp(objective: Objective) {
    return <Text>hi</Text>
}

export default function TodoListScreen() {
    const [todo, setTodo] = useState('');
    const [todos, setTodos] = useState([]);
    const [objs, setObjs] = useState<Objective[]>([]);

    // populate from db in useEffect

    return (
      <View style={styles.container}>
        <FlatList
          style={styles.list}
          data={todos}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <View style={styles.todo}>
              <Text style={styles.todoText}>{item.todo}</Text>
            </View>
          )}
        />
      </View>
    );
  }


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 30,
  },

  list: {
    width: '100%',
  },
  todo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  todoText: {
    flex: 1,
    marginRight: 10,
  },
});