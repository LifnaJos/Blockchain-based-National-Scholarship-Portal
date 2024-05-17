import React, { useState } from 'react';
import Header from '../Header/Header';
import PrintableForm from './StudentApplicationPrint';

function StudentApplicationSchemeInfo() {
    const headerColumns = ['Application ID', 'Date of Application', 'Scholarship Name', 'Status', 'Print Form', 'Cancel'];
    const data = [
        { application_id: 'POS18518455', date_of_application: '01/02/2024', scholarship_name: 'Private Organization Scholarship', status: 'Under Process' },
    ];

    const [selectedApplication, setSelectedApplication] = useState(null);

    const handlePrint = (application) => {
        setSelectedApplication(application);
        setTimeout(() => {
            window.print();
            setSelectedApplication(null); 
        }, 500); 
    };

    return (
        <>
            <div className='d-print-none'><Header /></div>
            <div className="container mt-4 d-print-none">
                <table className="table table-striped">
                    <thead className="thead-dark">
                        <tr>
                            {headerColumns.map((column, index) => (
                                <th key={index}>{column}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={index}>
                                <td>{item.application_id}</td>
                                <td>{item.date_of_application}</td>
                                <td>{item.scholarship_name}</td>
                                <td>{item.status}</td>
                                <td>
                                    <button
                                        className="btn btn-primary"
                                        onClick={() => handlePrint(item)}
                                    >
                                        Print Form
                                    </button>
                                </td>
                                <td>
                                    <button className="btn btn-danger">Cancel</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {selectedApplication && (
                <div className="print-only-container d-none d-print-block">
                    <PrintableForm applicationData={selectedApplication} />
                </div>
            )}
        </>
    );
}

export default StudentApplicationSchemeInfo;
