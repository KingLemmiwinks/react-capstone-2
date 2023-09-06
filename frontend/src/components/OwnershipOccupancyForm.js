import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import moment from "moment";

export default function OwnershipOccupancyForm(props) {
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
        <Form.Label>When was the property most recently occupied?</Form.Label>
        <Form.Control
          onChange={changeHandler}
          value={moment
            .utc(formData.mostRecentOccupation.toLocaleString())
            .format("yyyy-MM-DD")}
          name="mostRecentOccupation"
          type="date"
        />
      </Form.Group>

      <Form.Group className="row">
        <Form.Check
          type={"checkbox"}
          className="col-1"
          onChange={checkboxChangeHandler}
          value={formData.isOccupiedBySeller}
          checked={formData.isOccupiedBySeller}
          name="isOccupiedBySeller"
          style={{ textAlign: "center" }}
        />
        <Form.Label className="col">
          Was the seller the most recent occupant?
        </Form.Label>
      </Form.Group>

      <Form.Group>
        <Form.Label>
          How many persons most recently occupied the property?
        </Form.Label>
        <Form.Control
          as="select"
          onChange={changeHandler}
          value={formData.sellerOccupancyHistory}
          name="sellerOccupancyHistory"
        >
          <option>Number of Occupants</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Role of Individual Completing This Disclosure:</Form.Label>
        <Form.Control
          as="select"
          onChange={changeHandler}
          value={formData.roleTypeId}
          name="roleTypeId"
        >
          <option value="1">The Owner</option>
          <option value="2">The Executor</option>
          <option value="3">The Administrator</option>
          <option value="4">The Trustee</option>
          <option value="5">And Individual Holding Power of Attorney</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>When was the property purchased?</Form.Label>
        <Form.Control
          onChange={changeHandler}
          value={moment
            .utc(formData.purchaseDate.toLocaleString())
            .format("yyyy-MM-DD")}
          name="purchaseDate"
          type="date"
        />
      </Form.Group>

      <Form.Group className="row">
        <Form.Check
          type={"checkbox"}
          className="col-1"
          onChange={checkboxChangeHandler}
          value={formData.hasHadPets}
          checked={formData.hasHadPets}
          name="hasHadPets"
          style={{ textAlign: "center" }}
        />
        <Form.Label className="col">
          Are you aware of any pets having lived in the house or other
          structures during your ownership?
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
