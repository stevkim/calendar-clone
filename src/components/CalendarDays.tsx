import { DAYS_OF_WEEK } from '../utilities/data';

const DaysOfWeek = () => {
	return (
		<div className="day-of-week">
			{DAYS_OF_WEEK.map((dayName) => {
				return <div key={dayName}>{dayName}</div>;
			})}
		</div>
	);
};

export default DaysOfWeek;
