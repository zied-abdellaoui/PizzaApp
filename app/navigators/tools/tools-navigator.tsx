import React from "react"
import { createStackNavigator } from "@react-navigation/stack"
import { ToolsScreen, DemoScreen } from "../../screens"

export type ToolsParamList = {
  demo: undefined
}

const Stack = createStackNavigator<ToolsParamList>()
export const ToolsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{ cardStyle: { backgroundColor: "transparent" }, headerShown: false }}
    >
      <Stack.Screen name="demo" component={ToolsScreen} />
    </Stack.Navigator>
  )
}
