import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

const Modalwindow = ({ show, toggleModal, id, onProductDeleted }) => {
  const deleteHandle = async (id) => {
    const response = await fetch(`http://localhost:3000/v1/product/delete`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: id,
      }),
    });
    const content = await response.json();
    toggleModal();
    onProductDeleted();
  };
  return (
    <>
      <Modal isOpen={show}>
        <ModalHeader>Delete item</ModalHeader>
        <ModalBody>Are you sure you want to delete this item?</ModalBody>
        <ModalFooter>
          <button className="btn btn-danger" onClick={toggleModal}>
            Cancel
          </button>
          <button className="btn btn-success" onClick={() => deleteHandle(id)}>
            Delete
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};
export default Modalwindow;
