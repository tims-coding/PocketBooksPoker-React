import React from "react";
import { MdHistory } from "react-icons/md";
import { RevolvingDot } from "react-loader-spinner";
import useTransactions from "../hooks/transaction_hooks/useTransactions";

const Transactions = () => {
  const transactionsQuery = useTransactions();

  if (transactionsQuery.isError) {
    console.log("failed");
    return <h1>Failed to get Transactions</h1>;
  }
  if (transactionsQuery.isLoading) {
    console.log("loading");
    return <RevolvingDot color="#fff" height={30} />;
  }

  if (transactionsQuery.isSuccess) {
    console.log("success");
    console.log(transactionsQuery.data);
    return (
      <div className="Transactions">
        <div className="title">
          <MdHistory />
          <h1>Transaction History</h1>
        </div>
        <div className="line-spacer"></div>
        {transactionsQuery.data.length > 0 && (
          <div className="user-names">
            {transactionsQuery.data.map((transaction) => (
              <div key={transaction.datetime} className="history-item">
                <div className="content">
                  <div className="name">
                    <h2>{transaction.name}</h2>
                    <h2>{transaction.note}</h2>
                  </div>
                  <div className="contact">
                    <h2>Transaction: {transaction.transaction}</h2>
                    <h2>Amount: {transaction.amount}</h2>
                  </div>
                </div>
                <div className="date">
                  <p>{transaction.datetime}</p>
                </div>
                <div className="line-spacer"></div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }
};

export default Transactions;
