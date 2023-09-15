import { IDay, IDate, IListItem } from './interface';
import { MONTHS_OF_YEAR } from './data';

export const timeConverter = (time: string): string => {
	const TIME_IN_HOURS_MINUTES: string[] = time.split(':');
	let hours: number | string = parseInt(TIME_IN_HOURS_MINUTES[0]);
	let minutes: number | string = parseInt(TIME_IN_HOURS_MINUTES[1]);

	let timeOfDay = 'AM';

	if (hours < 12) {
		timeOfDay = 'AM';
		if (hours === 0) {
			hours = 12;
		}
	} else if (hours >= 12) {
		timeOfDay = 'PM';
		if (hours === 12) {
			hours = 12;
		} else {
			hours = hours - 12;
		}
	}

	if (minutes <= 9) {
		minutes = `0${minutes}`;
	}

	return `${hours}:${minutes} ${timeOfDay}`;
};

export const calendarList = (year: number, month: number) => {
	const dayList: IDay[] = [];
	const REQUIRED_LIST_LENGTH = 42;

	const prevMonthTotal: number = new Date(year, month, 0).getDate() + 1;
	const firstDayOfMonth: number = new Date(year, month).getDay();
	for (let i = firstDayOfMonth; i > 0; i--) {
		dayList.push({
			day: prevMonthTotal - i,
			isActive: false,
			id: `${MONTHS_OF_YEAR[month - 1]} ${prevMonthTotal - i}, ${year}`,
			isWeekend:
				new Date(year, month - 1, prevMonthTotal - i).getDay() % 6 === 0,
		});
	}

	const currMonthTotal: number = new Date(year, month + 1, 0).getDate();
	const date = new Date();
	const thisMonth = date.getMonth();
	const thisYear = date.getFullYear();
	const today = date.getDate();
	for (let i = 1; i <= currMonthTotal; i++) {
		dayList.push({
			day: i,
			isActive: true,
			id: `${MONTHS_OF_YEAR[month]} ${i}, ${year}`,
			currentDay: month === thisMonth && year === thisYear && today === i,
			isWeekend: new Date(year, month, i).getDay() % 6 === 0,
		});
	}

	let dayTracker = 1;
	const currListLength: number = dayList.length;
	for (let i = currListLength; i < REQUIRED_LIST_LENGTH; i++) {
		dayList.push({
			day: dayTracker,
			isActive: false,
			id: `${MONTHS_OF_YEAR[month + 1]} ${dayTracker}, ${year}`,
			isWeekend: new Date(year, month + 1, dayTracker).getDay() % 6 === 0,
		});
		dayTracker++;
	}

	return dayList;
};

export const dateUpdater = (year: number, month: number): IDate => {
	let newMonth = month;
	let newYear = year;

	if (month < 0 || month > 11) {
		const newDate = new Date(year, month);
		newMonth = newDate.getMonth();
		newYear = newDate.getFullYear();
	}

	return { year: newYear, month: newMonth };
};

export const sliceText = (text: string) => {
	if (text.length > 10) {
		return text.slice(0, 10) + '...';
	} else {
		return text;
	}
};

export const sortListItems = (list: IListItem[]) => {
	const timeAM = list.filter((items) => {
		return items.time === '' || items.time ? items.time.includes('AM') : undefined;
	});
	const timePM = list.filter((items) => {
		return items.time !== undefined && items.time.includes('PM');
	});

	function sortList(list: IListItem[]) {
		const EARLIER = -1;
		const SAME_TIME = 0;
		const LATER = 1;
		return list.sort((item1, item2) => {
			if (
				item1.time === undefined ||
				item2.time === undefined ||
				item1.time.length < item2.time.length
			) {
				return EARLIER;
			} else if (item1.time.length > item2.time.length) {
				return SAME_TIME;
			} else {
				return item1.time < item2.time
					? EARLIER
					: item1.time > item2.time
					? LATER
					: SAME_TIME;
			}
		});
	}

	const sortedList1 = sortList(timeAM);
	const sortedList2 = sortList(timePM);

	return sortedList1.concat(sortedList2);
};

export const generateYears = (year: number) => {
	const yearList = [];
	for (let i = -50; i < 10; i++) {
		yearList.push(year + i);
	}

	return yearList;
};
