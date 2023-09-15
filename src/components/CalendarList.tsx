import Day from './Day';
import { IDay } from '../utilities/interface';

interface Props {
	dayList: IDay[];
}

const CalendarList = ({ dayList }: Props) => {
	return (
		<div className="calendar-list">
			{dayList.map((day) => {
				return (
					<Day
						day={day}
						key={day.id}
					/>
				);
			})}
		</div>
	);
};

export default CalendarList;
