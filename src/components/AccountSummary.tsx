import { EXPLORER_URL } from "../constants";
import GraphView from "./GraphView/GraphView";
import { useAtomValue } from "jotai";
import { accountAddressAtom, balanceAtom, blacklistSummaryAtom } from "../store/store";

const AccountSummary = () => {
  const address = useAtomValue(accountAddressAtom);
  const balance = useAtomValue(balanceAtom);

  const {
    haircut_taint,
    fifo_taint,
    seniority_taint,
    poison_taint,
    risk_level,
  } = useAtomValue(blacklistSummaryAtom);

  

  return (
    <div className="mt-1 p-3 text-tornado-green">
      <p>
        <span className="text-xl font-bold italic">
          <a
            href={`${EXPLORER_URL}/address/${address}`}
            target="_blank"
            className="hover:underline"
          >
            [{"0x" + address?.substring(2).toLocaleUpperCase()}]
          </a>
        </span>{" "}
        <br />
        <span className="font-bold">Balance:</span>{" "}
        {balance && typeof balance.result === "number"
          ? balance?.result?.toFixed(4) + " Ether"
          : "? ETH"}
        <br />
        <span className="font-bold">Risk Estimation:</span>{" "}
        {risk_level ?? "TO BE IMPLEMENTED"}
        <br />
        <span className="font-bold">Haircut:</span>{" "}
        {haircut_taint ? (
          haircut_taint != null && haircut_taint != 0 ? (
            <span className="font-bold text-red-600">
              TRUE | {haircut_taint?.toFixed(3)} Ether
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
        {poison_taint ? (
          poison_taint == true ? (
            <span className="font-bold text-red-600">TRUE</span>
          ) : (
            "FALSE"
          )
        ) : (
          "None"
        )}
        <br />
        <span className="font-bold">Seniority:</span>{" "}
        {seniority_taint ? (
          seniority_taint != undefined && seniority_taint != 0 ? (
            <span className="font-bold text-red-600">
              TRUE | {seniority_taint?.toFixed(3)} Ether
            </span>
          ) : (
            "FALSE"
          )
        ) : (
          "None"
        )}
      </p>
      <div>
        <GraphView />
      </div>
    </div>
  );
};

export default AccountSummary;
