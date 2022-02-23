import React from "react";
import { FaFilePdf } from "react-icons/fa";
import { BiTable } from "react-icons/bi";
import { MdBubbleChart } from "react-icons/md";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useState } from "react";
import useCreateUser from "../../hooks/users_hooks/useCreateUser";
import useUsers from "../../hooks/users_hooks/useUsers";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Selections = () => {
  const [userName, setUserName] = useState("");

  const createUser = useCreateUser();
  const usersQuery = useUsers();
  const nameList = [];

  const handleSubmit = () => {
    usersQuery.data.map((user) => {
      return nameList.push(user.name.toUpperCase());
    });

    if (!userName) {
      console.log("No Username submitted");
    } else if (nameList.includes(userName.toUpperCase().trim())) {
      nameError();
    } else {
      createUser.mutate({
        name: userName.trim(),
      });
      success();
      setUserName("");
    }
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    setUserName(value);
    console.log(value);
    console.log(typeof value);
  };

  const nameError = () => {
    toast.error("Name is already in use");
  };

  const success = () => {
    toast.success(`Successfully added ${userName}!`);
  };

  return (
    <div className="Selections">
      <Link to="/payments">
        <div className="content pdf">
          <div className="icon">
            <FaFilePdf />
          </div>
          <div className="text-content">
            <h1>Pdf Documnets</h1>
            <p>Create and load game data to pdf</p>
          </div>
        </div>
      </Link>
      <Link to="/transactions">
        <div className="content transactions">
          <div className="icon">
            <BiTable />
          </div>
          <div className="text-content">
            <h1>Transactions</h1>
            <p>List of all past transactions</p>
          </div>
        </div>
      </Link>
      <div className="content reports">
        <div className="icon">
          <MdBubbleChart />
        </div>
        <div className="text-content">
          <h1>Reports Sheet</h1>
          <p>Game data and history</p>
        </div>
      </div>
      <div className="content add-user">
        <div className="icon">
          <FiPlus />
        </div>
        <div className="form-content">
          <h1>Add New User</h1>
          <div className="form">
            <input
              type="text"
              id="name"
              className="form-input"
              autoComplete="off"
              placeholder=" "
              value={userName}
              onChange={handleInputChange}
            />
            <label htmlFor="name" className="form-label" placeholder=" ">
              Name
            </label>
          </div>
        </div>
        <button onClick={(name) => handleSubmit(name)} className="add-button">
          Click Here
        </button>
      </div>
    </div>
  );
};

export default Selections;
