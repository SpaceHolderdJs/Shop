import React from "react";

import AddChartIcon from "@material-ui/icons/AddShoppingCart";
import RemoveChartIcon from "@material-ui/icons/RemoveShoppingCart";
import CloseIcon from "@material-ui/icons/Close";

const Card = ({ item, cartOperations, isSmall }) => {
  const { images, name, price, variantSizes } = item;
  const { add, remove, find } = cartOperations;
  if (!isSmall) {
    return (
      <div className="card column shadow">
        <img src={images[0].url} alt={name} />
        <span>{name}</span>
        <div className="divider"></div>
        <div className="row" style={{ justifyContent: "space-between" }}>
          <span>
            Price: {price.formattedValue.replace(price.formattedValue[0], "")}
          </span>
          {find(item) ? (
            <div
              className="icon-wrapper row centered"
              onClick={() => remove(item)}>
              <RemoveChartIcon />
            </div>
          ) : (
            <div
              className="icon-wrapper row centered"
              onClick={() => add(item)}>
              <AddChartIcon />
            </div>
          )}
        </div>
        <div className="row centered size-wrapper">
          {variantSizes.map((e) => (
            <div className="row centered tip">{e.filterCode}</div>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <div className="row card-small centered">
        <img src={images[0].url} alt={name} />
        <span>{name}</span>
        <h3>
          Price: {price.formattedValue.replace(price.formattedValue[0], "")}
        </h3>
        <div className="icon-wrapper row centered" onClick={() => remove(item)}>
          <CloseIcon />
        </div>
      </div>
    );
  }
};

export default Card;
