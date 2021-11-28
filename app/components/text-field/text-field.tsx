import React from "react"
import { StyleProp, TextInput, TextInputProps, TextStyle, View, ViewStyle } from "react-native"
import { color, size, spacing, typography } from "../../theme"
import { translate, TxKeyPath } from "../../i18n"
import { Text } from "../text/text"
import { Input } from "react-native-elements"

// the base styling for the container
const CONTAINER: ViewStyle = {
  paddingVertical: spacing[3],
}

// the base styling for the TextInput
const INPUT: TextStyle = {
  fontFamily: typography.primary,
  color: color.text,
  minHeight: 70,
  fontSize: 18,
  textAlign: "center",
  backgroundColor: color.palette.white,
}

const LABEL: TextStyle = {
  fontFamily: typography.header,
  fontSize: size.header,
}

// currently we have no presets, but that changes quickly when you build your app.
const PRESETS: { [name: string]: ViewStyle } = {
  default: {},
}

export interface TextFieldProps extends TextInputProps {
  /**
   * The placeholder i18n key.
   */
  placeholderTx?: TxKeyPath

  /**
   * The Placeholder text if no placeholderTx is provided.
   */
  placeholder?: string

  /**
   * The label i18n key.
   */
  labelTx?: TxKeyPath

  /**
   * The label text if no labelTx is provided.
   */
  label?: string

  /**
   * Optional container style overrides useful for margins & padding.
   */
  style?: StyleProp<ViewStyle>

  /**
   * Optional style overrides for the input.
   */
  inputStyle?: StyleProp<TextStyle>

  /**
   * Various look & feels.
   */
  preset?: keyof typeof PRESETS

  forwardedRef?: any
}

/**
 * A component which has a label and an input together.
 */
export function TextField(props: TextFieldProps) {
  const {
    placeholderTx,
    labelTx,
    inputStyle: inputStyleOverride,
    style: containerStyleOverride,
    forwardedRef,
    ...rest
  } = props

  const inputStyles = [INPUT, inputStyleOverride]
  const containerStyles = [CONTAINER, containerStyleOverride]
  const actualPlaceholder = placeholderTx ? translate(placeholderTx) : translate(labelTx)

  return (
    <Input
      label={translate(labelTx)}
      labelStyle={LABEL}
      placeholder={actualPlaceholder}
      inputStyle={inputStyles}
      containerStyle={containerStyles}
      ref={forwardedRef}
      {...rest}
    />
  )
}
