// import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome5, FontAwesome } from '@expo/vector-icons';



import { colors } from '../../constants/shared.colors';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.tint,
      }}>
      <Tabs.Screen
        name="creategame"
        options={{
          headerShown: false,
          title: 'Create Game',
          tabBarIcon: ({ color }) => <Ionicons name="create-outline" size={28} color={color}/>
        }}
      />
      <Tabs.Screen
        name="joingame"
        options={{
          title: 'Join Game',
          tabBarIcon: ({ color }) => <FontAwesome5 name="fantasy-flight-games" size={28} color={color} />,
          headerShown: false,
        }}
      />

      <Tabs.Screen
        name="setting"
        options={{
          title: 'Setting',
          tabBarIcon: ({ color }) => <Ionicons name="settings-outline" size={28} color={color}/>,
          headerShown: false,
        }}
        
      />

    </Tabs>
  );
}
