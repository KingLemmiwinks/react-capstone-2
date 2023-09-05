import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function SellerExpertiseForm(props) {
  const { submitHandler, changeHandler, formData, buttonText, checkboxChangeHandler } = props;

  return (
    <Form onSubmit={submitHandler}>
      <Form.Group className="row">
        <Form.Check
          type={"checkbox"}
          className="col-1"
          onChange={checkboxChangeHandler}
          value={formData.hasExpertise}
          checked={formData.hasExpertise}
          name="hasExpertise"
          style={{ textAlign: "center" }}
        />
        <Form.Label className="col">
          Does Seller possess expertise in contracting, engineering,
          architechture, environtmental assessment or other areas related to the
          construction and conditions of the property and its improvements?
        </Form.Label>
      </Form.Group>

      <Form.Group className="row">
        <Form.Check
          type={"checkbox"}
          className="col-1"
          onChange={checkboxChangeHandler}
          value={formData.isLandlord}
          checked={formData.isLandlord}
          name="isLandlord"
          style={{ textAlign: "center" }}
        />
        <Form.Label className="col">
          Is Seller the landlord for the property?
        </Form.Label>
      </Form.Group>

      <Form.Group className="row">
        <Form.Check
          type={"checkbox"}
          className="col-1"
          onChange={checkboxChangeHandler}
          value={formData.isRealEstateLicensee}
          checked={formData.isRealEstateLicensee}
          name="isRealEstateLicensee"
          style={{ textAlign: "center" }}
        />
        <Form.Label className="col">
          Is Seller a real estate licensee?
        </Form.Label>
      </Form.Group>

      <Form.Group>
        <Form.Label>
          Explain any "yes" answers in Seller's Expertise section:
        </Form.Label>
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
