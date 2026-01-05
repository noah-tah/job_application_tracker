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
            <div>
                <button>Back</button>
                <h1>Application List</h1>
                <button>New</button>
            </div>
            <div className="application-list-container">
                {
                applications.length === 0 
                ? (
                    <p>You haven't added any applications yet, add one below!</p>
                ) : (
                    <ul className="application-list">
                        {applications.map((application) => (
                            <li key={application.id} className="application-item">
                                <h1>{application.company}</h1>
                                <h2>{application.role}</h2>
                                <a href={application.job_url} target="_blank" rel="noopener noreferrer">{application.job_url}</a>
                                <p>{application.dateApplied}</p>
                                <p>{application.status}</p>
                                <p>{application.notes}</p>
                                <p>{application.updatedAt}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>
    )
}