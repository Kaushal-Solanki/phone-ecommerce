import React from "react";

export const Title = ({ name, title }) => {
  return (
    <div className="row">
      <div className="col-10 mx-auto my-2 text-center text-title">
        <h1 className="text-capitalize font-weight-bold">
          {name}&nbsp;
          <span className="text-blue">{title}</span>
        </h1>
      </div>
    </div>
  );
};
