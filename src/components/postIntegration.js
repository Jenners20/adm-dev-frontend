import React, { useEffect, useState, ChangeEvent, } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import axios from "axios";
//Icons

//React Icons


//BootStrap
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from "@fortawesome/free-solid-svg-icons";


export default function PostIntegration2() {

  const [files, setFile] = useState('files');

  const handleFileInputChange = e => {
    let file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      let baseURL = reader.result;
      console.log(baseURL);
      setFile({
        "name": file.name,
        "data": baseURL
      })
    };

  };

  const handleUploadClick = () => {
    if (!files) {
      return;
    }

    let config =
    {
      "headers": {
        "Content-Type": 'application/json'
      }
    }

    let payload = {
      "name": files.name,
      "data": files.data
    }
    axios.post('http://localhost:4000/developer/file', payload, config).then((data) => console.log(data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />

      <div>{files && `${files.name} - ${files.type}`}</div>

      <button className="btn btn-success" onClick={handleUploadClick}><FontAwesomeIcon icon={faUpload} /> </button>
    </div>
  );

}
