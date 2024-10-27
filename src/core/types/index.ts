export interface SuccessResponse<T> {
	data?: T;
}

export interface ValidationType {
	fields: string[];
	constraint: string;
}
