// App.js
import React, { useState } from "react";
import "./App.css";

import {
	getDate,
	getDay,
	getMonth,
	getWeekDay,
	getYear,
} from "bangla-calendar";

const BanglaDate = (date, month, year) => {
	console.log(date, month, year);
	var monthX = month + 1;

	console.log(monthX);

	// return <div>BanglaDate</div>;
};

const daysOfWeek = ["রবি", "সোম", "মঙ্গল", "বুধ", "বৃহঃ", "শুক্র", "শনি"];
// const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const months = [
	"জানুয়ারি",
	"ফেব্রুয়ারি",
	"মার্চ",
	"এপ্রিল",
	"মে",
	"জুন",
	"জুলাই",
	"আগস্ট",
	"সেপ্টেম্বর",
	"অক্টোবর",
	"নভেম্বর",
	"ডিসেম্বর",
];
// const months = [
// 	"January",
// 	"February",
// 	"March",
// 	"April",
// 	"May",
// 	"June",
// 	"July",
// 	"August",
// 	"September",
// 	"October",
// 	"November",
// 	"December",
// ];

function App() {
	const [currentDate, setCurrentDate] = useState(new Date());
	const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false);
	const [isYearDropdownOpen, setIsYearDropdownOpen] = useState(false);

	// const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

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

	const decrementYear = () => {
		setCurrentDate(
			(prevDate) => new Date(prevDate.getFullYear() - 1, prevDate.getMonth(), 1)
		);
	};

	const incrementYear = () => {
		setCurrentDate(
			(prevDate) => new Date(prevDate.getFullYear() + 1, prevDate.getMonth(), 1)
		);
	};

	const handleMonthSelection = (selectedMonth) => {
		setCurrentDate((prevDate) => {
			return new Date(prevDate.getFullYear(), selectedMonth, 1);
		});
		setIsMonthDropdownOpen(false);
	};

	const toggleMonthDropdown = () => {
		setIsMonthDropdownOpen(!isMonthDropdownOpen);
		setIsYearDropdownOpen(false);
	};

	const handleYearSelection = (selectedYear) => {
		setCurrentDate((prevDate) => {
			return new Date(selectedYear, prevDate.getMonth(), 1);
		});
		setIsYearDropdownOpen(false);
	};

	const toggleYearDropdown = () => {
		setIsYearDropdownOpen(!isYearDropdownOpen);
		setIsMonthDropdownOpen(false);
	};

	function createDate(month, date, year, hours = 0, minutes = 0, seconds = 0) {
		// Convert month name to index (0-based)
		const monthIndex = new Date(Date.parse(`${month} 1, 2000`)).getMonth();

		// Create Date object
		const resultDate = new Date(
			year,
			monthIndex,
			date,
			hours,
			minutes,
			seconds
		);

		return resultDate;
	}

	const inputDateString = "2024-01-30T18:00:00.000Z";

	// Convert the input date string to a Date object
	const inputDate = new Date(inputDateString);

	console.log(inputDate);

	// Format the date to "Month day year hours:minutes:seconds"
	const options = {
		month: "long",
		day: "numeric",
		year: "numeric",
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		timeZone: "UTC",
	};

	const formattedDate = inputDate.toLocaleDateString("en-US", options);

	console.log(formattedDate);

	const renderCalendar = () => {
		const year = currentDate.getFullYear();
		const month = currentDate.getMonth();
		const totalDays = daysInMonth(year, month);
		const startingDay = getStartingDay(year, month);
		const today = new Date();

		const calendar = [];
		let dayCounter = 1;

		const handleDateClick = (date, month, year) => {
			var dateX = new Date(year, month, date);
			console.log("Clicked date:", date, month, year, dateX);
			// You can perform any other actions with the clicked date here
		};

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
				const isFriday = j === 5;
				const isSaturday = j === 6;
				const isSunday = j === 0;
				const isMonday = j === 1;
				const isTuesday = j === 2;
				const isWednesday = j === 3;
				const isThursday = j === 4;

				if (isOtherMonth) {
					console.log(month);
					var date1 = new Date(year, month - 1, dayOfMonth, 18, 0, 0);
					var monthX = month - 1;
					var yearX = year;
					if (monthX < 0) {
						monthX = 11;
						yearX = year - 1;
					}
					var BDate = getDay(date1, { format: "DD", calculationMethod: "BD" });
					var BMonth = getMonth(date1, {
						format: "MMMM",
						calculationMethod: "BD",
					});
					console.log(date1, monthX, yearX, month, year, dayOfMonth);
					week.push(
						<div
							key={j}
							className={`day relative shadow-[5px_5px_1px_#999] hover:shadow-[1px_1px_1px_#999] hover:bg-[#999]  other-month px-1 py-4 pt-3 ${isFriday ? "friday" : ""} ${isSaturday ? "saturday" : ""} ${isSunday ? "sunday" : ""} ${isMonday ? "monday" : ""}  ${isTuesday ? "tuesday" : ""}  ${isWednesday ? "wednesday" : ""} ${isThursday ? "thursday" : ""} `}
							onClick={() => handleDateClick(dayOfMonth, monthX, yearX)}
							title={`${dayOfMonth}-${months[monthX]}-${yearX}`}
							>
							<div className="text-2xl w-14 ">{dayOfMonth}</div>
							<div className="absolute bottom-0 right-2 text-[12px] ">
								<span className="text-[8px]">{BMonth}</span> {BDate}
							</div>
						</div>
					);
				} else if (dayCounter <= totalDays) {
					var date1 = new Date(year, month, dayCounter, 18, 0, 0);
					var BDate = getDay(date1, { format: "DD", calculationMethod: "BD" });
					var BMonth = getMonth(date1, {
						format: "MMMM",
						calculationMethod: "BD",
					});
					var date = dayCounter;
					week.push(
						<div
							key={j}
							className={`day relative   px-1 py-4 pt-3 ${isToday ? "today" : ""}   ${
								isFriday ? "friday" : ""
							} ${isSaturday ? "saturday" : ""} ${isSunday ? "sunday" : ""} ${
								isMonday ? "monday" : ""
							}  ${isTuesday ? "tuesday" : ""}  ${
								isWednesday ? "wednesday" : ""
							} ${isThursday ? "thursday" : ""} `}
							onClick={() => handleDateClick(date1)}
							title={`${date}-${months[month]}-${year}`}>
							<div className="text-2xl w-14 ">
								{date >= 1 && date <= 9 ? "0" + date : date}
							</div>
							<div className="absolute bottom-0 right-2 text-[12px] ">
								<span className="text-[8px]">{BMonth}</span> {BDate}
							</div>
						</div>
					);
				} else {
					console.log(month)
					var date1 = new Date(year, month, dayCounter, 18, 0, 0);
					var monthX = month + 1;
					var yearX = year;
					if (monthX > 11) {
						monthX = 0;
						yearX = year + 1;
					}
					console.log(monthX, yearX)
					var BDate = getDay(date1, { format: "DD", calculationMethod: "BD" });
					var BMonth = getMonth(date1, {
						format: "MMMM",
						calculationMethod: "BD",
					});
					var date = dayCounter - totalDays;
					console.log(date);
					week.push(
						<div
							key={j}
							className={`day relative    border-[#999] other-month px-1 py-4 pt-3 	${
								isFriday ? "friday-off" : ""
							} ${isSaturday ? "saturday-off" : ""}	${
								isSunday ? "sunday-off" : ""
							}	${isMonday ? "monday-off" : ""}	${
								isTuesday ? "tuesday-off" : ""
							}	${isWednesday ? "wednesday-off" : ""}	${
								isThursday ? "thursday-off" : ""
							}  `}
							onClick={() => handleDateClick(date1)}
							title={`${date}-${months[monthX]}-${yearX}`}>
							<div className="text-2xl w-14 ">
								{date >= 1 && date <= 9 ? "0" + date : date}
							</div>
							<div className="absolute bottom-0 right-2 text-[12px] ">
								<span className="text-[8px]">{BMonth}</span> {BDate}
							</div>
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

	const renderMonthDropdown = () => {
		return (
			<div className="month-dropdown">
				{/* <span onClick={goToPreviousMonth}>&#8592;</span> Left arrow */}
				{months.map((month, index) => (
					<div key={month} onClick={() => handleMonthSelection(index)}>
						{month}
					</div>
				))}
				{/* <span onClick={goToNextMonth}>&#8594;</span> Right arrow */}
			</div>
		);
	};

	const renderYearDropdown = () => {
		const currentYear = currentDate.getFullYear();
		const startYear = currentYear - 30;
		const endYear = currentYear + 50;

		const years = Array.from(
			{ length: endYear - startYear + 1 },
			(_, index) => startYear + index
		);

		return (
			<div className="year-dropdown">
				{/* <span onClick={decrementYear}>&#8593;</span> Up arrow */}
				{years.map((year) => (
					<div key={year} onClick={() => handleYearSelection(year)}>
						{year}
					</div>
				))}
				{/* <span onClick={incrementYear}>&#8595;</span> Down arrow */}
			</div>
		);
	};

	return (
		<div className="calendar-container flex w-full flex-col items-center">
			<h1>React Calendar App</h1>
			<div className="w-max rounded-lg ">
				<div className="header flex justify-between w-full">
					<button onClick={goToPreviousMonth}>&lt; Prev</button>
					<div>
						{/* <span onClick={goToPreviousMonth}>&#8592;</span> */}
						<span className="month-selector" onClick={toggleMonthDropdown}>
							{months[currentDate.getMonth()]}
							{isMonthDropdownOpen && renderMonthDropdown()}▽
						</span>
						{/* <span onClick={goToNextMonth}>&#8594;</span> */}
					</div>
					<div>
						{/* <span onClick={decrementYear}>&#8593;</span> */}
						<span className="year-selector" onClick={toggleYearDropdown}>
							{currentDate.getFullYear()}
							{/* {currentYear} */}
							{isYearDropdownOpen && renderYearDropdown()}
						</span>
						{/* <span onClick={incrementYear}>&#8595;</span> */}
					</div>
					<button onClick={goToNextMonth}>Next &gt;</button>
				</div>

				<div className="days-of-week w-full rounded-lg shadow-[5px_5px_1px_#ddd] ">
					{daysOfWeek.map((day) => (
						<div
							key={day}
							className="day-of-week text-2xl px-1 py-4 pt-3 w-14 ">
							{day}
						</div>
					))}
				</div>
				<div className="rounded-b-lg  overflow-hidden ">{renderCalendar()}</div>
				<span className="flex gap-2 justify-center items-center ">
					<span className="flex gap-1 items-center text-[var(--today)] "><span className="h-4 w-4 inline-block bg-[var(--today)] rounded-full "></span>today</span>
					<span className="flex gap-1 items-center text-[var(--friday)] "><span className="h-4 w-4 inline-block bg-[var(--friday)] rounded-full "></span>today</span>
					<span className="flex gap-1 items-center text-[var(--saturday)] "><span className="h-4 w-4 inline-block bg-[var(--saturday)] rounded-full "></span>today</span>
				</span>
			</div>
		</div>
	);
}

export default App;






























