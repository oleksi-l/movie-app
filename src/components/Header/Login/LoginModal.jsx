import React from "react";
import { Modal, ModalBody } from "reactstrap";
import LoginForm from "./LoginForm";
import AppContextHOC from "../../HOC/AppContextHOC";

const LoginModal = ({showModal,toggleModal}) => {
    return (
        <Modal isOpen={showModal} toggle={toggleModal}>
            <ModalBody>
                <LoginForm />
            </ModalBody>
        </Modal>
    )
};

export default AppContextHOC(LoginModal);