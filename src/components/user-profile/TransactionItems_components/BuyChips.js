import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { FiArrowDown } from "react-icons/fi";
import useEditUserBalance from "../../../hooks/users_hooks/useEditBalance";
import useCreateTransaction from "../../../hooks/transaction_hooks/useCreateTransaction";
import telegramMessage from "../../../api/telegram/telegram_api";
import useUser from "../../../hooks/users_hooks/useUser";
import { toast } from "react-toastify";
import { Context } from "../../../store/store";

const BuyChips = ({ setOption }) => {
  const { id } = useParams();
  const userQuery = useUser(id);
  const [selection, setSelection] = useState(0);
  const [amount, setAmount] = useState(0);
  const [token] = useContext(Context);
  let button;
  const editUserBalance = useEditUserBalance();
  const makeTransaction = useCreateTransaction();
  toast.configure();

  const successMessage = () => {
    toast.success(`Markered $${amount} of chips!`);
  };
  const cashSuccessMessage = () => {
    toast.success(`Puchased $${amount} of chips!`);
  };

  const handleCashSubmit = () => {
    const message =
      `Transaction: Buy Chips\nAmount: $${amount}\nYou should receive $${amount} in chips`.toString();
    makeTransaction.mutate({
      id: id,
      name: userQuery.data.name,
      amount: amount,
      transaction: "Buy Chips",
      note: "",
      gameToken: token.token,
    });
    if (userQuery.data.telegram.length > 0) {
      telegramMessage({
        chatID: userQuery.data.telegram,
        message: message,
      });
    }
    cashSuccessMessage();
    setAmount(0);
    setOption(0);
  };

  const handleMarkerSubmit = () => {
    const newTotal = parseInt(userQuery.data.balance) - parseInt(amount);
    const message =
      `Transaction: Marker\nAmount: $${amount}\nUpdated Balance: $${newTotal}\nYou should receive $${amount} in chips`.toString();
    editUserBalance.mutate({
      balance: newTotal,
      id: id,
    });
    makeTransaction.mutate({
      id: id,
      name: userQuery.data.name,
      amount: amount,
      transaction: "Marker",
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

  if (selection === 0) {
    button = (
      <div className="content-body">
        <div className="selector-buttons">
          <button
            onClick={() => {
              setSelection(1);
            }}
            style={{
              height: 40,
              backgroundColor: "grey",
              border: "2px solid #fff",
              cursor: "pointer",
            }}
          >
            Cash
          </button>
          <button
            onClick={() => {
              setSelection(2);
            }}
            style={{
              height: 40,
              marginTop: 30,
              backgroundColor: "grey",
              border: "2px solid #fff",
              cursor: "pointer",
            }}
          >
            Marker
          </button>
          <button
            onClick={() => {
              setOption(0);
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
    );
  }

  if (selection === 1) {
    button = (
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
              setSelection(0);
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
          onClick={handleCashSubmit}
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
    );
  }

  if (selection === 2) {
    button = (
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
              setSelection(0);
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
          onClick={handleMarkerSubmit}
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
    );
  }

  return (
    <div className="TransactionsItem">
      <div className="transaction buy-chips">
        <div className="content">
          <div className="icon">
            <FiPlus />
          </div>
          <div>
            <h2>BUY CHIPS</h2>
            <p>Tap to buy chips</p>
          </div>
        </div>
        <FiArrowDown />
      </div>
      {button}
    </div>
  );
};

export default BuyChips;
