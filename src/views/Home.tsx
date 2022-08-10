import { motion } from "framer-motion";
import { useUpdateAtom } from "jotai/utils";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import AddressInput from "../components/AddressInput";
import FooterLinks from "../components/FooterLinks";
import RecentSearches from "../components/RecentSearches";
import { recentSearchesAtom } from "../store/store";

const Home = () => {
  const navigate = useNavigate();

  const setRecentSearches = useUpdateAtom(recentSearchesAtom);

  useEffect(() => {
    document.title = `INDAGO - Home`;
  }, []);

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
              setRecentSearches((prevSearches) =>
                [...prevSearches, e.currentTarget.value].slice(-3)
              );
              navigate(`/address/${e.currentTarget.value}`);
            }}
          />
        </div>
        <RecentSearches />
        <FooterLinks />
      </div>
    </motion.div>
  );
};

export default Home;
