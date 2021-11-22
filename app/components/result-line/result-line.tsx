import * as React from "react"
import { View, StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "../text/text"
import { flatten } from "ramda"
import { TxKeyPath } from "../../i18n"
import { ListItem } from "react-native-elements"
import i18n from "i18n-js"
import { TextPresets } from "../text/text.presets"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import { color, size } from "../../theme"

const CONTAINER: ViewStyle = {
  flex: 1,
  justifyContent: "space-between",
  flexDirection: "row",
}

const ACCORDION_ICON: ViewStyle = {
  paddingHorizontal: 5,
}
const ACCORDION_CHILDREN: ViewStyle = {
  paddingHorizontal: 20,
}

export interface ResultLineProps {
  /**
   * An optional style override useful for padding & margin.
   */
  children?: React.ReactNode
  style?: StyleProp<ViewStyle>
  titleTx?: TxKeyPath
  amount?: number
  amountPreset?: TextPresets
  accordion?: boolean
}

/**
 * Describe your component here
 */
export const ResultLine = observer(function ResultLine(props: ResultLineProps) {
  const { style, titleTx, amount, amountPreset = "gainedAmount", accordion = false } = props
  const styles = flatten([CONTAINER, style])

  if (accordion) {
    const [expanded, setExpanded] = React.useState(false)
    const expandIconName = function expandIconName(expanded: boolean) {
      if (expanded) {
        return "minus-square"
      }
      return "plus-square"
    }
    return (
      <ListItem.Accordion
        noIcon
        content={
          <>
            <View style={ACCORDION_ICON}>
              <FontAwesome5
                name={expandIconName(expanded)}
                size={size.text}
                color={color.primary}
              />
            </View>
            <ListItem.Content style={styles}>
              <Text tx={titleTx}></Text>
              <Text preset={amountPreset}>{i18n.toCurrency(amount)}</Text>
            </ListItem.Content>
          </>
        }
        isExpanded={expanded}
        onPress={() => {
          setExpanded(!expanded)
        }}
        bottomDivider
      >
        <View style={ACCORDION_CHILDREN}>{props.children}</View>
      </ListItem.Accordion>
    )
  } else {
    return (
      <ListItem bottomDivider>
        <ListItem.Content style={styles}>
          <Text tx={titleTx}></Text>
          <Text preset={amountPreset}>{i18n.toCurrency(amount)}</Text>
        </ListItem.Content>
      </ListItem>
    )
  }
})
