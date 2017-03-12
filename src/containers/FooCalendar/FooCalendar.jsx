
import React, { Component, PropTypes } from 'react';
import { Calendar } from 'components'

import $date from 'utils/date';

class FooCalendar extends Component {

    static propTypes = {
        onDateSelect: PropTypes.func,
        onMonthSwitch: PropTypes.func
    };

    state = {
        coloredDates: [
            {date:"06.02.2017", color:"#0f0"},
            {date:"18.02.2017", color:"#00f"},
            {date:"18.03.2017", color:"#0ff"},
            {date:"04.03.2017", color:"#f0f"},
            {date:"05.03.2017", color:"#00f"},
            {date:"10.03.2017", color:"#0ff"},
            {date:"20.03.2017", color:"#f0f"},
            {date:"22.03.2017", color:"#0ff"},
            {date:"07.04.2017", color:"#f0f"}
        ],
        month: new Date(),
        date: new Date()
    };

    constructor() {
        super();
        this.handlePreviousMonth = this.handlePreviousMonth.bind(this);
        this.handleNextMonth = this.handleNextMonth.bind(this);
        this.handleDateClick = this.handleDateClick.bind(this);
    }

    handlePreviousMonth() {
        var { month } = this.state;
        month = $date.addMonths(month, -1);
        this.setState({
            month
        });
        this.props.onMonthSwitch({
            month
        });
    }

    handleNextMonth() {
        var { month } = this.state;
        month = $date.addMonths(month, 1);
        this.setState({
            month
        });
        this.props.onMonthSwitch({
            month
        });
    }

    handleDateClick({ date, isActiveMonth }) {
        if (isActiveMonth) {
            this.setState({
                date
            });
            this.props.onDateSelect({
                date
            });
        }
    }

    formatColoredDates(coloredDates) {
        return coloredDates.map(({ date, color }) => {
            date = $date.toDate(date);
            return {
                date,
                color
            };
        });
    }

    render() {
        const {
            date,
            month,
            coloredDates
        } = this.state;
        const {
            formatColoredDates,
            handlePreviousMonth,
            handleNextMonth,
            handleDateClick
        } = this;
        return (
            <div>
                <Calendar month={month}
                          date={date}
                          coloredDates={formatColoredDates(coloredDates)}
                          onPreviousMonth={handlePreviousMonth}
                          onNextMonth={handleNextMonth}
                          onDateClick={handleDateClick} />
            </div>
        );
    }
}

export default FooCalendar;
