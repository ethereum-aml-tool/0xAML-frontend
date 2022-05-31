import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { csv, DSVParsedArray, DSVRowArray } from "d3";
import { FC, useEffect, useState } from "react";
import blacklistedGraph from "../../assets/images/graphs/blacklisted.png";
import ramGraph from "../../assets/images/graphs/ram.png";
import timeGraph from "../../assets/images/graphs/time.png";

enum Dataset {
  PoisonTornado = "poison-tornado-rundata.csv",
  PoisonFlagged = "poison-flagged-rundata.csv",
  HaircutTornado = "haircut-tornado-rundata.csv",
  HaircutFlagged = "haircut-flagged-rundata.csv",
  SeniorityTornado = "seniority-tornado-rundata.csv",
  SeniorityFlagged = "seniority-flagged-rundata.csv",
}
const fetchCsv = async (dataset: Dataset): Promise<DSVParsedArray<any>> => {
  let dataUrl =
    location.hostname === "localhost"
      ? `http://127.0.0.1:5500/assets/csv/${dataset}`
      : "https://pastebin.com/raw/9i26cZXc";

  return csv(dataUrl, (d) => {
    return {
      chunk: d.chunk ? +d.chunk : null,
      rows_processed: d.rows_processed ? +d.rows_processed : null,
      n_blacklisted: d.n_blacklisted ? +d.n_blacklisted : null,
      max_block: d.max_block ? +d.max_block : null,
      processed_after: d.processed_after,
      ram_usage_gb: d.ram_usage_gb ? +d.ram_usage_gb : null,
    };
  });
};

const DataGraph: FC<{
  poisonTornado: DSVParsedArray<any>;
  poisonFlagged: DSVParsedArray<any>;
  haircutTornado: DSVParsedArray<any>;
  haircutFlagged: DSVParsedArray<any>;
  seniorityTornado: DSVParsedArray<any>;
  seniorityFlagged: DSVParsedArray<any>;
  title: string;
}> = ({ poisonTornado, poisonFlagged, haircutTornado, haircutFlagged, seniorityTornado, seniorityFlagged, title }) => {
  return (
    <div className="flex min-w-full flex-col items-center justify-center">
      <p>{title}</p>
      <div className="h-96 w-2/3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            margin={{
              top: 5,
              right: 40,
              left: 40,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="max_block" type="number" domain={[0, 16000000]} />
            <YAxis type="number" domain={[0, 160000000]} />
            <Tooltip />
            <Legend />
            <Line
              data={poisonTornado}
              type="monotone"
              dataKey="n_blacklisted"
              name="Poison (Tornado)"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
              animationDuration={3000}
            />
            <Line
              data={poisonFlagged}
              type="monotone"
              dataKey="n_blacklisted"
              name="Poison (Flagged)"
              stroke="#1a9c50"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
              animationDuration={3000}
            />
            <Line
              data={haircutTornado}
              type="monotone"
              dataKey="n_blacklisted"
              name="Haircut (Tornado)"
              stroke="#242F9B"
              strokeWidth={3}
              dot={false}
              activeDot={{ r: 5 }}
              animationDuration={3000}
            />
            <Line
              data={haircutFlagged}
              type="monotone"
              dataKey="n_blacklisted"
              name="Haircut (Flagged)"
              stroke="#B97A95"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
              animationDuration={3000}
            />
            <Line
              data={seniorityTornado}
              type="monotone"
              dataKey="n_blacklisted"
              name="Seniority (Tornado)"
              stroke="#F6AE99"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
              animationDuration={3000}
            />
            <Line
              data={seniorityFlagged}
              type="monotone"
              dataKey="n_blacklisted"
              name="Seniority (Flagged)"
              stroke="#EB5353"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 5 }}
              animationDuration={3000}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

function Stats() {
  const [poisonTornado, setPoisonTornado] = useState<DSVParsedArray<any>>();
  const [poisonFlagged, setPoisonFlagged] = useState<DSVParsedArray<any>>();
  const [haircutTornado, setHaircutTornado] = useState<DSVParsedArray<any>>();
  const [haircutFlagged, setHaircutFlagged] = useState<DSVParsedArray<any>>();
  const [seniorityTornado, setSeniorityTornado] =
    useState<DSVParsedArray<any>>();
  const [seniorityFlagged, setSeniorityFlagged] =
    useState<DSVParsedArray<any>>();

  useEffect(() => {
    fetchCsv(Dataset.PoisonTornado).then((data) => {
      setPoisonTornado(data);
    });
    fetchCsv(Dataset.PoisonFlagged).then((data) => {
      setPoisonFlagged(data);
    });
    fetchCsv(Dataset.HaircutTornado).then((data) => {
      setHaircutTornado(data);
    });
    fetchCsv(Dataset.HaircutFlagged).then((data) => {
      setHaircutFlagged(data);
    });
    fetchCsv(Dataset.SeniorityTornado).then((data) => {
      setSeniorityTornado(data);
    });
    fetchCsv(Dataset.SeniorityFlagged).then((data) => {
      setSeniorityFlagged(data);
    });
  }, []);

  return (
    <div className="flex min-w-full flex-col items-center justify-center">
      <h1 className="mt-2 text-3xl">Stats</h1>
      {/* <div className="flex flex-col items-center justify-center">
        <img
          src={blacklistedGraph}
          alt="Number of blacklisted addresses per block"
          className="my-3"
        />
        <img
          src={ramGraph}
          alt="Number of blacklisted addresses per block"
          className="mb-3"
        />
        <img
          src={timeGraph}
          alt="Number of blacklisted addresses per block"
          className="mb-3"
        />
      </div> */}
      {poisonTornado && poisonFlagged && haircutTornado && haircutFlagged && seniorityTornado && seniorityFlagged &&(
        <DataGraph
          poisonTornado={poisonTornado}
          poisonFlagged={poisonFlagged}
          haircutFlagged={haircutFlagged}
          haircutTornado={haircutTornado}
          seniorityFlagged={seniorityFlagged}
          seniorityTornado={seniorityTornado}
          title={"# of blacklisted addresses"}
        />
      )}
    </div>
  );
}

export default Stats;
