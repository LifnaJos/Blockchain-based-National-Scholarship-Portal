import React, { useState } from 'react';
import Header from '../Header/Header';

const StudentListForInstitute = () => {
  const [data, setData] = useState([
    {
      college_reg_no: '895622',
      application_id: 'VE48120WSADCD',
      scholarship_name: 'Merit Scholarship',
      category: 'General',
      candidate_name: 'Anita Satish Thakur',
      pan_no: 'ABCDE1234F',
      income_certificate_no: 'INC123456789',
      date_of_application: '2024-02-02',
      fees_paid_to_college: '69,349',
      current_year_of_study: '2',
      checked: false,
    },
    {
      college_reg_no: '478956',
      application_id: 'AP21784UAHSYA',
      scholarship_name: 'Need-based Scholarship',
      category: 'Economically Weaker Section',
      candidate_name: 'Rohan Manish Solanki',
      pan_no: 'PQRS5678G',
      income_certificate_no: 'INC987654321',
      date_of_application: '2024-02-01',
      fees_paid_to_college: '70,240',
      current_year_of_study: '4',
      checked: false,
    },
    {
        college_reg_no: '123456',
        application_id: 'AS12345',
        scholarship_name: 'Merit Scholarship',
        category: 'General',
        candidate_name: 'Sneha Patel',
        pan_no: 'XYZW1234A',
        income_certificate_no: 'INC555555555',
        date_of_application: '2024-02-03',
        fees_paid_to_college: '60,000',
        current_year_of_study: '3',
        checked: false,
      },
      {
        college_reg_no: '789012',
        application_id: 'NB67890',
        scholarship_name: 'Need-based Scholarship',
        category: 'Economically Weaker Section',
        candidate_name: 'Amit Kumar',
        pan_no: 'LMNO5678B',
        income_certificate_no: 'INC777777777',
        date_of_application: '2024-02-04',
        fees_paid_to_college: '45,000',
        current_year_of_study: '1',
        checked: false,
      },
      {
        college_reg_no: '345678',
        application_id: 'ME34567',
        scholarship_name: 'Merit Scholarship',
        category: 'General',
        candidate_name: 'Priya Sharma',
        pan_no: 'EFGH1234C',
        income_certificate_no: 'INC999999999',
        date_of_application: '2024-02-05',
        fees_paid_to_college: '55,000',
        current_year_of_study: '2',
        checked: false,
      },
      {
        college_reg_no: '901234',
        application_id: 'NE23456',
        scholarship_name: 'Need-based Scholarship',
        category: 'Economically Weaker Section',
        candidate_name: 'Rajesh Patel',
        pan_no: 'IJKL5678D',
        income_certificate_no: 'INC111111111',
        date_of_application: '2024-02-06',
        fees_paid_to_college: '48,000',
        current_year_of_study: '3',
        checked: false,
      },
      {
        college_reg_no: '567890',
        application_id: 'ME45678',
        scholarship_name: 'Merit Scholarship',
        category: 'General',
        candidate_name: 'Divya Singh',
        pan_no: 'MNOP1234E',
        income_certificate_no: 'INC222222222',
        date_of_application: '2024-02-07',
        fees_paid_to_college: '62,000',
        current_year_of_study: '4',
        checked: false,
      },
      {
        college_reg_no: '234567',
        application_id: 'NB34567',
        scholarship_name: 'Need-based Scholarship',
        category: 'Economically Weaker Section',
        candidate_name: 'Sanjay Kumar',
        pan_no: 'QRST5678F',
        income_certificate_no: 'INC333333333',
        date_of_application: '2024-02-08',
        fees_paid_to_college: '47,000',
        current_year_of_study: '1',
        checked: false,
      },
      {
        college_reg_no: '890123',
        application_id: 'ME56789',
        scholarship_name: 'Merit Scholarship',
        category: 'General',
        candidate_name: 'Anjali Gupta',
        pan_no: 'UVWX1234G',
        income_certificate_no: 'INC444444444',
        date_of_application: '2024-02-09',
        fees_paid_to_college: '59,000',
        current_year_of_study: '2',
        checked: false,
      },
      {
        college_reg_no: '456789',
        application_id: 'NB45678',
        scholarship_name: 'Need-based Scholarship',
        category: 'Economically Weaker Section',
        candidate_name: 'Ritu Sharma',
        pan_no: 'YZAB5678H',
        income_certificate_no: 'INC555555555',
        date_of_application: '2024-02-10',
        fees_paid_to_college: '50,000',
        current_year_of_study: '3',
        checked: false,
      },
      {
        college_reg_no: '012345',
        application_id: 'ME67890',
        scholarship_name: 'Merit Scholarship',
        category: 'General',
        candidate_name: 'Amit Singh',
        pan_no: 'CDEF1234I',
        income_certificate_no: 'INC666666666',
        date_of_application: '2024-02-11',
        fees_paid_to_college: '63,000',
        current_year_of_study: '4',
        checked: false,
      },
      {
        college_reg_no: '678901',
        application_id: 'NB56789',
        scholarship_name: 'Need-based Scholarship',
        category: 'Economically Weaker Section',
        candidate_name: 'Sunita Devi',
        pan_no: 'GHIJ5678J',
        income_certificate_no: 'INC777777777',
        date_of_application: '2024-02-12',
        fees_paid_to_college: '48,000',
        current_year_of_study: '1',
        checked: false,
      }
  ]);

  const handleCheckboxChange = (index) => {
    const newData = [...data];
    newData[index].checked = !newData[index].checked;
    setData(newData);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className='d-print-none'><Header /></div>
      <div className='container-fluid d-print-block'>
        <h4>List of applied Students for application year 2023-24</h4>
        <table className="table">
          <thead>
            <tr>
              <th>Sr. No.</th> {/* Serial number column */}
              <th>College Reg No.</th>
              <th>Application ID</th>
              <th>Scholarship Name</th>
              <th>Category</th>
              <th>Candidate Name</th>
              <th>PAN No.</th>
              <th>Income Certificate No.</th>
              <th>Date of Application</th>
              <th>Fees Paid to College</th>
              <th>Current Year of Study</th>
              <th>Check</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>{index + 1}</td> {/* Serial number */}
                <td>{row.college_reg_no}</td>
                <td>{row.application_id}</td>
                <td>{row.scholarship_name}</td>
                <td>{row.category}</td>
                <td>{row.candidate_name}</td>
                <td>{row.pan_no}</td>
                <td>{row.income_certificate_no}</td>
                <td>{row.date_of_application}</td>
                <td>₹{row.fees_paid_to_college}</td>
                <td>{row.current_year_of_study}</td>
                <td>
                  <input
                    type="checkbox"
                    checked={row.checked}
                    onChange={() => handleCheckboxChange(index)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" className="btn btn-primary mr-2 d-print-none" onClick={handlePrint}>Print Table</button>
        <button type="button" className="btn btn-success d-print-none">Submit Confirm Student List</button>
      </div>
    </>
  );
};

export default StudentListForInstitute;
