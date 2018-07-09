/**
 * The product search reducer
 * @param {Object} state The redux state
 * @param {Object} action The dispatched action
 * @returns {Object} The new state
 */
const countriesReducer = (
  state = { isFetching: false, error: null, countries: {} },
  action
) => {
  switch (action.type) {
    case "FETCH_COUNTRIES":
      return {
        isFetching: action.isFetching,
        error:
          action.error || action.error === null ? action.error : state.error,
        countries: action.countries ? action.countries : state.countries
      };
    default:
      return state;
  }
};

export default countriesReducer;

/**
 * Gets all countries
 * @param {Object} state The redux state
 * @returns {Object} All countries
 */
export const getCountries = state => state.countries;
