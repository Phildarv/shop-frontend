import React from "react";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import { ConnectedRouter } from "react-router-redux";
import { hot } from "react-hot-loader";
import { Switch } from "react-router";

import { universalWithLoadingBar } from "./utilities/universal";
import Frontpage from "./containers/Frontpage";
import ProductCategories from "./containers/ProductCategories";
import Logout from "./containers/Logout";
import Wrapper from "./components/Wrapper";
import Search from "./containers/Search";
import Page404 from "./containers/404";
import Confirmation from "./containers/Confirmation";
import Post from "./containers/Post";

const Product = universalWithLoadingBar(props =>
  import(/* webpackChunkName: "product" */ "./containers/Product")
);
const Login = universalWithLoadingBar(props =>
  import(/* webpackChunkName: "login" */ "./containers/Login")
);
const Account = universalWithLoadingBar(props =>
  import(/* webpackChunkName: "account" */ "./containers/Account")
);
const Cart = universalWithLoadingBar(props =>
  import(/* webpackChunkName: "cart" */ "./containers/Cart")
);

/**
 * The app's root component
 * @returns {Component} The component
 */
const App = ({ history, store }) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Wrapper>
          <Switch>
            <Route exact path="/" component={Frontpage} />
            <Route path="/produkte" component={ProductCategories} />
            <Route path="/suche" component={Search} />
            <Route exact path="/produkt/:productSlug" component={Product} />
            <Route exact path="/beitrag/:postSlug" component={Post} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/logout" component={Logout} />
            <Route path="/konto" component={Account} />
            <Route exact path="/warenkorb" component={Cart} />
            <Route exact path="/bestaetigung" component={Confirmation} />
            <Route component={Page404} />
          </Switch>
        </Wrapper>
      </ConnectedRouter>
    </Provider>
  );
};

export default hot(module)(App);
