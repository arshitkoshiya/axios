import React, { useEffect, useState } from "react";
import "../ShowState/index.css";
import axios from "axios";

function Index() {
  const [countryoutPut, setcountryOutPut] = useState<any>();
  const [stateoutPut, setstateOutPut] = useState<any>();

  const getCountryUrl =
    "http://10.37.55.216:5000/api/v1/Country/Search?Page=1&PageSize=300";

  const fatchCountryData = () => {
    axios
      ?.get(getCountryUrl, {
        headers: {
          Authorization: `Bearer ${JSON.parse(token)}`,
        },
      })
      .then((res) => {
        setcountryOutPut(res?.data);
      });
  };
  const token = localStorage.getItem("token") as string;
  const handleCountry = (e: any) => {
    const data = e?.target?.value;
    axios
      ?.get(
        `http://10.37.55.216:5000/api/v1/State/Search?Page=1&PageSize=300&countryPKID=${data}`,
        {
          headers: {
            Authorization: `Bearer ${JSON.parse(token)}`,
          },
        }
      )
      .then((res) => {
        setstateOutPut(res?.data);
      });
  };

  useEffect(() => {
    fatchCountryData();
  }, []);

  return (
    <div className="main">
      <div className="stateHeading">State Data </div>
      <div>
        <div>Total Country : {countryoutPut?.totalRecords}</div>
        Select Country :
        <select onChange={handleCountry}>
          {" "}
          <option value="">Select Country</option>
          {countryoutPut?.data?.map((data: any) => {
            return (
              <option value={data?.pkId} key={data?.pkId}>
                {data?.countryName}
              </option>
            );
          })}
        </select>
        <br />
        Select State :
        <select>
          {" "}
          <option value="">Select State</option>
          {stateoutPut?.data?.map((data: any) => {
            return (
              <option value={data?.stateName} key={data?.pkId}>
                {data?.stateName}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
}

export default Index;
