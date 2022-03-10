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