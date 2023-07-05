import React from "react";
import { Input } from "semantic-ui-react";

function Search({ handleSearch, search }) {
  return (
    <div>
      <Input
        type="text"
        placeholder="Search"
        value={search}
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;
