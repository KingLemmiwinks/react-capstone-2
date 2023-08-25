import React from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";

export default function Basement(props) {
  const { householdId } = props;
  
  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>Some Basement data here</Card.Title>
        <Card.Text>
          More info
          <br />
          More info
          <Button
            className="d-block ml-auto"
            //disabled={appliedFor}
            //onClick={() => applyHandler(id)}
            variant="danger"
            type="button"
          >
            Button text here
          </Button>
        </Card.Text>
      </Card.Body>
    </Card>
  );
}
