import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/esm/Button";
import Household from "./Household";
import SellerExpertise from "./SellerExpertise";
import OwnershipOccupancy from "./OwnershipOccupancy";
import Associations from "./Associations";
import Roof from "./Roof";
import Basement from "./Basement";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

export default function HouseholdNav() {
    const params = useParams();
    const householdId = params.handle;
    const history = useHistory();
  
  return (
    <Container className="mt-5">
      <div className="row pt-3">
        <h3 className="pt-3">{params.name}</h3>
        <Button
          className="d-block ml-auto"
          onClick={() => {
            history.push("/households");
          }}
          variant="outline-info"
          type="button"
          style={{ height: "80%" }}
        >
          <FontAwesomeIcon icon={faChevronLeft} /> Back to Households
        </Button>
      </div>

      <Tabs defaultActiveKey="household" className="pt-3 mb-3">
        <Tab eventKey="household" title="Basic Info">
          <Household householdId={householdId} />
        </Tab>
        <Tab eventKey="sellerExpertise" title="Sellers Expertise">
          <SellerExpertise householdId={householdId} />
        </Tab>
        <Tab eventKey="ownershipOccupancy" title="Ownership & Occupancy">
          <OwnershipOccupancy householdId={householdId} />
        </Tab>
        <Tab eventKey="associations" title="Associations">
          <Associations householdId={householdId} />
        </Tab>
        <Tab eventKey="roof" title="Roof">
          <Roof householdId={householdId} />
        </Tab>
        <Tab eventKey="basement" title="Basement">
          <Basement householdId={householdId} />
        </Tab>
      </Tabs>
    </Container>
  );
}
