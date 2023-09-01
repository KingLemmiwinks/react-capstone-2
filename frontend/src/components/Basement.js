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
    setRoof(basement);
    setIsLoading(false);
    console.log("Basement Updated: " + basement.id);
  }

  async function createBasement(data) {
    let basement = await CapstoneApi.createBasement(data);
    setRoof(basement);
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
      installationDate: formData.installationDate,
      invoicePhoto: formData.invoicePhoto,
      hasBeenReplaced: formData.hasBeenReplaced,
      hadExistingMaterialRemoved: formData.hadExistingMaterialRemoved,
      hasPreexistingLeaks: formData.hasPreexistingLeaks,
      hasRainwaterProblems: formData.hasRainwaterProblems,
      notes: formData.notes,
    };

    try {
      if (isNew) {
        createRoof(data);
      } else {
        updateRoof(data);
      }
    } catch (errors) {
      setIsLoading(false);
      return setFormData((data) => ({ ...data, errors }));
    }
  };

  useEffect(() => {
    setFormData({
      id: roof.id,
      householdId: householdId ?? null,
      installationDate: roof.installationDate ?? "",
      invoicePhoto: roof.invoicePhoto ?? null,
      hasBeenReplaced: roof.hasBeenReplaced ?? false,
      hadExistingMaterialRemoved: roof.hadExistingMaterialRemoved ?? false,
      hasPreexistingLeaks: roof.hasPreexistingLeaks ?? false,
      hasRainwaterProblems: roof.hasRainwaterProblems ?? false,
      notes: roof.notes ?? "",
      errors: [],
    });
  }, [roof]);

  useEffect(() => {
    getRoof();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }
  return (
    <Card className="mb-3">
      <Card.Body>
        <RoofForm
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
