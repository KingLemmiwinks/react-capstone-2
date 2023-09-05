import React, { useEffect, useState, useContext } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import { v4 as uuidv4 } from "uuid";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UserContext from "../UserContext";
import CapstoneApi from "../api";
import HouseholdCard from "./HouseholdCard";
import HouseholdModal from "./HouseholdModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function Households() {

  const { currentUser } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(true);
  const [households, setHouseholds] = useState([]);
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    notes: "",
    errors: [],
  });

  const handleClose = () => {
    setShow(false);  
    getUserHouseholds();
    setFormData({
    name: "",
    address: "",
    city: "",
    state: "",
    zip: "",
    notes: "",
    errors: []})
  };
  const handleShow = () => setShow(true);

  async function getUserHouseholds() {
    let userHouseholds = await CapstoneApi.getUserHouseholds(currentUser.id);    

    let detailedHouseholds = await Promise.all(
      userHouseholds.map((household) => getHouseholdInfo(household))
    );

    setHouseholds(detailedHouseholds);
    setIsLoading(false);
  }

  async function getHouseholdInfo(household){
    let householdInfo = await CapstoneApi.getHousehold(household.householdID);
    household["info"] = householdInfo;
    return household;
  }

  async function createHousehold(data){
    let household = await CapstoneApi.createHousehold(data);
    setIsLoading(false);
    console.log("Household created: " + household.id);
    handleClose();    
  }

  
  
  useEffect(() => {   
    if(currentUser){
      getUserHouseholds();
    } 
    
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
              <FontAwesomeIcon icon={faPlus} /> New Household
            </Button>
          </Col>
        </Row>

        <Row className="justify-content-center pt-3">
          <Col md={8}>
            {households.map((household) => (
              <HouseholdCard
                address={household?.info?.street_address}
                householdId={household?.householdID}
                key={uuidv4()}
                name={household?.info?.name}
                notes={household?.info?.notes}
                getUserHouseholds={getUserHouseholds}
              />
            ))}
            <div>{households.length <= 0 && <p>No Households Yet!</p>}</div>
          </Col>
        </Row>
      </Container>

      <HouseholdModal
        show={show}
        handleClose={handleClose}
        createHousehold={(data) => createHousehold(data)}
        setIsLoading={setIsLoading}
        formData={formData}
        setFormData={setFormData}
      />
    </>
  );
}
