import { Stack } from "expo-router";
import { UnifiedHeader } from "../../../components/shared/unifiedHeader";



export default function Layout() {
  return (
      <Stack
        screenOptions={{
          header: () => {return <UnifiedHeader inc="Bro wat" />;},
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="lobby"/>

      </Stack>
  );
}







