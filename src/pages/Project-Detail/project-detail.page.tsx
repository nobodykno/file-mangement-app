import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import "./project-detail.page.scss";
import {
  IProject,
  IProjectFile,
  IProjectJob,
} from "../../components/Project/project.model";
import { ProjectService, FileService, JobService } from "../../services";
import { formatDate } from "../../handler/date-handler";

const ProjectDetail = () => {
  const { projectId } = useParams();
  const navigate = useNavigate();

  const [project, setProject] = useState<IProject | null>(null);
  const [files, setFiles] = useState<IProjectFile[]>([]);
  const [jobs, setJobs] = useState<IProjectJob[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [activeTab, setActiveTab] = useState<"files" | "jobs">("files");

  useEffect(() => {
    fetchProjectDetails();
  }, [projectId]);

  /** Fetch Project details
   * @param Void
   */

  const fetchProjectDetails = async () => {
    try {
      setIsLoading(true);
      setError("");

      const [projectData, filesData, jobsData] = await Promise.all([
        ProjectService.getProjectById(Number(projectId)),
        FileService.getProjectFiles(Number(projectId)),
        JobService.getProjectJobs(Number(projectId)),
      ]);

      if (!projectData) {
        setError("Project not found!");
        return;
      }

      setProject(projectData);
      setFiles(filesData);
      setJobs(jobsData);
    } catch (err) {
      setError("Failed to load project details!");
    } finally {
      setIsLoading(false);
    }
  };

  /** Return status class
   * @param status
   */
  const getStatusClass = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return "status_completed";
      case "RUNNING":
        return "status_running";
      case "PENDING":
        return "status_failed";
      default:
        return "status_pending";
    }
  };

  if (isLoading) {
    return (
      <div className="loading_state">
        <div className="spinner"></div>
        <p>Loading project...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error_state">
        <p>⚠️ {error}</p>
        <button onClick={() => navigate("/projects")}>Back to Projects</button>
      </div>
    );
  }
  const goToFiles = () => {
    navigate(`/projects/${projectId}/files`);
  };

  return (
    <div className="project_detail">
      <div className="header-btn">
        {/* Back Button */}
        <div className="back-btn">
          <button className="btn_back" onClick={() => navigate("/projects")}>
            ← Back to Projects
          </button>
        </div>
        {/* Manage Files */}
        <div className="manage-files">
          <button className="btn btn-primary" onClick={goToFiles}>
            Manage Files & Jobs
          </button>
        </div>
      </div>

      {/* Project Info */}
      <div className="project_info_card">
        <div className="info_header">
          <h1>{project?.name}</h1>
          <span className="info_date">
            Created: {formatDate(project?.created_at || new Date())}
          </span>
        </div>
        <p className="info_description">{project?.description}</p>
        <div className="info_stats">
          <div className="stat">
            <span className="stat_value">{project?.files_count}</span>
            <span className="stat_label">Files</span>
          </div>
          <div className="stat">
            <span className="stat_value">{project?.jobs_count}</span>
            <span className="stat_label">Jobs</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button
          className={activeTab === "files" ? "tab active" : "tab"}
          onClick={() => setActiveTab("files")}
        >
          Files ({files.length})
        </button>
        <button
          className={activeTab === "jobs" ? "tab active" : "tab"}
          onClick={() => setActiveTab("jobs")}
        >
          Jobs ({jobs.length})
        </button>
      </div>

      {/* Files Tab */}
      {activeTab === "files" && (
        <div className="tab_content">
          {files.length === 0 ? (
            <p className="empty_msg">No files yet!</p>
          ) : (
            <table className="data_table">
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Size</th>
                  <th>Uploaded Date</th>
                </tr>
              </thead>
              <tbody>
                {files.map((file) => (
                  <tr key={file.id}>
                    <td>📄 {file.name}</td>
                    <td>{file.size}</td>
                    <td>{file.uploadedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}

      {/* Jobs Tab */}
      {activeTab === "jobs" && (
        <div className="tab_content">
          {jobs.length === 0 ? (
            <p className="empty_msg">No jobs yet!</p>
          ) : (
            <table className="data_table">
              <thead>
                <tr>
                  <th>Job Name</th>
                  <th>Status</th>
                  <th>Created Date</th>
                </tr>
              </thead>
              <tbody>
                {jobs.map((job) => (
                  <tr key={job.id}>
                    <td>{job.name}</td>
                    <td>
                      <span
                        className={`status_badge ${getStatusClass(job.status)}`}
                      >
                        {job.status}
                      </span>
                    </td>
                    <td>{job.createdDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectDetail;
