import React from "react";
import { useTable, usePagination } from "react-table";
import Link from "next/link";

const ProductTable = ({ columns, data }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
    nextPage,
    previousPage,
    canPreviousPage,
    canNextPage,
    state: { pageIndex, pageSize },
  } = useTable(
    {
      columns,
      data,
    },
    usePagination
  );

  return (
    <div className="d-block">
      <table {...getTableProps()} className="table">
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-primary mr-3"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"⏴"}
        </button>
        <Link href="/admin/products/add" passHref>
          <button className="btn btn-primary ">Add part</button>
        </Link>
        <button
          className="btn btn-primary mr-3"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {"⏵"}
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
