import React, { Fragment, useState } from "react";
import { Badge } from "@material-ui/core";
import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function ServerRequest() {
  const [selectedDays, setSelectedDays] = useState([1, 2, 15]);
  const [selectedDate, handleDateChange] = useState(new Date());

  const handleMonthChange = async () => {
    // just select random days to simulate server side based data
    return new Promise(resolve => {
      setTimeout(() => {
        setSelectedDays([1, 2, 3].map(() => getRandomNumber(1, 28)));
        resolve();
      }, 1000);
    });
  };

  return (
    <>
		<MuiPickersUtilsProvider utils={DateFnsUtils}>
			<DatePicker
				label="With server data"
				value={selectedDate}
				onChange={handleDateChange}
				onMonthChange={handleMonthChange}
				renderDay={(day, selectedDate, isInCurrentMonth, dayComponent) => {
				const date = new Date(day);	
				const isSelected = isInCurrentMonth && selectedDays.includes(date.getDate());
				return <Badge badgeContent={isSelected ? "🌚" : undefined}>{dayComponent}</Badge>;
				}}
			/>
	  	</MuiPickersUtilsProvider>
    </>
  );
}

export default ServerRequest;
