import { FC, Suspense, useEffect, useState } from "react";
import TransactionTable from "./TransactionTable";
import { API_URL, EXPLORER_URL } from "../constants";
import GraphView from "./GraphView/GraphView";
import { useAtom } from "jotai";
import { accountData } from "../store/store";
import LoadingIndicator from "./LoadingIndicator";

enum Algorithm {
  HAIRCUT = "haircut",
  FIFO = "fifo",
  POISON = "poison",
  SENIORITY = "seniority",
}

type AccountSummaryProps = {
  transactions?: Transaction[];
};

const AccountSummary = (props: AccountSummaryProps) => {
  const { transactions } = props;
  const [account] = useAtom(accountData);

  const [balance, setBalance] = useState<EtherscanBalance>();
  const [haircut, setHaircut] = useState<HaircutResult | undefined>(undefined);
  // const [fifo, setFifo] = useState<FifoResult>();
  const [poison, setPoison] = useState<PoisonResult | undefined>(undefined);
  const [seniority, setSeniority] = useState<SeniorityResult | undefined>(
    undefined
  );

  const fetchTaint = async (algorithm: Algorithm) => {
    const response = await fetch(
      `${API_URL}/blacklist/${algorithm}/${account.address}`
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
    fetchBalance()
      .then((balance: EtherscanBalance) => setBalance(balance ?? undefined))
      .catch(() => {
        console.log("No balance found!");
        setBalance(undefined);
      });

    // Fetch results from blacklisting algorithms
    fetchTaint(Algorithm.HAIRCUT)
      .then((haircutResult: HaircutResult) => {
        console.log("Setting haircut!");
        setHaircut(haircutResult ?? undefined);
      })
      .catch(() => {
        console.log("No haircut found!");
        setHaircut(undefined);
      });
    // fetchTaint(Algorithm.FIFO).then((fifoResult: FifoResult) =>
    //   setFifo(fifoResult ?? undefined)
    // );
    fetchTaint(Algorithm.POISON)
      .then((poisonResult: PoisonResult) =>
        setPoison(poisonResult ?? undefined)
      )
      .catch(() => {
        console.log("No poison found!");
        setPoison(undefined);
      });
    fetchTaint(Algorithm.SENIORITY)
      .then((seniorityResult: SeniorityResult) =>
        setSeniority(seniorityResult ?? undefined)
      )
      .catch(() => {
        console.log("No seniority found!");
        setSeniority(undefined);
      });
  }, [account.address]);

  return (
    <div className="mt-1 p-3 text-tornado-green">
      <p>
        <span className="text-xl font-bold italic">
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
        {balance && typeof balance.result === "number"
          ? balance?.result?.toFixed(5) + " Ether"
          : "? ETH"}
        <br />
        <span className="font-bold">Risk Estimation:</span>{" "}
        {account.risk_level ?? "TO BE IMPLEMENTED"}
        <br />
        <span className="font-bold">Haircut:</span>{" "}
        {haircut ? (
          haircut.taint != undefined && haircut.taint != 0 ? (
            <span className="font-bold text-red-600">
              TRUE | {haircut?.taint?.toFixed(3)} Ether
            </span>
          ) : (
            "FALSE"
          )
        ) : (
          "None"
        )}
        <br />
        {/* <span className="font-bold">FIFO:</span>{" "}
        {fifo ? (
          fifo.tainted != 0 ? (
            <span className="font-bold text-red-600">
              TRUE | {fifo.tainted.toFixed(3)} Ether
            </span>
          ) : (
            "FALSE"
          )
        ) : (
          "None"
        )}
        <br /> */}
        <span className="font-bold">Poison:</span>{" "}
        {poison ? (
          poison.flagged == true ? (
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
          seniority.tainted_balance != undefined && seniority.tainted_balance != 0 ? (
            <span className="font-bold text-red-600">
              TRUE | {seniority?.tainted_balance?.toFixed(3)} Ether
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
      <div>
        <GraphView address={account.address} />
      </div>
    </div>
  );
};

export default AccountSummary;
