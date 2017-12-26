import {
	createFetchSingleItemAction,
	createFetchSingleItemThunk,
	createFetchItemsAction,
	createFetchAllItemsThunk,
	createFetchItemPageThunk
} from "utilities/action";

const itemName = "productCategory";

/**
 * Maps an item so we can store it in the state
 * @param {object} item The item to map
 * @return {object} The mapped item
 */
const mapItem = ({
	id,
	count,
	description,
	name,
	slug,
	parent,
	thumbnail_id: thumbnailId
}) => ({
	id,
	count,
	description,
	name,
	slug,
	parent,
	thumbnailId
});

/**
 * Action called before and after fetching an item
 * @param {boolean} isFetching Whether it is currently being fetched
 * @param {string} status If there was an error during the request, this field should contain it
 * @param {object} item The received item
 * @return {object} The redux action
 */
const fetchItemAction = createFetchSingleItemAction(itemName);

/**
 * Fetches a single item
 * @param {number} itemId The id of the requested item
 * @returns {function}
 */
export const fetchItem = createFetchSingleItemThunk(
	fetchItemAction,
	id => `/wp-json/wp/v2/product_cat/${id}`,
	mapItem
);

/**
 * Action called before and after fetching all items
 * @param {boolean} isFetching Whether it is currently being fetched
 * @param {string} status If there was an error during the request, this field should contain it
 * @param {object} items The received items
 * @return {object} The redux action
 */
const fetchItemsAction = createFetchItemsAction(itemName);

/**
 * Fetches all items
 * @returns {function}
 */
export const fetchAll = createFetchAllItemsThunk(
	fetchItemsAction,
	(page, perPage) =>
		`/wp-json/wp/v2/product_cat?page=${page}&per_page=${perPage}`,
	response => parseInt(response.headers.get("x-wp-total")),
	mapItem
);

/**
 * Fetches specified items
 * @return {function}
 */
export const fetchItems = createFetchItemPageThunk(
	fetchItemsAction,
	(page, perPage, itemIds) =>
		`/wp-json/wp/v2/product_cat?page=${page}&per_page=${
			perPage
		}&include[]=${itemIds.join("&include[]=")}`,
	response => parseInt(response.headers.get("x-wp-total")),
	mapItem
);
