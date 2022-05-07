import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import WalletForm from "./index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import WalletFormWithdraw from "./index";

function WalletFormModalWithdraw() {
  const [showModal, setShowModal] = useState(false);
  const prop = { showModal, setShowModal };
  return (
    <>
      <button onClick={() => setShowModal(true)} className="minus-button">
        <FontAwesomeIcon icon={faMinus} className="add-icon " />
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <WalletFormWithdraw prop={prop} />
        </Modal>
      )}
    </>
  );
}

export default WalletFormModalWithdraw;
