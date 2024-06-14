# react-native-test-tooltip

A React Native library that lets you easily integrate tooltips into your application. <br> It's lightweight and lets you customize your tooltips to suit your every need.

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Props](#props)
- [Contributing](#contributing)
- [License](#license)

## Installation

You can install the package using npm or yarn.

```bash
npm install react-native-test-tooltip
```

or

```bash
yarn add react-native-test-tooltip
```

## Usage

Here is a basic example of how to use the `react-native-test-tooltip` library in your React Native application.

```typescript jsx
import TooltipWrapper from 'react-native-test-tooltip';

<TooltipWrapper
  tooltipPosition="BOTTOM_RIGHT"
  isTooltipVisible={isTooltipVisible}
  title="My tooltip !"
  description="You can put what you want here"
  style={{ marginBottom: 10 }}
  onCloseTooltip={() => setIsTooltipVisible(false)}
  backgroundColor="#89A265"
>
  <Text style={styles.text}>Click on me!</Text>
</TooltipWrapper>
```

## Props

| Prop                 | Type                                                                                                                    | Default      | Description                                                |
|----------------------|-------------------------------------------------------------------------------------------------------------------------|--------------|------------------------------------------------------------|
| `style`              | `StyleProp<ViewStyle>`                                                                                                  | null         | The style to be applied to the tooltip container.          |
| `tooltipPosition`    | `"LEFT" \| "RIGHT" \| "BOTTOM_LEFT" \| "BOTTOM_CENTER" \| "BOTTOM_RIGHT" \| "TOP_LEFT" \| "TOP_CENTER" \| "TOP_RIGHT"`  | **REQUIRED** | The position of the tooltip relative to the child element. |
| `isTooltipVisible`   | `boolean`                                                                                                               | **REQUIRED** | Determines if the tooltip is visible.                      |
| `onCloseTooltip`     | `function`                                                                                                              | () => null   | Function to call when the tooltip is closed.               |
| `title`              | `string`                                                                                                                | **REQUIRED** | The title text of the tooltip.                             |
| `description`        | `string`                                                                                                                | null         | The description text of the tooltip.                       |
| `hidePointer`        | `boolean`                                                                                                               | false        | Determines if the tooltip pointer/arrow is hidden.         |
| `displayActionButton`| `boolean`                                                                                                               | false        | Shows an action button in the tooltip.                     |
| `onPressActionButton`| `function`                                                                                                              | () => null   | Function to call when the action button is pressed.        |
| `backgroundColor`    | `string`                                                                                                                | "#FFFFFF"    | The background color of the tooltip.                       |
| `contentColor`       | `string`                                                                                                                | "#000000"    | The color of the tooltip content (title and description).  |
| `actionButtonColor`  | `string`                                                                                                                | "#003DB0"    | The color of the action button.                            |

## Contributing

Contributions are welcome! If you have any suggestions, improvements, or bug fixes, please create an issue or a pull request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a pull request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

