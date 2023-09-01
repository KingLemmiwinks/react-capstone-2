import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CapstoneApi from "../api";
import BasementForm from "./BasementForm";

export default function Basement(props) {
  const { householdId } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [basement, setBasement] = useState({});
  const [isNew, setIsNew] = useState(false);
  const [formData, setFormData] = useState();

  async function getBasement() {
    let basement = await CapstoneApi.getBasement(householdId);
    setBasement(basement);
    if (basement === "") {
      setIsNew(true);
    }
    setIsLoading(false);
  }

  async function updateBasement(data) {
    let basement = await CapstoneApi.updateBasement(data);
    setBasement(basement);
    setIsLoading(false);
    console.log("Basement Updated: " + basement.id);
  }

  async function createBasement(data) {
    let basement = await CapstoneApi.createBasement(data);
    setBasement(basement);
    setIsLoading(false);
    setIsNew(false);
    console.log("Basement Created: " + basement.id);
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
      hasSumpPump: formData.hasSumpPump,
      pumpCount: formData.pumpCount,
      hasBeenUsed: formData.hasBeenUsed,
      hasWaterDamage: formData.hasWaterDamage,
      hasRepairs: formData.hasRepairs,
      hasDownspoutConnection: formData.hasDownspoutConnection,
      notes: formData.notes,
    };

    try {
      if (isNew) {
        createBasement(data);
      } else {
        updateBasement(data);
      }
    } catch (errors) {
      setIsLoading(false);
      return setFormData((data) => ({ ...data, errors }));
    }
  };

  useEffect(() => {
    setFormData({
      id: basement.id,
      householdId: householdId ?? null,
      hasSumpPump: basement.hasSumpPump ?? false,
      pumpCount: basement.pumpCount ?? 1,
      hasBeenUsed: basement.hasBeenUsed ?? false,
      hasWaterDamage: basement.hasWaterDamage ?? false,
      hasRepairs: basement.hasRepairs ?? false,
      hasDownspoutConnection: basement.hasDownspoutConnection ?? false,
      notes: basement.notes ?? "",
      errors: [],
    });
  }, [basement]);

  useEffect(() => {
    getBasement();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }
  return (
    <Card className="mb-3">
      <Card.Body>
        <BasementForm
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
