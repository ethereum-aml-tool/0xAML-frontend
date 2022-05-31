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
import { FC } from "react";
import blacklistedGraph from "../../assets/images/graphs/blacklisted.png";
import ramGraph from "../../assets/images/graphs/ram.png";
import timeGraph from "../../assets/images/graphs/time.png";

let dataUrl =
  location.hostname === "localhost"
    ? "http://127.0.0.1:5500/assets/csv/poison-tornado-rundata.csv"
    : "https://pastebin.com/raw/9i26cZXc";
let data = await csv(
  dataUrl,
  (d) => {
    return {
      chunk: d.chunk ? +d.chunk : null,
      rows_processed: d.rows_processed ? +d.rows_processed : null,
      n_blacklisted: d.n_blacklisted ? +d.n_blacklisted : null,
      max_block: d.max_block ? +d.max_block : null,
      processed_after: d.processed_after,
      ram_usage_gb: d.ram_usage_gb ? +d.ram_usage_gb : null,
    };
  }
);

const DataGraph: FC<{ data: DSVParsedArray<any>; title: string }> = ({data, title}) => {
  return (
    <div className="flex min-w-full flex-col items-center justify-center">
      <p>{title}</p>
      <div className="h-96 w-2/3">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 40,
              left: 40,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="max_block"
              type="number"
              domain={[9000000, 15000000]}
            />
            <YAxis type="number" domain={[0, 95000000]} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="n_blacklisted"
              name="Blacklisted addresses"
              stroke="#8884d8"
              dot={false}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

function Stats() {
  return (
    <div className="flex min-w-full flex-col items-center justify-center">
      <h1 className="text-3xl mt-2">Stats</h1>
      <div className="flex flex-col items-center justify-center">
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
      </div>
      {/* <DataGraph data={data} title={"Poison (Tornado)"} /> */}
    </div>
  );
}

export default Stats;
