export interface IListItem {
	id: string;
	text: string;
	time?: string;
	check: boolean;
	color?: string;
}

export interface IDate {
	month: number;
	year: number;
}

export interface IDay {
	day: number;
	isActive: boolean;
	id: string;
	currentDay?: boolean;
	isWeekend?: boolean;
}
