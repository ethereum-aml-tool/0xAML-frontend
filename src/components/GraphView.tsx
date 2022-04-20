import { FC } from "react";

type GraphViewProps = {
  addresses: string[];
};

const GraphView: FC<GraphViewProps> = ({ addresses }) => {
  return (
    <div className="h-9 rounded-sm border-2 border-solid border-tornado-green">
      <p>
        GRAPHING{" "}
        {addresses.map((a) => (
          <p>{a}</p>
        ))}
        !
      </p>
    </div>
  );
};

export default GraphView;
