// import liraries
import moment from 'moment';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

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
  yearTextStyle: {
    fontSize: 14,
  },
  monthTextStyle: {

  },
});

const dateFormat = 'DD-MM-YYYY';
const monthYearFormat = 'MM-YYYY';

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
    selectedBackgroundColor: PropTypes.string,
    selectedForeGround: PropTypes.string,
    seperatorColor: PropTypes.string,
    seperatorHeight: PropTypes.number,
    yearColor: PropTypes.string,
    nextIcon: PropTypes.any,
    prevIcon: PropTypes.any,
    containerStyle: PropTypes.any,
    yearTextStyle: PropTypes.any,
    monthTextStyle: PropTypes.any,
    currentMonthTextStyle: PropTypes.any,
    monthFormat: PropTypes.string,
    initialView: PropTypes.any,
    monthTapped: PropTypes.func,
  }

  static defaultProps = {
    selectedDate: moment(),
    currentDate: moment(),
    selectedBackgroundColor: '#000',
    selectedForeGround: '#fff',
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
    yearColor: { color: '#000' },
    initialView: moment(),
    monthTapped: PropTypes.func,
  }
  constructor(props) {
    super(props);
    this.handleMonthTaps = this.handleMonthTaps.bind(this);
    this.handNextPrevTaps = this.handNextPrevTaps.bind(this);
    this.state = { initialView: props.initialView };
  }

  getSelectedBackgroundColor(month) {
    if (this.props.selectedBackgroundColor
      && month.format(monthYearFormat) === this.props.selectedDate.format(monthYearFormat)) {
      return { backgroundColor: this.props.selectedBackgroundColor };
    }
    return {};
  }

  getSelectedForeGround(month) {
    if (this.props.selectedForeGround &&
       month.format(monthYearFormat) === this.props.selectedDate.format(monthYearFormat)) {
      return { color: this.props.selectedForeGround };
    }
    if (month.format(monthYearFormat) === this.props.currentDate.format(monthYearFormat)) {
      return this.props.currentMonthTextStyle;
    }
    return {};
  }

  getMonthActualComponent(month) {
    return (
      <View
        style={[styles.monthStyle, this.getSelectedBackgroundColor(month)]}
      >
        <Text
          style={[styles.monthTextStyle,
           this.props.monthTextStyle, this.getSelectedForeGround(month),
           ]}
        >
          {month.format(this.props.monthFormat)}
        </Text>
      </View>
    );
  }

  getMonthComponent(month) {
    return (
      <TouchableOpacity onPres={() => this.handleMonthTaps(month)} style={{ flex: 1, alignItems: 'center' }}>
        {this.getMonthActualComponent(month)}
      </TouchableOpacity>);
  }

  handleMonthTaps(month) {
    this.props.monthTapped(month);
  }

  handNextPrevTaps(isNext) {
    this.setState({ initialView: this.state.initialView.add(isNext ? 1 : -1, 'Y') });
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
