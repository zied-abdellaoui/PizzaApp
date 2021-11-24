import { size } from "./sizes"
import { typography } from "./typography"
import { color } from "./color"

export const elementsTheme = {
  Card: {
    containerStyle: {
      borderWidth: 0,
      fontFamily: typography.primary,
      borderRadius: 10,
      paddingHorizontal: 5,
      marginHorizontal: 5,
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
      marginHorizontal: -5,
    },
  },
  ListItem: {
    containerStyle: {
      paddingHorizontal: 0,
    },
  },
  Tab: {
    indicatorStyle: {
      backgroundColor: color.primary,
      color: color.primary,
    },
  },
  TabItem: {
    titleStyle: {
      color: color.primary,
    },
    indicatorStyle: {
      backgroundColor: color.primary,
      color: color.primary,
    },
    ButtonStyle: {
      backgroundColor: color.primary,
      color: color.primary,
      titleStyle: {
        color: color.primary,
      },
    },
  },
}
