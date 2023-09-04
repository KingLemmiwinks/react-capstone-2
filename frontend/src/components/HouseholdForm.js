import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function HouseholdForm(props) {
  const { submitHandler, changeHandler, formData, buttonText } = props;

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          onChange={changeHandler}
          value={formData.name}
          name="name"
          type="text"
          placeholder="Household Name"
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Street Address</Form.Label>
        <Form.Control
          onChange={changeHandler}
          value={formData.address}
          name="address"
          type="text"
          placeholder="Street Address"
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>City</Form.Label>
        <Form.Control
          onChange={changeHandler}
          value={formData.city}
          name="city"
          type="text"
          placeholder="City"
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>State</Form.Label>
        <Form.Control
          onChange={changeHandler}
          value={formData.state}
          name="state"
          type="text"
          placeholder="State"
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Zip</Form.Label>
        <Form.Control
          onChange={changeHandler}
          value={formData.zip}
          name="zip"
          type="number"
          placeholder="Zip"
          required
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Notes</Form.Label>
        <Form.Control
          onChange={changeHandler}
          value={formData.notes}
          name="notes"
          type="textarea"
          placeholder="Notes"
        />
      </Form.Group>

      <Button className="d-block ml-auto" variant="info" type="submit">
        {buttonText}
      </Button>
    </Form>
  );
}
