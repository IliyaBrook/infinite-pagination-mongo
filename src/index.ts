import { Model } from 'mongoose';
import type { PaginationArgs, PaginationResult } from './types'

const paginate = async <T>(
	model: Model<T>,
	args: PaginationArgs,
	query: any = {}
): Promise<PaginationResult<T>> => {
	const { cursor, limit, search } = args;
	
	if (search) {
		query.name = { $regex: search, $options: 'i' };
	}
	
	if (cursor) {
		query._id = { $lt: cursor };
	}
	const items = await model.find(query)
		.sort({ _id: -1 })
		.limit(limit + 1);
	
	const hasNextPage = items.length > limit;
	return {
		items: hasNextPage ? items.slice(0, -1) : items,
		hasNextPage,
	};
};

export default paginate;