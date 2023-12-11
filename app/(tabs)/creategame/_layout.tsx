import { Stack } from "expo-router";
import React from "react";


import { View, Text, TouchableOpacity } from 'react-native';
import { UnifiedHeader } from "../../../components/shared/unifiedHeader";



export default function Layout() {
  const [count, setCount] = React.useState(0);

  return (
    <Stack>
      <Stack.Screen
        name="create"
        options={{
          header: () => (
            <UnifiedHeader inc="Create Game"/>
          ),
      
        }}
      />
      <Stack.Screen
        name="lobby"
        options={{
          header: () => (
            <UnifiedHeader inc="Lobby"/>
          ),
        }}
      />

    </Stack>
    

  );
}
