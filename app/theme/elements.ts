import { size } from "./sizes"
import { typography } from "./typography"

export const elementsTheme = {
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
