
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
router.get('/items', async (req, res) => {
	const { cursor, limit, sortOrder, ...restFilters } = req.query;
	
	try {
		const result = await paginate(Item, {
			cursor: cursor as string | undefined,
			limit: parseInt(limit as string, 10) || 10,
			sortOrder: sortOrder as 'asc' | 'desc' || 'asc',
			filters: restFilters,
			idKey: '_id'
		});
		
		return res.json(result);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

export default router;
```

### Types

```typescript
export interface PaginationArgs {
	cursor?: string; // last item ID
	limit: number;
	sortOrder?: 'asc' | 'desc';
	idKey?: string; // default is '_id'
	filters?: FilterQuery<TRawDocType>;
	projection?: ProjectionType<TRawDocType> | null | undefined; // Mongoose ProjectionType
	populate?: string; // Mongoose populate, write the field name to populate
	options?: QueryOptions<TRawDocType> | null | undefined; // Mongoose QueryOptions
}

export interface PaginationResult<T> {
	items: T[];
	hasNextPage: boolean;
}
```

### Props 

* **cursor** - The ID of the last item from the previous page.
* **limit** - The number of items to retrieve.
* **sortOrder** - The order to sort the items (asc for ascending, desc for descending).
* **filters ** - An object containing key-value pairs to filter the items.
* **idKey ** - The key to use for identifying items (default is '_id').
* **populate** - The field to populate using Mongoose populate.
* **options** - Additional options to pass to the Mongoose query.
* **projection** - The fields to include or exclude from the query.

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
