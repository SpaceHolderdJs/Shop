import { useState, useEffect, useReducer } from "react";
import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import "./App.css";

import MainIcon from "@material-ui/icons/Computer";
import GoodsIcon from "@material-ui/icons/LocalActivity";
import AboutIcon from "@material-ui/icons/QuestionAnswer";
import ChartIcon from "@material-ui/icons/ShoppingCart";

import PasswordIcon from "@material-ui/icons/Lock";
import EmailIcon from "@material-ui/icons/Email";
import PersonIcon from "@material-ui/icons/Person";

import GoodsMenu from "./components/GoodsMenu";
import Goods from "./components/Goods";
import Cart from "./components/Cart";

function App() {
  const [cart, setCart] = useState([]);
  const [module, setModule] = useState("login");
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : {}
  );

  const login = () => {
    console.log(formData);
    fetch(`/api/login`, {
      method: "POST",
      body: JSON.stringify({ ...formData }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUser(data.user);
      });
  };

  const registration = () => {
    fetch(`/api/registration`, {
      method: "POST",
      body: JSON.stringify({ ...formData }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        data.error ? console.log(data.msg) : setModule("login");
      });
  };

  const reducer = (formData, update) => {
    console.log(update);
    return typeof update === "string"
      ? {}
      : {
          ...formData,
          ...update,
        };
  };
  const [formData, dispatch] = useReducer(reducer, {});

  useEffect(() => {
    localStorage.getItem("cart")
      ? setCart(JSON.parse(localStorage.getItem("cart")))
      : setCart([]);
  }, []);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    dispatch("clean");
  }, [module]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (item) => {
    setCart(cart.filter((e) => e.code !== item.code));
  };

  const findInCart = (item) => {
    return cart.find((e) => e.code === item.code);
  };

  return (
    <Router>
      <div className="App row">
        <div className="side-nav column centered shadow">
          <Link to="/">
            <div className="icon-wrapper column centered">
              <MainIcon />
            </div>
          </Link>
          <Link to="/goods">
            <div className="icon-wrapper column centered">
              <GoodsIcon />
            </div>
          </Link>
          <Link to="/about">
            <div className="icon-wrapper column centered">
              <AboutIcon />
            </div>
          </Link>
          <Link to="/cart">
            <div className="icon-wrapper column centered">
              <div className="tooltip row centered">{cart.length}</div>
              <ChartIcon />
            </div>
          </Link>
        </div>

        <div className="column content-wrapper">
          <Switch>
            <Route path="/" exact>
              <div className="row">
                <div className="column centered auth-wrapper">
                  <h1>{user.name ? user.name : "Hello dear guest"}</h1>
                  <div className="row centered">
                    <div
                      style={{ cursor: "pointer" }}
                      className="row centered tip"
                      onClick={() => setModule("login")}>
                      Login
                    </div>
                    <div
                      style={{ cursor: "pointer" }}
                      className="row centered tip"
                      onClick={() => setModule("registration")}>
                      Registration
                    </div>
                  </div>

                  {module === "login" ? (
                    <>
                      <div className="row centered">
                        <EmailIcon />
                        <input
                          type="text"
                          value={formData.email || ""}
                          onChange={(e) => dispatch({ email: e.target.value })}
                        />
                      </div>
                      <div className="row centered">
                        <PasswordIcon />
                        <input
                          type="password"
                          value={formData.password || ""}
                          onChange={(e) =>
                            dispatch({ password: e.target.value })
                          }
                        />
                      </div>
                      <button onClick={() => login()}>Login</button>
                    </>
                  ) : (
                    <>
                      <div className="row centered">
                        <PersonIcon />
                        <input
                          type="text"
                          value={formData.name || ""}
                          placeholder="Name"
                          onChange={(e) => dispatch({ name: e.target.value })}
                        />
                      </div>
                      <div className="row centered">
                        <PersonIcon />
                        <input
                          type="text"
                          value={formData.surname || ""}
                          placeholder="Surname"
                          onChange={(e) =>
                            dispatch({ surname: e.target.value })
                          }
                        />
                      </div>
                      <div className="row centered">
                        <EmailIcon />
                        <input
                          type="text"
                          value={formData.email || ""}
                          placeholder="Email"
                          onChange={(e) => dispatch({ email: e.target.value })}
                        />
                      </div>
                      <div className="row centered">
                        <PasswordIcon />
                        <input
                          type="password"
                          value={formData.password || ""}
                          placeholder="Password"
                          onChange={(e) =>
                            dispatch({ password: e.target.value })
                          }
                        />
                      </div>
                      <button
                        onClick={() => {
                          registration();
                        }}>
                        Register
                      </button>
                    </>
                  )}
                </div>
                <div className="column"></div>
              </div>
            </Route>
            <Route path="/goods" exact>
              <GoodsMenu />
            </Route>
            <Route path="/goods/:category">
              <Goods
                cartOperations={{
                  remove: removeFromCart,
                  add: addToCart,
                  find: findInCart,
                }}
              />
            </Route>
            <Route path="/about"></Route>
            <Route path="/cart">
              <Cart
                cart={cart}
                cartOperations={{
                  remove: removeFromCart,
                  add: addToCart,
                  find: findInCart,
                }}
              />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
