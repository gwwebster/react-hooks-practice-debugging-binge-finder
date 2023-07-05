import React, { useState } from "react";
import Episode from "./Episode";

function SelectedShowContainer({ selectedShow, allEpisodes }) {
  const [selectedSeason, setSelectedSeason] = useState(1);

  function mapSeasons() {
    if (!!allEpisodes) {
      let seasons = allEpisodes.map((episode) => episode.season).unique();

      return seasons.map((season) => {
        return (
          <option value={season} key={season}>
            Season {season}
          </option>
        );
      });
    }
  }

  const episodesToDisplay = allEpisodes
    .filter(episode => episode.season == selectedSeason)
    .map(episode => (
      <Episode key={episode.id} eachEpisode={episode} />
    ));

  function handleSelectionChange(e) {
    setSelectedSeason(e.target.value);
  }

  return (
    <div style={{ position: "static" }}>
      <h2>{selectedShow.name}</h2>
      <img src={selectedShow.image ? selectedShow.image.medium : null} alt={selectedShow.name} />
      <p dangerouslySetInnerHTML={{ __html: selectedShow.summary}}></p>
      <p>Premiered: {selectedShow.premiered}</p>
      <p>Status: {selectedShow.status}</p>
      <p>Average Rating: {selectedShow.rating ? selectedShow.rating.average : null}</p>
      <select style={{ display: "block" }} onChange={handleSelectionChange}>
        {mapSeasons()}
      </select>
      {episodesToDisplay}
    </div>
  );
}

export default SelectedShowContainer;

Array.prototype.unique = function () {
  const arr = [];
  for (let i = 0; i < this.length; i++) {
    if (!arr.includes(this[i])) {
      arr.push(this[i]);
    }
  }
  return arr;
};
