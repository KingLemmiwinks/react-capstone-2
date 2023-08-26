import React, { useContext, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import UserContext from "../UserContext";

export default function HouseholdModal(props) {
    const { handleClose, show, createHousehold, setIsLoading } = props;
    const [formData, setFormData] = useState({
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      notes: "",
      errors: [],
    });

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
        <Form className="mt-2" onSubmit={submitHandler}>
          <Modal.Body>
            <Form.Group className="w-100">
              <Form.Label>Household Name</Form.Label>
              <Form.Control
                className="mb-2"
                onChange={changeHandler}
                type="text"
                name="name"
                value={formData.name}
              />
              <Form.Label>Street Address</Form.Label>
              <Form.Control
                className="mb-2"
                onChange={changeHandler}
                type="text"
                name="address"
                value={formData.address}
              />
              <Form.Label>City</Form.Label>
              <Form.Control
                className="mb-2"
                onChange={changeHandler}
                type="text"
                name="city"
                value={formData.city}
              />
              <Form.Label>State</Form.Label>
              <Form.Control
                className="mb-2"
                onChange={changeHandler}
                type="text"
                name="state"
                value={formData.state}
              />
              <Form.Label>Zip</Form.Label>
              <Form.Control
                className="mb-2"
                onChange={changeHandler}
                type="number"
                name="zip"
                value={formData.zip}
              />
              <Form.Label>Notes</Form.Label>
              <Form.Control
                className="mb-2"
                onChange={changeHandler}
                type="textarea"
                name="notes"
                value={formData.notes}
              />
            </Form.Group>
            {formData.errors.length > 0 && (
              <Alert type="danger" messages={formData.errors} />
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="info" type="submit">
              Create
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
}
