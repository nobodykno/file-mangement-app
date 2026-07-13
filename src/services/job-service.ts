import { IProjectJob } from '../components/Project/project.model';
import { API } from '../config/api-config';
import { httpService } from './base-service';


/**
 * 
 * @param projectId 
 * call api to get jobs associated with a project
 * 
 */
export const getProjectJobs = async (projectId: number): Promise<IProjectJob[]> => {
  const { url, method } = API.JOBS.GET_ALL(projectId);
  const data = await httpService(url, method);
  return data.result || [];
};

/**
 * 
 * @param projectId 
 * @param jobId
 * call api to get jobs status
 * 
 */
export const getJobStatus = async (projectId: number, jobId: number): Promise<IProjectJob> => {
  const { url, method } = API.JOBS.GET_STATUS(projectId, jobId);
  const data = await httpService(url, method);
  return data.result || {};
};

/**
 * 
 * @param projectId 
 * @param fileIds 
 * call api to create job 
 */
export const createJob = async (projectId: number, fileIds: number[]): Promise<IProjectJob> => {
  const { url, method } = API.JOBS.CREATE(projectId);
  const data = await httpService(url, method, { fileIds });
  return data.result || {};
};


/**
 * 
 * @param projectId 
 * @param jobId 
 * 
 * call api to download job
 */
export const downloadJobOutput = (projectId: number, jobId: number): void => {
  const { url } = API.JOBS.DOWNLOAD(projectId, jobId);
  const token = localStorage.getItem('token');

  // Open download URL in browser
  const link = document.createElement('a');
  link.href = `${url}?token=${token}`;
  link.download = `job-${jobId}-output.zip`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};