import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View, TextInputChangeEventData } from "react-native"

import { NavigatorParamList } from "../../navigators"
import { StackScreenProps } from "@react-navigation/stack"
import { Screen, Text, Header, Card, ResultLine, TextField, Button } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import Dialog from "react-native-dialog"
import { translate } from "../../i18n"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}

const DEMO: ViewStyle = {
  paddingVertical: spacing[4],
  paddingHorizontal: spacing[4],
  backgroundColor: color.primary,
}
const BOLD: TextStyle = { fontWeight: "bold" }

const DEMO_TEXT: TextStyle = {
  ...BOLD,
  fontSize: 13,
  letterSpacing: 2,
  textTransform: "uppercase",
}

const INPUT_TEXT: TextStyle = {
  color: color.palette.deepPurple,
}

export const FraisNotaireScreen: FC<StackScreenProps<NavigatorParamList, "fraisNotaire">> =
  observer(function FraisNotaireScreen({ navigation }) {
    // Pull in one of our MST stores
    const { property } = useStores()

    const [saveDialogVisible, setSaveDialogVisible] = useState(false)
    const [saveSimulationName, setSaveSimulationName] = useState("")

    // Pull in navigation via hook
    const goBack = () => navigation.goBack()

    const onAquisionCostChange = (value: string) => {
      console.tron.log(value)
      value = value.replace(/[^0-9]/g, "")
      const aquisionCost = parseInt(value)
      property.setAquisitionCost(isNaN(aquisionCost) ? 0 : aquisionCost)
    }

    const OnSaveSimulationConfirm = () => {
      console.tron.log("confirme saving...")
      setSaveDialogVisible(false)
    }

    return (
      <View testID="FraisNotaireScreen" style={FULL}>
        <Screen style={CONTAINER} preset="scroll">
          <Header
            headerTx="fraisNotaireScreen.title"
            leftIcon="back"
            rightIcon="history"
            onLeftPress={goBack}
          />
          <TextField
            value={property.aquisitionCost ? property.aquisitionCost.toLocaleString() : ""}
            onChangeText={onAquisionCostChange}
            inputStyle={INPUT_TEXT}
            labelTx="fraisNotaireScreen.aquisitionCost"
            maxLength={10}
            keyboardType="numeric"
          />

          <Card titleTx="fraisNotaireScreen.details.title">
            <ResultLine
              amountPreset="negativeAmount"
              titleTx="fraisNotaireScreen.details.emoluments"
              amount={property.emolument_ttc}
              accordion
            >
              <ResultLine
                amountPreset="negativeAmount"
                titleTx="fraisNotaireScreen.details.taxes"
                amount={property.emolument_1}
              />
              <ResultLine
                amountPreset="negativeAmount"
                titleTx="fraisNotaireScreen.details.taxes"
                amount={property.emolument_2}
              />
              <ResultLine
                amountPreset="negativeAmount"
                titleTx="fraisNotaireScreen.details.taxes"
                amount={property.emolument_3}
              />
              <ResultLine
                amountPreset="negativeAmount"
                titleTx="fraisNotaireScreen.details.taxes"
                amount={property.emolument_4}
              />
              <ResultLine
                amountPreset="negativeAmount"
                titleTx="fraisNotaireScreen.details.taxes"
                amount={property.emolument_ttc - property.emolument_ht}
              />
            </ResultLine>

            <ResultLine
              amountPreset="negativeAmount"
              titleTx="fraisNotaireScreen.details.taxes"
              amount={20}
            />

            <ResultLine
              amountPreset="negativeAmount"
              titleTx="fraisNotaireScreen.details.thirdline"
              amount={20}
            />
            <Text preset="header" text={property.emolument_4.toLocaleString()} />
            <Text preset="header" text={property.emolument_ht.toLocaleString()} />
          </Card>
          <Button
            labelTx="fraisNotaireScreen.save"
            style={DEMO}
            textStyle={DEMO_TEXT}
            tx="fraisNotaireScreen.save"
            onPress={() => {
              const today = new Date()
              const date =
                today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate()
              const time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
              const dateTime = date + " " + time
              setSaveSimulationName(dateTime)
              setSaveDialogVisible(true)
            }}
          />
          <View>
            <Dialog.Container visible={saveDialogVisible}>
              <Dialog.Title>{translate("fraisNotaireScreen.saving")}</Dialog.Title>
              <Dialog.Description>{translate("fraisNotaireScreen.chooseName")}</Dialog.Description>
              <Dialog.Input value={saveSimulationName} onChangeText={setSaveSimulationName} />
              <Dialog.Button
                label={translate("fraisNotaireScreen.cancel")}
                onPress={() => {
                  setSaveDialogVisible(false)
                }}
              />
              <Dialog.Button
                label={translate("fraisNotaireScreen.save")}
                onPress={OnSaveSimulationConfirm}
              />
            </Dialog.Container>
          </View>
        </Screen>
      </View>
    )
  })
