import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Show_data/index.css";
import { useNavigate } from "react-router-dom";
function Index() {
  const navigate = useNavigate();
  const [outPut, setOutPut] = useState<any>();

  const token = localStorage?.getItem("token") as string;
  const getUrl =
    "http://10.37.55.216:5000/api/v1/Country/Search?Page=1&PageSize=3000";

  const fatchData = () => {
    axios
      .get(getUrl, {
        headers: {
          Authorization: `Bearer ${JSON?.parse(token)}`,
        },
      })
      .then((res) => {
        setOutPut(res?.data);
      });
  };
  const handleDelete = (id: number) => {
    if (
      window.confirm(
        `please condorm your id for deleting purpose  "Id" : "${id}"`
      )
    ) {
      axios
        .delete(`http://10.37.55.216:5000/api/v1/Country?id=${id}`, {
          headers: {
            Authorization: `Bearer ${JSON?.parse(token)}`,
          },
        })
        .then(() => {
          fatchData();
        });
    }
  };

  useEffect(() => {
    fatchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleUpdate = (id: any) => {
    navigate(`../Updateform/${id}`);
  };
 
  return (
    <div>
      <div className="total">Total Recodes : {outPut?.totalRecords}</div>
      <div>
        <table>
          <tr className="hading tableCSS">
            <th className="tableCSS">Index</th>
            <th className="tableCSS">Country Code</th>
            <th className="tableCSS">Country Name</th>
            <th className="tableCSS">Delete</th>
            <th className="tableCSS">Edit</th>
          </tr>

          {outPut?.data
            ?.map((data: any, index: number) => {
              return (
                <tr>
                  <td className="tableCSS">{index + 1}</td>
                  <td className="tableCSS" key={data?.pkId}>
                    {data?.pkId}
                  </td>
                  <td className="tableCSS tableCountry">
                    {data?.countryName}
                  </td>
                  <td>
                    <button
                      className="setButton"
                      type="button"
                      onClick={() => handleDelete(data?.pkId)}
                    >
                      {" "}
                      Delete{" "}
                    </button>
                  </td>
                  <td>
                    <button
                      className="setButton"
                      name="Update"
                      id="btn"
                      onClick={() => handleUpdate(data?.pkId)}
                    >
                      Update
                    </button>
                    
                  </td>
                </tr>
              );
            })
            ?.reverse()}
        </table>
      </div>
    </div>
  );
}

export default Index;

