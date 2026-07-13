import React, { useEffect, useRef } from 'react'
import './jobs-list.scss'
import { JobService } from '../../services'
import { formatDate } from '../../handler/date-handler'


/**
 * 
 * @param Jobdetails 
 *
 * @returns 
 */

const JobList = (props: any) => {



//used to store jobid for multiple intervals
  const intervalsRef = useRef<{ [jobId: number]: any }>({})

  useEffect(() => {

    props.jobs.forEach((job: any) => {

      if (job.status === 'COMPLETED' || job.status === 'FAILED') {
        if (intervalsRef.current[job.id]) {
          clearInterval(intervalsRef.current[job.id])
          delete intervalsRef.current[job.id]
        }
        return
      }

      
      if (intervalsRef.current[job.id]) return

      
      const interval = setInterval(async () => {

        try {

          // Call  API to get job status
          const updatedJob = await JobService.getJobStatus(props.projectId, job.id)

          
          props.onUpdateJob(job.id, updatedJob)

          
          if (updatedJob.status === 'COMPLETED' || updatedJob.status === 'FAILED') {
            clearInterval(intervalsRef.current[job.id])
            delete intervalsRef.current[job.id]
          }

        } catch (err) {
          console.log('Polling error:', err)
        }

      }, 2000)

      intervalsRef.current[job.id] = interval

    })

    // destroy the intervals
    return () => {
      Object.values(intervalsRef.current).forEach((id) => clearInterval(id))
    }

  }, [props.jobs])

  /** 
   * @param jobId
   */
  const handleDownload = (jobId: number) => {
    // Call  API to download zip file
    JobService.downloadJobOutput(props.projectId, jobId)
  }

  /** Get CSS class based on status
   * @param status
   */
  const getStatusClass = (status: string) => {
    if (status === 'COMPLETED') return 'status_text status_completed'
    if (status === 'RUNNING') return 'status_text status_running'
    if (status === 'FAILED') return 'status_text status_failed'
    return 'status_text status_pending'
  }

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
                  <span className={getStatusClass(job.status)}>
                    {job.status}
                  </span>
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
                <td>{formatDate(job.createdAt)}</td>
                <td>{formatDate(job.completedAt) || '-'}</td>
                <td>
                  {job.status === 'COMPLETED' && (
                    <button
                      className="btn btn-primary"
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
  )
}

export default JobList