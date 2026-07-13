import { IProject, ICreateProjectModel } from '../components/Project/project.model';
import { API } from '../config/api-config';
import { httpService } from './base-service';



/**
 * 
 * Call api to get projects
 */
export const getProjects = async (): Promise<IProject[]> => {
  const { url, method } = API.PROJECTS.GET_ALL;
  const data = await httpService(url, method);
   
  return data.result || [];
};

/**
 * 
 * @param projectId 
 * call api to get project details
 * 
 */
export const getProjectById = async (projectId: number): Promise<IProject> => {
  const { url, method } = API.PROJECTS.GET_BY_ID(projectId);
  const data = await httpService(url, method);
  return data.result || {};
};

/**
 * 
 * @param projectData 
 * call api to create project
 * 
 */
export const createProject = async (projectData: ICreateProjectModel): Promise<IProject> => {
  const { url, method } = API.PROJECTS.CREATE;
  const data = await httpService(url, method, projectData);
  return data.result;
};

/**
 * 
 * @param id 
 * @param projectData 
 * call api to update project
 * 
 */
export const updateProject = async (id: number, projectData: ICreateProjectModel): Promise<IProject> => {
  const { url, method } = API.PROJECTS.UPDATE(id);
  const data = await httpService(url, method, projectData);
  return data.result;
};

/**
 * 
 * @param id 
 *
 * call api to delete project
 * 
 */
export const deleteProject = async (id: number): Promise<void> => {
  const { url, method } = API.PROJECTS.DELETE(id);
  await httpService(url, method);
};