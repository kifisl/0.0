import React from "react";

const Sidebar = (props) => {
  return (
    <div className="row mh-100 mw-100" style={{ height: 100 + "vh" }}>
      <nav className="nav flex-column col-2 bg-dark ">
        <div>
          <ul>
            <li>
              <div className="d-flex justify-content-center">
                <button>Search</button>
              </div>
            </li>
          </ul>
          <div className="d-flex justify-content-center"></div>
        </div>
      </nav>
      <main className="col-10">
        <div>{props.children}</div>
      </main>
    </div>
  );
};

export default Sidebar;
