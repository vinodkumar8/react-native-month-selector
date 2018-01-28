# react-native-month-selector

This package lets you select months. This is fully customizable with following props. 


## Install
```js
npm install react-native-month-selector --save
yarn add react-native-month-selector
```

```js
static propTypes = {
    selectedDate: PropTypes.any,
    // The date which is currently selected
    currentDate: PropTypes.any,
    // Current Date for the months
    maxDate: PropTypes.any,
    // MAX Date to be shown while user trying to select a month
    minDate: PropTypes.any,
    // Min date to be show while user trying to select a month
    // Following are the props for styling.
    selectedBackgroundColor: PropTypes.string,
    selectedMonthStyle: PropTypes.any,
    seperatorColor: PropTypes.string,
    seperatorHeight: PropTypes.number,
    nextIcon: PropTypes.any,
    prevIcon: PropTypes.any,
    containerStyle: PropTypes.any,
    yearTextStyle: PropTypes.any,
    monthTextStyle: PropTypes.any,
    currentMonthTextStyle: PropTypes.any,
    monthFormat: PropTypes.string,
    initialView: PropTypes.any,
    monthTapped: PropTypes.func,
    monthDisabledStyle: PropTypes.any,
    onYearChanged: PropTypes.func,
  }```

  ## Sample Usage

  ```js
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

You can see actual [example](example/example/App.js)

And It will look like below

![Month Calendar](screenshot.png?raw=true "Month Calendar")

Feel free to Raise PR should you wish to contribute.

