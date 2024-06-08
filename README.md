
# infinite-pagination-mongo

A simple server-side pagination package for use with MongoDB and Mongoose.

## Installation

You can install the package via npm or yarn:

```sh
npm install infinite-pagination-mongo
```

```sh
yarn add infinite-pagination-mongo
```

### Example

```typescript
// Usage in an Express route
import express from 'express';
import Item from '../models/Item';
import { paginate } from '../packages/infinite-pagination-mongo';
const router = express.Router();

router.get('/items', async (req, res) => {
	const { cursor, limit, sortBy, sortOrder, filters } = req.query;
	const parsedFilters = filters ? JSON.parse(filters as string) : {};
	
	try {
		const result = await paginate(Item, {
			cursor: cursor as string | undefined,
			limit: parseInt(limit as string, 10) || 10,
			sortBy: sortBy as string | undefined,
			sortOrder: sortOrder as 'asc' | 'desc' || 'asc',
			filters: parsedFilters,
			idKey: '_id'
		});
		res.json(result);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

export default router;
```

### Types

```typescript
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
```

### Props 

* **cursor** - The ID of the last item from the previous page.
* **limit** - The number of items to retrieve.
* **sortBy ** - The field to sort the items by.
* **sortOrder** - The order to sort the items (asc for ascending, desc for descending).
* **filters ** - An object containing key-value pairs to filter the items.
* **idKey ** - The key to use for identifying items (default is '_id').

## License

This project is licensed under the MIT License.

## Development

To start development, use the following command:

```sh
yarn dev
```

## Related Packages

For client-side pagination in React, you can use the following packages:
- **use-apollo-infinite-scroll**: For GraphQL with Apollo Client. [GitHub ➝](https://github.com/IliyaBrook/use-apollo-infinite-scroll.git)
- **use-fetch-infinite-scroll**: For simple REST API with fetch. [GitHub ➝](https://github.com/IliyaBrook/use-fetch-infinite-scroll.git)
