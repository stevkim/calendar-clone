import { useEffect, useState } from 'react';
import { IListItem } from '../../utilities/interface';
import ListForm from './ListForm';
import DisplayList from './DisplayList';
import DisplayOnlyList from './DisplayOnlyList';
import { sortListItems } from '../../utilities/functions';

interface Props {
	storageKey: string;
	modal: boolean;
}

const List = ({ storageKey, modal }: Props) => {
	const [list, setList] = useState<IListItem[]>([]);
	const LOCAL_STORAGE_KEY = storageKey;

	useEffect(() => {
		setList(JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || '[]'));
	}, []);

	useEffect(() => {
		localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(list));
	}, [list]);

	const handleSubmit = (event: IListItem) => {
		setList(sortListItems([...list, event]));
	};

	const handleCheck = (id: string) => {
		setList(
			list.map((item) => {
				if (item.id === id) {
					return { ...item, check: !item.check };
				}
				return item;
			})
		);
	};

	const handleDelete = (id: string) => {
		setList(
			list.filter((item) => {
				return item.id !== id;
			})
		);
	};

	return (
		<>
			<DisplayOnlyList list={list} />

			{modal && (
				<div className="modal-overlay">
					<div
						className="modal-display"
						onClick={(e) => e.stopPropagation()}
					>
                        <h3>{storageKey}</h3>
						<DisplayList
							list={list}
							handleCheck={handleCheck}
							handleDelete={handleDelete}
						/>
						<ListForm handleSubmit={handleSubmit} />
					</div>
				</div>
			)}
		</>
	);
};

export default List;
