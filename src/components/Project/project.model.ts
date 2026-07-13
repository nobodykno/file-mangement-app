export interface IProject {
  id: number;
  name: string;
  description: string;
  files_count: number;
  jobs_count: number;
  created_at: string | Date;
}

export interface ICreateProjectModel {
  name: string;
  description: string;
}

export interface IProjectFile {
  id: number;
  name: string;
  size: string;
  uploadedDate: string;
}

export interface IProjectJob {
  id: number;
  name: string;
  status: 'PENDING' | 'RUNNING' | 'COMPLETED' | 'FAILED';
  createdDate: string;
}