import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FiPlus } from "react-icons/fi";
import { FiArrowDown } from "react-icons/fi";
import useCreateTransaction from "../../../hooks/transaction_hooks/useCreateTransaction";
import telegramMessage from "../../../api/telegram/telegram_api";
import useUser from "../../../hooks/users_hooks/useUser";
import { toast } from "react-toastify";

const Donation = ({ setOption }) => {
  const { id } = useParams();
  const userQuery = useUser(id);
  const [amount, setAmount] = useState(0);
  const makeTransaction = useCreateTransaction();
  toast.configure();
  const successMessage = () => {
    toast.success("Successful Donation! Thank you");
  };

  const handleDonationSubmit = () => {
    const message = `Transaction: Donation\nAmount: $${amount}\nThank You For Your Donation!`;
    makeTransaction.mutate({
      id: id,
      name: userQuery.data.name,
      amount: amount,
      transaction: "Donation",
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

  return (
    <div className="TransactionsItem">
      <div className="transaction donation">
        <div className="content">
          <div className="icon">
            <FiPlus />
          </div>
          <div>
            <h2>TURN IN DONATION</h2>
            <p>Tap to place a donation</p>
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
          onClick={handleDonationSubmit}
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

export default Donation;
