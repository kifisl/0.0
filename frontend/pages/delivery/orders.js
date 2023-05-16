import { useEffect, useMemo, useState } from "react";
import { BsFillTrashFill, BsPencil } from "react-icons/bs";
import Link from "next/link";
import DeliverySidebar from "@/components/delivery_components/deliverySidebar";
import OrderTable from "@/components/delivery_components/ordersTable";
import AuthDelivery from "@/components/HOC/AuthDelivery";
import Select from "react-select";

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
  const [selectedStatus, setSelectedStatus] = useState(null);

  const statusOptions = [
    { value: 1, label: "accepted" },
    { value: 2, label: "on the way" },
    { value: 3, label: "delivered" },
  ];

  const handleStatusChange = (selectedOption) => {
    setSelectedStatus(selectedOption);
  };

  const columns = useMemo(() => [
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
      sortType: "basic",
    },
    {
      Header: "Update",
      Cell: (props) => (
        <Link
          href={{
            pathname: "admin/products/edit/[id]",
            query: { id: props.row.original.ProductID },
          }}
          as={`/admin/products/edit/${props.row.original.ProductID}`}
        >
          <button className="btn">
            <BsPencil />
          </button>
        </Link>
      ),
    },
  ]);
  return (
    <DeliverySidebar>
      <div className="d-flex justify-content-center">
        <OrderTable columns={columns} data={filteredData} />
      </div>
    </DeliverySidebar>
  );
};

export default AuthDelivery(Orders);
