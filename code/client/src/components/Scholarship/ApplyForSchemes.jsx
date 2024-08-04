import React, { useState, useEffect } from 'react';
import Header from '../Header/Header';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ApplyForSchemes = ({ schemes, appId }) => {
  // const [fundsDisbursed, setFundsDisbursed] = useState(false);
  // const navigate = useNavigate();
  // const [pdfData, setPdfData] = useState(null);

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   const day = date.getDate().toString().padStart(2, '0');
  //   const month = (date.getMonth() + 1).toString().padStart(2, '0');
  //   const year = date.getFullYear();
  
  //   return `${day}-${month}-${year}`;
  // };

  const handleApply = async (schemeId,schemeName) => {
    console.log('I got clicked!');
    try {
      const response = await axios.post(`http://localhost:4000/student/apply-scheme`, { appId: appId, schemeId: schemeId, schemeName: schemeName });
      console.log(response.data);
      if (response.data.success===true) {
        alert(response.data.message);
      } else {
        alert(response.data.message);
      }
    } catch(error) {
      console.error("Error applying for scheme: ",error);
    }
  }

  return (
    <div className="container-fluid">
      <h4>Current Available Scholarships</h4>
      {schemes.length > 0 ? (<table className="table">
        <thead>
          <tr>
            <th>Scheme ID</th>
            <th>Scheme Name</th>
            <th>Income Criteria</th>
            <th>Age Limit</th>
            <th>Field of Study</th>
            <th>HSC Score</th>
            <th>SSC Score</th>
            <th>Religion</th>
            <th>Caste</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Official URL</th>
            <th>Guideline</th>
            <th>Scholarship Name</th>
            <th>Scholarship Amount</th>
            <th>Academic Amount</th>
          </tr>
        </thead>
        <tbody>
          {/* {schemes.map((scheme) => (
            <tr key={scheme.sch_id}>
              <td>{scheme.sch_name}</td>
              <td>{scheme.organisation_name}</td>
              <td>{scheme.income_criteria}</td>
              <td>{scheme.field_of_study}</td>
              <td>{formatDate(scheme.start_date)}</td>
              <td>{formatDate(scheme.end_date)}</td>
              <td><button className='btn btn-success' onClick={() => handleApply(scheme.sch_id,scheme.sch_name)}>Apply</button></td>
              <td><button className='btn btn-primary'>Details</button></td>
            </tr>
          ))} */}

           {schemes.map((scheme) => (
                          <tr key={scheme.sch_id}>
                              {/* <td>{scheme.sch_id}</td>
                              <td>{scheme.sch_name}</td>
                              <td>{scheme.income_criteria}</td>
                              <td>{scheme.field_of_study}</td>
                              <td>{new Date(scheme.start_date).toLocaleDateString()}</td>
                              <td>{new Date(scheme.end_date).toLocaleDateString()}</td> */}

                              <td>{scheme.sch_id}</td>
                              <td>{scheme.sch_name}</td>
                              <td>{scheme.income_criteria}</td>
                              <td>{scheme.age_limit}</td>
                              <td>{scheme.field_of_study}</td>
                              <td>{scheme.hsc_score}</td>
                              <td>{scheme.ssc_score}</td>
                              <td>{scheme.religion}</td>
                              <td>{scheme.caste}</td>
                              <td>{scheme.start_date}</td>
                              <td>{scheme.end_date}</td>
                              <td>{scheme.official_url}</td>
                              <td>{scheme.guidelines}</td>
                              <td>{scheme.sch_org_name}</td>
                              <td>{scheme.scholarship_amount}</td>
                              <td>{scheme.academic_year}</td>
                          </tr>               

                      ))}          
        </tbody>
      </table>) : (
        <p>No schemes online!</p>
      )}
      {/*
      <div>
        <button className="btn btn-primary mr-2 d-print-none" onClick={handlePrint}>Print</button>
        {fundsDisbursed ? (
          <button className="btn btn-primary d-print-none" onClick={handlePrintCertificate}>Print 80G Certificate</button>
        ) : (
          <button className="btn btn-success d-print-none" onClick={handleDisburseFunds}>Disbursed Funds to Applicants</button>
        )}
      </div>
      */}
    </div>
  );
};

export default ApplyForSchemes;

// const AllSchemes = () => {
//   const [schemes, setSchemes] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//       const fetchSchemes = async () => {
//           try {
//               const response = await axios.get('http://localhost:4000/po/getAvail-scheme');
//               setSchemes(response.data);
//           } catch (error) {
//               setError('Error fetching schemes');
//               console.error("Error fetching schemes:", error);
//           } finally {
//               setLoading(false);
//           }
//       };

//       fetchSchemes();
//   }, []);

//   if (loading) return <div>Loading...</div>;
//   if (error) return <div>{error}</div>;

//   return (
//       <div className="container">
//           <h4>All Available Scholarships</h4>
//           {schemes.length > 0 ? (
//               <table className="table">
//                   <thead>
//                       <tr>
                          // <th>Scheme ID</th>
                          // <th>Scheme Name</th>
                          // <th>Income Criteria</th>
                          // <th>Age Limit</th>
                          // <th>Field of Study</th>
                          // <th>HSC Score</th>
                          // <th>SSC Score</th>
                          // <th>Religion</th>
                          // <th>Caste</th>
                          // <th>Start Date</th>
                          // <th>End Date</th>
                          // <th>Official URL</th>
                          // <th>Guideline</th>
                          // <th>Scholarship Name</th>
                          // <th>Scholarship Amount</th>
                          // <th>Academic Amount</th>
//                       </tr>          
//                   </thead>
//                   <tbody>
                      // {schemes.map((scheme) => (
                      //     <tr key={scheme.sch_id}>
                      //         {/* <td>{scheme.sch_id}</td>
                      //         <td>{scheme.sch_name}</td>
                      //         <td>{scheme.income_criteria}</td>
                      //         <td>{scheme.field_of_study}</td>
                      //         <td>{new Date(scheme.start_date).toLocaleDateString()}</td>
                      //         <td>{new Date(scheme.end_date).toLocaleDateString()}</td> */}

                      //         <td>{scheme.sch_id}</td>
                      //         <td>{scheme.sch_name}</td>
                      //         <td>{scheme.income_criteria}</td>
                      //         <td>{scheme.age_limit}</td>
                      //         <td>{scheme.field_of_study}</td>
                      //         <td>{scheme.hsc_score}</td>
                      //         <td>{scheme.ssc_score}</td>
                      //         <td>{scheme.religion}</td>
                      //         <td>{scheme.caste}</td>
                      //         <td>{scheme.start_date}</td>
                      //         <td>{scheme.end_date}</td>
                      //         <td>{scheme.official_url}</td>
                      //         <td>{scheme.guidelines}</td>
                      //         <td>{scheme.sch_org_name}</td>
                      //         <td>{scheme.scholarship_amount}</td>
                      //         <td>{scheme.academic_year}</td>
                      //     </tr>               

                      // ))}
//                   </tbody>
//               </table>
//           ) : (
//               <p>No schemes available!</p>
//           )}
//       </div>
//   );
// };

// export default AllSchemes;
