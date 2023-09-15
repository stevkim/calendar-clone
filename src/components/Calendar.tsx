import { useEffect, useState } from 'react';
import { IDay, IDate } from '../utilities/interface';
import {
	calendarList,
	dateUpdater,
	generateYears,
} from '../utilities/functions';
import DaysOfWeek from './CalendarDays';
import CalendarHeader from './CalendarHeader';
import CalendarList from './CalendarList';

const Calendar = () => {
	const [dayList, setDayList] = useState<IDay[]>([]);
	const [date, setDate] = useState<IDate>({ year: 0, month: 0 });
	const [yearList, setYearList] = useState<number[]>([]);

	useEffect(() => {
		let date = new Date();
		let month = date.getMonth();
		let year = date.getFullYear();
		setDate({ year: year, month: month });
		setYearList(generateYears(year));
		setDayList(calendarList(year, month));
	}, []);

	useEffect(() => {
		setDayList(calendarList(date.year, date.month));
	}, [date]);

	const handlePrevMonth = () => {
		setDate(dateUpdater(date.year, date.month - 1));
	};

	const handleNextMonth = () => {
		setDate(dateUpdater(date.year, date.month + 1));
	};

	const handleToday = () => {
		let date = new Date();
		let month = date.getMonth();
		let year = date.getFullYear();
		setDate({ year: year, month: month });
	};

	const handleSearch = (date: IDate) => {
		setDate(date);
	};

	return (
		<>
			<header className="title">
				<CalendarHeader
					date={date}
					handleSearch={handleSearch}
					yearList={yearList}
				/>
				<div className="buttons">
					<button onClick={handlePrevMonth}>{'<'}</button>
					<button onClick={handleToday}>Today</button>
					<button onClick={handleNextMonth}>{'>'}</button>
				</div>
			</header>
			<section className="calendar-wrapper">
				<DaysOfWeek />
				<CalendarList dayList={dayList} />
			</section>
		</>
	);
};

export default Calendar;
