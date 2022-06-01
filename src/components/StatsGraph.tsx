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
import { csv, DSVParsedArray } from "d3";
import { FC } from "react";

enum Dataset {
  PoisonTornado = "poison-tornado-rundata.csv",
  PoisonFlagged = "poison-flagged-rundata.csv",
  HaircutTornado = "haircut-tornado-rundata.csv",
  HaircutFlagged = "haircut-flagged-rundata.csv",
  SeniorityTornado = "seniority-tornado-rundata.csv",
  SeniorityFlagged = "seniority-flagged-rundata.csv",
}

const fetchGraphDataset = async (
  dataset: Dataset,
  min_block: number = 3000000
): Promise<DSVParsedArray<any>> => {
  let dataUrl = `/csv/${dataset}`;

  return csv(dataUrl, (d) => {
    if (d.max_block !== undefined && parseInt(d.max_block) < min_block) {
      return null;
    }

    return {
      chunk: d.chunk ? +d.chunk : null,
      rows_processed: d.rows_processed ? +d.rows_processed : null,
      n_blacklisted: d.n_blacklisted ? +d.n_blacklisted : null,
      max_block: d.max_block ? +d.max_block : null,
      processed_after: d.processed_after
        ? (parseInt(d.processed_after?.split(" ")[2].split(":")[0]) * 60 +
            parseInt(d.processed_after?.split(" ")[2].split(":")[1])) /
          60
        : null,
      ram_usage_gb: d.ram_usage_gb ? +d.ram_usage_gb : null,
    };
  });
};

const DataLine = (
  title: string,
  color: string,
  data: DSVParsedArray<any>,
  yKey: string
) => {
  return (
    <Line
      data={data}
      type="monotone"
      dataKey={yKey}
      name={title}
      stroke={color}
      strokeWidth={2}
      dot={false}
      activeDot={{ r: 5 }}
      animationDuration={3000}
    />
  );
};

const DataGraph: FC<{
  poisonTornado: DSVParsedArray<any>;
  poisonFlagged: DSVParsedArray<any>;
  haircutTornado: DSVParsedArray<any>;
  haircutFlagged: DSVParsedArray<any>;
  seniorityTornado: DSVParsedArray<any>;
  seniorityFlagged: DSVParsedArray<any>;
  title: string;
  xKey: string;
  yKey: string;
  xDomain: [number, number];
  yDomain: [number, number];
}> = ({
  poisonTornado,
  poisonFlagged,
  haircutTornado,
  haircutFlagged,
  seniorityTornado,
  seniorityFlagged,
  title,
  xKey,
  yKey,
  xDomain,
  yDomain,
}) => {
  return (
    <div className="flex min-w-full flex-col items-center justify-center lg:w-2/3 2xl:min-w-fit">
      <p className="mt-3 text-lg">{title}</p>
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
            <XAxis dataKey={xKey} type="number" domain={xDomain} />
            <YAxis type="number" domain={yDomain} />
            <Tooltip />
            <Legend />
            {DataLine("Poison (Tornado)", "#8884d8", poisonTornado, yKey)}
            {DataLine("Poison (Flagged)", "#1a9c50", poisonFlagged, yKey)}
            {DataLine("Haircut (Tornado)", "#242F9B", haircutTornado, yKey)}
            {DataLine("Haircut (Flagged)", "#B97A95", haircutFlagged, yKey)}
            {DataLine("Seniority (Tornado)", "#F6AE99", seniorityTornado, yKey)}
            {DataLine("Seniority (Flagged)", "#EB5353", seniorityFlagged, yKey)}
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export { fetchGraphDataset, Dataset };
export default DataGraph;
