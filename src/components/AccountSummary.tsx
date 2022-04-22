import { FC, useEffect, useState } from "react";
import TransactionTable from "./TransactionTable";
import { API_URL, EXPLORER_URL } from "../constants";
import GraphView from "./GraphView/GraphView";

enum Algorithm {
  HAIRCUT = "haircut",
  FIFO = "fifo",
  POISON = "poison",
  SENIORITY = "seniority",
}

type AccountSummaryProps = {
  account: Account;
  transactions?: Transaction[];
};

const AccountSummary: FC<AccountSummaryProps> = ({ account, transactions }) => {
  const [balance, setBalance] = useState<EtherscanBalance>();
  const [haircut, setHaircut] = useState<HaircutResult>();
  const [fifo, setFifo] = useState<FifoResult>();
  const [poison, setPoison] = useState<PoisonResult>();
  const [seniority, setSeniority] = useState<SeniorityResult>();

  const fetchTaint = async (algorithm: Algorithm) => {
    const response = await fetch(
      `${API_URL}/taint/${algorithm}/${account.address}`,
      {
        method: "GET",
      }
    );

    return response.json();
  };

  const fetchBalance = async () => {
    const response = await fetch(
      `${API_URL}/etherscan/balance/${account.address}`,
      {
        method: "GET",
      }
    );

    return response.json();
  };

  useEffect(() => {
    // Fetch balance from Etherscan
    fetchBalance().then((balance: EtherscanBalance) =>
      setBalance(balance ?? undefined)
    );

    // Fetch results from blacklisting algorithms
    fetchTaint(Algorithm.HAIRCUT).then((haircutResult: HaircutResult) =>
      setHaircut(haircutResult ?? undefined)
    );
    fetchTaint(Algorithm.FIFO).then((fifoResult: FifoResult) =>
      setFifo(fifoResult ?? undefined)
    );
    fetchTaint(Algorithm.POISON).then((poisonResult: PoisonResult) =>
      setPoison(poisonResult ?? undefined)
    );
    fetchTaint(Algorithm.SENIORITY).then((seniorityResult: SeniorityResult) =>
      setSeniority(seniorityResult ?? undefined)
    );
  }, []);

  return (
    <div className="mt-1 p-3 text-tornado-green">
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
        <span className="font-bold">Balance:</span>{" "}
        {balance ? balance?.result.toFixed(5) + " Ether" : "? ETH"}
        <br />
        <span className="font-bold">Risk Estimation:</span>{" "}
        {account.risk_level ?? "TO BE IMPLEMENTED"}
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
        <span className="font-bold">FIFO:</span>{" "}
        {fifo ? (
          fifo.tainted != 0 ? (
            <span className="font-bold text-red-600">
              TRUE | {fifo.tainted.toFixed(3)}
            </span>
          ) : (
            "FALSE"
          )
        ) : (
          "None"
        )}
        <br />
        <span className="font-bold">Poison:</span>{" "}
        {poison ? (
          poison.blacklisted == true ? (
            <span className="font-bold text-red-600">TRUE</span>
          ) : (
            "FALSE"
          )
        ) : (
          "None"
        )}
        <br />
        <span className="font-bold">Seniority:</span>{" "}
        {seniority ? (
          seniority.tainted_balance != 0 ? (
            <span className="font-bold text-red-600">
              TRUE | {seniority.tainted_balance.toFixed(3)}
            </span>
          ) : (
            "FALSE"
          )
        ) : (
          "None"
        )}
      </p>
      {transactions && transactions.length > 0 && (
        <div className="mt-4">
          <h3 className="mb-2 text-left text-xl font-bold">
            Flagged Transactions:
          </h3>
          <TransactionTable transactions={transactions} />
        </div>
      )}
      <div className="mt-2">
        <p className="text-lg font-bold">DAR (Deposit Address Reuse)</p>
        <GraphView address={account.address} />
      </div>
    </div>
  );
};

export default AccountSummary;
