import React from "react";
import Modal from "react-bootstrap/Modal";
import HouseholdForm from "./HouseholdForm";

export default function HouseholdModal(props) {
    const { handleClose, show, createHousehold, setIsLoading, formData, setFormData } = props;
    

    const changeHandler = (e) => {
      const { name, value } = e.target;
      setFormData((fdata) => ({
        ...fdata,
        [name]: value,
      }));
    };

    const submitHandler = async (e) => {
      e.preventDefault();
      setIsLoading(true);
      let data = {
        name: formData.name,
        address: formData.address,
        city: formData.city,
        state: formData.state,
        zip: formData.zip,
        notes: formData.notes,
      };
      
      try {
        createHousehold(data);        
      } catch (errors) {
        setIsLoading(false);
        return setFormData((data) => ({ ...data, errors }));
      }
    };

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create New Household</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <HouseholdForm
            submitHandler={submitHandler}
            changeHandler={changeHandler}
            formData={formData}
            buttonText={"Create"}
          />
        </Modal.Body>
      </Modal>
    );
}
