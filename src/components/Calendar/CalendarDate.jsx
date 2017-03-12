import React, { Component, PropTypes } from 'react';
import classNames from 'classnames';

import $date from 'utils/date';
import $color from 'utils/color';

class CalendarDate extends Component {

    static propTypes = {
        date: PropTypes.object,
        active: PropTypes.bool,
        activeMonth: PropTypes.object,
        onClick: PropTypes.func,
        color: PropTypes.string
    };

    constructor() {
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick() {
        const { date,  } = this.props;
        this.props.onClick({
            date,
            isActiveMonth: this.getIsActiveMonth()
        });
    }

    getIsActiveMonth() {
        const { date, activeMonth } = this.props;
        return $date.isEqualMonths(date, activeMonth);
    }

    render() {
        const { currentDate, date, backgroundColor } = this.props;
        const isActiveMonth = this.getIsActiveMonth();
        const active = currentDate && $date.isEqualDates(date, currentDate) && isActiveMonth;
        const isDark = !!backgroundColor && $color.isItDark(backgroundColor) && isActiveMonth;
        var style = null;
        if (backgroundColor && isActiveMonth && !active) {
            style = { backgroundColor: backgroundColor };
        }


        return (
            <td className={classNames({
                    'calendar__date-item': true,
                    'calendar__date-item_other-month text-muted': !isActiveMonth,
                    'calendar__date-item_dark': isDark,
                    'calendar__date-item_active active': active
                })}
                style={style}
                onClick={this.handleClick}>
                <span className="calendar__date-box">
                    <span className="calendar__date-hint text-center">
                        {date.getDate()}
                    </span>
                </span>
            </td>
        );
    }

}

export default CalendarDate;

