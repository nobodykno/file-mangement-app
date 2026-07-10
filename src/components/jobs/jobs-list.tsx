import React, { useEffect } from 'react';
import './jobs-list.scss';

const JobList = (props: any) => {

  // Polling — check job status every 2 seconds
  useEffect(() => {

    const interval = setInterval(() => {

      props.jobs.forEach((job: any) => {

        // Stop checking if already finished
        if (job.status === 'COMPLETED' || job.status === 'FAILED') {
          return;
        }

        // Simple fake progress increase
        let newProgress = job.progress + 20;

        if (newProgress >= 100) {
          newProgress = 100;
          props.onUpdateJob(job.id, 'COMPLETED', newProgress);
        } else {
          props.onUpdateJob(job.id, 'RUNNING', newProgress);
        }

      });

    }, 2000);

    // Cleanup — runs when component unmounts
    return () => {
      clearInterval(interval);
    };

  }, [props.jobs]);

  

  /** Download job output
   * @param JobId
   */
  const handleDownload = (jobId: number) => {

    const fileContent = 'This is fake zip content for job ' + jobId;
    const blob = new Blob([fileContent], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'job-' + jobId + '-output.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  /** Get CSS class based on status
   * @param status
   */
  const getStatusClass = (status: string) => {
    if (status === 'COMPLETED') {return 'status_text status_completed';}
    if (status === 'RUNNING') {return 'status_text status_running';}
    if (status === 'FAILED') {return 'status_text status_failed';}
    return 'status_text status_pending';
  };

  return (
    <div>
      <h3>Jobs</h3>

      {props.jobs.length === 0 && <p>No jobs yet!</p>}

      {props.jobs.length > 0 && (
        <table className="job_table">
          <thead>
            <tr>
              <th>Job ID</th>
              <th>Status</th>
              <th>Progress</th>
              <th>Created At</th>
              <th>Completed At</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {props.jobs.map((job: any) => (
              <tr key={job.id}>
                <td>{job.id}</td>
                <td>
                  <span className={getStatusClass(job.status)}>{job.status}</span>
                </td>
                <td>
                  <div className="progress_outer">
                    <div
                      className="progress_inner"
                      style={{ width: job.progress + '%' }}
                    ></div>
                  </div>
                  <span className="progress_text">{job.progress}%</span>
                </td>
                <td>{job.createdAt}</td>
                <td>{job.completedAt || '-'}</td>
                <td>
                  {job.status === 'COMPLETED' && (
                    <button
                      className="download_btn"
                      onClick={() => handleDownload(job.id)}
                    >
                      Download
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default JobList;