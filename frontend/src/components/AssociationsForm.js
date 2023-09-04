import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function AssociationsForm(props) {
  const {
    submitHandler,
    changeHandler,
    formData,
    buttonText,
  } = props;

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group>
        <Form.Label>Is the property part of an association?</Form.Label>
        <Form.Control
          as="select"
          onChange={changeHandler}
          value={formData.associationTypeID}
          name="associationTypeID"
        >
          <option>Select Association</option>
          <option value="1">Condominium</option>
          <option value="2">Homeowners Association or Planned Community</option>
          <option value="3">Cooperative</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>If "Yes", how much are the fees?</Form.Label>
        <Form.Control
          onChange={changeHandler}
          value={formData.fees}
          name="fees"
          type="text"
          placeholder="Fees"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>How often must the fees be paid?</Form.Label>
        <Form.Control
          as="select"
          onChange={changeHandler}
          value={formData?.frequencyTypeID}
          name="frequencyTypeID"
        >
          <option>Select Role</option>
          <option value="1">Monthly</option>
          <option value="2">Quarterly</option>
          <option value="3">Yearly</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>
          If "Yes", are there any community services or systems that the
          association or community is responsible for supporting or maintaining?
        </Form.Label>
        <Form.Control
          onChange={changeHandler}
          value={formData.communityMaintenance}
          name="communityMaintenance"
          type="text"
          placeholder="Explain"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Explain this section if needed:</Form.Label>
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
