export interface Application {
    id: string;
    company: string;
    role: string;
    job_url: string;
    dateApplied: string;
    status: AppStatus;
    notes: string | null;
    updatedAt: string;
}

export type AppStatus =
    | 'Applied'
    | 'Interviewing'
    | 'Offer'
    | 'Rejected'
    | 'FollowUp';
