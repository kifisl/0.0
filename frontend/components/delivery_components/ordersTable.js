import React from "react";
import Link from "next/link";
import { useTable, usePagination } from "react-table";
import Select from "react-select";

const OrderTable = ({ columns, data }) => {
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

  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption);
  };

  const statusOptions = [
    { value: 1, label: "accepted" },
    { value: 2, label: "on the way" },
    { value: 3, label: "delivered" },
  ];

  const filteredData = useMemo(() => {
    if (!selectedStatus) {
      return data;
    }

    return data.filter((order) => order.OrderStatus === selectedStatus.value);
  }, [data, selectedStatus]);

  return (
    <div className="d-block">
      {data && data.length > 0 ? (
        <>
          <div className="mb-3">
            <Select
              options={statusOptions}
              value={selectedStatus}
              onChange={handleStatusChange}
              isClearable
              placeholder="Select status"
            />
          </div>
          <table {...getTableProps()} className="table">
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map((column) => (
                    <th {...column.getHeaderProps()}>
                      {column.render("Header")}
                    </th>
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
