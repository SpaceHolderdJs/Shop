import React from "react";

const Goods = () => {
  const categories = [
    { title: "Mens", bg: "rgb(230, 213, 195)" },
    { title: "Womans", bg: "rgb(205, 207, 193)" },
    { title: "Kids", bg: "rgb(230, 213, 195)" },
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
            <h2>{e.title}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Goods;
