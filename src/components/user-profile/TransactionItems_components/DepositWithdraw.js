import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { FiArrowDown } from "react-icons/fi";
import useEditUserBalance from "../../../hooks/users_hooks/useEditBalance";
import useCreateTransaction from "../../../hooks/transaction_hooks/useCreateTransaction";
import telegramMessage from "../../../api/telegram/telegram_api";
import useUser from "../../../hooks/users_hooks/useUser";
import { toast } from "react-toastify";

const DepositWithdraw = ({ setOption }) => {
  const { id } = useParams();
  const userQuery = useUser(id);
  const [amount, setAmount] = useState(0);
  const [selection, setSelection] = useState(0);
  let button;
  const editUserBalance = useEditUserBalance();
  const makeTransaction = useCreateTransaction();
  toast.configure();

  const successMessage = () => {
    toast.success("Successfully updated balance!");
  };

  const handleDepositSubmit = () => {
    const newTotal = parseInt(userQuery.data.balance) + parseInt(amount);
    const message =
      `Transaction: Deposit\nAmount: $${amount}\nUpdated Balance: $${newTotal}`.toString();
    editUserBalance.mutate({
      balance: newTotal,
      id: id,
    });
    makeTransaction.mutate({
      id: id,
      name: userQuery.data.name,
      amount: amount,
      transaction: "Deposit",
      note: "",
    });
    telegramMessage({
      chatID: userQuery.data.telegram,
      message: message,
    });
    successMessage();
    setAmount(0);
    setOption(0);
  };

  const handleWithdrawSubmit = () => {
    const newTotal = parseInt(userQuery.data.balance) - parseInt(amount);
    const message =
      `Transaction: Withdraw\nAmount: $${amount}\nUpdated Balance: $${newTotal}`.toString();
    editUserBalance.mutate({
      balance: newTotal,
      id: id,
    });
    makeTransaction.mutate({
      id: id,
      name: userQuery.data.name,
      amount: amount,
      transaction: "Withdraw",
      note: "",
    });
    telegramMessage({
      chatID: userQuery.data.telegram,
      message: message,
    });
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
            Deposit
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
            Withdraw
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
          onClick={handleDepositSubmit}
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
          onClick={handleWithdrawSubmit}
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
      <div className="transaction deposit-withdraw">
        <div className="content">
          <div className="icon">
            <FiPlus />
          </div>
          <div>
            <h2>DEPOSIT / WITHDRAW</h2>
            <p>Tap to turn in tips</p>
          </div>
        </div>
        <FiArrowDown />
      </div>
      {button}
    </div>
  );
};

export default DepositWithdraw;
