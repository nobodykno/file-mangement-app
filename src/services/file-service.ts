


import { IProjectFile } from '../components/Project/project.model';
import { API } from '../config/api-config';
import { httpService } from './base-service';


/**
 * 
 * @param projectId 
 * call api to get project files
 * 
 */
export const getProjectFiles = async (projectId: number): Promise<IProjectFile[]> => {
  const { url, method } = API.FILES.GET_ALL(projectId);
  const data = await httpService(url, method);
  return data.result || [];
};

/**
 * 
 * @param projectId 
 * call api to upload files to project
 * 
 */
export const uploadFiles = async (projectId: number, files: File[]): Promise<IProjectFile[]> => {

  const { url, method } = API.FILES.UPLOAD(projectId);
  // Create FormData for file upload

  const formData = new FormData();

  files.forEach((file) => {
    formData.append('files', file);
  });

  const data = await httpService(url, method, formData, true); 
  return data.result;
};

/**
 * 
 * @param projectId 
 * @param fileId
 * call api to delete file from project
 * 
 */
export const deleteFile = async (projectId: number, fileId: number): Promise<void> => {
  const { url, method } = API.FILES.DELETE(projectId, fileId);
  await httpService(url, method);
};