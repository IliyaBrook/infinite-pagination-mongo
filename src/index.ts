import { Model, SortOrder } from 'mongoose';
import type { PaginationArgs, PaginationResult } from './types';

const paginate = async <T>(
	model: Model<T>,
	args: PaginationArgs,
	query: any = {}
): Promise<PaginationResult<T>> => {
	const {
		cursor,
		limit,
		sortBy = '_id',
		sortOrder = 'asc',
		filters = {},
		idKey = '_id'
	} = args;
	
	// Apply filters
	Object.keys(filters).forEach(key => {
		if (filters[key]) {
			query[key] = { $regex: filters[key], $options: 'i' };
		}
	});
	
	// Apply cursor for pagination
	if (cursor) {
		query[idKey] = sortOrder === 'asc' ? { $gt: cursor } : { $lt: cursor };
	}
	
	// Fetch items from the database
	const sortOption: [string, SortOrder][] = [[sortBy, sortOrder === 'asc' ? 1 : -1]];
	const items = await model.find(query)
		.sort(sortOption)
		.limit(limit + 1);
	
	const hasNextPage = items.length > limit;
	return {
		items: hasNextPage ? items.slice(0, -1) : items,
		hasNextPage,
	};
};

export default paginate;
