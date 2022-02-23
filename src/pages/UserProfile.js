import React from "react";
import { useParams } from "react-router-dom";
import TitleBar from "../components/user-profile/TitleBar";
import TransactionItems from "../components/user-profile/TransactionItems";
import UserHistory from "../components/user-profile/UserHistory";

const UserProfile = () => {
  const { id } = useParams();

  return (
    <div className="UserProfile">
      <TitleBar id={id} />
      <TransactionItems />
      <UserHistory />
    </div>
  );
};

export default UserProfile;
