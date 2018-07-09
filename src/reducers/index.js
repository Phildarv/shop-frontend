import { combineReducers } from "redux";
import { reducer as burgerMenu } from "redux-burger-menu";
import { loadingBarReducer as loadingBar } from "react-redux-loading-bar";
import { routerReducer as router } from "react-router-redux";

import { wrap } from "../utilities/reducer";
import productSearch, * as fromProductSearch from "./product-search";
import product, * as fromProduct from "./product";
import attachment, * as fromAttachment from "./attachment";
import shoppingCart, * as fromShoppingCart from "./shopping-cart";
import countries, * as fromCountries from "./countries";
import account, * as fromAccount from "./account";
import orders, * as fromOrders from "./orders";

/**
 * Checks whether the burger menu is open
 * @param {Object} state This state
 * @returns {boolean} Whether the burger menu is open
 */
export const getBurgerMenuOpen = state => state.burgerMenu.isOpen;

/**
 * Returns the product list
 * @param {object} state This state
 * @return {array} The product array
 */
export const getProductSearchSections = wrap(
  fromProductSearch.getProductSearchSections,
  state => state.productSearch
);
/**
 * Checks whether it is currently being fetched
 * @param {object} state This state
 * @return {boolean} Whether the token is being fetched
 */
export const getProductSearchFetching = wrap(
  fromProductSearch.getProductSearchFetching,
  state => state.productSearch
);
/**
 * Returns the error
 * @param {object} state This state
 * @return {error} The current error
 */
export const getProductSearchError = wrap(
  fromProductSearch.getProductSearchError,
  state => state.productSearch
);

/**
 * Returns the product with the specified
 * @param {object} state This state
 * @param {number} productId The product id
 * @return {array} All product categories
 */
export const getProductById = wrap(
  fromProduct.getProductById,
  state => state.product
);

/**
 * Returns the product with the specified slug
 * @param {object} state This state
 * @param {number} productSlug The product slug
 * @return {array} All product categories
 */
export const getProductBySlug = wrap(
  fromProduct.getProductBySlug,
  state => state.product
);

/**
 * Returns all products
 * @param {object} state This state
 * @return {array} All products
 */
export const getProducts = wrap(
  fromProduct.getProducts,
  state => state.product
);

/**
 * Returns the product category with the specified slug
 * @param {object} state This state
 * @param {number} categorySlug The category slug
 * @return {array} All product categories
 */
export const getProductCategoryBySlug = wrap(
  fromProduct.getProductCategoryBySlug,
  state => state.product
);

/**
 * Returns the product category with the specified id
 * @param {object} state This state
 * @param {number} categoryId The category id
 * @return {array} All product categories
 */
export const getProductCategoryById = wrap(
  fromProduct.getProductCategoryById,
  state => state.product
);

/**
 * Returns all product categories
 * @param {object} state This state
 * @return {array} All product categories
 */
export const getProductCategories = wrap(
  fromProduct.getProductCategories,
  state => state.product
);

/**
 * Returns the children ids of the category with the specified id
 * @param {object} state This state
 * @param {number} categoryId An optional parent category id
 * @return {array} All product categories
 */
export const getProductCategoryChildrenIdsById = wrap(
  fromProduct.getProductCategoryChildrenIdsById,
  state => state.product
);

/**
 * Returns the product attribute with the specified id
 * @param {object} state This state
 * @param {number} categoryId An optional parent category id
 * @return {array} The specified product attribute
 */
export const getProductAttributeById = wrap(
  fromProduct.getProductAttributeById,
  state => state.product
);

/**
 * Returns all product attributes
 * @param {object} state This state
 * @return {array} All product attributes
 */
export const getProductAttributes = wrap(
  fromProduct.getProductAttributes,
  state => state.product
);

/**
 * Returns a slug => attribute map
 * @param {object} state The redux state
 */
export const getProductAttributesBySlug = wrap(
  fromProduct.getProductAttributesBySlug,
  state => state.product
);

/**
 * Returns all attachments
 * @param {object} state This state
 * @return {array} All attachments
 */
export const getAttachments = wrap(
  fromAttachment.getAttachments,
  state => state.attachment
);

/**
 * Retrieves the object with the specified id
 * @param {object} state This state
 * @param {number} id The object id
 * @return {object} The requested object
 */
export const getAttachmentById = wrap(
  fromAttachment.getAttachmentById,
  state => state.attachment
);

/**
 * Retrieves the latest fetch error
 * @param {Object} state The redux state
 * @returns {Error} The fetch error
 */
export const getShoppingCartError = wrap(
  fromShoppingCart.getShoppingCartError,
  state => state.shoppingCart
);
/**
 * Checks whether the shopping cart is currently being fetched
 * @param {Object} state The redux state
 * @returns {boolean} Whether the cart is currently being fetched
 */
export const getShoppingCartFetching = wrap(
  fromShoppingCart.getShoppingCartFetching,
  state => state.shoppingCart
);
/**
 * Gets all items that are currenlty in the shopping cart
 * @param {Object} state The redux state
 * @returns {Array} The cart items
 */
export const getShoppingCartItems = wrap(
  fromShoppingCart.getShoppingCartItems,
  state => state.shoppingCart
);

/**
 * Gets the total price of the cart
 * @param {Object} state The redux state
 * @returns {number} The sum
 */
export const getShoppingCartTotal = wrap(
  fromShoppingCart.getShoppingCartTotal,
  state => state.shoppingCart
);

/**
 * Gets the shopping cart taxes
 * @param {Object} state The redux state
 * @returns {number} The taxes
 */
export const getShoppingCartTaxes = wrap(
  fromShoppingCart.getShoppingCartTaxes,
  state => state.shoppingCart
);

/**
 * Gets the shopping cart fees
 * @param {Object} state The redux state
 * @returns {number} The fees
 */
export const getShoppingCartFees = wrap(
  fromShoppingCart.getShoppingCartFees,
  state => state.shoppingCart
);

/**
 * Gets the shopping shipping
 * @param {Object} state The redux state
 * @returns {number} The shipping
 */
export const getShoppingCartShipping = wrap(
  fromShoppingCart.getShoppingCartShipping,
  state => state.shoppingCart
);

/**
 * Gets all countries
 * @param {Object} state The redux state
 * @returns {Object} All countries
 */
export const getCountries = wrap(
  fromCountries.getCountries,
  state => state.countries
);

/**
 * Gets the user account
 * @param {Object} state The redux state
 * @returns {Object} The user account
 */
export const getAccount = wrap(fromAccount.getAccount, state => state.account);

/**
 * Checks if the user is authenticated
 * @param {Object} state The redux state
 * @returns {boolean} Whether the user is authenticated
 */
export const getIsAuthenticated = state => state.isAuthenticated;

/**
 * Gets all orders
 * @param {Object} state The redux state
 * @returns {Object} All orders
 */
export const getOrders = wrap(fromOrders.getOrders, state => state.orders);

const appReducer = combineReducers({
  router,
  loadingBar,
  burgerMenu,
  productSearch,
  shoppingCart,
  product,
  attachment,
  countries,
  account,
  orders,
  isAuthenticated: (state = false, action) =>
    action.type === "LOGIN_USER" && !action.isFetching ? action.success : state
});

/**
 * Make sure that the state is removed if the user signed out of the application
 * @param {Object} state The previous state
 * @param {Object} action The action to process
 * @returns {Object} The new state
 */
const rootReducer = (state, action) => {
  if (action.type === "LOGOUT_USER") {
    state = undefined;
  }

  return appReducer(state, action);
};

export default rootReducer;
