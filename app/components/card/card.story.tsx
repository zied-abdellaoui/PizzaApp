import * as React from "react"
import { storiesOf } from "@storybook/react-native"
import { StoryScreen, Story, UseCase } from "../../../storybook/views"
import { color, typography, size } from "../../theme"

import { Card, Text, ThemeProvider } from "react-native-elements"
import { View } from "react-native"
import { Card as MyCard } from "./card"

const mythem = {
  Avatar: {
    rounded: true,
  },
  Card: {
    containerStyle: {
      borderWidth: 0,
      fontFamily: typography.primary,
      borderRadius: 10,
    },
  },
  CardTitle: {
    style: {
      fontFamily: typography.header,
      fontSize: size.smallHeader,
      textAlign: "left",
    },
  },
  CardDivider: {
    style: {
      marginHorizontal: -15,
    },
  },
}
storiesOf("Card", module)
  .addDecorator((fn) => <StoryScreen>{fn()}</StoryScreen>)
  .add("Style Presets", () => (
    <Story>
      <UseCase text="Primary" usage="The primary.">
        <ThemeProvider theme={mythem}>
          <View style={{ flex: 1, backgroundColor: "grey" }}>
            <Card>
              <Card.Title>Hello Word </Card.Title>
              <Card.Divider />
              <Text style={{ marginBottom: 10 }}>
                The idea with React Native Elements is more about component structure than actual
                design.
              </Text>
            </Card>
          </View>
          <View style={{ flex: 1, backgroundColor: "grey" }}>
            <Card>
              <Card.Title>Hello Word </Card.Title>
              <Card.Divider />
              <Text style={{ marginBottom: 10 }}>
                The idea with React Native Elements is more about component structure than actual
                design.
              </Text>
            </Card>
          </View>
          <View style={{ flex: 1, backgroundColor: "grey" }}>
            <MyCard titleTx={"helloWord"} style={{ paddingHorizontal: 90 }}>
              <Text style={{ marginBottom: 10 }}>
                The idea with React Native Elements is more about component structure than actual
                design.
              </Text>
            </MyCard>
          </View>
        </ThemeProvider>
      </UseCase>
    </Story>
  ))
