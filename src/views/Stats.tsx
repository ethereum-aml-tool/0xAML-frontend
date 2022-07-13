import { DSVParsedArray } from "d3";
import { useEffect, useState } from "react";
import DataGraph, {
  Dataset,
  fetchGraphDataset,
} from "../components/StatsGraph";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

function Stats() {
  const navigate = useNavigate();

  const [poisonTornado, setPoisonTornado] = useState<DSVParsedArray<any>>();
  const [poisonFlagged, setPoisonFlagged] = useState<DSVParsedArray<any>>();
  const [haircutTornado, setHaircutTornado] = useState<DSVParsedArray<any>>();
  const [haircutFlagged, setHaircutFlagged] = useState<DSVParsedArray<any>>();
  const [seniorityTornado, setSeniorityTornado] =
    useState<DSVParsedArray<any>>();
  const [seniorityFlagged, setSeniorityFlagged] =
    useState<DSVParsedArray<any>>();

  useEffect(() => {
    document.title = `INDAGO - Statistics`;

    // Load all CSVs
    fetchGraphDataset(Dataset.PoisonTornado).then((data) => {
      setPoisonTornado(data);
    });
    fetchGraphDataset(Dataset.PoisonFlagged).then((data) => {
      setPoisonFlagged(data);
    });
    fetchGraphDataset(Dataset.HaircutTornado).then((data) => {
      setHaircutTornado(data);
    });
    fetchGraphDataset(Dataset.HaircutFlagged).then((data) => {
      setHaircutFlagged(data);
    });
    fetchGraphDataset(Dataset.SeniorityTornado).then((data) => {
      setSeniorityTornado(data);
    });
    fetchGraphDataset(Dataset.SeniorityFlagged).then((data) => {
      setSeniorityFlagged(data);
    });
  }, []);

  return (
    <motion.div
      className="mt-8 flex min-w-full flex-col items-center justify-center text-tornado-green"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.7 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex min-w-full flex-col items-center justify-center text-tornado-green">
        {poisonTornado &&
          poisonFlagged &&
          haircutTornado &&
          haircutFlagged &&
          seniorityTornado &&
          seniorityFlagged && (
            <div className="flex min-w-full flex-col items-center justify-center">
              <h1 className="mt-2 text-3xl">Stats</h1>
              <DataGraph
                poisonTornado={poisonTornado}
                poisonFlagged={poisonFlagged}
                haircutFlagged={haircutFlagged}
                haircutTornado={haircutTornado}
                seniorityFlagged={seniorityFlagged}
                seniorityTornado={seniorityTornado}
                title={"# of blacklisted addresses"}
                xKey={"max_block"}
                yKey={"n_blacklisted"}
                xDomain={[3000000, 15000000]}
                yDomain={[0, 160000000]}
              />
              <DataGraph
                poisonTornado={poisonTornado}
                poisonFlagged={poisonFlagged}
                haircutFlagged={haircutFlagged}
                haircutTornado={haircutTornado}
                seniorityFlagged={seniorityFlagged}
                seniorityTornado={seniorityTornado}
                title={"RAM usage (GB)"}
                xKey={"max_block"}
                yKey={"ram_usage_gb"}
                xDomain={[3000000, 15000000]}
                yDomain={[0, 50]}
              />
              <DataGraph
                poisonTornado={poisonTornado}
                poisonFlagged={poisonFlagged}
                haircutFlagged={haircutFlagged}
                haircutTornado={haircutTornado}
                seniorityFlagged={seniorityFlagged}
                seniorityTornado={seniorityTornado}
                title={"Time to reach block (hours)"}
                xKey={"max_block"}
                yKey={"processed_after"}
                xDomain={[3000000, 15000000]}
                yDomain={[0, 12]}
              />
            </div>
          )}
      </div>
      <button
        className="text-bold m-4 rounded-sm border-2 border-tornado-green px-4 py-2 text-tornado-green transition-all hover:bg-slate-700"
        onClick={() => {
          navigate("/");
        }}
      >
        &#11164; Back to search
      </button>
    </motion.div>
  );
}

export default Stats;
