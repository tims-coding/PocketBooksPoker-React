import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { FiArrowDown } from "react-icons/fi";
import useEditUserBalance from "../../../hooks/users_hooks/useEditBalance";
import useCreateTransaction from "../../../hooks/transaction_hooks/useCreateTransaction";
import telegramMessage from "../../../api/telegram/telegram_api";
import useUser from "../../../hooks/users_hooks/useUser";
import { toast } from "react-toastify";
import { Context } from "../../../store/store";

const ReturnChips = ({ setOption }) => {
  const { id } = useParams();
  const userQuery = useUser(id);
  const [amount, setAmount] = useState(0);
  const [token] = useContext(Context);
  const editUserBalance = useEditUserBalance();
  const makeTransaction = useCreateTransaction();
  toast.configure();
  const successMessage = () => {
    toast.success("Successfully updated balance!");
  };

  const handleChipSubmit = () => {
    const newTotal = parseInt(userQuery.data.balance) + parseInt(amount);
    const message =
      `Transaction: Turn In Chips\nAmount: $${amount}\nUpdated Balance: $${newTotal}`.toString();
    editUserBalance.mutate({
      balance: newTotal,
      id: id,
    });
    makeTransaction.mutate({
      id: id,
      name: userQuery.data.name,
      amount: amount,
      transaction: "Turn In Chips",
      note: "",
      gameToken: token.token,
    });
    if (userQuery.data.telegram.length > 0) {
      telegramMessage({
        chatID: userQuery.data.telegram,
        message: message,
      });
    }
    successMessage();
    setAmount(0);
    setOption(0);
  };

  return (
    <div className="TransactionsItem">
      <div className="transaction return-chips">
        <div className="content">
          <div className="icon">
            <FiPlus />
          </div>
          <div>
            <h2>TURN IN CHIPS</h2>
            <p>Tap to turn in chips</p>
          </div>
        </div>
        <FiArrowDown />
      </div>
      <div className="content-body">
        <div className="selector-buttons">
          <button
            style={{
              height: 40,
              backgroundColor: "grey",
              border: "2px solid #fff",
            }}
          >
            Amount
          </button>
          <input
            style={{
              height: 40,
              border: "none",
              backgroundColor: "white",
              paddingLeft: "5px",
            }}
            onChange={(e) => {
              setAmount(e.target.value);
              console.log(amount);
            }}
            type="number"
            placeholder="Enter amount..."
          />
          <button
            onClick={() => {
              setOption(0);
              setAmount(0);
            }}
            style={{
              height: 25,
              color: "white",
              backgroundColor: "black",
              border: "2px solid #fff",
              marginTop: "auto",
              marginBottom: "50px",
              cursor: "pointer",
            }}
          >
            Go Back
          </button>
        </div>
        <button
          className="submit-button"
          onClick={handleChipSubmit}
          style={{
            height: 40,
            backgroundColor: "red",
            border: "2px solid #fff",
            cursor: "pointer",
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default ReturnChips;
