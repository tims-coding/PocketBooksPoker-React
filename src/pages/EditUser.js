import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import useEditUser from "../hooks/users_hooks/useEditUser";
import useUser from "../hooks/users_hooks/useUser";
import { RevolvingDot } from "react-loader-spinner";

const EditUser = () => {
  const { id } = useParams();
  const userQuery = useUser(id);
  const initialState = {
    name: "",
    description: "",
    telegram: "",
    epaystatus: 1,
    employeestatus: 1,
  };
  const [state, setState] = useState(initialState);
  useEffect(() => {
    if (userQuery.isSuccess) {
      setState({
        name: userQuery.data.name,
        description: userQuery.data.description,
        telegram: userQuery.data.telegram,
        employeestatus: userQuery.data.employeestatus,
        epaystatus: userQuery.data.epaystatus,
      });
    }
  }, []);
  const navigate = useNavigate();
  const editUser = useEditUser();

  const handleSubmit = async (e) => {
    console.log(state);
    e.preventDefault();
    if ((!state.name, !state.description)) {
      toast.error("Please fill out all the fields");
    } else {
      editUser.mutate({
        name: state.name,
        description: state.description,
        telegram: state.telegram,
        employeestatus: state.employeestatus,
        epaystatus: state.epaystatus,
        id: id,
      });
      setState({
        name: "",
        description: "",
        telegram: "",
        employeestatus: 1,
        epaystatus: 1,
      });
      setTimeout(() => navigate("/home"), 500);
    }
  };

  if (userQuery.isError) {
    return <h1>Failed to get Users</h1>;
  }
  if (userQuery.isLoading) {
    return <RevolvingDot color="#fff" height={30} />;
  }
  if (userQuery.isSuccess) {
    return (
      <div className="EditUser">
        <form className="form" onSubmit={handleSubmit}>
          <div className="name field">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder={userQuery.data.name}
              onChange={(e) => {
                setState({ ...state, name: e.target.value });
                console.log(state.name);
              }}
              defaultValue={userQuery.data.name}
            />
          </div>
          <div className="description field">
            <label htmlFor="description">Description</label>
            <input
              type="text"
              id="description"
              name="description"
              placeholder={userQuery.data.description}
              onChange={(e) => {
                setState({ ...state, description: e.target.value });
                console.log(state);
              }}
              defaultValue={userQuery.data.description}
            />
          </div>
          <div className="telegram field">
            <label htmlFor="telegram">Telegram</label>
            <input
              type="text"
              id="telegram"
              name="telegram"
              placeholder={userQuery.data.telegram}
              onChange={(e) => {
                setState({ ...state, telegram: e.target.value });
                console.log(state);
              }}
              defaultValue={userQuery.data.telegram}
            />
          </div>
          <div className="employee field">
            <label htmlFor="employee">Employee Status</label>
            <input
              type="checkbox"
              id="employee"
              name="employee"
              onChange={() => {
                setState({
                  ...state,
                  employeestatus: state.employeestatus === 1 ? 0 : 1,
                });
                console.log(state);
              }}
              defaultChecked={userQuery.data.employeestatus === 0}
            />
          </div>
          <div className="epay field">
            <label htmlFor="epay">E-pay Status</label>
            <input
              type="checkbox"
              id="epay"
              name="epay"
              onChange={() => {
                setState({
                  ...state,
                  epaystatus: state.epaystatus === 1 ? 0 : 1,
                });
                console.log(state);
              }}
              defaultChecked={userQuery.data.epaystatus === 0}
            />
          </div>
          <div className="buttons">
            <input
              className="save"
              type="submit"
              value={
                editUser.isLoading
                  ? "Saving..."
                  : editUser.isSuccess
                  ? "Saved!"
                  : "SAVE"
              }
            />
            <Link to="/home">
              <input className="exit" type="button" value="Go Back" />
            </Link>
          </div>
        </form>
      </div>
    );
  }
};

export default EditUser;
