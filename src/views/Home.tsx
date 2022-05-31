import { motion } from "framer-motion";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/tornado-main.svg"; // TODO REMOVE THIS, cool but stolen from Tornado Cash
import AccountSummary from "../components/AccountSummary";
import InputField from "../components/InputField";
import { API_URL, APP_NAME } from "../constants";

function Home() {
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

  // TODO: isRouterLink should have a default value of false...
  const FooterLink: FC<{
    link: string;
    text: string;
    isRouterLink: boolean;
  }> = ({ link, text, isRouterLink }) => {
    if (isRouterLink == true) {
      return (
        <Link
          className="text-tornado-green transition-all hover:text-green-700"
          to={link}
        >
          {text}
        </Link>
      );
    } else {
      return (
        <a
          className="text-tornado-green transition-all hover:text-green-700"
          href={link}
          target="_blank"
          rel="noopener noreferrer"
        >
          {text}
        </a>
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center justify-center">
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
        <p className="mt-14 bg-gradient-to-r from-tornado-green to-green-600 bg-clip-text text-5xl font-black text-transparent selection:bg-transparent">
          <span className="font-mono italic">{APP_NAME.toUpperCase()}</span>
        </p>
        <p className="bg-gradient-to-r from-tornado-green to-green-600 bg-clip-text text-xl font-black text-transparent selection:bg-transparent">
          <span className="font-mono">Money Laundering Detection</span>
        </p>
        <div className="mt-4 w-96 max-w-full px-5">
          <InputField
            onEnterPressed={(e) => {
              // TODO Clean this up...
              const address = e.currentTarget.value;
              setAccount(undefined);
              setTransactions(undefined);
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
          <AccountSummary
            account={account}
            transactions={transactions ?? undefined}
          />
        )}
        <p className="my-4 flex gap-3 text-center text-[#8d96a7]">
          <FooterLink
            link="https://github.com/ethereum-aml-tool"
            text="GitHub"
            isRouterLink={false}
          />
          {" | "}
          <FooterLink
            link="https://vitejs.dev/guide/features.html"
            text="What is this?"
            isRouterLink={false}
          />
          {" | "}
          <FooterLink link="stats" text="Statistics" isRouterLink={true} />
        </p>
      </div>
    </motion.div>
  );
}

export default Home;
