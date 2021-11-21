import * as React from "react"
import { StyleProp, TextStyle, View, ViewStyle } from "react-native"
import { observer } from "mobx-react-lite"
import { translate, TxKeyPath } from "../../i18n"
import { color, typography } from "../../theme"
import { Text } from "../text/text"
import { flatten } from "ramda"
import { Card as CardElement } from "react-native-elements"

const CONTAINER: ViewStyle = {
  justifyContent: "center",
}

export interface CardProps {
  /**
   * Children components.
   */
  children?: React.ReactNode

  /**
   * An optional style override useful for padding & margin.
   */
  style?: StyleProp<ViewStyle>
  titleTx?: TxKeyPath
}

/**
 * Describe your component here
 */
export const Card = function Card(props: CardProps) {
  const { style: styleOverride, titleTx } = props
  const i18nTitle = titleTx && translate(titleTx)
  return (
    <CardElement wrapperStyle={styleOverride}>
      <CardElement.Title> {i18nTitle} </CardElement.Title>
      <CardElement.Divider />
      {props.children}
    </CardElement>
  )
}
