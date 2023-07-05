import React, { useEffect, useState } from "react";
import { Grid } from "semantic-ui-react";
import Adapter from "../Adapter";
import TVShowList from "./TVShowList";
import Nav from "./Nav";
import SelectedShowContainer from "./SelectedShowContainer";

function App() {
  const [shows, setShows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedShow, setSelectedShow] = useState("");
  const [episodes, setEpisodes] = useState([]);
  const [filterByRating, setFilterByRating] = useState("");
  const [newAPIPage, setNewAPIPage] = useState(1);
  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    Adapter.getShows().then((shows) => setShows(shows));
  }, []);
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!isFetching) return;
    fetch (`http://api.tvmaze.com/shows?page=${newAPIPage}`)
    .then(r => r.json())
    .then(data => {
      setNewAPIPage(newAPIPage => newAPIPage + 1)
      setShows(shows.concat(data))
      setIsFetching(isFetching => !isFetching)
    })
  }, [isFetching]);

  function handleScroll() {
    if (window.innerHeight + (window.innerHeight * 0.5) + document.documentElement.scrollTop > document.body.scrollHeight) {
      setIsFetching(isFetching => !isFetching);
    }
  }

  function handleSearch(e) {
    setSearchTerm(e.target.value);
  }

  function handleFilter(e) {
    e.target.value === "No Filter"
      ? setFilterByRating("")
      : setFilterByRating(e.target.value);
  }

  function selectShow(show) {
    Adapter.getShowEpisodes(show.id).then((episodes) => {
      setSelectedShow(show);
      setEpisodes(episodes);
    });
  }

  const showsToDisplay = filterByRating ? 
    shows.filter(show => show.rating.average >= Number(filterByRating) && show.rating.average < Number(filterByRating) + 1)
    : shows

  return (
    <div>
      <Nav
        handleFilter={handleFilter}
        handleSearch={handleSearch}
        searchTerm={searchTerm}
      />
      <Grid celled>
        <Grid.Column width={5}>
          {!!selectedShow ? (
            <SelectedShowContainer
              selectedShow={selectedShow}
              allEpisodes={episodes}
            />
          ) : (
            <div />
          )}
        </Grid.Column>
        <Grid.Column width={11}>
          <TVShowList
            shows={showsToDisplay}
            selectShow={selectShow}
            searchTerm={searchTerm}
          />
        </Grid.Column>
      </Grid>
    </div>
  );
}

export default App;
