import { ChangeEvent, FormEvent, useState, useRef } from 'react';
import { IListItem } from '../../utilities/interface';
import { v4 as uuidv4 } from 'uuid';
import { timeConverter } from '../../utilities/functions';
import AddIcon from '@mui/icons-material/Add';

interface Props {
	handleSubmit(event: IListItem): void;
}

const initState = {
	id: '',
	text: '',
	time: '',
	check: false,
	color: '',
};

const ListForm = ({ handleSubmit }: Props) => {
	const [item, setItem] = useState<IListItem>(initState);
	const timeVal = useRef<HTMLInputElement>(null);
	const colorVal = useRef<HTMLInputElement>(null);

	const handleText = (e: ChangeEvent<HTMLInputElement>) => {
		setItem({ ...item, text: e.target.value });
	};

	const handleTime = (e: ChangeEvent<HTMLInputElement>) => {
		setItem({ ...item, time: timeConverter(e.target.value) });
	};

	const handleColor = (e: ChangeEvent<HTMLInputElement>) => {
		setItem({ ...item, color: e.target.value });
	};

	const _Submit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		handleSubmit({ ...item, id: uuidv4() });
		setItem(initState);
		if (timeVal.current) {
			timeVal.current.value = '';
		}
		if (colorVal.current) {
			colorVal.current.value = '';
		}
	};

	return (
		<form
			onSubmit={_Submit}
			className="list-form"
		>
			<label htmlFor="text-input">Add Event:</label>
			<input
				className="text-input"
				type="text"
				name="text-input"
				required
				onChange={handleText}
				value={item.text}
			/>
			<label htmlFor="time-input">Add a Time:</label>
			<input
				className="time-input"
				type="time"
				onChange={handleTime}
				ref={timeVal}
			/>
			<label htmlFor="color-picker"></label>
			<input
				className="color-picker"
				type="color"
				list=""
				ref={colorVal}
				onChange={handleColor}
			/>
			<button>
				<AddIcon fontSize="inherit" />
			</button>
		</form>
	);
};

export default ListForm;
