import { MONTHS_OF_YEAR } from '../utilities/data';
import { IDate } from '../utilities/interface';
import { ChangeEvent, useEffect, useRef } from 'react';

interface Props {
	date: IDate;
	handleSearch(date: IDate): void;
	yearList: number[];
}

const CalendarHeader = ({ date, handleSearch, yearList }: Props) => {
	const monthVal = useRef<HTMLSelectElement>(null);
	const yearVal = useRef<HTMLSelectElement>(null);

	useEffect(() => {
		if (monthVal.current) {
			monthVal.current.value = MONTHS_OF_YEAR[date.month];
		}
		if (yearVal.current) {
			yearVal.current.value = date.year.toString();
		}
	}, [date]);

	const handleMonthChange = (e: ChangeEvent<HTMLSelectElement>) => {
		handleSearch({ ...date, month: MONTHS_OF_YEAR.indexOf(e.target.value) });
	};

	const handleYearChange = (e: ChangeEvent<HTMLSelectElement>) => {
		handleSearch({ ...date, year: parseInt(e.target.value) });
	};

	return (
		<div className="calendar-header">
			<select
				name="month"
				id="month"
				ref={monthVal}
				onChange={handleMonthChange}
			>
				{MONTHS_OF_YEAR.map((month) => {
					return (
						<option
							key={month}
							value={month}
						>
							{month}
						</option>
					);
				})}
			</select>
			<select
				name="year"
				id="year"
				ref={yearVal}
				onChange={handleYearChange}
			>
				{yearList.map((year) => {
					return (
						<option
							key={year}
							value={year}
						>
							{year}
						</option>
					);
				})}
			</select>
		</div>
	);
};

export default CalendarHeader;
