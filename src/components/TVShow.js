import React from "react";

function TVShow({ show, selectShow }) {

  return (
    <div>
      <br />
      <img src={show.image ? show.image.medium : null} onClick={() => selectShow(show)} alt={show.name} />
    </div>
  );
}

export default TVShow;
