import { FilterQuery, ProjectionType, QueryOptions } from 'mongoose'

export interface PaginationArgs<TRawDocType> {
	cursor?: string;
	limit: number;
	sortOrder?: "asc" | "desc";
	idFilters?: Record<string, any>;
	idKey?: string;
	filters?: FilterQuery<TRawDocType>;
	projection?: ProjectionType<TRawDocType> | null | undefined;
	options?: QueryOptions<TRawDocType> | null | undefined;
	populate?: string;
}
export interface PaginationResult<T> {
	data: T[];
	hasNextPage: boolean;
}
