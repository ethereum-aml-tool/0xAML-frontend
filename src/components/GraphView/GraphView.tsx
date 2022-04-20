import { FC } from "react";
import ReactFlow, { Node, Edge, Position } from "react-flow-renderer";
import dagre from 'dagre';

import './GraphView.css';

/*
{
"nodes": ["0x240d06c7abfcef26a9c17c89e1d5a9d06d9c9119", "0x3628fb6df176319797d7e7017a8baee3e8174fb4", "0xb4555e26e72253af19114016d5f0dc1cfbc5c7db"],
"edges": [{"from": 0, "to": 2}, {"from": 1, "to": 2}]
}
*/

type GraphViewProps = {
  graph: DARGraph;
};

const GraphView: FC<GraphViewProps> = ({ graph }) => {
  const graphToReactFlow = (graph: DARGraph) => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    for (let i = 0; i < graph.nodes.length; i++) {
      nodes.push({
        id: i.toString(),
        //type: "input",
        data: {
          label: (
            <a
              href={`https://etherscan.io/address/${graph.nodes[i]}`}
              target="_blank"
              className="hover:underline"
            >
              {graph.nodes[i].substring(0, 10)}...
            </a>
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
        id: `e${graph.edges[i].from.toString()}-${graph.edges[i].to.toString()}`,
        source: graph.edges[i].from.toString(),
        target: graph.edges[i].to.toString(),
        animated: true
      });
    }

    console.log(nodes);
    console.log(edges);

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

  const { nodes, edges } = graphToReactFlow(graph);

  return (
    <div className="h-80 w-96 rounded-sm border-2 border-solid border-tornado-green">
      <ReactFlow nodes={nodes} edges={edges} fitView />
    </div>
  );
};

export default GraphView;
