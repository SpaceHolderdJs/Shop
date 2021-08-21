import React, { useState, useEffect, useReducer } from "react";
import { Link } from "react-router-dom";

import Card from "./Card";

import CloseIcon from "@material-ui/icons/Close";
import PersonIcon from "@material-ui/icons/Person";
import AdressIcon from "@material-ui/icons/Home";
import EmailIcon from "@material-ui/icons/Email";
import DateIcon from "@material-ui/icons/DateRange";

const Cart = ({ cart, cartOperations }) => {
  const [sum, setSum] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const reducer = (formData, update) => {
    return {
      ...formData,
      ...update,
    };
  };

  const [formData, dispatcher] = useReducer(reducer, {
    name: "",
    email: "",
    adress: "",
    date: new Date(),
  });

  useEffect(() => {
    let s = 0;
    cart.forEach((e) => (s += +e.price.value));
    setSum(+s.toFixed(2));
    cart.length < 1 && setShowForm(false);
  }, [cart]);

  return (
    <div className="column centered">
      <h1>Cart</h1>
      <div
        className={`row ${cart.length < 1 && "centered"}`}
        style={{ overflowX: "auto", width: "90%" }}>
        {cart.length > 0 ? (
          cart.map((e) => (
            <Card item={e} cartOperations={cartOperations} isSmall={false} />
          ))
        ) : (
          <div className="row centered">
            <p>Nothing here yet.</p>
            <p>
              Our <Link to="/goods">goods</Link>
            </p>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <>
          <h3>Total: ${sum}</h3>
          <button onClick={() => setShowForm(true)}>Buy</button>
        </>
      )}
      {showForm && (
        <div className="back">
          <div className="form shadow column">
            <div
              className="row"
              style={{ justifyContent: "space-between", width: "100%" }}>
              <h1>Submit</h1>
              <div
                className="row centered icon-wrapper"
                onClick={() => setShowForm(false)}>
                <CloseIcon />
              </div>
            </div>
            <div className="divider"></div>
            <div className="row" style={{ width: "100%" }}>
              <div className="column goods-wrapper">
                {cart.map((e) => (
                  <Card
                    item={e}
                    cartOperations={cartOperations}
                    isSmall={true}
                  />
                ))}
              </div>
              <div className="column centered contact-wrapper">
                <div className="row centered">
                  <PersonIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    onChange={(e) => dispatcher({ name: e.target.value })}
                  />
                </div>
                <div className="row centered">
                  <EmailIcon />
                  <input
                    type="text"
                    placeholder="Email"
                    onChange={(e) => dispatcher({ email: e.target.value })}
                  />
                </div>
                <div className="row centered">
                  <AdressIcon />
                  <input
                    type="text"
                    placeholder="Adress"
                    onChange={(e) => dispatcher({ adress: e.target.value })}
                  />
                </div>
                <div className="row centered">
                  <DateIcon />
                  <input
                    type="date"
                    placeholder="Select"
                    value={formData.date}
                    onChange={(e) => dispatcher({ date: e.target.value })}
                  />
                </div>
                <button>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
