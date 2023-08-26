import React, { useEffect, useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { v4 as uuidv4 } from "uuid";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserContext from "../UserContext";
import JoblyApi from "../api";
import HouseholdCard from "./HouseholdCard";
import HouseholdModal from "./HouseholdModal";

export default function Households() {
  const { currentUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [households, setHouseholds] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false); getUserHouseholds();};
  const handleShow = () => setShow(true);

  async function getUserHouseholds() {
    let userHouseholds = await JoblyApi.getUserHouseholds(currentUser.id);
    console.log("Households:" + userHouseholds);
    setHouseholds(userHouseholds);
    setIsLoading(false);
  }

  async function createHousehold(data){
    let household = await JoblyApi.createHousehold(data);
    setIsLoading(false);
    console.log("Household created: " + household.id);
    handleClose();    
  }

  useEffect(() => {    
    getUserHouseholds();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }
  return (
    <>
      <Container className="mt-5">
        <Row className="justify-content-center pt-4">
          <Col md={4}>
            <h3>Your Households</h3>
          </Col>
          <Col md={4}>
            <Button
              className="d-block ml-auto"
              onClick={handleShow}
              variant="outline-info"
              type="button"
            >
              New Household
            </Button>
          </Col>
        </Row>

        <Row className="justify-content-center pt-3">
          <Col md={8}>
            {households.map((household) => (
              <HouseholdCard
                address={household.address}
                handle={household.handle}
                key={uuidv4()}
                name={household.name}
              />
            ))}
            <div>{households.length <= 0 && <p>No Households Yet!</p>}</div>

            <HouseholdCard
              address={"123 test ave"}
              handle={"1"}
              key={uuidv4()}
              name={"test home"}
            />
            <HouseholdCard
              address={"456 test ave"}
              handle={"2"}
              key={uuidv4()}
              name={"test home 2"}
            />
          </Col>
        </Row>
      </Container>

      <HouseholdModal 
        show={show} 
        handleClose={handleClose} 
        createHousehold={(data) => createHousehold(data)} 
        setIsLoading={setIsLoading}
      />
    </>
  );
}
