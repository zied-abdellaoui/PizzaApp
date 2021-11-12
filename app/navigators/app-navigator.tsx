/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React from "react"
import { useColorScheme } from "react-native"
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { SimulationsScreen, ToolsScreen, ConfigurationScreen } from "../screens"
import { navigationRef } from "./navigation-utilities"
import Ionicons from "@expo/vector-icons/FontAwesome5"
import { color, typography, sizes } from "../theme"
import { translate } from "../i18n"
/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 */
const TAB_ICON = {
  Simulations: "calculator",
  Tools: "toolbox",
  Configuration: "user-cog",
}

const TAB_LABEL = {
  Simulations: translate("main.simulations"),
  Tools: translate("main.tools"),
  Configuration: translate("main.configuration"),
}

const createScreenOptions = ({ route }) => {
  const iconName = TAB_ICON[route.name]
  return {
    headerShown: true,
    tabBarIcon: function tabBarIcon({ color, size }) {
      return <Ionicons name={iconName} size={size} color={color} />
    },
    tabBarLabel: TAB_LABEL[route.name],
    tabBarActiveTintColor: color.primary,
    tabBarInactiveTintColor: color.dim,
    tabBarLabelStyle: { fontSize: sizes[1], fontStyle: typography.primary },
    headerTitleStyle: { fontStyle: typography.primary },
  }
}

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Tab = createBottomTabNavigator()

const AppTab = () => {
  return (
    <Tab.Navigator screenOptions={createScreenOptions} initialRouteName="Simulations">
      <Tab.Screen name="Simulations" label="hello" component={SimulationsScreen} />
      <Tab.Screen name="Tools" component={ToolsScreen} />
      <Tab.Screen name="Configuration" component={ConfigurationScreen} />
    </Tab.Navigator>
  )
}

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = (props: NavigationProps) => {
  const colorScheme = useColorScheme()
  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppTab />
    </NavigationContainer>
  )
}

AppNavigator.displayName = "AppNavigator"

/**
 * A list of routes from which we're allowed to leave the app when
 * the user presses the back button on Android.
 *
 * Anything not on this list will be a standard `back` action in
 * react-navigation.
 *
 * `canExit` is used in ./app/app.tsx in the `useBackButtonHandler` hook.
 */
const exitRoutes = ["Simulation"]
export const canExit = (routeName: string) => exitRoutes.includes(routeName)
