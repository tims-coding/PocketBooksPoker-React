import React, { Fragment } from "react";
import Selections from "../components/home/Selections";
import UsersList from "../components/home/UsersList";

const Home = () => {
  return (
    <Fragment>
      <Selections />
      <UsersList />
    </Fragment>
  );
};

export default Home;
