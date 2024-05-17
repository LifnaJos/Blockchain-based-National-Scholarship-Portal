import React from 'react';
import Header from '../Header/Header';
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";

const ManageSchemes = ({ schemes }) => {
  
  const navigate = useNavigate();
  const {registrationId} = useParams();

  const handleDelete = async (schemeId) => {
    try {
      const response = await axios.post("http://localhost:4000/po/delete-scheme", { schemeId: schemeId });
      if (response.data.success === true) {
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch(error) {
      console.error("Error deleting scheme: ",error);
    }
  }

  return (
    <div className="container-fluid">
      {schemes.length > 0 ? (<table className="table">
        <thead>
          <tr>
            <th>Scheme ID</th>
            <th>Scheme Name</th>
            <th>Edit Scheme</th>
            <th>Delete Scheme</th>
          </tr>
        </thead>
        <tbody>
          {schemes.map((scheme) => (
            <tr key={scheme.schemeId}>
              <td>{scheme.schemeId}</td>
              <td>{scheme.schemeName}</td>
              <td><button className='btn btn-success' onClick={() => {
                navigate(`/edit-scheme/regId/${registrationId}/schemeId/${scheme.schemeId}`);
              }}>Edit</button></td>
              <td><button className='btn btn-primary' onClick={() => handleDelete(scheme.schemeId)}>Delete</button></td>
            </tr>
          ))}
        </tbody>
      </table>) : (
        <p>No schemes registered!</p>
      )}
    </div>
  );
};

export default ManageSchemes;