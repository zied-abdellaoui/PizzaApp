import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { ToolsScreen } from "../../screens"

export type ToolsParamList = {
  menu: undefined
}

const Stack = createStackNavigator<ToolsParamList>()
export const ToolsNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="menu"
      screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false }}
    >
      <Stack.Screen name="menu" component={ToolsScreen} />
    </Stack.Navigator>
  )
}

ToolsNavigator.displayName = "ToolsNavigator"
