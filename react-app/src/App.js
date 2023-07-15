import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Switch } from "react-router-dom";
import SignupFormPage from "./components/SignupFormPage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import Navigation from "./components/Navigation";
import Chat from "./components/Chat"
import GroupList from "./components/GroupList";
import GroupDetails from "./components/GroupDetails";
import Calendar from "./components/Calendar";
import EventDetails from "./components/EventDetails";
import MyGroupsPage from "./components/MyGroupsPage";
import HomePage from "./components/HomePage";
import ProfilePage from "./components/ProfilePage";

function App() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  useEffect(() => {
    dispatch(authenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <div className="navBar">
        <Navigation isLoaded={isLoaded} />
      </div>
      {isLoaded && (
        <Switch>
          <Route exact path="/">
            <HomePage />
          </Route>
          <Route path="/login" >
            <LoginFormPage />
          </Route>
          <Route path="/signup">
            <SignupFormPage />
          </Route>
          <Route path="/chat">
            <Chat />
          </Route>
          <Route exact path="/groups">
            <GroupList />
          </Route>
          <Route exact path="/groups/joined">
            <MyGroupsPage />
          </Route>
          <Route exact path="/groups/:id">
            <GroupDetails />
          </Route>
          <Route exact path="/groups/:gId/events/:eId">
            <EventDetails />
          </Route>
          <Route path="/calendar">
            <Calendar />
          </Route>
          <Route exact path="/profile/:id">
            <ProfilePage />
          </Route>
        </Switch>
      )}
    </>
  );
}

export default App;
