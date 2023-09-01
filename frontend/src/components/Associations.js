import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CapstoneApi from "../api";
import AssociationsForm from "./AssociationsForm";

export default function Associations(props) {
  const { householdId } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [associations, setAssociations] = useState({});
  const [isNew, setIsNew] = useState(false);
  const [formData, setFormData] = useState();

  async function getAssociations() {
    let associations = await CapstoneApi.getAssociations(householdId);
    setAssociations(associations);
    if (associations === "") {
      setIsNew(true);
    }
    setIsLoading(false);
  }

  async function updateAssociations(data) {
    let associations = await CapstoneApi.updateAssociations(data);
    setAssociations(associations);
    setIsLoading(false);
    console.log("Associations Updated: " + associations.id);
  }

  async function createAssociations(data) {
    let associations = await CapstoneApi.createAssociations(data);
    setAssociations(associations);
    setIsLoading(false);
    setIsNew(false);
    console.log("Associations Created: " + associations.id);
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
      associationTypeID: formData.associationTypeID,
      frequencyTypeID: formData.frequencyTypeID,
      fees: formData.fees,
      initiationFees: formData.initiationFees,
      communityMaintenance: formData.communityMaintenance,
      notes: formData.notes,
    };

    try {
      if (isNew) {
        createAssociations(data);
      } else {
        updateAssociations(data);
      }
    } catch (errors) {
      setIsLoading(false);
      return setFormData((data) => ({ ...data, errors }));
    }
  };

  useEffect(() => {
    setFormData({
      id: associations.id,
      householdId: householdId ?? null,
      associationTypeID: associations.associationTypeID ?? null,
      frequencyTypeID: associations.frequencyTypeID ?? null,
      fees: associations.fees ?? "",
      initiationFees: associations.initiationFees ?? null,
      communityMaintenance: associations.communityMaintenance ?? "",
      notes: associations.notes ?? "",
      errors: [],
    });
  }, [associations]);

  useEffect(() => {
    getAssociations();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }
  return (
    <Card className="mb-3">
      <Card.Body>
        <AssociationsForm
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
