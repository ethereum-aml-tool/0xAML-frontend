import { motion } from "framer-motion";
import { FC, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/tornado-main.svg"; // TODO REMOVE THIS, cool but stolen from Tornado Cash
import AccountSummary from "../components/AccountSummary";
import InputField from "../components/InputField";
import LoadingIndicator from "../components/LoadingIndicator";
import { API_URL, APP_NAME } from "../constants";

const FooterLinks = () => {
  type FooterLinkProps = {
    link: string;
    text: string;
  };
  const FooterLink = (props: FooterLinkProps) => {
    const { link, text } = props;
    const isRouterLink = link.startsWith("/");

    const tailwindProps =
      "text-tornado-green transition-all hover:text-green-700";

    if (isRouterLink == true) {
      return (
        <Link className={tailwindProps} to={link}>
          {text}
        </Link>
      );
    }

    return (
      <a
        className={tailwindProps}
        href={link}
        target="_blank"
        rel="noopener noreferrer"
      >
        {text}
      </a>
    );
  };

  return (
    <div className="my-4 flex gap-3 text-center text-[#8d96a7]">
      <FooterLink link="https://github.com/ethereum-aml-tool" text="GitHub" />
      {" | "}
      <FooterLink
        link="https://vitejs.dev/guide/features.html"
        text="What is this?"
      />
      {" | "}
      <FooterLink link="/stats" text="Statistics" />
    </div>
  );
};

const Home = () => {
  const [account, setAccount] = useState<Account>();
  const [transactions, setTransactions] = useState<Transaction[]>();
  const [isLoading, setIsLoading] = useState(false);

  const fetchAccount = async (address: String) => {
    const response = await fetch(`${API_URL}/accounts/${address}`, {
      method: "GET",
    });

    return response.json();
  };

  // const fetchTransactions = async (address: String) => {
  //   const fromResponse = await fetch(
  //     `${API_URL}/transactions/from/${address}`,
  //     {
  //       method: "GET",
  //     }
  //   );
  //   const toResponse = await fetch(`${API_URL}/transactions/to/${address}`, {
  //     method: "GET",
  //   });

  //   let transactions: Transaction[] = [
  //     ...(await fromResponse.json()),
  //     ...(await toResponse.json()),
  //   ];

  //   return transactions.sort(
  //     (a, b) =>
  //       new Date(b.block_timestamp).getTime() -
  //       new Date(a.block_timestamp).getTime()
  //   );
  // };

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
          style={{ animationDuration: "20s" }}
          alt="logo"
        />
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
              setIsLoading(true);
              fetchAccount(address).then((json) => {
                setAccount(json);
                setIsLoading(false);
              });
            }}
          />
        </div>
        {isLoading && <LoadingIndicator />}
        {account && (
          <AccountSummary
            account={account}
            transactions={transactions ?? undefined}
          />
        )}
        <FooterLinks />
      </div>
    </motion.div>
  );
};

export default Home;
