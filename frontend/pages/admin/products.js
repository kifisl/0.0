import { useEffect, useMemo, useState } from "react";
import AdminSidebar from "@/components/admin_components/adminSidebar";
import ProductTable from "@/components/admin_components/productTable";
import { BsFillTrashFill, BsPencil } from "react-icons/bs";
import Link from "next/link";
import Adminlayout from "@/components/layouts/adminLayout";
import Modalwindow from "@/components/modalWindow";
import AuthAdmin from "@/components/HOC/AuthAdmin";

export const getServerSideProps = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/product`,
    {
      method: "POST",
    }
  );
  const content = await response.json();

  return {
    props: { data: content },
  };
};

const Products = ({ data }) => {
  const [showState, setShowState] = useState(false);
  const [deleteId, setDeleteId] = useState("");
  const [products, setProducts] = useState(data.products);

  const closeModal = () => setShowState(false);
  const openModal = (e, props) => {
    setDeleteId(props.row.original.ProductID);
    setShowState(true);
  };
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACK_DOMAIN}/v1/product`,
        {
          method: "POST",
        }
      );
      const content = await response.json();
      setProducts(content.products);
    };

    if (showState) {
      fetchData();
    }
  }, [showState]);

  const handleProductDeleted = async () => {
    setProducts((prevProducts) =>
      prevProducts.filter((product) => product.ProductID !== deleteId)
    );
    closeModal();
  };

  const columns = useMemo(() => [
    {
      Header: "Id",
      accessor: "ProductID",
    },
    {
      Header: "Name",
      accessor: "ProductName",
    },
    {
      Header: "Price",
      accessor: "ProductPrice",
    },
    {
      Header: "Weight",
      accessor: "ProductWeight",
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
    {
      Header: "Delete",
      Cell: (props) => (
        <button className="btn" onClick={(e) => openModal(e, props)}>
          <BsFillTrashFill />
        </button>
      ),
    },
  ]);

  return (
    <AdminSidebar>
      <div className="d-flex justify-content-center">
        <ProductTable columns={columns} data={products} />
      </div>
      
      <Modalwindow
        show={showState}
        toggleModal={closeModal}
        id={deleteId}
        onProductDeleted={handleProductDeleted}
      />
    </AdminSidebar>
  );
};

export default AuthAdmin(Products);
