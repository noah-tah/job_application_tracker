import React from 'react';
import type { Application } from './types/application';
import { getApplications, createApplication, updateApplication, deleteApplication } from './api/application';
import { useState, useEffect } from 'react';






export default function ApplicationList() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);



    const fetchApplications = async () => {
        try {
            setLoading(true);
            setError(null);
            const applications = await getApplications();
            console.log(applications);
            setApplications(applications);
            
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Catastrophic failure when retrieving applications');
        } finally {
            setLoading(false);
        }
    }
    useEffect(() => {
        fetchApplications();
    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }
    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>Application List</h1>
            {
            applications.length === 0 
            ? (
                <p>You haven't added any applications yet, add one below!</p>
            ) : (
                <ul>
                    {applications.map((application) => (
                        <li key={application.id}>{application.company}</li>
                    ))}
                </ul>
            )}
            <button onClick={() => {
            }}>Add Application</button>
        </div>
    )
}