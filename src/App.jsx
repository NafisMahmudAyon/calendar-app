// App.js
import React, { useState } from "react";
import "./App.css";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function App() {
	const [currentDate, setCurrentDate] = useState(new Date());

	const daysInMonth = (year, month) => {
		return new Date(year, month + 1, 0).getDate();
	};

	const getStartingDay = (year, month) => {
		return new Date(year, month, 1).getDay();
	};

	const getPreviousMonth = (year, month) => {
		return month === 0
			? { year: year - 1, month: 11 }
			: { year, month: month - 1 };
	};

	const getNextMonth = (year, month) => {
		return month === 11
			? { year: year + 1, month: 0 }
			: { year, month: month + 1 };
	};

	const goToPreviousMonth = () => {
		setCurrentDate((prevDate) => {
			const { year, month } = getPreviousMonth(
				prevDate.getFullYear(),
				prevDate.getMonth()
			);
			return new Date(year, month, 1);
		});
	};

	const goToNextMonth = () => {
		setCurrentDate((prevDate) => {
			const { year, month } = getNextMonth(
				prevDate.getFullYear(),
				prevDate.getMonth()
			);
			return new Date(year, month, 1);
		});
	};

	




  const renderCalendar = () => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();
		const totalDays = daysInMonth(year, month);
		const startingDay = getStartingDay(year, month);
		const today = new Date();

		const calendar = [];
		let dayCounter = 1;

		for (let i = 0; i < 6; i++) {
			const week = [];

			for (let j = 0; j < 7; j++) {
				const isOtherMonth =
					(i === 0 && j < startingDay) || (i === 0 && j < startingDay);
        
				const dayOfMonth = isOtherMonth
					? daysInMonth(
							getPreviousMonth(year, month).year,
							getPreviousMonth(year, month).month
					  ) -
					  (startingDay - j) +
					  dayCounter
					: dayCounter;

          // console.log(dayOfMonth)

				const isToday = year === today.getFullYear() && month === today.getMonth() &&	dayOfMonth === today.getDate();

        if(isOtherMonth){
          week.push(

          <div
						key={j}
						className={`day other-month `}>
						{dayOfMonth}
					</div>
          )
        console.log(dayOfMonth)
        }
        else if (dayCounter <= totalDays) {
					week.push(
						<div
							key={j}
							className={`day ${isToday ? "today" : ""}`}>
							{dayCounter}
						</div>
					);
					console.log(dayOfMonth);
				}
        else {
          week.push(
						<div key={j} className={`day other-month `}>
							{dayCounter - totalDays}
						</div>
					);
					console.log(dayOfMonth);
        }


				// week.push(
				// 	<div
				// 		key={j}
				// 		className={`day ${isOtherMonth ? "other-month" : "other"} ${
				// 			isToday ? "today" : ""
				// 		}`}>
				// 		{isOtherMonth
				// 			? dayOfMonth
				// 			: dayCounter <= totalDays
				// 			? dayCounter
				// 			: dayCounter - totalDays}
				// 	</div>
				// );

				if (!isOtherMonth) {
					dayCounter++;
				}
			}

			calendar.push(
				<div key={i} className="week">
					{week}
				</div>
			);
		}

		return calendar;
	};


  // const renderCalendarX = () => {
  //   const year = currentDate.getFullYear();
	// 	const month = currentDate.getMonth();
	// 	const totalDays = daysInMonth(year, month);
	// 	const startingDay = getStartingDay(year, month);
	// 	const today = new Date();

  //   // console.log(year,"-+-", month,"-+-",totalDays,"-+-",startingDay,"-+-",today )

  //   // console.log((daysInMonth(2024, 0)));
  //   // console.log(getStartingDay(2024, 8));
  //   // var X = [];

  //   for (let i = 0; i < 6; i++) {
	// 		const X = [];

	// 		for (let j = 0; j < 7; j++) {
  //       // console.log(i,",",j)
        
  //     }}

  // }



	return (
		<div className="calendar-container">
			<h1>React Calendar App</h1>
			<div className="header">
				<button onClick={goToPreviousMonth}>&lt; Prev</button>
				<span>
					{currentDate.toLocaleString("en-us", {
						month: "long",
						year: "numeric",
					})}
				</span>
				<button onClick={goToNextMonth}>Next &gt;</button>
			</div>
			<div className="days-of-week">
				{daysOfWeek.map((day) => (
					<div key={day} className="day-of-week">
						{day}
					</div>
				))}
			</div>
			{renderCalendar()}

			{/* {renderCalendarX()} */}
		</div>
	);
}

export default App;


























