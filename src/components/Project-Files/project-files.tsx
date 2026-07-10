import React, { useState } from 'react';


import './project-files.scss';
import FileUpload from '../file/file-upload';
import FileTable from '../file/file-table';
import JobList from '../jobs/jobs-list';

const ProjectFiles = () => {

  const [files, setFiles] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);

  // Add uploaded file to list
  const handleUpload = (newFile: any) => {
    setFiles([...files, newFile]);
  };

  // Delete a file
  const handleDelete = (fileId: number) => {
    setFiles(files.filter((f) => f.id !== fileId));
    setSelectedFiles(selectedFiles.filter((id) => id !== fileId));
  };
  /** Handle Selected job
   * @param fileId
   */
  
  
  const handleSelect = (fileId: number) => {
    if (selectedFiles.includes(fileId)) {
      setSelectedFiles(selectedFiles.filter((id) => id !== fileId));
    } else {
      setSelectedFiles([...selectedFiles, fileId]);
    }
  };

  /** Handle create Job
   * @param jobId
   * @param newStatus
   * @param newProgress
   */
  const handleCreateJob = () => {

    const newJob = {
      id: jobs.length + 1,
      status: 'PENDING',
      progress: 0,
      createdAt: new Date().toLocaleString(),
      completedAt: '',
      fileIds: selectedFiles
    };

    // Render immediately
    setJobs([...jobs, newJob]);

    // Clear selection
    setSelectedFiles([]);
  };


  /** Update job status (called by JobList polling)
   * @param jobId
   * @param newStatus
   * @param newProgress
   */
  const handleUpdateJob = (jobId: number, newStatus: string, newProgress: number) => {
    setJobs(
      jobs.map((job) => {
        if (job.id === jobId) {
          return {
            ...job,
            status: newStatus,
            progress: newProgress,
            completedAt: newStatus === 'COMPLETED' ? new Date().toLocaleString() : job.completedAt
          };
        }
        return job;
      })
    );
  };

  return (
    <div className="project_files_page">

      <h2>Project Files</h2>

      {/* Upload Section */}
      <FileUpload onUpload={handleUpload} />

      {/* File List Section */}
      <FileTable
        files={files}
        selectedFiles={selectedFiles}
        onSelect={handleSelect}
        onDelete={handleDelete}
      />

      {/* Create Job Button */}
      <button
        className="create_job_btn"
        onClick={handleCreateJob}
        disabled={selectedFiles.length === 0}
      >
        Create ZIP Job ({selectedFiles.length} selected)
      </button>

      {/* Job List Section */}
      <JobList jobs={jobs} onUpdateJob={handleUpdateJob} />

    </div>
  );
};

export default ProjectFiles;