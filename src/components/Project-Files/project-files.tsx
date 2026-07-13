import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./project-files.scss";
import FileUpload from "../file/file-upload";
import FileTable from "../file/file-table";
import JobList from "../jobs/jobs-list";
import { FileService, JobService } from "../../services";

const ProjectFiles = () => {
  const { projectId } = useParams(); // 👈 get projectId from URL

  const [files, setFiles] = useState<any[]>([]);
  const [jobs, setJobs] = useState<any[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [isCreatingJob, setIsCreatingJob] = useState<boolean>(false);

  // Load files and jobs when page opens
  useEffect(() => {
    if (projectId) {
      loadData();
    }
  }, [projectId]);

  /** Load files and jobs from API
   * @param void
   */
  const loadData = async () => {
    try {
      setIsLoading(true);
      setError("");

      // Load files and jobs at same time
      const [filesData, jobsData] = await Promise.all([
        FileService.getProjectFiles(Number(projectId)),
        JobService.getProjectJobs(Number(projectId)),
      ]);

      setFiles(filesData);
      setJobs(jobsData);
    } catch (err) {
      setError("Failed to load data!");
    } finally {
      setIsLoading(false);
    }
  };

  /** Handle file upload — called by FileUpload component
   * @param uploadedFiles — files selected by user
   */
  const handleUpload = async (uploadedFiles: File[]) => {
    try {
      const newFiles = await FileService.uploadFiles(
        Number(projectId),
        uploadedFiles
      );

      setFiles([...files, ...newFiles]);
    } catch (err) {
      console.log(error);
    }
  };

  /** Delete a file
   * @param fileId
   */
  const handleDelete = async (fileId: number) => {
    try {
      await FileService.deleteFile(Number(projectId), fileId);
      setFiles(files.filter((f) => f.id !== fileId));
      setSelectedFiles(selectedFiles.filter((id) => id !== fileId));
    } catch (err) {
      setError("Failed to delete file!");
    }
  };

  /** Select/unselect file checkbox
   * @param fileId
   */
  const handleSelect = (fileId: number) => {
    if (selectedFiles.includes(fileId)) {
      setSelectedFiles(selectedFiles.filter((id) => id !== fileId));
    } else {
      setSelectedFiles([...selectedFiles, fileId]);
    }
  };

  /** Create ZIP job with selected files
   * @param void
   */
  const handleCreateJob = async () => {
    try {
      setIsCreatingJob(true);

      const newJob = await JobService.createJob(
        Number(projectId),
        selectedFiles
      );

      setJobs([...jobs, newJob]);
      setSelectedFiles([]);
    } catch (err) {
      setError("Failed to create job!");
    } finally {
      setIsCreatingJob(false);
    }
  };

  /** Update job status — called by JobList polling
   * @param jobId
   * @param updatedJob
   */
  const handleUpdateJob = (jobId: number, updatedJob: any) => {
    setJobs(
      jobs.map((job) => {
        if (job.id === jobId) {
          return updatedJob;
        }
        return job;
      })
    );
  };

  if (isLoading) {
    return (
      <div className="loading_state">
        <div className="spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="project_files_page">
      <h2>Project Files</h2>

      {/* Error */}
      {error && <p className="error_msg">{error}</p>}

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
      <div className="create-job-btn">
      <button
        className="btn btn-primary"
        onClick={handleCreateJob}
        disabled={selectedFiles.length === 0 || isCreatingJob}
      >
        {isCreatingJob
          ? "Creating..."
          : `Create ZIP Job (${selectedFiles.length} selected)`}
      </button>
      </div>


      {/* Job List Section */}
      <JobList
        jobs={jobs}
        projectId={Number(projectId)}
        onUpdateJob={handleUpdateJob}
      />
    </div>
  );
};

export default ProjectFiles;
