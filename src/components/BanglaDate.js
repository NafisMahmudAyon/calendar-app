// BanglaDate.js
export class BanglaDate {
	constructor({ day, month, year }) {
		this.date = new Date(year, month - 1, day);
		this.dateComponents = new Intl.DateTimeFormat("en-US", {
			year: "numeric",
			month: "numeric",
			day: "numeric",
		}).formatToParts(this.date);

		this.day = this.toBangla(this.dateComponents[4].value);
		this.week = this.getBanglaWeek();
		this.month = this.getBanglaMonth();
		this.year = this.toBangla(this.dateComponents[0].value);
		this.banglaDate = `${this.day} ${this.month}, ${this.year}`;
		this.season = this.getBanglaSeason();
	}

	toBangla(string) {
		return string.replace(/0|1|2|3|4|5|6|7|8|9/g, (match) =>
			String.fromCharCode(match.charCodeAt(0) + 0x09e6 - 0x30)
		);
	}

	getBanglaWeek() {
		const banglaWeek = [
			"রবিবার",
			"সোমবার",
			"মঙ্গলবার",
			"বুধবার",
			"বৃহস্পতিবার",
			"শুক্রবার",
			"শনিবার",
		];
		const weekDay = this.date.getDay();
		return banglaWeek[weekDay];
	}

	getBanglaMonth() {
		const banglaMonths = [
			"বৈশাখ",
			"জ্যৈষ্ঠ",
			"আষাঢ়",
			"শ্রাবণ",
			"ভাদ্র",
			"আশ্বিন",
			"কার্তিক",
			"অগ্রহায়ণ",
			"পৌষ",
			"মাঘ",
			"ফাল্গুন",
			"চৈত্র",
		];
		const month = this.date.getMonth();
		return banglaMonths[month];
	}

	getBanglaSeason() {
		const banglaSeasons = ["গ্রীষ্ম", "বর্ষা", "শরৎ", "হেমন্ত", "শীত", "বসন্ত"];
		const month = this.date.getMonth();
		return banglaSeasons[Math.floor(month / 2)];
	}
}

export class DateMonthYear {
	constructor({ day, month, year }) {
		this.day = day;
		this.month = month;
		this.year = year;
	}
}


import React from 'react'

const BanglaDate = () => {
  return (
    <div>BanglaDate</div>
  )
}

export default BanglaDate