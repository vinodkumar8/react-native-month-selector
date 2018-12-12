import { Moment } from "moment";
import { TextStyle, ViewStyle } from "react-native";

declare module "rn-month-selector" {
  export default interface MonthSelector {
    selectedDate: Moment;
    currentDate: Moment;
    maxDate: Moment;
    minDate: Moment;
    selectedBackgroundColor: string;
    selectedMonthTextStyle: TextStyle;
    seperatorColor: string;
    seperatorHeight: number;
    nextIcon: JSX.Element;
    prevIcon: JSX.Element;
    nextText: string;
    prevText: string;
    containerStyle: ViewStyle;
    yearTextStyle: TextStyle;
    monthTextStyle: TextStyle;
    currentMonthTextStyle: TextStyle;
    monthFormat: string;
    initialView: Moment;
    monthTapped: (month: Moment) => any;
    monthDisabledStyle: TextStyle;
    onYearChanged: (year: Moment) => any;
    locale: string;
  }
}
