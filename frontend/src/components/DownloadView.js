import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useParams } from "react-router-dom";
import CapstoneApi from "../api";
import Container from "react-bootstrap/Container";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import { useHistory } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/esm/Button";
import moment from "moment";

export default function DownloadView() {
  const params = useParams();
  const householdId = params.householdId;
  const history = useHistory();

  const [isLoading, setIsLoading] = useState(true);
  const [household, setHousehold] = useState(null);
  const [sellerExpertise, setSellerExpertise] = useState(null);
  const [ownershipOccupancy, setOwnershipOccupancy] = useState(null);
  const [associations, setAssociations] = useState(null);
  const [roof, setRoof] = useState(null);
  const [basement, setBasement] = useState(null);
  const [associationType, setAssociationType] = useState(null);
  const [roleType, setRoleType] = useState(null);
  const [frequencyType, setFrequencyType] = useState(null);


  async function getData(){   

    let household = await CapstoneApi.getHousehold(householdId);
    setHousehold(household);
    
    let sellerExpertise = await CapstoneApi.getSellerExpertise(householdId);
    setSellerExpertise(sellerExpertise);
    
    let ownershipOccupancy = await CapstoneApi.getOwnershipOccupancy(householdId);
    setOwnershipOccupancy(ownershipOccupancy);
    
    let associations = await CapstoneApi.getAssociations(householdId);
    setAssociations(associations);
    
    let roof = await CapstoneApi.getRoof(householdId);
    setRoof(roof);

    let basement = await CapstoneApi.getBasement(householdId);
    setBasement(basement);

    if(associations.associationTypeID != null){
        let associationType = await CapstoneApi.getAssociationType(
          associations.associationTypeID
        );
        setAssociationType(associationType);
    }

    if(ownershipOccupancy.roleTypeID != null){
        let roleType = await CapstoneApi.getRoleType(ownershipOccupancy.roleTypeID);
        setRoleType(roleType);
    }

    if(associations.frequencyTypeID != null){
        let frequencyType = await CapstoneApi.getFrequencyType(
        associations.frequencyTypeID
        );
        setFrequencyType(frequencyType);  
    }

    
  }

  const createPDF = async () => {
    const pdf = new jsPDF("portrait", "pt", "a4");
    const data = await html2canvas(document.querySelector("#pdf"));
    const img = data.toDataURL("image/png");
    const imgProperties = pdf.getImageProperties(img);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("sellers_disclosure.pdf");
  }

  useEffect(() => {
    setIsLoading(true);
    getData().then(() => {
        setIsLoading(false);
    });
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }
  return (
    <Container style={{ marginTop: "8%" }}>
      <div className="row mx-1 mb-3">
        <Button
          className="d-block mr-auto"
          onClick={() => {
            history.push("/households");
          }}
          variant="outline-info"
          type="button"
        >
          <FontAwesomeIcon icon={faChevronLeft} /> Back to Households
        </Button>
        <Button
          className="d-block ml-auto"
          onClick={createPDF}
          variant="info"
          type="button"
        >
          Export PDF
        </Button>
      </div>
      <Card className="mb-3">
        <Card.Body id="pdf">
          <div>
            <h3>Household</h3>
            <br />
            <div className="row">
              <label className="col-2" style={{ fontWeight: "bold" }}>
                Name:{" "}
              </label>
              <span className="col">{household?.name}</span>
            </div>
            <div className="row">
              <label className="col-2" style={{ fontWeight: "bold" }}>
                Street Address:{" "}
              </label>
              <span className="col">{household?.street_address}</span>
            </div>
            <div className="row">
              <label className="col-2" style={{ fontWeight: "bold" }}>
                City:{" "}
              </label>
              <span className="col">{household?.city}</span>
            </div>
            <div className="row">
              <label className="col-2" style={{ fontWeight: "bold" }}>
                State:{" "}
              </label>
              <span className="col">{household?.state}</span>
            </div>
            <div className="row">
              <label className="col-2" style={{ fontWeight: "bold" }}>
                ZIP:{" "}
              </label>
              <span className="col">{household?.zip}</span>
            </div>
            <div className="row">
              <label className="col-6" style={{ fontWeight: "bold" }}>
                Notes:{" "}
              </label>
              <span className="col">{household?.notes}</span>
            </div>
            <br />
          </div>

          {/* Seller's Expertise Section */}

          <div>
            <h3>Seller's Expertise</h3>
            <br />
            <div className="row">
              <label className="col-6">
                Does Seller possess expertise in contracting, engineering,
                architechture, environtmental assessment or other areas related
                to the construction and conditions of the property and its
                improvements?{" "}
              </label>
              <span className="col">
                {sellerExpertise?.hasExpertise ? "Yes" : "No"}
              </span>
            </div>
            <div className="row">
              <label className="col-6">
                Is Seller the landlord for the property?{" "}
              </label>
              <span className="col">
                {sellerExpertise?.isLandlord ? "Yes" : "No"}
              </span>
            </div>
            <div className="row">
              <label className="col-6">
                Is Seller a real estate licensee?{" "}
              </label>
              <span className="col">
                {sellerExpertise?.isRealEstateLicensee ? "Yes" : "No"}
              </span>
            </div>
            <div className="row">
              <label className="col-6">
                Explain any "yes" answers in Seller's Expertise section:{" "}
              </label>
              <span className="col">{sellerExpertise?.notes}</span>
            </div>
          </div>
          <br />

          {/* Ownership/Occupancy Sections */}

          <div>
            <h3>Ownership/Occupancy</h3>
            <br />
            <div className="row">
              <label className="col-6">
                When was the property most recently occupied?{" "}
              </label>
              <span className="col">
                {ownershipOccupancy?.mostRecentOccupation
                  ? moment(ownershipOccupancy?.mostRecentOccupation).format(
                      "MM/DD/yyyy"
                    )
                  : "N/A"}
              </span>
            </div>
            <div className="row">
              <label className="col-6">
                Was the seller the most recent occupant?{" "}
              </label>
              <span className="col">
                {ownershipOccupancy?.isOccupiedBySeller ? "Yes" : "No"}
              </span>
            </div>
            <div className="row">
              <label className="col-6">
                How many persons most recently occupied the property?{" "}
              </label>
              <span className="col">
                {ownershipOccupancy?.sellerOccupancyHistory}
              </span>
            </div>

            <div className="row">
              <label className="col-6">
                Role of Individual Completing This Disclosure:{" "}
              </label>
              <span className="col">{roleType?.roleTypeName ?? "N/A"}</span>
            </div>
            <div className="row">
              <label className="col-6">When was the property purchased? </label>
              <span className="col">
                {ownershipOccupancy?.purchaseDate
                  ? moment(ownershipOccupancy?.purchaseDate).format(
                      "MM/DD/yyyy"
                    )
                  : "N/A"}
              </span>
            </div>
            <div className="row">
              <label className="col-6">
                Are you aware of any pets having lived in the house or other
                structures during your ownership?{" "}
              </label>
              <span className="col">
                {ownershipOccupancy?.hasHadPets ? "Yes" : "No"}
              </span>
            </div>
            <div className="row">
              <label className="col-6">
                Explain any "yes" answers in Seller's Expertise section:{" "}
              </label>
              <span className="col">{ownershipOccupancy?.notes}</span>
            </div>
          </div>
          <br />

          {/* Associations Section */}

          <div>
            <h3>Associations</h3>
            <br />
            <div className="row">
              <label className="col-6">
                Is the property part of an association?{" "}
              </label>
              <span className="col">
                {associationType?.associationTypeName ?? "N/A"}
              </span>
            </div>
            <div className="row">
              <label className="col-6">If "Yes", how much are the fees? </label>
              <span className="col">{associations?.fees}</span>
            </div>
            <div className="row">
              <label className="col-6">How often must the fees be paid? </label>
              <span className="col">
                {frequencyType?.frequencyTypeName ?? "N/A"}
              </span>
            </div>
            <div className="row">
              <label className="col-6">
                If "Yes", are there any community services or systems that the
                association or community is responsible for supporting or
                maintaining?{" "}
              </label>
              <span className="col">{associations?.communityMaintenance}</span>
            </div>
            <div className="row">
              <label className="col-6">Explain this section if needed: </label>
              <span className="col">{household?.notes}</span>
            </div>
          </div>
          <br />

          {/* Roof Section */}

          <div>
            <h3>Roof</h3>
            <br />
            <div className="row">
              <label className="col-6">When was the roof installed? </label>
              <span className="col">
                {roof?.installationDate
                  ? moment(roof?.installationDate).format("MM/DD/yyyy")
                  : "N/A"}
              </span>
            </div>
            <div className="row">
              <label className="col-6">
                Has the roof or any portion of it been replaced or repaired
                during your ownership?{" "}
              </label>
              <span className="col">
                {roof?.hasBeenReplaced ? "Yes" : "No"}
              </span>
            </div>
            <div className="row">
              <label className="col-6">
                Has existing material been removed during your ownership?{" "}
              </label>
              <span className="col">
                {roof?.hadExistingMaterialRemoved ? "Yes" : "No"}
              </span>
            </div>
            <div className="row">
              <label className="col-6">
                Has the roof ever leaked during your ownership?{" "}
              </label>
              <span className="col">
                {roof?.hasPreexistingLeaks ? "Yes" : "No"}
              </span>
            </div>
            <div className="row">
              <label className="col-6">
                Are you aware of any current/past problems with the roof,
                gutters, flashing, or downspouts?{" "}
              </label>
              <span className="col">
                {roof?.hasRainwaterProblems ? "Yes" : "No"}
              </span>
            </div>
            <div className="row">
              <label className="col-6">Explain this section if needed: </label>
              <span className="col">{roof?.notes}</span>
            </div>
          </div>
          <br />

          <div>
            <h3>Basement</h3>
            <br />
            <div className="row">
              <label className="col-6">
                Does the property have a sump pump?
              </label>
              <span className="col">
                {basement?.hasSumpPump ? "Yes" : "No"}
              </span>
            </div>
            <div className="row">
              <label className="col-6">If "Yes", how many?</label>
              <span className="col">{basement?.pumpCount}</span>
            </div>
            <div className="row">
              <label className="col-6">
                If it has a sump pump, has it ever run?{" "}
              </label>
              <span className="col">
                {basement?.hasBeenUsed ? "Yes" : "No"}
              </span>
            </div>
            <div className="row">
              <label className="col-6">
                Are you aware of any water damage caused by leakage,
                accumulation, or dampness within the basement?{" "}
              </label>
              <span className="col">
                {basement?.hasWaterDamage ? "Yes" : "No"}
              </span>
            </div>
            <div className="row">
              <label className="col-6">
                Are the downspout gutters connected to a public system?{" "}
              </label>
              <span className="col">
                {basement?.hasDownspoutConnection ? "Yes" : "No"}
              </span>
            </div>
            <div className="row">
              <label className="col-6">
                Do you know of any repairs or other attempts to control and
                water or dampness problem in the basement or crawlspace?{" "}
              </label>
              <span className="col">{basement?.hasRepairs ? "Yes" : "No"}</span>
            </div>
            <div className="row">
              <label className="col-6">Explain this section if needed: </label>
              <span className="col">{basement?.notes}</span>
            </div>
          </div>
          <br />
        </Card.Body>
      </Card>
    </Container>
  );
}
