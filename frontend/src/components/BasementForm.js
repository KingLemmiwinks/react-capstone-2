import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function BasementForm(props) {
  const {
    submitHandler,
    changeHandler,
    formData,
    buttonText,
    checkboxChangeHandler,
  } = props;

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="row">
        <Form.Check
          type={"checkbox"}
          className="col-1"
          onChange={checkboxChangeHandler}
          value={formData.hasSumpPump}
          checked={formData.hasSumpPump}
          name="hasSumpPump"
          style={{ textAlign: "center" }}
        />
        <Form.Label className="col">
          Does the property have a sump pump?
        </Form.Label>
      </Form.Group>

      <Form.Group>
        <Form.Label>If "Yes", how many?</Form.Label>
        <Form.Control
          as="select"
          onChange={changeHandler}
          value={formData.sellerOccupancyHistory}
          name="sellerOccupancyHistory"
        >
          <option>Number of Sump Pumps</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </Form.Control>
      </Form.Group>

      <Form.Group className="row">
        <Form.Check
          type={"checkbox"}
          className="col-1"
          onChange={checkboxChangeHandler}
          value={formData.hasBeenUsed}
          checked={formData.hasBeenUsed}
          name="hasBeenUsed"
          style={{ textAlign: "center" }}
        />
        <Form.Label className="col">
          If it has a sump pump, has it ever run?
        </Form.Label>
      </Form.Group>

      <Form.Group className="row">
        <Form.Check
          type={"checkbox"}
          className="col-1"
          onChange={checkboxChangeHandler}
          value={formData.hasWaterDamage}
          checked={formData.hasWaterDamage}
          name="hasWaterDamage"
          style={{ textAlign: "center" }}
        />
        <Form.Label className="col">
          Are you aware of any water damage caused by leakage, accumulation, or
          dampness within the basement?
        </Form.Label>
      </Form.Group>

      <Form.Group className="row">
        <Form.Check
          type={"checkbox"}
          className="col-1"
          onChange={checkboxChangeHandler}
          value={formData.hasDownspoutConnection}
          checked={formData.hasDownspoutConnection}
          name="hasDownspoutConnection"
          style={{ textAlign: "center" }}
        />
        <Form.Label className="col">
          Are the downspout gutters connected to a public system?
        </Form.Label>
      </Form.Group>

      <Form.Group className="row">
        <Form.Check
          type={"checkbox"}
          className="col-1"
          onChange={checkboxChangeHandler}
          value={formData.hasRepairs}
          checked={formData.hasRepairs}
          name="hasRepairs"
          style={{ textAlign: "center" }}
        />
        <Form.Label className="col">
          Do you know of any repairs or other attempts to control and water or
          dampness problem in the basement or crawlspace?
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
