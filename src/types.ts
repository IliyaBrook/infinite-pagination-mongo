export interface PaginationArgs {
	cursor?: string;
	limit: number;
	sortBy?: string;
	sortOrder?: 'asc' | 'desc';
	filters?: Record<string, any>;
	idKey?: string;
}

export interface PaginationResult<T> {
	items: T[];
	hasNextPage: boolean;
}
