import { useState } from 'react';
import { IDay } from '../utilities/interface';
import List from './list-comp/List';

interface Props {
	day: IDay;
}

const Day = ({ day }: Props) => {
	const [modal, setModal] = useState<boolean>(false);

	const handleModal = () => {
		setModal(!modal);
	};

	return (
		<div
			className={`${day.isActive ? 'day' : 'day inactive'} ${
				day.isWeekend ? 'weekend' : ''
			}`}
			onClick={handleModal}
		>
			<p className={day.currentDay ? 'current-day' : ''}>{day.day}</p>
			<List
				storageKey={day.id}
				key={day.id}
				modal={day.isActive && modal}
			/>
		</div>
	);
};

export default Day;
