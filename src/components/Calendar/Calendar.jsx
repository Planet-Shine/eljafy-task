
import React, { Component, PropTypes } from 'react';
import { CalendarDate } from 'components';
import $date, { weekDayCount } from 'utils/date';
import $array from 'utils/array';
import classNames from 'classnames';

import './Calendar.less';
const months = ["январь", "февраль", "март", "апрель", "май", "июнь", "июль", "август", "сентябрь", "октябрь", "ноябрь", "декабрь"];
const weekDays = ['пн','вт','ср','чт','пт','сб','вс'];
const colCount = weekDayCount;

class Calendar extends Component {

    static propsTypes = {
        onPreviousMonth: PropTypes.func,
        onNextMonth: PropTypes.func,
        onDateClick: PropTypes.func,
        date: PropTypes.object.isRequired,
        month: PropTypes.object.isRequired,
        coloredDates: PropTypes.array
    };

    renderCols() {
        return (
            <colgroup>
                {$array.create(colCount).map((item, index) => <col key={index} />)}
            </colgroup>
        );
    }

    renderHeader() {
        return (
            <tr>
                <td colSpan={colCount} className="calendar__header text-uppercase">
                    <div className="calendar__header-inner">
                        <div onClick={this.props.onPreviousMonth}
                             className="calendar__button-previous">
                            <div className="calendar__arrow-left"></div>
                        </div>
                        {this.renderMonthCaption()}
                        <div onClick={this.props.onNextMonth}
                             className="calendar__button-next">
                            <div className="calendar__arrow-right"></div>
                        </div>
                    </div>
                </td>
            </tr>
        );
    }

    renderMonthCaption() {
        const { month } = this.props;
        return (
            <div className="calendar__month-caption">
                <small>{months[month.getMonth()]} {month.getFullYear()}</small>
            </div>
        );
    }

    renderWeekHeader() {
        return (
            <tr className="calendar__week-header">
                {weekDays.map(
                    (weekDay, index) =>
                        <th key={index} className="text-center">
                            <div className="calendar__week-header-text">
                                {weekDay}
                            </div>
                        </th>
                )}
            </tr>
        );
    }

    renderDateItemsOfRow(dates) {
        const {
            coloredDates,
            month,
            date: currentDate
        } = this.props;
        return dates.map((date, index) => {
            const coloredDate = coloredDates.filter(item => $date.isEqualDates(item.date, date))[0] || {};
            return (
                <CalendarDate
                    key={date.getTime()}
                    date={date}
                    activeMonth={month}
                    currentDate={currentDate}
                    backgroundColor={coloredDate.color}
                    onClick={this.props.onDateClick}
                />
            );
        });
    }

    renderDateItems() {
        const { month } = this.props;
        let dates = $date.getDatesOfMonthWeeks(month);
        return $array.splitByItemLength(dates, weekDayCount).map(
            (dates, index) =>
            <tr key={index}>{this.renderDateItemsOfRow(dates)}</tr>
        );
    }

    render () {
        const { month } = this.props;
        const monthWeekCount = $date.getMonthWeekCount(month);
        return (
            <div className={classNames({
                calendar: true,
                calendar_extended: monthWeekCount === 6
            })}>
                <div className="calendar__inner">
                    <table className="calendar__view text-center table table-bordered">
                        {this.renderCols()}
                        <tbody>
                            {this.renderHeader()}
                            {this.renderWeekHeader()}
                            {this.renderDateItems()}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }

}

export default Calendar;