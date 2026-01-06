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
            <div className="flex justify-between items-center p-2 bg-gray-300">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Back</button>
                <h1 className="text-2xl font-bold">Application List</h1>
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md">New</button>
            </div>
            <div className="flex flex-col">
                {
                applications.length === 0 
                ? (
                    <p>You haven't added any applications yet, add one below!</p>
                ) : (
                    <ul className="flex flex-col p-2 gap-2">
                        {applications.map((application) => (
                            <li key={application.id} className="p-4 bg-gray-200 rounded-md border border-gray-300 flex justify-between gap-4">
                                <div className="flex flex-col gap-1 flex-1 justify-between"> 
                                    <h1 className="text-2xl font-bold">{application.company}</h1>
                                    <h2 className="text-lg font-bold">{application.role}</h2>
                                    <a href={application.job_url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-700 hover:underline">{application.job_url}</a>
                                    <p className="">
                                        <span className="font-bold pr-2">Applied on:</span>
                                    {
                                        new Date(application.dateApplied).toLocaleDateString(
                                            'en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            }
                                        )
                                    }</p>
                                    <p className="text-sm">Status: <span className="font-bold">{application.status}</span></p>
                                    <p>
                                        <span className="font-bold pr-2">Last updated:</span>
                                        {new Date(application.updatedAt).toLocaleDateString(
                                            'en-US', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric'
                                            }
                                        )}
                                    </p>
                                </div>
                                <div className="flex flex-col justify-end items-end gap-2">
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded-md">Edit</button>
                                    <div className='bg-gray-100 rounded-md p-2 w-[200px] min-h-[200px]'>
                                        <p className="text-sm font-bold mb-1">Notes:</p>
                                        <p className="text-sm">{application.notes || 'No notes'}</p>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>

        </div>
    )
}