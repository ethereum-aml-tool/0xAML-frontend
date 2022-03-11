import { FC } from "react";

type TransactionBoxProps = {
  transactions: Transaction[];
};

const TransactionTable: FC<TransactionBoxProps> = ({ transactions }) => {
  const EXPLORER_URL = "https://etherscan.io";

  const TableHeaderCell: FC<{ data: string }> = ({ data }) => (
    <th className=" border-tornado-green p-2">{data}</th>
  );

  const TableDataCell: FC<{ data: any; link?: string }> = ({ data, link }) => {
    const isAddress = data.length >= 42;

    let contentDiv;
    if (isAddress) {
      contentDiv = (
        <div>
          <span className="tooltip -mt-8 rounded bg-tornado-green p-1 font-mono text-tornado-dark shadow-lg">
            {data}
          </span>
          <a
            href={link ?? EXPLORER_URL}
            target="_blank"
            className="hover:underline"
          >
            {data.substring(0, 15)}...
          </a>
        </div>
      );
    } else {
      contentDiv = data;
    }

    return (
      <td className="has-tooltip border border-tornado-green p-2">
        {contentDiv}
      </td>
    );
  };

  return (
    <table className="table-auto border-collapse border-2 border-tornado-green">
      <thead>
        <tr>
          <TableHeaderCell data="Hash" />
          <TableHeaderCell data="From" />
          <TableHeaderCell data="To" />
          <TableHeaderCell data="Amount (Ether)" />
          <TableHeaderCell data="Timestamp" />
        </tr>
      </thead>
      <tbody className="">
        {transactions.map((t) => (
          <tr key={t.hash}>
            <TableDataCell
              data={t.hash}
              link={`${EXPLORER_URL}/tx/${t.hash}`}
            />
            <TableDataCell
              data={t.from_address}
              link={`${EXPLORER_URL}/address/${t.from_address}`}
            />
            <TableDataCell
              data={t.to_address}
              link={`${EXPLORER_URL}/address/${t.to_address}`}
            />
            <TableDataCell
              data={
                t.value.toString().length == 1 ? t.value.toFixed(2) : t.value
              }
            />
            <TableDataCell
              data={t.block_timestamp.substring(2).replace("T", " ")}
            />
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TransactionTable;
