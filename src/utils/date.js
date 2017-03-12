
export const weekDayCount = 7;
const dateStringSeparator = '.';

function getTwoDigits(num) {
    return String(num + 100).slice(-2);
}

var $date = {
    isEqualDates(date1, date2) {
        return date1.getDate() === date2.getDate() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    },
    isEqualMonths(date1, date2) {
        return date1.getMonth() === date2.getMonth() &&
            date1.getFullYear() === date2.getFullYear();
    },
    addMonths(date, delta) {
        date = $date.getFirstMonthDate(date);
        date.setMonth(date.getMonth() + delta);
        return date;
    },
    toDate(date) {
        if (typeof date === 'string') {
            date = date.split(dateStringSeparator).map(item => parseInt(item, 10));
            date = new Date(date[2], date[1] - 1, date[0]);
        } else {
            date = null;
        }
        return date;
    },
    toMonthString(date) {
        if (date) {
            date = [
                getTwoDigits(date.getMonth() + 1),
                date.getFullYear()
            ].join(dateStringSeparator);
        } else {
            date = null;
        }
        return date;
    },
    toDateString(date) {
        if (date) {
            date = [
                getTwoDigits(date.getDate()),
                getTwoDigits(date.getMonth() + 1),
                date.getFullYear()
            ].join(dateStringSeparator);
        } else {
            date = null;
        }
        return date;
    },
    getFirstMonthDate(month) {
        var firstMonthDate = $date.cloneDate(month);
        firstMonthDate.setDate(1);
        return firstMonthDate;
    },
    getLastMonthDate(month) {
        const firstDateOfMonth = $date.getFirstMonthDate(month);
        return new Date($date.addMonths(firstDateOfMonth, 1).setDate(0));
    },
    getRussianDay(date) {
        return (date.getDay() || weekDayCount) - 1;
    },
    cloneDate(date) {
        return new Date(date);
    },
    getMonthWeekCount(month) {
        const firstDateOfMonth = $date.getFirstMonthDate(month);
        const lastDateOfMonth = $date.getLastMonthDate(month);
        const firstDayOfMonth = $date.getRussianDay(firstDateOfMonth);
        const lastDayOfMonth = $date.getRussianDay(lastDateOfMonth);
        const result = (
            firstDayOfMonth +
            lastDateOfMonth.getDate() +
            (weekDayCount - 1) - lastDayOfMonth
        ) / weekDayCount;
        return parseInt(result, 10);
    },
    getDatesOfMonthWeeks(month) {
        const firstDate = $date.getFirstMonthDate(month);
        const firstDay = $date.getRussianDay(firstDate);
        const dates = [];
        firstDate.setDate(firstDate.getDate() - firstDay);
        var weekCount = $date.getMonthWeekCount(month);
        weekCount === 4 && weekCount++; /* особый случай для февраля, что начинаяется пн, высокосного года, чтобы сохранить число строк */
        for (let i = 0, currentDate = firstDate; i < weekCount * weekDayCount; i += 1) {
            dates.push($date.cloneDate(currentDate));
            currentDate.setDate(currentDate.getDate() + 1);
        }
        return dates;
    }
};

export default $date;

