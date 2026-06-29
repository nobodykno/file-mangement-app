export interface Project {
    id: number
    name: string
    description: string
    filesCount: number
    jobsCount: number
    createdDate: string
  }
  
  export interface CreateProjectModel {
    name: string
    description: string
  }
  
  export interface ProjectFile {
    id: number
    name: string
    size: string
    uploadedDate: string
  }
  
  export interface ProjectJob {
    id: number
    name: string
    status: 'pending' | 'running' | 'completed' | 'failed'
    createdDate: string
  }