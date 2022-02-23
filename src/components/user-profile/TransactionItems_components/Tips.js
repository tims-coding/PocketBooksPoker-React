import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { FiArrowDown } from "react-icons/fi";
import useEditUserTips from "../../../hooks/users_hooks/useEditTips";
import useEditUserBalance from "../../../hooks/users_hooks/useEditBalance";
import useCreateTransaction from "../../../hooks/transaction_hooks/useCreateTransaction";
import telegramMessage from "../../../api/telegram/telegram_api";
import useUser from "../../../hooks/users_hooks/useUser";
import { toast } from "react-toastify";

const Tips = ({ setOption }) => {
  const { id } = useParams();
  const userQuery = useUser(id);
  const [amount, setAmount] = useState(0);
  const [percentage, setPercentage] = useState(0);
  const [selection, setSelection] = useState(0);
  let button;

  const editUserTips = useEditUserTips();
  const editUserBalance = useEditUserBalance();
  const makeTransaction = useCreateTransaction();
  toast.configure();

  const successMessage = () => {
    toast.success("Successfully updated tips!");
  };
  const transferMessage = () => {
    toast.success("Successfully transfered to balance!");
  };
  const failedMessage = () => {
    toast.error(
      "Failed! You are trying to transfer amount larger than what is available."
    );
  };

  const handleTipsSubmit = () => {
    const newTotal = parseInt(userQuery.data.tips) + parseInt(amount);
    const message =
      `Transaction: Turn In Tips\nAmount: $${amount}\nUpdated Tips: $${newTotal}`.toString();
    editUserTips.mutate({
      tips: newTotal,
      id: id,
    });
    makeTransaction.mutate({
      id: id,
      name: userQuery.data.name,
      amount: amount,
      transaction: "Turn In Tips",
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

  const handleTipsTransfer = () => {
    if (parseInt(amount) > parseInt(userQuery.data.tips)) {
      failedMessage();
    } else {
      const newTips = parseInt(userQuery.data.tips) - parseInt(amount);
      const adjustedAmount =
        parseInt(amount) - (parseInt(percentage) / 100) * parseInt(amount);
      editUserTips.mutate({
        tips: newTips,
        id: id,
      });
      const newBalance = parseInt(userQuery.data.balance) + adjustedAmount;
      const message =
        `Transaction: Tips Transfer\nAmount: $${amount}\nTax: ${percentage}%\nTransfer Amount: $${adjustedAmount}\nUpdated Tips: $${newTips}\nUpdated Balance: $${newBalance}`.toString();
      editUserBalance.mutate({
        balance: newBalance,
        id: id,
      });
      makeTransaction.mutate({
        id: id,
        name: userQuery.data.name,
        amount: amount,
        transaction: "Transfer Tips",
        note: "",
      });
      telegramMessage({
        chatID: userQuery.data.telegram,
        message: message,
      });
      transferMessage();
      setAmount(0);
      setOption(0);
    }
  };

  if (selection === 0) {
    button = (
      <div className="TransactionsItem">
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
              Turn In Tips
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
              Transfer Tips
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
          onClick={handleTipsSubmit}
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
            style={{
              height: 40,
              backgroundColor: "grey",
              border: "2px solid #fff",
            }}
          >
            Tax Percentage
          </button>
          <input
            style={{
              height: 40,
              border: "none",
              backgroundColor: "white",
              paddingLeft: "5px",
            }}
            onChange={(e) => {
              setPercentage(e.target.value);
              console.log(amount);
            }}
            type="number"
            placeholder="ex: 20"
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
          onClick={handleTipsTransfer}
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
      <div className="transaction tips">
        <div className="content">
          <div className="icon">
            <FiPlus />
          </div>
          <div>
            <h2>TIPS</h2>
            <p>Tap to turn in tips</p>
          </div>
        </div>
        <FiArrowDown />
      </div>
      {button}
    </div>
  );
};

export default Tips;
