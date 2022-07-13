import { motion } from "framer-motion";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdateAtom } from "jotai/utils";
import { accountAddress } from "../store/store";
import { Suspense, useEffect } from "react";
import LoadingIndicator from "../components/LoadingIndicator";
import AccountSummary from "../components/AccountSummary";

const AccountView = () => {
  let params = useParams();
  const { address } = params;
  const setAddress = useUpdateAtom(accountAddress);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = `INDAGO - ${address}`;
    setAddress(address);
  }, [address]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex flex-col items-center justify-center">
        <Suspense fallback={<LoadingIndicator />}>
          <AccountSummary />
        </Suspense>
        <button
          className="text-bold m-4 rounded-sm border-2 border-tornado-green px-4 py-2 text-tornado-green transition-all hover:bg-slate-700"
          onClick={() => {
            navigate("/");
          }}
        >
          &#11164; Back to search
        </button>
      </div>
    </motion.div>
  );
};

export default AccountView;
