import * as React from "react"
import { View, StyleProp, TextStyle, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { Text } from "../text/text"
import { flatten } from "ramda"
import { TxKeyPath, translate } from "../../i18n"
import { ListItem } from "react-native-elements"
import i18n from "i18n-js"
import { TextPresets } from "../text/text.presets"
import FontAwesome5 from "@expo/vector-icons/FontAwesome5"
import { color, size, sizes, typography } from "../../theme"

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
  title?: string
  subtitle?: string
  amount?: number
  preset?: TextPresets
  accordion?: boolean
  precision?: number
  last?: boolean
}

const presets = {
  negative: {
    amount: {
      color: color.negativeAmount,
      fontFamily: typography.header,
    },
    title: {
      fontFamily: typography.header,
    },
  },

  positive: {
    amount: {
      color: color.positiveAmount,
      fontFamily: typography.header,
    },
    title: {
      fontFamily: typography.header,
    },
  },

  bigNegative: {
    amount: {
      color: color.negativeAmount,
      fontSize: size.bigAmount,
      fontFamily: typography.header,
    },
    title: {
      fontSize: size.bigAmount,
      fontFamily: typography.header,
    },
  },

  bigPositive: {
    amount: {
      color: color.positiveAmount,
      fontSize: size.bigAmount,
      fontFamily: typography.header,
    },
    title: {
      fontSize: size.bigAmount,
      fontFamily: typography.header,
    },
  },
}

/**
 * Describe your component here
 */
export const ResultLine = observer(function ResultLine(props: ResultLineProps) {
  const {
    style,
    titleTx,
    amount,
    preset = "positive",
    accordion = false,
    title,
    subtitle,
    precision = 0,
    last = false,
  } = props
  const styles = flatten([CONTAINER, style])
  const i18nTitle = titleTx && translate(titleTx)
  const titleContent = i18nTitle || title

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
              <Text tx={titleTx} style={presets[preset].title} text={title}></Text>
              <Text style={presets[preset].amount}>
                {i18n.toCurrency(amount, { precision: precision })}
              </Text>
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
      <ListItem bottomDivider={!last}>
        <ListItem.Content>
          <ListItem.Title style={presets[preset].title}>{titleContent}</ListItem.Title>
          {subtitle ? <ListItem.Subtitle>{subtitle}</ListItem.Subtitle> : null}
        </ListItem.Content>
        <Text style={presets[preset].amount}>
          {i18n.toCurrency(amount, { precision: precision })}
        </Text>
      </ListItem>
    )
  }
})
