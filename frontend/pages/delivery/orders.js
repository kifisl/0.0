import { useEffect, useMemo, useState } from "react";
import { BsFillTrashFill, BsPencil } from "react-icons/bs";
import Link from "next/link";
import DeliverySidebar from "@/components/delivery_components/deliverySidebar";
import OrderTable from "@/components/delivery_components/ordersTable";
import AuthDelivery from "@/components/HOC/AuthDelivery";
import moment from "moment";
import "moment/locale/ru";

export const getServerSideProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/order/delivery/getAll`,
    {
      method: "GET",
    }
  );
  const content = await response.json();

  return {
    props: { data: content },
  };
};

const Orders = ({ data }) => {
  const [showState, setShowState] = useState(false);
  const [orders, setOrders] = useState(data?.allOrders || []);
  const [selectedStatus, setSelectedStatus] = useState("");

  const handleStatusChange = (e) => {
    const status = e.target.value;
    if (status !== selectedStatus) {
      setSelectedStatus(status);
    }
  };
  const uniqueStatuses = useMemo(() => {
    const statuses = orders.map((order) => order.OrderStatus);
    return [...new Set(statuses)];
  }, [orders]);

  const getStatusValue = (status) => {
    if (status === "accepted") {
      return 1;
    } else if (status === "on_the_way") {
      return 2;
    } else if (status === "delivered") {
      return 3;
    } else {
      return null;
    }
  };

  const filteredOrders = useMemo(() => {
    if (!selectedStatus) return orders;
    const statusValue = getStatusValue(selectedStatus);
    return orders.filter((order) => order.OrderStatus === statusValue);
  }, [orders, selectedStatus]);

  const columns = useMemo(
    () => [
      {
        Header: "Id",
        accessor: "OrderID",
      },
      {
        Header: "Address",
        accessor: "address",
        Cell: ({ value }) => (
          <span>
            {value && `${value.Country}, ${value.City}, ${value.Address}`}
          </span>
        ),
      },
      {
        Header: "Product - quantity",
        accessor: "orderdetails",
        disableSortBy: true,
        Cell: ({ value }) => (
          <span>
            {value.map((detail) => (
              <div key={`${detail.products.ProductName}-${detail.Quantity}`}>
                {detail.products.ProductName} - {detail.Quantity}
              </div>
            ))}
          </span>
        ),
      },
      {
        Header: "Date & Time",
        accessor: "OrderDate",
      },
      {
        Header: "Status",
        accessor: "OrderStatus",
        Cell: ({ value }) => {
          let status;
          if (value === 1) {
            status = "accepted";
          } else if (value === 2) {
            status = "on the way";
          } else if (value === 3) {
            status = "delivered";
          } else {
            status = "";
          }
          return <span>{status}</span>;
        },
        Filter: ({ column }) => (
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="form-select"
          >
            <option value="">All</option>
            {uniqueStatuses.map((status) => (
              <option key={status} value={status}>
                {getStatusText(status)}
              </option>
            ))}
          </select>
        ),
      },
      {
        Header: "Change status",
        disableSortBy: true,
        Cell: (props) => (
          <Link
            href={{
              pathname: "orders/changeStatus/[id]",
              query: { id: props.row.original.OrderID },
            }}
            as={`orders/changeStatus/${props.row.original.OrderID}`}
          >
            <button className="btn">
              <BsPencil />
            </button>
          </Link>
        ),
      },
    ],
    [selectedStatus, uniqueStatuses]
  );

  const getStatusText = (status) => {
    if (status === 1) {
      return "accepted";
    } else if (status === 2) {
      return "on the way";
    } else if (status === 3) {
      return "delivered";
    } else {
      return "";
    }
  };

  return (
    <DeliverySidebar>
      <div className="d-flex justify-content-center">
        <label htmlFor="status">
          <h5>Filter by Status:</h5>
        </label>
        <select
          class="form-select"
          style={{ width: "200px" }}
          id="status"
          value={selectedStatus}
          onChange={handleStatusChange}
        >
          <option value="">All</option>
          <option value="accepted">Accepted</option>
          <option value="on_the_way">On the Way</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>

      <div className="d-flex justify-content-center">
        <OrderTable
          columns={columns}
          data={filteredOrders}
          selectedStatus={selectedStatus}
        />
      </div>
    </DeliverySidebar>
  );
};

export default AuthDelivery(Orders);

export const formatDate = (date) => {
  return moment(date).format("DD.MM.YYYY, HH:mm");
};
