import { BrowserRouter as Router, Link, Switch, Route } from "react-router-dom";
import "./App.css";

import MainIcon from "@material-ui/icons/Computer";
import GoodsIcon from "@material-ui/icons/LocalActivity";
import AboutIcon from "@material-ui/icons/QuestionAnswer";

import Goods from "./components/Goods";

function App() {
  return (
    <Router>
      <div
        className="App row"
        style={{
          background: `url(img/background.jpg)`,
          backgroundSize: "cover",
        }}>
        <div className="side-nav column centered shadow">
          <Link to="/">
            <div className="icon-wrapper row centered">
              <MainIcon />
            </div>
          </Link>
          <Link to="/goods">
            <div className="icon-wrapper row centered">
              <GoodsIcon />
            </div>
          </Link>
          <Link to="/about">
            <div className="icon-wrapper row centered">
              <AboutIcon />
            </div>
          </Link>
        </div>

        <div className="column centered content-wrapper">
          <Switch>
            <Route path="/" exact>
              <h1>main</h1>
            </Route>
            <Route path="/goods">
              <Goods />
            </Route>
            <Route path="/about"></Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
