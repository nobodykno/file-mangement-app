import { CreateProjectModel, Project, ProjectFile, ProjectJob } from '../components/Project/project.model';


// Fake projects data
const fakeProjects: Project[] = [
  { id: 1, name: 'Project 1', description: 'Project 1 Project 1', filesCount: 5, jobsCount: 3, createdDate: '2024-01-15' },
  { id: 2, name: 'Project 2', description: 'Project 1, Project 2', filesCount: 8, jobsCount: 6, createdDate: '2024-02-20' },
  { id: 3, name: 'Project 3', description: 'PProject 3Project 3Project 3', filesCount: 3, jobsCount: 2, createdDate: '2024-03-10' },
];

const fakeFiles: ProjectFile[] = [
  { id: 1, name: 'Project .pdf', size: '2.4 MB', uploadedDate: '2024-01-16' },
  { id: 2, name: 'Project .png', size: '1.2 MB', uploadedDate: '2024-01-17' },
  { id: 3, name: 'Project .docx', size: '500 KB', uploadedDate: '2024-01-18' },
];

const fakeJobs: ProjectJob[] = [
  { id: 1, name: 'Project  Setup', status: 'completed', createdDate: '2024-01-15' },
  { id: 2, name: 'Project  Review', status: 'running', createdDate: '2024-01-20' },
  { id: 3, name: 'Project Inspection', status: 'pending', createdDate: '2024-01-25' },
];




export const getProjects = async (): Promise<Project[]> => {

  return fakeProjects;
};

export const createProject = async (data: CreateProjectModel): Promise<Project> => {
  const newProject: Project = {
    id: Date.now(),
    name: data.name,
    description: data.description,
    filesCount: 0,
    jobsCount: 0,
    createdDate: new Date().toISOString().split('T')[0]
  };
  fakeProjects.push(newProject);
  return newProject;
};

export const deleteProject = async (id: number): Promise<void> => {
 
  const index = fakeProjects.findIndex(p => p.id === id);
  if (index !== -1) {fakeProjects.splice(index, 1);}
};

export const getProjectById = async (id: number): Promise<Project | undefined> => {
  return fakeProjects.find(p => p.id === id);
};

export const getProjectFiles = async (id: number): Promise<ProjectFile[]> => {
  return fakeFiles;
};

export const getProjectJobs = async (id: number): Promise<ProjectJob[]> => {
  return fakeJobs;
};