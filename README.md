
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

## Usage

### Example

```typescript
// Usage in an Express route
import express from 'express';
import Item from '../models/Item';
import { paginate } from '../packages/infinite-pagination-mongo'
const router = express.Router();

router.get('/items', async (req, res) => {
	const { cursor, limit, search } = req.query;
	const paginationArgs = {
		cursor: cursor as string | undefined,
		limit: parseInt(limit as string, 10) || 10,
		search: search as string | undefined,
	};
	
	try {
		const result = await paginate(Item, paginationArgs);
		res.json(result);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
});

export default router;
```

### Props 

* **cursor** - The ID of the last item from the previous page.
* **limit** - The number of items to retrieve.
* **search** - A search term to filter the items by name.

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
