type BlacklistSummary = {
  address: string;
  haircut_taint: number | null;
  fifo_taint: number | null;
  seniority_taint: number | null;
  poison_taint: boolean | null;
  risk_level: number | null;
};

type DARGraph = {
  nodes: { address: string; flagged: boolean }[];
  edges: {
    from: number;
    to: number;
  }[];
};

type EtherscanBalance = {
  status: string;
  message: string;
  result: number;
};