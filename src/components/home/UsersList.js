import React from "react";
import { Link } from "react-router-dom";
import useUsers from "../../hooks/users_hooks/useUsers";
import useDeleteUser from "../../hooks/users_hooks/useDeleteUser";
import { FaTrash, FaEdit } from "react-icons/fa";
import { RevolvingDot } from "react-loader-spinner";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UsersList = () => {
  const usersQuery = useUsers();
  const deleteUser = useDeleteUser();
  toast.configure();

  const handleDelete = (id) => {
    deleteUser.mutate(id);
    deleteMessage();
  };

  const deleteMessage = () => {
    toast.success("Successfully deleted!");
  };

  if (usersQuery.isError) {
    return <h1>Failed to get Users</h1>;
  }
  if (usersQuery.isLoading) {
    return <RevolvingDot color="#fff" height={30} />;
  }
  if (usersQuery.isSuccess) {
    return (
      <div className="UsersList">
        {usersQuery.isLoading ? (
          <span style={{ color: "white" }}>Loading...</span>
        ) : usersQuery.isError ? (
          usersQuery.error.message
        ) : (
          usersQuery.data.length > 0 && (
            <div className="user-names">
              {usersQuery.data.map((user) => (
                <div key={user.id} className="user-content">
                  <Link to={`/user/${user.id}`} key={user.id}>
                    <div className="user-avatar">
                      <p>{user.name.charAt(0)}</p>
                    </div>
                  </Link>
                  <div className="user-name-description">
                    <h2>{user.name}</h2>
                    <p>{user.description}</p>
                  </div>
                  <div className="user-options">
                    <div
                      className="delete"
                      onClick={() => handleDelete(user.id)}
                    >
                      <FaTrash />
                    </div>
                    <div className="edit">
                      <Link to={`/edit/${user.id}`}>
                        <FaEdit />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    );
  }
};

export default UsersList;
