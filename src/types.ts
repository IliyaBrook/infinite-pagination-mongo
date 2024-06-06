export interface PaginationArgs {
	cursor?: string;
	limit: number;
	search?: string;
}

export interface PaginationResult<T> {
	items: T[];
	hasNextPage: boolean;
}