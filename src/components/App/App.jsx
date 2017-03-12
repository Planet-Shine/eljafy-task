
import React, { Component, PropTypes } from 'react';
import { FooCalendar } from 'containers'

import $date from 'utils/date';

class App extends Component {

    handleDateSelect({ date }) {
        console.log(`selected day: ${$date.toDateString(date)}`);
    }

    handleMonthSwitch({ month }) {
        console.log(`current month: ${$date.toMonthString(month)}`);
    }
    

    render() {
        return <FooCalendar
                onDateSelect={this.handleDateSelect}
                onMonthSwitch={this.handleMonthSwitch}
            />
    }
}

export default App;
