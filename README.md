# react-native-month-selector

This package lets you select months. It also allows you to use swipe gestures to navigate between pages.

## Install

```
npm install react-native-month-selector --save
yarn add react-native-month-selector
```

## Props

| Params                     |                    Type                    | Default                            | Description                                                                                                                        |
| -------------------------- | :----------------------------------------: | ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| selectedDate               | moment.Moment (a valid moment.js instance) | moment()                           | currently highlighted / selected month                                                                                             |
| currentDate                |               moment.Moment                | moment()                           | today's date                                                                                                                       |
| maxDate                    |               moment.Moment                | moment()                           | the maximum date than can be shown                                                                                                 |
| minimumDate                |               moment.Moment                | moment("01-01-2000", "DD-MM-YYYY") | the mimimum date than can be shown                                                                                                 |
| selectedBackgroundColor    |                   string                   | "#000"                             | the color of the highlight for the seleced month                                                                                   |
| selectedMonthTextStyle     |                 TextStyle                  | { color: "#fff" }                  | text style for the selected month                                                                                                  |
| seperatorHeight            |                   number                   | 1                                  | height of the separators                                                                                                           |
| seperatorColor             |                   string                   | "#b6c3cb"                          | color of the separators                                                                                                            |
| nextIcon                   |                JSX.Element                 | null                               | custom react component for the next button                                                                                         |
| prevIcon                   |                JSX.Element                 | null                               | custom react component for the prev button                                                                                         |
| nextText                   |                   string                   | "Next"                             | custom text for the next button                                                                                                    |
| prevText                   |                   string                   | "Prev"                             | custom text for the prev button                                                                                                    |
| containerStyle             |                 ViewStyle                  | null                               | custom style for the container                                                                                                     |
| yearTextStyle              |                 TextStyle                  | null                               | custom style for the year text                                                                                                     |
| monthTextStyle             |                 TextStyle                  | null                               | custom style of the text for the months                                                                                            |
| currentMonthTextStyle      |                 TextStyle                  | null                               | custom style for the current month text                                                                                            |
| initialView                |               moment.Moment                | moment()                           | which month should be selected initially                                                                                           |
| onMonthTapped              |       (month: moment.Moment) => any        | (month) => {}                      | function called when month is pressed                                                                                              |
| onYearChanged              |        (year: moment.Moment) => any        | (year) => {}                       | function called when the year is changed (when we navigate pages)                                                                  |
| monthDisabledStyle         |                 TextStyle                  | { color: "#00000050" }             | text style for disabled months                                                                                                     |
| localeLanguage             |                   string                   | "en"                               | specify the localization language for moment.js                                                                                    |
| localeSettings             |         moment.LocaleSpecification         | {}                                 | to update the moment.js localization settings                                                                                      |
| swipable                   |                  boolean                   | false                              | enables swiping between pages                                                                                                      |
| velocityThreshold          |                   number                   | 0.3                                | Velocity that has to be breached in order for swipe to be triggered (`vx` and `vy` properties of `gestureState`)                   |
| directionalOffsetThreshold |                   number                   | 80                                 | Absolute offset that shouldn't be breached for swipe to be triggered (`dy` for horizontal swipe, `dx` for vertical swipe)          |
| gestureIsClickThreshold    |                   number                   | 5                                  | Absolute distance that should be breached for the gesture to not be considered a click (`dx` or `dy` properties of `gestureState`) |

## Sample Usage

```
  <View style={styles.container}>
      <Text style={styles.welcome}>
        Selected Month is { this.state.month && this.state.month.format('MMM YYYY')}
      </Text>
      <MonthSelectorCalendar
          selectedDate={this.state.month}
          monthTapped={(date) => this.setState({ month: date })}
      />
    </View>
```

![Month Calendar](screenshot.png?raw=true "Month Calendar")

I'm open to keep this updated. Please open PRs!

## Contributors

- vinodkumar8
- is343
- isaaclem
