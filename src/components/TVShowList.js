import React from "react";
import TVShow from "./TVShow";
import { Grid } from "semantic-ui-react";

function TVShowList({ shows, selectShow, searchTerm }) {
  
  const mapAllShows = shows
  .filter(show => show.name.toLowerCase().includes(searchTerm.toLowerCase()))
  .map(show => (
    <TVShow key={show.id} show={show} selectShow={selectShow} />
  ));
  
  return (
    <div className="TVShowList">
      <Grid>{mapAllShows}</Grid>
    </div>
  );
}

export default TVShowList;
