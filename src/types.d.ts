type Account = {
  address: string;
  balance: number;
  risk_level: number;
};

type Transaction = {
  hash: string;
  value: number;
  block_number: number;
  block_timestamp: string; // TODO Should be Date...
  from_address: string;
  to_address: string;
};

type DARGraph = {
  nodes: string[];
  edges: {
    from: number;
    to: number;
  }[];
}

type EtherscanBalance = {
  status: string;
  message: string;
  result: number;
};

type HaircutResult = {
    address: string;
    balance: number;
    taint: number;
};

type FifoResult = {
  address: string;
  tainted: number;
  untainted: number;
};

type PoisonResult = {
  address: string;
  flagged: boolean;
};

type SeniorityResult = {
  address: string;
  tainted_balance: number;
};