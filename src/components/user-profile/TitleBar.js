import React from "react";
import { MdEdit } from "react-icons/md";
import { Link } from "react-router-dom";
import useUser from "../../hooks/users_hooks/useUser";
import { RevolvingDot } from "react-loader-spinner";

const TitleBar = ({ id }) => {
  const userQuery = useUser(id);

  if (userQuery.isError) {
    return <h1>Failed to get Users</h1>;
  }
  if (userQuery.isLoading) {
    return <RevolvingDot color="#fff" height={30} />;
  }
  if (userQuery.isSuccess) {
    return (
      <div className="title-bar">
        <div className="title-bar-name">
          <h2>{userQuery.data.name}</h2>
          <Link to={`/edit/${userQuery.data.id}`}>
            <MdEdit />
          </Link>
        </div>
        <h2>Balance: {userQuery.data.balance}</h2>
        <h2>E-balance: {userQuery.data.ebalance}</h2>
        <h2>Tips: {userQuery.data.tips}</h2>
      </div>
    );
  }
};

export default TitleBar;
