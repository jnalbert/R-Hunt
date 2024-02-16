import { Stack } from "expo-router";
import { UnifiedHeader } from "../../../components/shared/unifiedHeader";

export default function Layout() {
 return <Stack
    screenOptions={{
        header: () => (
            <UnifiedHeader inc="Join Game"/>
        )
    }}
></Stack>;
}