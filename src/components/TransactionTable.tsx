import { FC } from "react";

type TransactionBoxProps = {
  transactions: Transaction[];
};

const TransactionTable: FC<TransactionBoxProps> = ({ transactions }) => {
  const TableHeaderCell: FC<{ data: string }> = ({ data }) => (
    <th className=" border-tornado-green p-2">{data}</th>
  );
  // TODO Make the if else cleaner...
  const TableDataCell: FC<{ data: any }> = ({ data }) => (
    <td className="has-tooltip border border-tornado-green p-2">
      {data.length > 20 && (
        <div>
          <span className="tooltip -mt-8 rounded bg-tornado-green p-1 text-tornado-dark shadow-lg font-mono">
            {data}
          </span>
          {data.substring(0, 15)}...
        </div>
      )}
      {data.length <= 20 && <div>{data}</div>}
    </td>
  );

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
            <TableDataCell data={t.hash} />
            <TableDataCell data={t.from_address} />
            <TableDataCell data={t.to_address} />
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
