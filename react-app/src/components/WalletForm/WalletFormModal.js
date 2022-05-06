import React, { useState } from "react";
import { Modal } from "../../context/Modal";
import WalletForm from "./index";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'

function WalletFormModal() {
  const [showModal, setShowModal] = useState(false);
  const prop = { showModal, setShowModal }
  return (
    <>
      <button onClick={() => setShowModal(true)} className='add-button'><FontAwesomeIcon icon={faPlus} className='add-icon' /></button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <WalletForm prop={prop} />
        </Modal>
      )}
    </>
  );
}

export default WalletFormModal;