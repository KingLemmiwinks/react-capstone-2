import React from "react";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function HouseholdCard(props) {
  const { handle, name, address } = props;
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{name}</Card.Title>
        <Card.Text>
          {address}
          <br />
          More info can go here
          <Link
            to={"/household/" + handle + "/" + name}
            className="d-block ml-auto btn btn-info"
          >
            View household detail
          </Link>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
