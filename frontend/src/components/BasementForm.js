import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function AssociationsForm(props) {
  const {
    submitHandler,
    changeHandler,
    formData,
    buttonText,
    checkboxChangeHandler,
  } = props;

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group>
        <Form.Label>When was the roof installed?</Form.Label>
        <Form.Control
          onChange={changeHandler}
          value={formData.installationDate}
          name="installationDate"
          type="text"
          placeholder="MM/DD/YYYY"
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Do you have documentation?</Form.Label>
        <Form.Control
          onChange={changeHandler}
          value={formData.invoicePhoto}
          name="invoicePhoto"
          type="text"
          placeholder="Invoice Photo"
        />
      </Form.Group>

      <Form.Group className="row">
        <Form.Check
          type={"checkbox"}
          className="col-1"
          onChange={checkboxChangeHandler}
          value={formData.hasBeenReplaced}
          checked={formData.hasBeenReplaced}
          name="hasBeenReplaced"
        />
        <Form.Label className="col">
          Has the roof or any portion of it been replaced or repaired during
          your ownership?
        </Form.Label>
      </Form.Group>

      <Form.Group className="row">
        <Form.Check
          type={"checkbox"}
          className="col-1"
          onChange={checkboxChangeHandler}
          value={formData.hasPreexistingLeaks}
          checked={formData.hasPreexistingLeaks}
          name="hasPreexistingLeaks"
        />
        <Form.Label className="col">
          Has the roof ever leaked during your ownership?
        </Form.Label>
      </Form.Group>

      <Form.Group className="row">
        <Form.Check
          type={"checkbox"}
          className="col-1"
          onChange={checkboxChangeHandler}
          value={formData.hasRainwaterProblems}
          checked={formData.hasRainwaterProblems}
          name="hasRainwaterProblems"
        />
        <Form.Label className="col">
          Are you aware of any current/past problems with the roof, gutters,
          flashing, or downspouts?
        </Form.Label>
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
