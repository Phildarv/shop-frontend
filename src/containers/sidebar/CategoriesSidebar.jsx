import React, { useEffect, useMemo } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router";
import { Route } from "react-router-dom";
import {
  getProducts,
  getProductCategoryChildrenIdsById,
  getProductCategoryBySlug
} from "reducers";
import ChevronDown from "react-icons/lib/fa/chevron-down";

import CategoryItem from "../../containers/sidebar/CategoryItem";
import Link from "../../components/Link";
import { fetchAllProductCategoriesIfNeeded } from "../../actions/product/categories";
import SidebarListWrapper from "../../components/sidebar/SidebarListWrapper";
import SidebarBreadcrumb from "../../components/sidebar/SidebarBreadcrumb";

const ITEMS_PER_PAGE = 60;

/**
 * Renders all product categories
 * @returns {Component} The component
 */

const CategoriesSidebar = React.memo(
  ({
    category,
    categoryIds,
    productIds,
    parents = [],
    location: { pathname },
    match: {
      params: { categorySlug, page },
      url
    }
  }) => {
    const categoryId = (category && category.id) || 0;

    //check if endings match
    const active = useMemo(
      () => pathname.substring(pathname.length - url.length) === url,
      [pathname, url]
    );

    const urlWithoutPage = useMemo(
      () =>
        page
          ? url
              .split("/")
              .slice(0, -1)
              .join("/")
          : url,
      [page, url]
    );

    const newParents = useMemo(
      () => (categorySlug ? [...parents, categorySlug] : []),
      [categorySlug, parents]
    );

    useEffect(
      () => {
        //load data
        fetchAllProductCategoriesIfNeeded();

        /*if (!active || !category || !categoryId) {
          return;
        }
        fetchProducts(categoryId);*/
      },
      [categoryId]
    );

    return (
      <SidebarListWrapper>
        {categorySlug ? (
          <Link to={urlWithoutPage + "/1"}>
            <SidebarBreadcrumb active={active}>
              <div>
                <ChevronDown />
              </div>
              <div
                dangerouslySetInnerHTML={{ __html: category && category.name }}
              />
            </SidebarBreadcrumb>
          </Link>
        ) : (
          <Link to="/">
            <SidebarBreadcrumb active={active}>
              <div>
                <ChevronDown />
              </div>
              <div>Startseite</div>
            </SidebarBreadcrumb>
          </Link>
        )}

        {active && (
          <div>
            {categoryIds.length > 0 ? (
              <ul>
                <li className="header">
                  <h4>Kategorien</h4>
                </li>
                {categoryIds.map(categoryId => (
                  <CategoryItem
                    key={categoryId}
                    id={categoryId}
                    parents={newParents}
                  />
                ))}
              </ul>
            ) : null /*<p>Keine weiteren Unterkategorien gefunden</p>*/}
          </div>
        )}
        <Route
          path={`${urlWithoutPage}/:categorySlug/:page`}
          render={props => <RoutedSidebar {...props} parents={newParents} />}
        />
      </SidebarListWrapper>
    );
  }
);

const mapStateToProps = (
  state,
  {
    match: {
      params: { categorySlug, page }
    }
  }
) => {
  const category = getProductCategoryBySlug(state, categorySlug);

  return {
    categorySlug,
    category,
    categoryIds:
      getProductCategoryChildrenIdsById(
        state,
        categorySlug && category ? category.id : 0
      ) || [],
    productIds: category
      ? getProducts(state)
          .filter(
            product =>
              product.categoryIds && product.categoryIds.includes(category.id)
          )
          .sort((a, b) => a.order - b.order)
          .map(product => product.id)
          .slice(ITEMS_PER_PAGE * (page - 1), ITEMS_PER_PAGE * page)
      : [],
    page
  };
};

const mapDispatchToProps = (
  dispatch,
  {
    match: {
      params: { categorySlug, page = 1 }
    }
  }
) => ({
  dispatch,
  /**
   * Fetches all product catrgories
   * @param {number} perPage The amount of items per page
   * @param {boolean} visualize Whether the progress should be visualized
   * @returns {Promise} The fetch promise
   */
  fetchAllProductCategoriesIfNeeded(
    perPage = ITEMS_PER_PAGE,
    visualize = true
  ) {
    return dispatch(fetchAllProductCategoriesIfNeeded(perPage, visualize));
  },
  /**
   * Fetches the matching products
   * @param {number} [categoryId=null] The category id
   * @param {number} perPage The amount of products per page
   * @param {visualize} visualize Whether the progress should be visualized
   * @returns {Promise} The fetch promise
   */
  fetchProducts(categoryId = null, perPage = ITEMS_PER_PAGE, visualize = true) {
    return categoryId && !isNaN(page)
      ? dispatch(
          fetchProducts(
            page,
            page,
            perPage,
            visualize,
            [],
            [parseInt(categoryId)]
          )
        )
      : Promise.resolve();
  }
});

const mergeProps = (mapStateToProps, mapDispatchToProps, ownProps) => ({
  ...ownProps,
  ...mapStateToProps,
  ...mapDispatchToProps,
  /**
   * Fetches the matching products
   * @param {number} perPage The amount of products per page
   * @param {visualize} visualize Whether the progress should be visualized
   * @returns {Promise} The fetch promise
   */
  fetchProducts(perPage = ITEMS_PER_PAGE, visualize = true) {
    const page = parseInt(ownProps.match.params.page);
    const categoryId = mapStateToProps.category
      ? mapStateToProps.category.id
      : null;
    return mapDispatchToProps.fetchProducts(categoryId, perPage, visualize);
  }
});

const ConnectedSidebar = connect(
  mapStateToProps,
  mapDispatchToProps,
  mergeProps
)(CategoriesSidebar);

const RoutedSidebar = withRouter(ConnectedSidebar);

export default RoutedSidebar;
