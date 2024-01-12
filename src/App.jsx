import React, { useState } from "react";
import "./App.css";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
	"January",
	"February",
	"March",
	"April",
	"May",
	"June",
	"July",
	"August",
	"September",
	"October",
	"November",
	"December",
];

function App() {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

	const handleMonthSelection = (selectedMonth) => {
		setCurrentDate((prevDate) => {
			return new Date(prevDate.getFullYear(), selectedMonth, 1);
		});
		setIsDropdownOpen(false);
	};

	const toggleDropdown = () => {
		setIsDropdownOpen(!isDropdownOpen);
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

				const isToday =
					year === today.getFullYear() &&
					month === today.getMonth() &&
					dayOfMonth === today.getDate();

				if (isOtherMonth) {
					week.push(
						<div key={j} className={`day other-month `}>
							{dayOfMonth}
						</div>
					);
				} else if (dayCounter <= totalDays) {
					week.push(
						<div key={j} className={`day ${isToday ? "today" : ""}`}>
							{dayCounter}
						</div>
					);
				} else {
					week.push(
						<div key={j} className={`day other-month `}>
							{dayCounter - totalDays}
						</div>
					);
				}

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

	return (
		<div className="calendar-container">
			<h1>React Calendar App</h1>
			<div className="header">
				<button onClick={goToPreviousMonth}>&lt; Prev</button>
				<span onClick={toggleDropdown} className="month-selector">
					{months[currentDate.getMonth()]}
					{isDropdownOpen && (
						<div className="month-dropdown">
							{months.map((month, index) => (
								<div key={index} onClick={() => handleMonthSelection(index)}>
									{month}
								</div>
							))}
						</div>
					)}
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
		</div>
	);
}

export default App;

