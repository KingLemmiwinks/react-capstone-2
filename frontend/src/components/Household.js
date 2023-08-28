import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import CapstoneApi from "../api";
import HouseholdForm from "./HouseholdForm";

export default function Household(props) {
  const { householdId } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [household, setHousehold] = useState(null);
  const [formData, setFormData] = useState();

  async function getHousehold() {
    let household = await CapstoneApi.getHousehold(householdId);
    setHousehold(household);
    setIsLoading(false);
  }

  async function updateHousehold(data) {
    let household = await CapstoneApi.updateHousehold(data);
    setHousehold(household);
    setIsLoading(false);
    console.log("Household updated: " + household.id);
  }

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((fdata) => ({
      ...fdata,
      [name]: value,
    }));
  };

   const submitHandler = async (e) => {
     e.preventDefault();
     setIsLoading(true);
     let data = {
       id: formData.id,
       name: formData.name,
       address: formData.address,
       city: formData.city,
       state: formData.state,
       zip: formData.zip,
       notes: formData.notes,
     };

     try {
       updateHousehold(data);
     } catch (errors) {
       setIsLoading(false);
       return setFormData((data) => ({ ...data, errors }));
     }
   };

  useEffect(() => {
    setFormData({
      id: household?.id,
      name: household?.name,
      address: household?.street_address,
      city: household?.city,
      state: household?.state,
      zip: household?.zip,
      notes: household?.notes,
      errors: []
    });
  }, [household])
  
  useEffect(() => {
    getHousehold();
  }, []);

  if (isLoading) {
    return <p>Loading &hellip;</p>;
  }
  return (
    <Card className="mb-3">
      <Card.Body>
        <HouseholdForm 
          submitHandler={submitHandler}
          changeHandler={changeHandler}
          formData={formData}
          buttonText={"Save Changes"}
        />
      </Card.Body>
    </Card>
  );
}
