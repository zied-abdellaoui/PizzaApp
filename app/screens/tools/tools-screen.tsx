import React from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle } from "react-native"
import { Header, Screen, Button } from "../../components"
import { useNavigation } from "@react-navigation/native"
import { color, spacing } from "../../theme"
// import { useStores } from "../../models"

const FULL: ViewStyle = { flex: 1 }

const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
  paddingHorizontal: spacing[4],
}
export const ToolsScreen = observer(function ToolsScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  const navigation = useNavigation()
  return (
    <View testID="ToolsScreen" style={FULL}>
      <Screen style={CONTAINER} preset="scroll">
        <Header headerTx="main.tools" />
        <Button
          preset="header"
          text="frais de notaire"
          onPress={() => navigation.navigate("FraisNotaire")}
        />
        <Button preset="header" text="Demo" onPress={() => navigation.navigate("Demo")} />
      </Screen>
    </View>
  )
})
