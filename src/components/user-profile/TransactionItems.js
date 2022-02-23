import React from "react";
import { FiPlus } from "react-icons/fi";
import { FiArrowDown } from "react-icons/fi";
import { useState } from "react";
import Tips from "./TransactionItems_components/Tips";
import BuyChips from "./TransactionItems_components/BuyChips";
import Donation from "./TransactionItems_components/Donation";
import Expense from "./TransactionItems_components/Expense";
import ReturnChips from "./TransactionItems_components/ReturnChips";
import DepositWithdraw from "./TransactionItems_components/DepositWithdraw";

const TransactionItems = () => {
  const [option, setOption] = useState(0);

  if (option === 0) {
    return (
      <div className="TransactionsItem">
        <div
          className="transaction tips"
          onClick={() => {
            setOption(1);
          }}
        >
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
        <div
          style={{
            height: "2px",
            marginLeft: "10px",
            marginRight: "10px",
            backgroundColor: "grey",
          }}
        />
        <div
          className="transaction buy-chips"
          onClick={() => {
            setOption(2);
          }}
        >
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
        <div
          style={{
            height: "2px",
            marginLeft: "10px",
            marginRight: "10px",
            backgroundColor: "grey",
          }}
        />
        <div
          className="transaction donation"
          onClick={() => {
            setOption(3);
          }}
        >
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
        <div
          style={{
            height: "2px",
            marginLeft: "10px",
            marginRight: "10px",
            backgroundColor: "grey",
          }}
        />
        <div
          className="transaction expense"
          onClick={() => {
            setOption(4);
          }}
        >
          <div className="content">
            <div className="icon">
              <FiPlus />
            </div>
            <div>
              <h2>ADD EXPENSE</h2>
              <p>Tap to add an expense</p>
            </div>
          </div>
          <FiArrowDown />
        </div>
        <div
          style={{
            height: "2px",
            marginLeft: "10px",
            marginRight: "10px",
            backgroundColor: "grey",
          }}
        />
        <div
          className="transaction return-chips"
          onClick={() => {
            setOption(5);
          }}
        >
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
        <div
          style={{
            height: "2px",
            marginLeft: "10px",
            marginRight: "10px",
            backgroundColor: "grey",
          }}
        />
        <div
          className="transaction deposit-withdraw"
          onClick={() => {
            setOption(6);
          }}
        >
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
      </div>
    );
  }

  if (option === 1) {
    return <Tips setOption={setOption} />;
  }

  if (option === 2) {
    return <BuyChips setOption={setOption} />;
  }

  if (option === 3) {
    return <Donation setOption={setOption} />;
  }

  if (option === 4) {
    return <Expense setOption={setOption} />;
  }

  if (option === 5) {
    return <ReturnChips setOption={setOption} />;
  }

  if (option === 6) {
    return <DepositWithdraw setOption={setOption} />;
  }
};

export default TransactionItems;
