import type { Application } from '../types/application';

const API_BASE_URL = '/api/applications';

export const getApplications = async (): Promise<Application[]> => {
    const response = await fetch(`${API_BASE_URL}`);
    if (!response.ok) {
        throw new Error('Failed to fetch applications');
    }
    return response.json();
};

export const createApplication = async (application: Omit<Application, 'id' | 'updatedAt'>): Promise<Application> => {
    const response = await fetch(`${API_BASE_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(application),
    });
    return response.json();
};

export const updateApplication = async (application: Application): Promise<Application> => {
    const response = await fetch(`${API_BASE_URL}/${application.id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(application),
    });
    return response.json();
};

export const deleteApplication = async (id: string): Promise<void> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to delete application');
    }
    return;
};

export const getApplicationById = async (id: string): Promise<Application> => {
    const response = await fetch(`${API_BASE_URL}/${id}`, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (!response.ok) {
        throw new Error('Failed to fetch application');
    }
    return response.json();
};
