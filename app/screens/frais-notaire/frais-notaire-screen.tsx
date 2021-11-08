import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, TextInputChangeEventData } from "react-native"

import { NavigatorParamList } from "../../navigators"
import { StackScreenProps } from "@react-navigation/stack"
import { Screen, Text, Header, GradientBackground, TextField } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { string } from "mobx-state-tree/dist/internal"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}

const INPUT_TEXT: TextStyle = {
  color: color.palette.deepPurple,
}

export const FraisNotaireScreen: FC<
  StackScreenProps<NavigatorParamList, "fraisNotaire">
> = observer(function FraisNotaireScreen({ navigation }) {
  // Pull in one of our MST stores
  const { property } = useStores()

  // Pull in navigation via hook
  const goBack = () => navigation.goBack()

  const onAquisionCostChange = (value: string) => {
    console.tron.log(value)
    value = value.replace(/[^0-9]/g, "")
    const aquisionCost = parseInt(value)
    property.setAquisitionCost(isNaN(aquisionCost) ? 0 : aquisionCost)
  }

  return (
    <View testID="FraisNotaireScreen" style={FULL}>
      <GradientBackground colors={["#422443", "#281b34"]} />
      <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
        <Header
          headerTx="fraisNotaireScreen.title"
          leftIcon="back"
          onLeftPress={goBack}
          style={HEADER}
          titleStyle={HEADER_TITLE}
        />
        <Text preset="header" text={property.fraisNotaire.toLocaleString()} />
        <TextField
          value={property.aquisitionCost ? property.aquisitionCost.toLocaleString() : ""}
          onChangeText={onAquisionCostChange}
          inputStyle={INPUT_TEXT}
          labelTx="fraisNotaireScreen.aquisitionCost"
          maxLength={10}
          keyboardType="numeric"
        />
        <Text preset="header" text={property.emolument_1.toLocaleString()} />
        <Text preset="header" text={property.emolument_2.toLocaleString()} />
        <Text preset="header" text={property.emolument_3.toLocaleString()} />
        <Text preset="header" text={property.emolument_4.toLocaleString()} />
        <Text preset="header" text={property.emolument_ht.toLocaleString()} />
        <Text preset="header" text={property.emolument_ttc.toLocaleString()} />
      </Screen>
    </View>
  )
})
