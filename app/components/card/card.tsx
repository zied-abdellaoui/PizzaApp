import * as React from "react"
import { StyleProp, ViewStyle } from "react-native"
import { translate, TxKeyPath } from "../../i18n"
import { Card as CardElement } from "react-native-elements"

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
      {i18nTitle && (
        <>
          <CardElement.Title> {i18nTitle} </CardElement.Title>
          <CardElement.Divider />
        </>
      )}
      {props.children}
    </CardElement>
  )
}
