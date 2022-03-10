import { FC, useState } from "react";
import logo from "../assets/images/tornado-main.svg"; // TODO REMOVE THIS, cool but stolen from Tornado Cash
import InputField from "./components/InputField";
import TransactionTable from "./components/TransactionTable";

function App() {
  const API_URL = "http://127.0.0.1:8000";

  const [account, setAccount] = useState<Account>();
  const [transactions, setTransactions] = useState<Transaction[]>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchAccount = async (address: String) => {
    const response = await fetch(`${API_URL}/accounts/${address}`, {
      method: "GET",
    });

    return response.json();
  };

  const fetchTransactions = async (address: String) => {
    const fromResponse = await fetch(
      `${API_URL}/transactions/from/${address}`,
      {
        method: "GET",
      }
    );
    const toResponse = await fetch(`${API_URL}/transactions/to/${address}`, {
      method: "GET",
    });

    let transactions: Transaction[] = [
      ...(await fromResponse.json()),
      ...(await toResponse.json()),
    ];

    return transactions.sort(
      (a, b) =>
        new Date(b.block_timestamp).getTime() -
        new Date(a.block_timestamp).getTime()
    );
  };

  const FooterLink: FC<{ link: string; text: string }> = ({ link, text }) => (
    <a
      className="text-tornado-green transition-all hover:text-green-700"
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {text}
    </a>
  );

  return (
    <div className="text-center selection:bg-green-900">
      <header className="flex min-h-screen flex-col items-center justify-center bg-tornado-dark text-white">
        <img
          src={logo}
          className="animate-speed h-60 motion-safe:animate-spin"
          alt="logo"
        />
        <style>
          {
            "\
            .animate-speed{\
              animation-duration:20s;\
            }\
          "
          }
        </style>
        <p className="mt-14 bg-gradient-to-r from-tornado-green to-green-600 bg-clip-text text-4xl font-black text-transparent selection:bg-transparent">
          0x<span className="italic">AML</span>
        </p>
        <p className="bg-gradient-to-r from-tornado-green to-green-600 bg-clip-text text-2xl font-black text-transparent selection:bg-transparent">
          Money Laundering Detection
        </p>
        <div className="mt-4 w-96 max-w-full px-5">
          <InputField
            onEnterPressed={(e) => {
              const address = e.currentTarget.value;
              setAccount(undefined);
              setIsLoading(true);
              fetchAccount(address).then((json) => {
                setAccount(json);
                setIsLoading(false);

                fetchTransactions(address).then((transactions) => {
                  setTransactions(transactions);
                });
              });
            }}
          />
        </div>
        {isLoading && (
          <div className="loading-indicator">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
        )}
        {account && (
          <div className="mt-3 p-3 text-tornado-green">
            <p>
              <span className="font-bold italic">
                [{"0x" + account.address.substring(2).toLocaleUpperCase()}]
              </span>{" "}
              <br />
              <span className="font-bold">Balance:</span>{" "}
              {account.balance ?? "? ETH"}
              <br />
              <span className="font-bold">Risk Estimation:</span>{" "}
              {account.risk_level ?? "None"}
            </p>
            {transactions && (
              <div className="mt-3">
                <h3 className="mb-2 text-xl font-bold">
                  Flagged Transactions:
                </h3>
                <TransactionTable transactions={transactions} />
              </div>
            )}
          </div>
        )}
        <p className="mt-3 flex gap-3 text-center text-[#8d96a7]">
          <FooterLink
            link="https://github.com/ethereum-aml-tool"
            text="GitHub"
          />
          {" | "}
          <FooterLink
            link="https://vitejs.dev/guide/features.html"
            text="What is this?"
          />
          {" | "}
          <FooterLink
            link="https://www.chalmers.se/en/education/programmes/masters-info/Pages/Software-Engineering-and-Technology.aspx"
            text="Chalmers"
          />
        </p>
      </header>
    </div>
  );
}

export default App;
