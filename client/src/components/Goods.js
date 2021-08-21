import React, { useReducer, useEffect } from "react";
import { useParams } from "react-router-dom";

import SearchIcon from "@material-ui/icons/Search";

import Card from "./Card";

const Goods = ({ cartOperations }) => {
  const { category } = useParams();

  const reducer = (data, update) => {
    return {
      ...data,
      ...update,
      filtered: data.all.filter((e) => e.name.includes(data.value)),
    };
  };

  const [data, dispatch] = useReducer(reducer, {
    all: [],
    value: "",
    filtered: [],
  });

  useEffect(() => {
    fetch(
      `https://apidojo-hm-hennes-mauritz-v1.p.rapidapi.com/products/list?country=asia2&lang=en&currentpage=0&pagesize=30&categories=${category}_all`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "2ecc6a18f1msh149a8c93469a116p1ff3e3jsn92ea038f0326",
          "x-rapidapi-host": "apidojo-hm-hennes-mauritz-v1.p.rapidapi.com",
        },
      }
    )
      .then((response) => response.json())
      .then((items) => {
        dispatch({ all: items.results });
      });
  }, []);

  return (
    <div className="column" style={{ alignItems: "center" }}>
      <h1>{category.replace(category[0], category[0].toUpperCase())} goods</h1>
      <div className="row centered" style={{ width: "50%" }}>
        <SearchIcon />
        <input
          type="text"
          onChange={(e) => dispatch({ value: e.target.value })}
        />
      </div>
      <div className="row" style={{ flexWrap: "wrap", widt: "100%" }}>
        {data.all.length < 1 ? (
          <h2>Loading...</h2>
        ) : data.value.length > 0 ? (
          data.filtered.map((e) => (
            <Card item={e} cartOperations={cartOperations} />
          ))
        ) : (
          data.all.map((e) => <Card item={e} cartOperations={cartOperations} />)
        )}
      </div>
    </div>
  );
};

export default Goods;
