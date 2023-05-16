import React from "react";
import Sidebar from "../sidebar";

const SearchLayout = (props) => {
  return (
    <div className="row mw-100">
      <div className="col-2">
        <Sidebar></Sidebar>
      </div>
      <main className="col-9">
        <div>{props.children}</div>
      </main>
    </div>
  );
};

export default SearchLayout;
