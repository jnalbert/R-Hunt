import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="create"
        options={{
          headerShown: true,
          title: "Create Game",
        }}
      />
      <Stack.Screen
        name="lobby"
        options={{
          headerShown: false,
          title: "Lobby",
        }}
      />
    </Stack>

  );
}
