import { IListItem } from '../../utilities/interface';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';

interface Props {
	list: IListItem[];
	handleCheck(id: string): void;
	handleDelete(id: string): void;
}

const DisplayList = ({ list, handleCheck, handleDelete }: Props) => {
	return (
		<ul className="list">
			{list.map((item) => {
				return (
					<li
						key={item.id}
						className={item.check ? 'check' : ''}
					>
						<div
							className="color-dot"
							style={{ backgroundColor: item.color }}
						></div>
						{item.text}
						<span className="list-time">{item.time}</span>
						<button onClick={() => handleCheck(item.id)}>
							<CheckIcon fontSize="inherit" />
						</button>
						<button onClick={() => handleDelete(item.id)}>
							<DeleteIcon fontSize="inherit" />
						</button>
					</li>
				);
			})}
		</ul>
	);
};

export default DisplayList;
