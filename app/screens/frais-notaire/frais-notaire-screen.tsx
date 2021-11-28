import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, TextStyle, View } from "react-native"

import { NavigatorParamList } from "../../navigators"
import { StackScreenProps } from "@react-navigation/stack"
import { Screen, Text, Header, Card, ResultLine, TextField, Button } from "../../components"
// import { useNavigation } from "@react-navigation/native"
import { useStores } from "../../models"
import { color, sizes, spacing, typography } from "../../theme"
import Dialog from "react-native-dialog"
import { translate } from "../../i18n"
import i18n from "i18n-js"
import { Tab } from "react-native-elements"

import * as Localization from "expo-localization"

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}

const INPUT_TEXT: TextStyle = {
  paddingHorizontal: spacing[7],
  fontSize: sizes[5],
  fontFamily: typography.header,
  color: color.primary,
}
const CONTAINER_TEXT = {
  marginTop: spacing[5],
}
export const FraisNotaireScreen: FC<
  StackScreenProps<NavigatorParamList, "fraisNotaire">
> = observer(function FraisNotaireScreen({ navigation }) {
  // Pull in one of our MST stores
  const { property } = useStores()

  const [saveDialogVisible, setSaveDialogVisible] = useState(false)
  const [saveSimulationName, setSaveSimulationName] = useState("")
  const [propertyTypeIndex, setPropertyTypeIndex] = useState(0)

  // Pull in navigation via hook
  const goBack = () => {
    navigation.goBack()
  }

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

  const formatThresholdInterval = function formatThresholdInterval(from: number, to: number) {
    const ret =
      translate("common.From") +
      " " +
      i18n.toCurrency(from, { precision: 0 }) +
      " " +
      translate("common.to") +
      " " +
      i18n.toCurrency(to, { precision: 0 })
    return ret
  }

  const formatRate = function formatRate(rate) {
    const ret = i18n.toPercentage(rate, { strip_insignificant_zeros: true })
    return ret
  }
  const propertyTypeChanged = (value) => {
    property.setNew(value !== 0)
    setPropertyTypeIndex(value)
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
        <Card>
          <Tab value={propertyTypeIndex} onChange={propertyTypeChanged}>
            <Tab.Item title={translate("fraisNotaireScreen.ancien")} />
            <Tab.Item title={translate("fraisNotaireScreen.neuf")} />
          </Tab>
          <TextField
            value={property.aquisitionCost ? property.aquisitionCost.toLocaleString() : ""}
            onChangeText={onAquisionCostChange}
            inputStyle={INPUT_TEXT}
            style={CONTAINER_TEXT}
            labelTx="fraisNotaireScreen.aquisitionCost"
            maxLength={10}
            keyboardType="numeric"
          />
        </Card>

        <Card>
          <ResultLine
            preset="bigNegative"
            titleTx="fraisNotaireScreen.totalCost"
            amount={property.fraisNotaire}
            last
          />
        </Card>
        <Card titleTx="fraisNotaireScreen.details.title">
          <ResultLine
            preset="negative"
            titleTx="fraisNotaireScreen.details.emoluments"
            amount={property.emolument_ttc}
            accordion
          >
            <ResultLine
              preset="negative"
              title={formatThresholdInterval(0, property.emolument_threshold_1)}
              subtitle={formatRate(property.emolument_rate_1)}
              amount={property.emolument_1}
            />
            <ResultLine
              preset="negative"
              title={formatThresholdInterval(
                property.emolument_threshold_1,
                property.emolument_threshold_2,
              )}
              subtitle={formatRate(property.emolument_rate_2)}
              amount={property.emolument_2}
            />
            <ResultLine
              preset="negative"
              title={formatThresholdInterval(
                property.emolument_threshold_2,
                property.emolument_threshold_3,
              )}
              subtitle={formatRate(property.emolument_rate_3)}
              amount={property.emolument_3}
            />
            <ResultLine
              preset="negative"
              title={formatThresholdInterval(property.emolument_threshold_3, property.price)}
              subtitle={formatRate(property.emolument_rate_4)}
              amount={property.emolument_4}
            />
            <ResultLine
              preset="negative"
              titleTx="fraisNotaireScreen.details.tva"
              subtitle={formatRate(property.tvaRate)}
              amount={property.emolument_ttc - property.emolument_ht}
            />
          </ResultLine>

          <ResultLine
            preset="negative"
            titleTx="fraisNotaireScreen.details.taxes"
            amount={property.taxes}
            accordion
          >
            {property.droitDepartemental > 0 && (
              <ResultLine
                preset="negative"
                titleTx="fraisNotaireScreen.details.taxe1"
                subtitle={formatRate(property.droitDepartementalRate)}
                amount={property.droitDepartemental}
              />
            )}
            {property.taxeCommunale > 0 && (
              <ResultLine
                preset="negative"
                titleTx="fraisNotaireScreen.details.taxe2"
                subtitle={formatRate(property.taxeCommunaleRate)}
                amount={property.taxeCommunale}
              />
            )}
            {property.fraisAssiete > 0 && (
              <ResultLine
                preset="negative"
                titleTx="fraisNotaireScreen.details.taxe3"
                subtitle={formatRate(property.fraisAssieteRate)}
                amount={property.fraisAssiete}
              />
            )}
            {property.taxePubliciteFonciere > 0 && (
              <ResultLine
                preset="negative"
                titleTx="fraisNotaireScreen.details.taxe5"
                subtitle={formatRate(property.taxePubliciteFonciereRate)}
                amount={property.taxePubliciteFonciere}
              />
            )}
            <ResultLine
              preset="negative"
              titleTx="fraisNotaireScreen.details.taxe4"
              subtitle={formatRate(property.contributionSecuriteImmobiliereRate)}
              amount={property.contributionSecuriteImmobiliere}
            />
          </ResultLine>

          <ResultLine
            preset="negative"
            titleTx="fraisNotaireScreen.details.thirdline"
            amount={property.formalityAndDebours}
            last
          />
        </Card>
        {/*
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
            }}></Button>
          */}
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
