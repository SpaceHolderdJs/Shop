import React from "react";

import { Link } from "react-router-dom";

const Goods = () => {
  const categories = [
    { title: "Men", bg: "rgb(230, 213, 195)" },
    { title: "Women", bg: "rgb(205, 207, 193)" },
    { title: "Kid", bg: "rgb(230, 213, 195)" },
  ];

  return (
    <div className="column centered">
      <h1>Goods</h1>
      {categories.map((e, i) => (
        <div key={i} className="category row shadow">
          <div
            className="img"
            style={{
              background: `url(/img/${e.title.replace(
                e.title[0],
                e.title[0].toLowerCase()
              )}.jpg)`,
              backgroundSize: "cover",
            }}></div>
          <div
            className="column centered link-wrapper"
            style={{ background: e.bg }}>
            <h2>
              <Link to={`/goods/${e.title.toLowerCase()}`}>{e.title}</Link>
            </h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Goods;
