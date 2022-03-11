import { FC, useEffect, useState } from "react";
import TransactionTable from "./TransactionTable";
import { API_URL, EXPLORER_URL } from "../constants";

enum Algorithm {
  HAIRCUT = "haircut",
  FIFO = "fifo",
  POISON = "poison",
}

type AccountSummaryProps = {
  account: Account;
  transactions?: Transaction[];
};

const AccountSummary: FC<AccountSummaryProps> = ({ account, transactions }) => {
  const [haircut, setHaircut] = useState<HaircutResult>();

  const fetchTaint = async (algorithm: Algorithm) => {
    const response = await fetch(
      `${API_URL}/taint/${algorithm}/${account.address}`,
      {
        method: "GET",
      }
    );

    return response.json();
  };

  useEffect(() => {
    fetchTaint(Algorithm.HAIRCUT).then((haircutResult: HaircutResult) =>
      setHaircut(haircutResult ?? undefined)
    );
  }, []);

  return (
    <div className="mt-3 p-3 text-tornado-green">
      <p>
        <span className="text-lg font-bold italic">
          <a
            href={`${EXPLORER_URL}/address/${account.address}`}
            target="_blank"
            className="hover:underline"
          >
            [{"0x" + account.address.substring(2).toLocaleUpperCase()}]
          </a>
        </span>{" "}
        <br />
        <span className="font-bold">Balance:</span> {account.balance ?? "? ETH"}
        <br />
        <span className="font-bold">Risk Estimation:</span>{" "}
        {account.risk_level ?? "None"}
        <br />
        <span className="font-bold">Haircut:</span>{" "}
        {haircut ? (
          haircut.taint == 1 ? (
            <span className="font-bold text-red-600">
              TRUE | {haircut.balance.toFixed(3)}
            </span>
          ) : (
            "FALSE"
          )
        ) : (
          "None"
        )}
        <br />
        <span className="font-bold">FIFO:</span> {account.risk_level ?? "None"}
        <br />
        <span className="font-bold">Poison:</span>{" "}
        {account.risk_level ?? "None"}
      </p>
      {transactions && transactions.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-2 text-left text-xl font-bold">
            Flagged Transactions:
          </h3>
          <TransactionTable transactions={transactions} />
        </div>
      )}
    </div>
  );
};

export default AccountSummary;
