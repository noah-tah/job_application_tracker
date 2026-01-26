import type { Application } from './types/application';
import { getApplications, deleteApplication } from './api/application';
import { useState, useEffect } from 'react';

const formatDateMMDDYYYY = (value: string | null | undefined): string => {
    if (!value) return '-';
    const d = new Date(value);
    if (Number.isNaN(d.getTime())) return value;
    
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${month}-${day}-${year}`;
}




export default function ApplicationList() {
    const [applications, setApplications] = useState<Application[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);



    const fetchApplications = async () => {
        try {
            setLoading(true);
            setError(null);
            const applications = await getApplications();
            setApplications(applications);
            
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Catastrophic failure when retrieving applications');
        } finally {
            setLoading(false);
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteApplication(id);    
            setApplications(applications.filter(app => app.id !== id));
        } catch (error) {
            setError(error instanceof Error ? error.message : 'Failed to delete application');
        }
    }

    useEffect(() => {
        fetchApplications();
    }, [])

    if (loading) {
        return (
            <div className="min-h-screen bg-blue-50 flex items-center justify-center">
                <div className="text-blue-600 text-lg font-semibold">Loading...</div>
            </div>
        );
    }
    if (error) {
        return (
            <div className="min-h-screen bg-blue-50 flex items-center justify-center p-4">
                <div className="text-red-600 text-lg font-semibold">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-blue-50">
            <div className="bg-blue-600 text-white shadow-md">
                <div className="flex flex-row gap-4 justify-between items-center p-4 sm:p-6 lg:px-8 lg:py-6 max-w-7xl mx-auto">
                    <button className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg font-semibold transition-colors sm:px-6">
                        Back
                    </button>
                    <h1 className="text-xl font-bold sm:text-2xl lg:text-3xl">Application List</h1>
                    <button className="px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded-lg font-semibold transition-colors sm:px-6">
                        New
                    </button>
                </div>
            </div>

            <div className="p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
                {applications.length === 0 ? (
                    <div className="bg-white rounded-xl shadow-md p-8 sm:p-12 text-center">
                        <p className="text-gray-600 text-base sm:text-lg lg:text-xl">
                            You haven't added any applications yet, add one below!
                        </p>
                    </div>
                ) : (
                    <ul className="flex flex-col gap-4 sm:gap-6 lg:gap-8">
                        {applications.map((application) => (
                            <li 
                                key={application.id} 
                                className="bg-white rounded-xl shadow-md p-4 sm:p-6 lg:p-8 hover:shadow-lg transition-shadow"
                            >
                                <div className="mb-4 sm:mb-5 flex flex-row justify-between items-start gap-4">
                                    <div className="flex flex-col gap-2 flex-1">
                                        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl lg:text-3xl">
                                            {application.company}
                                        </h1>
                                        <h2 className="text-lg font-semibold text-gray-700 sm:text-xl lg:text-2xl">
                                            {application.role}
                                        </h2>
                                    </div>
                                    <div className="flex flex-row gap-2 sm:flex-col sm:gap-2 flex-shrink-0">
                                        <button className="px-3 py-1.5 text-sm bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 rounded-lg font-medium transition-colors sm:px-4 sm:py-2 sm:text-base">
                                            Update
                                        </button>
                                        <button 
                                            className="px-3 py-1.5 text-sm bg-red-50 text-red-700 hover:bg-red-100 border border-red-200 rounded-lg font-medium transition-colors sm:px-4 sm:py-2 sm:text-base"
                                            onClick={() => handleDelete(application.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </div>

                                <div className="mb-4 sm:mb-5">
                                    <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold sm:text-base">
                                        {application.status}
                                    </span>
                                </div>
                                <div className="mb-4 sm:mb-5">
                                    <p className="text-sm text-gray-600 sm:text-base">
                                        <span className="font-semibold">Date Applied: </span>
                                        {formatDateMMDDYYYY(application.dateApplied)}
                                    </p>
                                </div>

                                <div className="mb-4 sm:mb-5">
                                    <a 
                                        href={application.job_url} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:text-blue-700 hover:underline text-sm sm:text-base break-all"
                                    >
                                        {application.job_url}
                                    </a>
                                </div>

                                {application.notes && (
                                    <div className="mb-4 sm:mb-5">
                                        <p className="text-sm text-gray-600 sm:text-base">
                                            <span className="font-semibold">Notes: </span>
                                            {application.notes}
                                        </p>
                                    </div>
                                )}

                                <div className="pt-4 sm:pt-5 border-t border-gray-200">
                                    <p className="text-xs text-gray-500 sm:text-sm">
                                        Last updated: {formatDateMMDDYYYY(application.updatedAt)}
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    )
}