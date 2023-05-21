import React from "react";
import Link from "next/link";
import { useTable, usePagination, useSortBy } from "react-table";
import { useEffect, useMemo, useState } from "react";
import { formatDate } from "@/pages/delivery/orders";

const OrderTable = ({ columns, data }) => {
  const [sortBy, setSortBy] = useState({
    column: null,
    desc: false,
  });

  const formattedData = useMemo(() => {
    return data.map((item) => {
      return {
        ...item,
        OrderDate: formatDate(item.OrderDate), // Преобразование в строку
      };
    });
  }, [data]);

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
    state: { pageIndex, pageSize, sortBy: tableSortBy },
  } = useTable(
    {
      columns,
      data: formattedData,
      initialState: { pageSize: 5 },
    },
    useSortBy,
    usePagination
  );

  useEffect(() => {
    if (tableSortBy.length > 0) {
      const sortColumn = columns.find(
        (column) => column.id === tableSortBy[0].id
      );

      if (sortColumn) {
        sortColumn.toggleSortBy(tableSortBy[0].desc);
      }
    }
  }, [tableSortBy]);

  return (
    <div className="d-block">
      {data && data.length > 0 ? (
        <>
          <table {...getTableProps()} className="table">
            <thead>
              {headerGroups.map((headerGroup, i) => (
                <tr key={i} {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column, i) => (
                    <th
                      key={i}
                      {...column.getHeaderProps(
                        column.disableSortBy
                          ? {}
                          : column.getSortByToggleProps()
                      )}
                    >
                      {column.render("Header")}
                      {!column.disableSortBy && (
                        <span>
                          {column.isSorted ? (
                            column.isSortedDesc ? (
                              " ⏷"
                            ) : (
                              " ⏶"
                            )
                          ) : (
                            <button
                              className="btn btn-link btn-sm"
                              onClick={() =>
                                setSortBy({ column: column.id, desc: false })
                              }
                            >
                              ⏷⏶
                            </button>
                          )}
                        </span>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map((row, i) => {
                prepareRow(row);
                return (
                  <tr key={i} {...row.getRowProps()}>
                    {row.cells.map((cell, i) => {
                      return (
                        <td key={i} {...cell.getCellProps()}>
                          {cell.render("Cell")}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      ) : (
        <h3>No orders</h3>
      )}
      <div className="d-flex justify-content-between mt-3">
        <button
          className="btn btn-primary mr-3"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {"⏴"}
        </button>
        {/* <Link href="/admin/order/add" passHref>
          <button className="btn btn-primary ">Add part</button>
        </Link> */}
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

export default OrderTable;
