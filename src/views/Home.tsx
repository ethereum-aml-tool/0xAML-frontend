import { motion } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AddressInput from "../components/AddressInput";
import AppHeader from "../components/AppHeader";
import FooterLinks from "../components/FooterLinks";

const Home = () => {
  const navigate = useNavigate();

  const [transactions, setTransactions] = useState<Transaction[]>();

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
        <div className="mt-4 w-96 max-w-full px-5">
          <AddressInput
            onEnterPressed={(e) => {
              navigate(`/address/${e.currentTarget.value}`);
            }}
          />
        </div>
        <FooterLinks />
      </div>
    </motion.div>
  );
};

export default Home;
