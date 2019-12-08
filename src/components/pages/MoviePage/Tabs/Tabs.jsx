import React, { useState } from 'react';
import Detail from "./Detail";
import Videos from "./Videos";
import Credits from "./Credits";
import { Switch, Route, NavLink, useLocation } from "react-router-dom";
import { Nav, NavItem } from 'reactstrap';
import classNames from 'classnames';

const Tabs = React.memo((props) => {
  const url = useLocation();
  const parseUrl = url.pathname.split("/");
  const currentTab = parseUrl.length === 3 ? "detail" : parseUrl[parseUrl.length - 1];
  const [activeTab, setActiveTab] = useState(currentTab);

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
        {
          allTabs.map(item => {
            return <NavItem key={item.type}>
              <NavLink
                className={classNames("nav-link", { "nav-link active": item.type === activeTab })}
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
        <Route exact path={`/movie/${props.id}`}><Detail details={props.details} /></Route>
        <Route path={`/movie/${props.id}/detail`}><Detail details={props.details} /></Route>
        <Route path={`/movie/${props.id}/videos`}><Videos videos={props.videos} /></Route>
        <Route path={`/movie/${props.id}/credits`}><Credits actors={props.actors} /></Route>
      </Switch>
    </div>
  );
})

export default Tabs;