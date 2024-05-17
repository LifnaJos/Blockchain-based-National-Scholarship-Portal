// PrintableForm.js
import React from 'react';

function PrintableForm({ applicationData }) {
    // Dummy data for the table
    const feeDetails = [
        { description: 'Institute Fee', value: 50000 },
        { description: 'Student Benefit', value: 2000 },
        { description: 'Total', value: 48000 },
    ];

    return (
        <div style={{ backgroundColor: '#f0f0f0', padding: '20px', borderRadius: '10px' }}>
            <h2 style={{ color: '#007BFF' }}>Intelligent Scholarship Portal <br />Application Form - 2023 - 2024</h2>
            <hr />

            <p>Date of Application: 01-02-2024</p>
            <p>Application ID: POS18518455</p>
            <p style={{ fontWeight: 'bold' }}>Applicant Name: Neelkanth Rajesh Khithani</p>
            <hr />

            <p>College: Vivekanand Educational Society's Institute of Technology, Chembur</p>
            <p>Year: 2023</p>
            <p style={{ fontWeight: 'bold' }}>Scheme Name: Private Organization Scholarship</p>
            <hr />

            <p>
                <span style={{ fontWeight: 'bold' }}>Income Certificate Number:</span> INC123456 <br />
                <span style={{ fontWeight: 'bold' }}>Aadhaar Number:</span> 8161XXXXXXXXXX <br />
                <span style={{ fontWeight: 'bold' }}>Phone Number:</span> 9372XXXXXX
            </p>
            <hr />

            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: '#007BFF', color: 'white' }}>Description</th>
                        <th style={{ padding: '8px', border: '1px solid #ddd', backgroundColor: '#007BFF', color: 'white' }}>Amount (Rs.)</th>
                    </tr>
                </thead>
                <tbody>
                    {feeDetails.map((item, index) => (
                        <tr key={index}>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.description}</td>
                            <td style={{ padding: '8px', border: '1px solid #ddd' }}>{item.value}/-</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <hr />

            <p style={{ fontWeight: 'bold' }}>Note:</p>
            <ol>
                <li>I / We agree to the terms and conditions of this scholarship. All information given in this application is valid to best of my knowledge. I</li>
                <li>The decision given by the competent authority will be final and will be accepted by me</li>
                <li>If any surplus amount is received from the scholarship due to any reasons, then I / We will return the amount at the earliest. I / We will be responsible for taking action against me / my child against falsehood. I / We promise that we will take the scholarship / education fees as per the terms and conditions of the concerned scheme</li>
                <li>All the documents that I have linked to the application have been received from the competent authority / authorities and the documents are valid and have been received by following the required legal procedures.</li>
            </ol>
            <hr />
        </div>
    );
}

export default PrintableForm;
