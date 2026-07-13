const BASE_URL = 'http://localhost:5000/v1/api';

export const API = {

  AUTH: {
    LOGIN: {
      url: `${BASE_URL}/login`,
      method: 'POST'
    }
  },

  PROJECTS: {
    GET_ALL: {
      url: `${BASE_URL}/projects`,
      method: 'GET'
    },
    GET_BY_ID: (id: number) => ({
      url: `${BASE_URL}/projects/${id}`,
      method: 'GET'
    }),
    CREATE: {
      url: `${BASE_URL}/projects`,
      method: 'POST'
    },
    UPDATE: (id: number) => ({
      url: `${BASE_URL}/projects/${id}`,
      method: 'PATCH'
    }),
    DELETE: (id: number) => ({
      url: `${BASE_URL}/projects/${id}`,
      method: 'DELETE'
    })
  },


  FILES: {
    GET_ALL: (projectId: number) => ({
      url: `${BASE_URL}/projects/${projectId}/file`,
      method: 'GET'
    }),
    UPLOAD: (projectId: number) => ({
      url: `${BASE_URL}/projects/${projectId}/file`,
      method: 'POST'
    }),
    DELETE: (projectId: number, fileId: number) => ({
      url: `${BASE_URL}/projects/${projectId}/file/${fileId}`,
      method: 'DELETE'
    })
  },


  JOBS: {
    GET_ALL: (projectId: number) => ({
      url: `${BASE_URL}/projects/${projectId}/jobs`,
      method: 'GET'
    }),
    GET_STATUS: (projectId: number, jobId: number) => ({
      url: `${BASE_URL}/projects/${projectId}/jobs/${jobId}`,
      method: 'GET'
    }),
    CREATE: (projectId: number) => ({
      url: `${BASE_URL}/projects/${projectId}/jobs`,
      method: 'POST'
    }),
    DOWNLOAD: (projectId: number, jobId: number) => ({
      url: `${BASE_URL}/projects/${projectId}/jobs/${jobId}/download`,
      method: 'GET'
    })
  }

};