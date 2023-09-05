import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan } from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import CapstoneApi from "../api";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import ConfirmModal from "./ConfirmModal";
import { useHistory } from "react-router-dom";


export default function HouseholdCard(props) {
  const history = useHistory();
  const { householdId, name, address, notes, getUserHouseholds } = props;
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    getUserHouseholds();
  };
  const handleShow = () => setShow(true);

  function handleDownload() {
    history.push(`/downloadView/${householdId}`);
  }


  async function deleteHousehold() {
    let data = {
      householdId: householdId,
    };
    var success = await CapstoneApi.deleteHousehold(data);
    console.log("Household deleted: " + success);
    handleClose();
  }

  return (
    <>
      <Card className="mb-3">
        <Card.Body>
          <Card.Title>
            <Row className="justify-content-between">
              <Col md="8">{name}</Col>
              <Col>
                <Button
                  className="d-block ml-auto"
                  onClick={handleDownload}
                  variant="info"
                  type="button"
                >
                  Download
                </Button>
              </Col>
              <Col>
                <Button
                  style={{ float: "right" }}
                  className="btn-danger"
                  onClick={handleShow}
                >
                  <FontAwesomeIcon icon={faTrashCan} />
                </Button>
              </Col>
            </Row>
          </Card.Title>
          <Card.Text>
            {address}
            <br />
            {notes}
            <Link
              to={"/household/" + householdId + "/" + name}
              className="d-block ml-auto btn btn-info"
            >
              View household detail
            </Link>
          </Card.Text>
        </Card.Body>
      </Card>

      <ConfirmModal
        show={show}
        handleClose={handleClose}
        title={"Delete Household"}
        message={"Are you sure? This will delete all relevant household info."}
        confirmFunction={deleteHousehold}
      />
    </>
  );
}
