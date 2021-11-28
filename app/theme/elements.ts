import { size } from "./sizes"
import { typography } from "./typography"
import { color } from "./color"

export const elementsTheme = {
  fontFamily: typography.primary,
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
    backgroundColor: color.palette.white,
    indicatorStyle: {
      backgroundColor: color.primary,
    },
  },
  TabItem: {
    backgroundColor: color.primary,
    color: color.primary,
    buttonStyle: {
      backgroundColor: color.palette.white,
    },
    titleStyle: {
      color: color.primary,
    },
  },
  Input: {
    TextInput: {
      verticalPadding: 80,
    },
    labelSyle: {
      fontFamily: typography.primary,
    },
  },
}
