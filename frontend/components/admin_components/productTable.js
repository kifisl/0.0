import React from "react";
import { useTable, usePagination } from "react-table";

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
            // eslint-disable-next-line
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                // eslint-disable-next-line
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              // eslint-disable-next-line
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    // eslint-disable-next-line
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-center">
        <button
          className="btn btn-primary mr-5"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"<"}
        </button>

        <button
          className="btn btn-primary mr-5"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {">"}
        </button>
      </div>
    </div>
  );
};

export default ProductTable;
