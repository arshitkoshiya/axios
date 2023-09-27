import axios from "axios";
import React, { useState } from "react";
import "../Create_Form/index.css";
import { error } from "console";

function Index() {
  const getUrl = "http://10.37.55.216:5000/api/v1/Country";
  const [data, setData] = useState<any>({
    countryName: "",
    isActive: true,
  });
  const token = localStorage.getItem("token") as string;

  const handleData = (e: any) => {
    const { name, value, type } = e?.target;
    // setData((prevState: any) => ({ ...prevState, [name]: value }));
    if (type === "checkbox") {
      const isActive = { ...data?.isActive };
      isActive[name] = e?.target?.checked;
      setData((prevState: any) => ({ ...prevState, isActive }));
    } else {
      setData((prevState: any) => ({ ...prevState, [name]: value }));
    }
  };

  function submit(e: any) {
    e.preventDefault();
    axios
      .post(
        getUrl,
        {
          countryName: data?.countryName,
          isActive: data?.isActive,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON?.parse(token)}`,
          },
        }
      )
      .then((responce) => {
        window.location.href = "../Showdata";
      })
      .catch((error) => {
        alert(error?.response?.data?.countryName);
      });
  }

  return (
    <>
      <div>
        {" "}
        <form action="" method="post">
          <table>
            <thead className="headings">Please Fill All Detail</thead>
            <tbody className="inputFields">
              <tr>
                <td>Enter Country Name</td>
                <td>
                  <input
                    type="text"
                    name="countryName"
                    id="countryName"
                    onChange={handleData}
                    value={data?.countryName}
                  />
                </td>
              </tr>
              <tr>
                <td>Select For isActive</td>
                <td>
                  <input
                    type="checkbox"
                    name="active"
                    value={data?.isActive}
                    onChange={handleData}
                    id="active"
                    checked={data?.isActive}
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input type="button" value={"Submit"} onClick={submit} />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
    </>
  );
}

export default Index;
