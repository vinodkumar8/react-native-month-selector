import moment from "moment"
import "moment/min/locales"
import PropTypes from "prop-types"
import React from "react"
import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
  ViewStyle,
} from "react-native"
import GestureRecognizer, {
  swipeDirections,
} from "react-native-swipe-gestures"

const DATE_FORMAT = "DD-MM-YYYY"
const MONTH_YEAR_FORMAT = "MMYYYY"

const getMonthListFirstDayDate = (date: moment.Moment) => {
  const monthList: moment.Moment[] = []
  const year = date.format("YYYY")
  for (let i = 1; i < 13; i += 1) {
    monthList.push(moment(`01-${i}-${year}`, DATE_FORMAT))
  }
  return monthList
}

interface MonthSelectorProps {
  selectedDate: moment.Moment
  currentDate: moment.Moment
  maxDate: moment.Moment
  minDate: moment.Moment
  selectedBackgroundColor: string
  selectedMonthTextStyle: TextStyle
  seperatorColor: string
  seperatorHeight: number
  nextIcon: JSX.Element
  prevIcon: JSX.Element
  nextText: string
  prevText: string
  containerStyle: ViewStyle
  yearTextStyle: TextStyle
  monthTextStyle: TextStyle
  currentMonthTextStyle: TextStyle
  monthWidth: number
  monthFormat: string
  initialView: moment.Moment
  onMonthTapped: (month: moment.Moment) => any
  onYearChanged: (year: moment.Moment) => any
  monthDisabledStyle: TextStyle
  localeLanguage: string
  localeSettings: moment.LocaleSpecification
  swipable: boolean
  velocityThreshold: number
  directionalOffsetThreshold: number
  gestureIsClickThreshold: number
}

interface MonthSelectorState {
  initialView: moment.Moment
}

class MonthSelector extends React.Component<
  MonthSelectorProps,
  MonthSelectorState
> {
  static propTypes = {
    selectedDate: PropTypes.any,
    currentDate: PropTypes.any,
    maxDate: PropTypes.any,
    minDate: PropTypes.any,
    selectedBackgroundColor: PropTypes.string,
    selectedMonthStyle: PropTypes.any,
    seperatorColor: PropTypes.string,
    seperatorHeight: PropTypes.number,
    nextIcon: PropTypes.any,
    prevIcon: PropTypes.any,
    nextText: PropTypes.string,
    prevText: PropTypes.string,
    containerStyle: PropTypes.any,
    yearTextStyle: PropTypes.any,
    monthTextStyle: PropTypes.any,
    currentMonthTextStyle: PropTypes.any,
    monthFormat: PropTypes.string,
    monthWidth: PropTypes.number,
    initialView: PropTypes.any,
    onMonthTapped: PropTypes.func,
    onYearChanged: PropTypes.func,
    monthDisabledStyle: PropTypes.any,
    localeLanguage: PropTypes.string,
    localeSettings: PropTypes.any,
    swipable: PropTypes.bool,
    velocityThreshold: PropTypes.number,
    directionalOffsetThreshold: PropTypes.number,
    gestureIsClickThreshold: PropTypes.number,
  }

  static defaultProps = {
    selectedDate: moment(),
    currentDate: moment(),
    maxDate: moment(),
    minDate: moment("01-01-2000", "DD-MM-YYYY"),
    selectedBackgroundColor: "#000",
    selectedMonthTextStyle: { color: "#fff" },
    seperatorHeight: 1,
    seperatorColor: "#b6c3cb",
    nextIcon: null,
    prevIcon: null,
    nextText: "Next",
    prevText: "Prev",
    containerStyle: null,
    yearTextStyle: null,
    monthFormat: "MMM",
    currentMonthTextStyle: {
      color: "#22ee11",
    },
    monthTextStyle: { color: "#000" },
    monthWidth: 40,
    initialView: moment(),
    onMonthTapped: month => {},
    onYearChanged: year => {},
    monthDisabledStyle: { color: "#00000050" },
    localeLanguage: "en",
    localeSettings: {},
    swipable: false,
    velocityThreshold: 0.3,
    directionalOffsetThreshold: 80,
    gestureIsClickThreshold: 5,
  }
  constructor(props) {
    super(props)
    this.state = { initialView: props.initialView }
  }

  componentWillMount() {
    moment.updateLocale(this.props.localeLanguage, this.props.localeSettings)
  }

  getSelectedBackgroundColor(month: moment.Moment) {
    if (
      this.props.selectedBackgroundColor &&
      month.format(MONTH_YEAR_FORMAT) ===
        this.props.selectedDate.format(MONTH_YEAR_FORMAT)
    ) {
      return { backgroundColor: this.props.selectedBackgroundColor }
    }
    return {}
  }

  getSelectedForeGround(month: moment.Moment) {
    if (
      this.props.selectedMonthTextStyle &&
      month.format(MONTH_YEAR_FORMAT) ===
        this.props.selectedDate.format(MONTH_YEAR_FORMAT)
    ) {
      return this.props.selectedMonthTextStyle
    }
    if (
      month.format(MONTH_YEAR_FORMAT) ===
      this.props.currentDate.format(MONTH_YEAR_FORMAT)
    ) {
      return this.props.currentMonthTextStyle
    }
    return {}
  }

  getSelectedMonthWidth() {
    if (this.props.monthWidth) {
        return { 
          height: this.props.monthWidth,
          width: this.props.monthWidth,
          borderRadius: this.props.monthWidth /2, 
        }
    }
    else {
      return {};
    }
}

  getMonthActualComponent(month: moment.Moment, isDisabled: boolean = false) {
    return (
      <View
        style={[
          isDisabled === true && { flex: 1, alignItems: "center" },
          styles.monthStyle,
          this.getSelectedMonthWidth(),
          this.getSelectedBackgroundColor(month),
        ]}
      >
        <Text
          style={[
            this.props.monthTextStyle,
            this.getSelectedForeGround(month),
            isDisabled === true && this.props.monthDisabledStyle,
          ]}
        >
          {month.format(this.props.monthFormat)}
        </Text>
      </View>
    )
  }

  getMonthComponent(month: moment.Moment) {
    if (this.isMonthEnabled(month)) {
      return (
        <TouchableOpacity
          onPress={() => this.handleMonthTaps(month)}
          style={{ flex: 1, alignItems: "center" }}
        >
          {this.getMonthActualComponent(month)}
        </TouchableOpacity>
      )
    }
    return this.getMonthActualComponent(month, true)
  }

  isMonthEnabled(month: moment.Moment) {
    const minDateYear = this.props.minDate.format("YYYYMM")
    const maxDateYear = this.props.maxDate.format("YYYYMM")
    const currentYear = month.format("YYYYMM")
    if (currentYear <= maxDateYear && currentYear >= minDateYear) {
      return true
    }
    return false
  }

  isYearEnabled(isNext: boolean) {
    const minYear = this.props.minDate.format("YYYY")
    const maxYear = this.props.maxDate.format("YYYY")
    const currentYear = this.state.initialView.format("YYYY")
    if (
      (isNext && currentYear < maxYear) ||
      (!isNext && currentYear > minYear)
    ) {
      return true
    }
    return false
  }

  handleMonthTaps = (month: moment.Moment) => {
    this.props.onMonthTapped(month)
  }

  handNextPrevTaps = (isNext: boolean) => {
    if (this.isYearEnabled(isNext)) {
      const currentInitialView = this.state.initialView.clone()
      this.setState({
        initialView: currentInitialView.add(isNext ? 1 : -1, "y"),
      })
      this.props.onYearChanged(currentInitialView)
    }
  }

  renderQ(months: moment.Moment[], qNo: number) {
    const startMonth = qNo * 3
    return (
      <View style={[styles.horizontalFlexViewStyle]}>
        {this.getMonthComponent(months[startMonth])}
        {this.getMonthComponent(months[startMonth + 1])}
        {this.getMonthComponent(months[startMonth + 2])}
      </View>
    )
  }

  renderHeader() {
    return (
      <View
        style={[
          styles.horizontalFlexViewStyle,
          {
            borderBottomColor: this.props.seperatorColor,
            borderBottomWidth: this.props.seperatorHeight,
            alignSelf: "center",
            height: 64,
          },
        ]}
      >
        <TouchableOpacity onPress={() => this.handNextPrevTaps(false)}>
          {this.props.prevIcon ? (
            this.props.prevIcon
          ) : (
            <Text>{this.props.prevText}</Text>
          )}
        </TouchableOpacity>
        <View style={styles.yearViewStyle}>
          <Text style={this.props.yearTextStyle}>
            {this.state.initialView.format("YYYY")}
          </Text>
        </View>
        <TouchableOpacity onPress={() => this.handNextPrevTaps(true)}>
          {this.props.nextIcon ? (
            this.props.nextIcon
          ) : (
            <Text>{this.props.nextText}</Text>
          )}
        </TouchableOpacity>
      </View>
    )
  }

  handleSwipe(gestureName) {
    const { SWIPE_LEFT, SWIPE_RIGHT } = swipeDirections
    switch (gestureName) {
      case SWIPE_LEFT:
        this.handNextPrevTaps(true)
        break
      case SWIPE_RIGHT:
        this.handNextPrevTaps(false)
        break
    }
  }

  render() {
    const months: moment.Moment[] = getMonthListFirstDayDate(
      this.state.initialView,
    )
    const {
      containerStyle,
      swipable,
      velocityThreshold,
      directionalOffsetThreshold,
      gestureIsClickThreshold,
    } = this.props
    const SWIPE_CONFIG = {
      velocityThreshold,
      directionalOffsetThreshold,
      gestureIsClickThreshold,
    }

    return (
      <GestureRecognizer
        onSwipe={direction => (swipable ? this.handleSwipe(direction) : null)}
        config={SWIPE_CONFIG}
        style={[styles.container, containerStyle]}
      >
        {this.renderHeader()}
        {this.renderQ(months, 0)}
        {this.renderQ(months, 1)}
        {this.renderQ(months, 2)}
        {this.renderQ(months, 3)}
      </GestureRecognizer>
    )
  }
}

export default MonthSelector

interface Styles {
  container: ViewStyle
  monthStyle: ViewStyle
  headerStyle: ViewStyle
  horizontalFlexViewStyle: ViewStyle
  yearViewStyle: ViewStyle
}

// define your styles
const styles = StyleSheet.create<Styles>({
  container: {
    alignItems: "center",
    backgroundColor: "#fff",
  },
  monthStyle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    overflow: 'hidden',
  },
  headerStyle: {
    height: 64,
    flex: 1,
    justifyContent: "space-between",
  },
  horizontalFlexViewStyle: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  yearViewStyle: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    flex: 1,
  },
})
