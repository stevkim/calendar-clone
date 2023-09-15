import { IListItem } from '../../utilities/interface';
import { sliceText } from '../../utilities/functions';

interface Props {
	list: IListItem[];
}

const DisplayOnlyList = ({ list }: Props) => {
	return (
		<ul className="display-only">
			{list.map((listItem) => {
				return (
					<li
						key={listItem.id}
						className={listItem.check ? 'check' : ''}
						style={{ backgroundColor: `${listItem.color}60` }}
					>
						{sliceText(listItem.text)}
						<span className="display-only-time">{listItem.time}</span>
					</li>
				);
			})}
		</ul>
	);
};

export default DisplayOnlyList;
