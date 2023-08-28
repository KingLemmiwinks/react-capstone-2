import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CapstoneApi from "../api";
import SellerExpertiseForm from "./SellerExpertiseForm";

export default function SellerExpertise(props) {
  const { householdId } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [expertise, setExpertise] = useState({});
  const [isNew, setIsNew] = useState(false);
  const [formData, setFormData] = useState();

  async function getSellerExpertise() {
    let expertise = await CapstoneApi.getSellerExpertise(householdId);
    setExpertise(expertise);
    if (expertise === "") {
      setIsNew(true);
    }
    setIsLoading(false);
  }

  async function updateSellerExpertise(data) {
    let expertise = await CapstoneApi.updateSellerExpertise(data);
    setExpertise(expertise);
    setIsLoading(false);
    console.log("Seller's Expertise Updated: " + expertise.id);
  }

  async function createSellerExpertise(data) {
    let expertise = await CapstoneApi.createSellerExpertise(data);
    setExpertise(expertise);
    setIsLoading(false);
    setIsNew(false);
    console.log("Seller's Expertise Created: " + expertise.id);
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
  }

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    let data = {
      id: isNew ? null : formData.id,
      householdId: householdId,
      hasExpertise: formData.hasExpertise,
      isLandlord: formData.isLandlord,
      isRealEstateLicensee: formData.isRealEstateLicensee,
      notes: formData.notes,
    };

    try {
      if(isNew) {
        createSellerExpertise(data);
      }
      else{
        updateSellerExpertise(data);
      }
    } catch (errors) {
      setIsLoading(false);
      return setFormData((data) => ({ ...data, errors }));
    }
  };

  useEffect(() => {
    setFormData({
      id: expertise.id,
      householdId: householdId ?? null,
      hasExpertise: expertise.hasExpertise ?? false,
      isLandlord: expertise.isLandlord ?? false,
      isRealEstateLicensee: expertise.isRealEstateLicensee ?? false,
      notes: expertise.notes ?? "",
      errors: [],
    });
  }, [expertise]);

  useEffect(() => {
    getSellerExpertise();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }
  return (
    <Card className="mb-3">
      <Card.Body>
        <SellerExpertiseForm
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
