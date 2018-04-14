// import liraries
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
require('moment/locale/en-gb.js');
require('moment/locale/id.js');
require('moment/locale/zh-cn.js');

// define your styles
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  monthStyle: {
    height: 40,
    width: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerStyle: {
    height: 64,
    flex: 1,
    justifyContent: 'space-between',
  },
  horizontalFlexViewStyle: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  yearViewStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    flex: 1,
  },
  monthTextStyle: {

  },
});

const dateFormat = 'DD-MM-YYYY';
const monthYearFormat = 'MMYYYY';

const getMonthListFirstDayDate = (date) => {
  const monthList = [];
  const year = date.format('YYYY');
  for (let i = 1; i < 13; i += 1) {
    monthList.push(moment(`01-${i}-${year}`, dateFormat));
  }
  return monthList;
};

// create a component
export class MonthSelectorCalendar extends Component {
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
    containerStyle: PropTypes.any,
    yearTextStyle: PropTypes.any,
    monthTextStyle: PropTypes.any,
    currentMonthTextStyle: PropTypes.any,
    monthFormat: PropTypes.string,
    initialView: PropTypes.any,
    monthTapped: PropTypes.func,
    monthDisabledStyle: PropTypes.any,
    onYearChanged: PropTypes.func,
    locale: PropTypes.string,
  }

  static defaultProps = {
    selectedDate: moment(),
    currentDate: moment(),
    maxDate: moment(),
    minDate: moment('01-01-2000', 'DD-MM-YYYY'),
    selectedBackgroundColor: '#000',
    selectedMonthStyle: { color: '#fff' },
    seperatorHeight: 1,
    seperatorColor: '#b6c3cb',
    nextIcon: null,
    prevIcon: null,
    containerStyle: null,
    yearTextStyle: null,
    monthFormat: 'MMM',
    currentMonthTextStyle: {
      color: '#22ee11',
    },
    monthTextStyle: { color: '#000' },
    initialView: moment(),
    monthTapped: () => {},
    monthDisabledStyle: { color: '#00000050' },
    onYearChanged: () => {},
    locale: 'en-gb',
  }
  constructor(props) {
    super(props);
    this.handleMonthTaps = this.handleMonthTaps.bind(this);
    this.handNextPrevTaps = this.handNextPrevTaps.bind(this);
    this.state = { initialView: props.initialView };
  }

  componentWillMount() {
    moment.locale(this.props.locale);
  }

  getSelectedBackgroundColor(month) {
    if (this.props.selectedBackgroundColor
      && month.format(monthYearFormat) === this.props.selectedDate.format(monthYearFormat)) {
      return { backgroundColor: this.props.selectedBackgroundColor };
    }
    return {};
  }

  getSelectedForeGround(month) {
    if (this.props.selectedMonthStyle &&
       month.format(monthYearFormat) === this.props.selectedDate.format(monthYearFormat)) {
      return this.props.selectedMonthStyle;
    }
    if (month.format(monthYearFormat) === this.props.currentDate.format(monthYearFormat)) {
      return this.props.currentMonthTextStyle;
    }
    return {};
  }


  getMonthActualComponent(month, isDisabled = false) {
    return (
      <View
        style={[isDisabled === true && { flex: 1, alignItems: 'center' }, styles.monthStyle, this.getSelectedBackgroundColor(month)]}
      >
        <Text
          style={[styles.monthTextStyle,
           this.props.monthTextStyle, this.getSelectedForeGround(month),
           isDisabled === true && this.props.monthDisabledStyle,
           ]}
        >
          {month.format(this.props.monthFormat)}
        </Text>
      </View>
    );
  }

  getMonthComponent(month) {
    if (this.isMonthEnabled(month)) {
      return (
        <TouchableOpacity onPress={() => this.handleMonthTaps(month)} style={{ flex: 1, alignItems: 'center' }}>
          {this.getMonthActualComponent(month)}
        </TouchableOpacity>);
    }
    return this.getMonthActualComponent(month, true);
  }
  isMonthEnabled(month) {
    const minDateYear = this.props.minDate.format('YYYYMM');
    const maxDateYear = this.props.maxDate.format('YYYYMM');
    const currentYear = month.format('YYYYMM');
    if (currentYear <= maxDateYear
      && currentYear >= minDateYear) {
      return true;
    }
    return false;
  }

  isYearEnabled(isNext) {
    const minYear = this.props.minDate.format('YYYY');
    const maxYear = this.props.maxDate.format('YYYY');
    const currentYear = this.state.initialView.format('YYYY');
    if ((isNext && currentYear < maxYear) || (!isNext && currentYear > minYear)) {
      return true;
    }
    return false;
  }

  handleMonthTaps(month) {
    this.props.monthTapped(month);
  }

  handNextPrevTaps(isNext) {
    if (this.isYearEnabled(isNext)) {
      const currentInitialView = this.state.initialView.clone();
      this.setState({ initialView: currentInitialView.add(isNext ? 1 : -1, 'Y') });
      this.props.onYearChanged(this.state.currentInitialView);
    }
  }

  renderQ(months, qNo) {
    const startMonth = qNo * 3;
    return (
      <View style={[styles.horizontalFlexViewStyle]}>
        {this.getMonthComponent(months[startMonth])}
        {this.getMonthComponent(months[startMonth + 1])}
        {this.getMonthComponent(months[startMonth + 2])}
      </View>);
  }

  renderHeader() {
    return (
      <View
        style={[styles.horizontalFlexViewStyle,
          {
            borderBottomColor: this.props.seperatorColor,
            borderBottomWidth: this.props.seperatorHeight,
            alignSelf: 'center',
            height: 64,
          },
          ]}
      >
        <TouchableOpacity onPress={() => this.handNextPrevTaps(false)}>
          {this.props.prevIcon ? this.props.prevIcon : (<Text>Prev</Text>)}
        </TouchableOpacity>
        <View style={styles.yearViewStyle}>
          <Text style={[styles.yearTextStyle, this.props.yearTextStyle]}>
            {this.state.initialView.format('YYYY')}
          </Text>
        </View>
        <TouchableOpacity onPress={() => this.handNextPrevTaps(true)}>
          {this.props.nextIcon ? this.props.nextIcon : (<Text>Next</Text>)}
        </TouchableOpacity>
      </View>
    );
  }

  render() {
    const months = getMonthListFirstDayDate(this.state.initialView);
    return (
      <View style={[styles.container, this.props.containerStyle]}>
        {this.renderHeader()}
        {this.renderQ(months, 0)}
        {this.renderQ(months, 1)}
        {this.renderQ(months, 2)}
        {this.renderQ(months, 3)}

      </View>
    );
  }
}

export default MonthSelectorCalendar;
