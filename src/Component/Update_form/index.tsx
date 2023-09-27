import axios from "axios";
import React, { useEffect, useState } from "react";
import "../Create_Form/index.css";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import Modal from 'react-bootstrap/Modal';

function Index() {
  const navigate = useNavigate();
  const { id } = useParams();
  const getUrl = `http://10.37.55.216:5000/api/v1/Country/GetById?id=${id}`;
  const editUrl = `http://10.37.55.216:5000/api/v1/Country`;
  const [data, setData] = useState<any>({
    countryName: "",
    isActive: true,
  });
  const [show, setShow] = useState(false);

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
  const token = localStorage.getItem("token") as string;

  const printdata = async () => {
    const result = await axios.get(getUrl, {
      headers: {
        Authorization: `Bearer ${JSON?.parse(token)}`,
      },
    });
    setData(result?.data);
  };
  const handleClose = () => setShow(false);
  const PopUp = () => {
setShow(true )
   
  };
  useEffect(() => {
    printdata();
  }, []);

  const update = (e: any) => {
    e.preventDefault();
    axios
      .post(
        editUrl,
        {
          pkId: data?.pkId,
          countryName: data?.countryName,
          isActive: data?.isActive,
        },
        {
          headers: {
            Authorization: `Bearer ${JSON?.parse(token)}`,
          },
        }
      )
      .then(() => {
        navigate("../Showdata");
      })
      .catch((error) => {
        alert(error?.response?.data?.countryName);
      });
  };

  return (
    <>
      {/* <div className="total">Total Recodes : </div> */}
      <div>
        {" "}
        <form action="">
          <table>
            <thead className="headings">Please Fill All Detail</thead>
            <tbody className="inputFields">
              <tr>
                <td>Change Country Name</td>
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
                  <input type="button" value={'PopUp'} onClick={PopUp}>
                    
                  </input>
                  <input type="button" value={"Replace"} onClick={update} />
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </div>
      <Popup show={show} handleClose={handleClose} />;
    </>
  );
}

export default Index;

function Popup(props: any) {



  return (
    <>

      <Modal show={props?.show} onHide={props?.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={props?.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props?.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}