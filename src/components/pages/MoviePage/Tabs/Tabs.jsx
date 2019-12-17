import React, { useState } from 'react';
import Detail from "./Detail";
import Videos from "./Videos";
import Credits from "./Credits";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import { Nav, NavItem } from 'reactstrap';

const Tabs = React.memo((props) => {

  const [activeTab, setActiveTab] = useState("detail");
  const toggle = tab => {
    if (activeTab !== tab) setActiveTab(tab);
  }

  const allTabs = [
    { type: "detail", "name": "Детали" },
    { type: "videos", "name": "Видео" },
    { type: "credits", "name": "Актёры" }
  ];

  return (
    <div>
      <Nav tabs>
        {allTabs.map(item => {
            return <NavItem key={item.type}>
              <NavLink
                className="nav-link"
                onClick={() => { toggle(item.type) }}
                to={`/movie/${props.id}/${item.type}`}
              >
                {item.name}
              </NavLink>
            </NavItem>
          })
        }
      </Nav>
      <Switch>
        <Route path={`/movie/:id/detail`}><Detail /></Route>
        <Route path={`/movie/:id/videos`}><Videos /></Route>
        <Route path={`/movie/:id/credits`}><Credits /></Route>
        <Redirect to="/movie/:id/detail" />
      </Switch>
    </div>
  );
})

export default Tabs;