import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Container from "react-bootstrap/Container";
import Household from "./Household";
import SellersExpertise from "./SellersExpertise";
import OwnershipOccupancy from "./OwnershipOccupancy";
import Associations from "./Associations";
import Roof from "./Roof";
import Basement from "./Basement";
import { useParams } from "react-router-dom";

export default function HouseholdNav() {
    const params = useParams();
    const householdId = params.handle;
  
  return (
    <Container className="mt-5">
      <h3 className="pt-3">{params.name}</h3>
      <Tabs defaultActiveKey="household" className="pt-3 mb-3">
        <Tab eventKey="household" title="Basic Info">
          <Household householdId={householdId} />
        </Tab>
        <Tab eventKey="sellersExpertise" title="Sellers Expertise">
          <SellersExpertise householdId={householdId} />
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
