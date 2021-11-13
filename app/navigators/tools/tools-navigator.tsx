import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { ToolsScreen, FraisNotaireScreen, DemoScreen } from "../../screens"

export type ToolsParamList = {
  Menu: undefined
  FraisNotaire: undefined
  Demo: undefined
}

const Stack = createStackNavigator<ToolsParamList>()
export const ToolsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Menu"
      screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false }}
    >
      <Stack.Screen name="Menu" component={ToolsScreen} />
      <Stack.Screen name="FraisNotaire" component={FraisNotaireScreen} />
      <Stack.Screen name="Demo" component={DemoScreen} />
    </Stack.Navigator>
  )
}

ToolsNavigator.displayName = "ToolsNavigator"
