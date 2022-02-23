import React from "react";
import { useParams } from "react-router-dom";
import useTransaction from "../../hooks/transaction_hooks/useTransaction";
import { RevolvingDot } from "react-loader-spinner";

const UserHistory = () => {
  const { id } = useParams();
  const transactionQuery = useTransaction(id);
  if (transactionQuery.isError) {
    return <h1>Failed to get Transactions</h1>;
  }
  if (transactionQuery.isLoading) {
    return <RevolvingDot color="#fff" height={30} />;
  }
  if (transactionQuery.isSuccess) {
    return (
      <div className="UserHistory">
        {transactionQuery.data.length > 0 && (
          <div className="user-names">
            {transactionQuery.data.map((transaction) => (
              <div className="history-item" key={transaction.datetime}>
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

export default UserHistory;
