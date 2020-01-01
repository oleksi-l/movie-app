import React from 'react';
import Detail from "./Detail";
import Videos from "./Videos";
import Credits from "./Credits";
import { Switch, Route, NavLink, Redirect } from "react-router-dom";
import { Nav, NavItem } from 'reactstrap';

const tabList = [
  { type: "detail", "name": "Детали" },
  { type: "videos", "name": "Видео" },
  { type: "credits", "name": "Актёры" }
];

const Tabs = React.memo((props) => {
  return (
    <div>
      <Nav tabs>
        {tabList.map(item => {
          return <NavItem key={item.type}>
            <NavLink
              className="nav-link"
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