import { useEffect, useState } from "react";
import ReactFlow, {
  Node,
  Edge,
  Position,
  MarkerType,
} from "react-flow-renderer";
import dagre from "dagre";
import { API_URL } from "../../constants";

import "./GraphView.css";
import { useAtomValue } from "jotai";
import { accountAddressAtom, graphAtom } from "../../store/store";
import { Link } from "react-router-dom";

/*
{
"nodes": ["0x240d06c7abfcef26a9c17c89e1d5a9d06d9c9119", "0x3628fb6df176319797d7e7017a8baee3e8174fb4", "0xb4555e26e72253af19114016d5f0dc1cfbc5c7db"],
"edges": [{"from": 0, "to": 2}, {"from": 1, "to": 2}]
}
*/

const GraphView = () => {
  const address = useAtomValue(accountAddressAtom);
  const graphData = useAtomValue(graphAtom);

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);

  const graphToReactFlow = (graph: DARGraph) => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    for (let i = 0; i < graph.nodes.length; i++) {
      nodes.push({
        id: i.toString(),
        //type: "input",
        data: {
          label: (
            <Link
              to={`/address/${graph.nodes[i].address}`}
              className={`hover:underline ${
                graph.nodes[i].flagged ? "text-red-500" : ""
              } ${
                graph.nodes[i].address.toLowerCase() === address?.toLowerCase()
                  ? "font-bold"
                  : ""
              }`}
            >
              {graph.nodes[i].address.substring(0, 10)}...
            </Link>
          ),
        },
        position: { x: 250, y: 25 * i * 3 },
        style: {
          color: "black",
        },
      });
    }
    for (let i = 0; i < graph.edges.length; i++) {
      edges.push({
        id: `e${graph.edges[i].from.toString()}-${graph.edges[
          i
        ].to.toString()}`,
        source: graph.edges[i].from.toString(),
        target: graph.edges[i].to.toString(),
        markerEnd: {
          type: MarkerType.ArrowClosed,
        },
        animated: true,
      });
    }

    // Fix node types, target is deposit address
    edges.forEach((edge) => {
      nodes[parseInt(edge.source)].type = "input";
      nodes[parseInt(edge.target)].type = "output";

      // change text color of deposit addresses
      nodes[parseInt(edge.target)].style = { color: "blue" };
    });

    // Graph layouting with Dagre
    const dagreGraph = new dagre.graphlib.Graph();
    dagreGraph.setDefaultEdgeLabel(() => ({}));

    const nodeWidth = 172;
    const nodeHeight = 36;
    dagreGraph.setGraph({ rankdir: "TB" });

    nodes.forEach((node) => {
      dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
    });

    edges.forEach((edge) => {
      dagreGraph.setEdge(edge.source, edge.target);
    });

    dagre.layout(dagreGraph);

    nodes.forEach((node) => {
      const nodeWithPosition = dagreGraph.node(node.id);
      node.targetPosition = Position.Top;
      node.sourcePosition = Position.Bottom;

      // We are shifting the dagre node position (anchor=center center) to the top left
      // so it matches the React Flow node anchor point (top left).
      node.position = {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      };

      return node;
    });

    return { nodes, edges };
  };

  useEffect(() => {
    console.log(graphData);
    if (address && graphData.nodes && graphData.edges) {
      const { nodes, edges } = graphToReactFlow(graphData);
      setNodes(nodes);
      setEdges(edges);
    } else {
      setNodes([]);
      setEdges([]);
    }
  }, [graphData]);

  return (
    <div className="">
      {nodes.length > 0 && (
        <div className="mt-2 flex flex-col items-center justify-center">
          <p className="text-lg font-bold">DAR (Deposit Address Reuse)</p>
          <p className="italic">
            <span className="text-blue-600">blue</span> = deposit address
          </p>
          <div className="mt-1 h-80 w-[95vw] rounded-sm border border-solid border-tornado-green hover:cursor-grab">
            <ReactFlow nodes={nodes} edges={edges} fitView />
          </div>
        </div>
      )}
    </div>
  );
};

export default GraphView;
