import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen
        name="login"
        options={{
          headerShown: true,
          title: "Sign in",
        }}
      />

      <Stack.Screen
        name="signup"
        options={{
          headerShown: false,
          title: "sign up",
        }}
      />
    </Stack>
  );
}
