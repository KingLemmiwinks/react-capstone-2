import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CapstoneApi from "../api";
import OwnershipOccupancyForm from "./OwnershipOccupancyForm";

export default function OwnershipOccupancy(props) {
  const { householdId } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [ownership, setOwnership] = useState({});
  const [isNew, setIsNew] = useState(false);
  const [formData, setFormData] = useState();

  async function getOwnershipOccupancy() {
    let ownership = await CapstoneApi.getOwnershipOccupancy(householdId);
    setOwnership(ownership);
    if (ownership === "") {
      setIsNew(true);
    }
    setIsLoading(false);
  }

  async function updateOwnershipOccupancy(data) {
    let ownership = await CapstoneApi.updateOwnershipOccupancy(data);
    setOwnership(ownership);
    setIsLoading(false);
    console.log("Ownership/Occupancy Updated: " + ownership.id);
  }

  async function createOwnershipOccupancy(data) {
    let ownership = await CapstoneApi.createOwnershipOccupancy(data);
    setOwnership(ownership);
    setIsLoading(false);
    setIsNew(false);
    console.log("Ownership/Occupancy Created: " + ownership.id);
  }

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((fdata) => ({
      ...fdata,
      [name]: value,
    }));
  };

  const checkboxChangeHandler = (e) => {
    const { name, checked } = e.target;
    setFormData((fdata) => ({
      ...fdata,
      [name]: checked ? checked : false,
    }));
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let data = {
      id: isNew ? null : formData.id,
      householdId: householdId,
      roleTypeId: formData.roleTypeId,
      mostRecentOccupation: formData.mostRecentOccupation,
      isOccupiedBySeller: formData.isOccupiedBySeller,
      sellerOccupancyHistory: formData.sellerOccupancyHistory,
      hasHadPets: formData.hasHadPets,
      purchaseDate: formData.purchaseDate,
      notes: formData.notes,
    };

    try {
      if (isNew) {
        createOwnershipOccupancy(data);
      } else {
        updateOwnershipOccupancy(data);
      }
    } catch (errors) {
      setIsLoading(false);
      return setFormData((data) => ({ ...data, errors }));
    }
  };

  useEffect(() => {
    setFormData({
      id: ownership.id,
      householdId: householdId ?? null,
      roleTypeId: ownership.roleTypeId ?? "1",
      mostRecentOccupation: ownership.mostRecentOccupation ?? "",
      isOccupiedBySeller: ownership.isOccupiedBySeller ?? false,
      sellerOccupancyHistory: ownership.sellerOccupancyHistory ?? 0,
      hasHadPets: ownership.hasHadPets ?? false,
      purchaseDate: ownership.purchaseDate ?? "",
      notes: ownership.notes ?? "",
      errors: [],
    });
  }, [ownership]);

  useEffect(() => {
    getOwnershipOccupancy();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }
  return (
    <Card className="mb-3">
      <Card.Body>
        <OwnershipOccupancyForm
          submitHandler={submitHandler}
          changeHandler={changeHandler}
          checkboxChangeHandler={checkboxChangeHandler}
          formData={formData}
          buttonText={"Save Changes"}
        />
      </Card.Body>
    </Card>
  );
}
