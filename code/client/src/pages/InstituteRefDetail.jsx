import React, { useEffect, useState } from "react";
import axios from "axios";

const InstituteDetails = ({ instituteId }) => {
    const [institute, setInstitute] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchInstituteDetails = async () => {
            try {
                const response = await axios.get(`/api/institutes/institute/${instituteId}`);
                setInstitute(response.data);
            } catch (err) {
                setError(err.response?.data?.error || "Error fetching institute details");
            } finally {
                setLoading(false);
            }
        };

        fetchInstituteDetails();
    }, [instituteId]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    if (!institute) {
        return <p>No institute details found</p>;
    }

    return (
        <div>
            <h1>Institute Details</h1>
            <p><strong>Institute Registration No:</strong> {institute.HEI_id}</p>
            <p><strong>Mobile Number:</strong> {institute.Mobile_number}</p>
            <p><strong>Email:</strong> {institute.Email}</p>
            <p><strong>College Name:</strong> {institute.College_name}</p>
            <p><strong>Address:</strong> {institute.Address}</p>
            <p><strong>City:</strong> {institute.City}</p>
            <p><strong>State:</strong> {institute.State}</p>
        </div>
    );
};

export default InstituteDetails;
