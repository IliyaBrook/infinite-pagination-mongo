import { Model, SortOrder } from 'mongoose';
import type { PaginationArgs, PaginationResult } from './types';

const paginate = async <T>(
	model: Model<T>,
	args: PaginationArgs<T>,
): Promise<PaginationResult<T>> => {
	const {
		cursor,
		limit,
		idKey = "_id",
		sortOrder = "asc",
		idFilters = {},
		filters = {},
		projection = {},
		options = {},
		populate = undefined,
	} = args;
	
	const and =
		Object.keys(filters).reduce((acc, key) => {
			if (filters[key]) {
				acc.push({ [key]: { $regex: filters[key], $options: "i" } });
			}
			return acc;
		}, []) || [];
	
	if (cursor) {
		idFilters[idKey] = sortOrder === "asc" ? { $gt: cursor } : { $lt: cursor };
	}
	
	const sortOption: [string, SortOrder][] = [
		[idKey, sortOrder === "asc" ? 1 : -1],
	];
	const queryProps = { ...idFilters, $and: and.length === 0 ? [{}] : and };
	let result = model
		.find(queryProps, projection, options)
		.sort(sortOption)
		.limit(limit + 1);
	if (populate) {
		result = result.populate(populate);
	}
	const data = await result;
	const hasNextPage = data.length > limit;
	return {
		data: hasNextPage ? data.slice(0, -1) : data,
		hasNextPage,
	};
};

export default paginate;
