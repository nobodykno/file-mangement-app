import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './projects.scss'

import Modal from '../layout/modal/modal'
import { Project, CreateProjectModel } from './project.model'
import { getProjects, createProject, deleteProject } from '../../services/projects.service'
import ConfirmModal from '../layout/modal/Confirm-modal'

const Projects = () => {

  const navigate = useNavigate()

  // States
  const [projects, setProjects] = useState<Project[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  // Create modal states
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false)
  const [createForm, setCreateForm] = useState<CreateProjectModel>({ name: '', description: '' })
  const [createErrors, setCreateErrors] = useState<CreateProjectModel>({ name: '', description: '' })
  const [isCreating, setIsCreating] = useState<boolean>(false)

  // Delete modal states
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
  const [selectedProject, setSelectedProject] = useState<Project | null>(null)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  // Fetch projects on load
  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      setError('')
      const data = await getProjects()
      setProjects(data)
    } catch (err) {
      setError('Failed to load projects. Please try again!')
    } finally {
      setIsLoading(false)
    }
  }

  // Handle create form change
  const handleCreateChange = (e: any) => {
    setCreateForm({ ...createForm, [e.target.name]: e.target.value })
    setCreateErrors({ ...createErrors, [e.target.name]: '' })
  }

  // Validate create form
  const validateCreate = (): boolean => {
    let isValid = true
    const newErrors = { name: '', description: '' }

    if (!createForm.name.trim()) {
      newErrors.name = 'Project name is required'
      isValid = false
    }

    if (!createForm.description.trim()) {
      newErrors.description = 'Description is required'
      isValid = false
    }

    setCreateErrors(newErrors)
    return isValid
  }

  // Handle create project
  const handleCreate = async () => {
    if (!validateCreate()) return

    try {
      setIsCreating(true)
      const newProject = await createProject(createForm)
      setProjects([...projects, newProject])
      setIsCreateOpen(false)
      setCreateForm({ name: '', description: '' })
    } catch (err) {
      setError('Failed to create project!')
    } finally {
      setIsCreating(false)
    }
  }

  // Open delete modal
  const openDeleteModal = (project: Project) => {
    setSelectedProject(project)
    setIsDeleteOpen(true)
  }

  // Handle delete project
  const handleDelete = async () => {
    if (!selectedProject) return

    try {
      setIsDeleting(true)
      await deleteProject(selectedProject.id)
      setProjects(projects.filter(p => p.id !== selectedProject.id))
      setIsDeleteOpen(false)
      setSelectedProject(null)
    } catch (err) {
      setError('Failed to delete project!')
    } finally {
      setIsDeleting(false)
    }
  }

  // Open project details
  const openProject = (id: number) => {
    navigate(`/projects/${id}`)
  }

  return (
    <div className='projects_page'>

      {/* Page Header */}
      <div className='page_header'>
        <h1>Projects</h1>
        <button
          className='btn_create'
          onClick={() => setIsCreateOpen(true)}
        >
          + Create Project
        </button>
      </div>

      {/* Loading State */}
      {isLoading && (
        <div className='loading_state'>
          <div className='spinner'></div>
          <p>Loading projects...</p>
        </div>
      )}

      {/* Error State */}
      {error && !isLoading && (
        <div className='error_state'>
          <p>⚠️ {error}</p>
          <button onClick={fetchProjects}>Try Again</button>
        </div>
      )}

      {/* Empty State */}
      {!isLoading && !error && projects.length === 0 && (
        <div className='empty_state'>
          <p>📂 No projects yet!</p>
          <button onClick={() => setIsCreateOpen(true)}>
            Create your first project
          </button>
        </div>
      )}

      {/* Projects Grid */}
      {!isLoading && !error && projects.length > 0 && (
        <div className='projects_grid'>
          {projects.map((project) => (
            <div key={project.id} className='project_card'>

              {/* Card Header */}
              <div className='card_header'>
                <h2>{project.name}</h2>
                <span className='card_date'>{project.createdDate}</span>
              </div>

              {/* Description */}
              <p className='card_description'>{project.description}</p>

              {/* Stats */}
              <div className='card_stats'>
                <div className='stat'>
                  <span className='stat_value'>{project.filesCount}</span>
                  <span className='stat_label'>Files</span>
                </div>
                <div className='stat'>
                  <span className='stat_value'>{project.jobsCount}</span>
                  <span className='stat_label'>Jobs</span>
                </div>
              </div>

              {/* Actions */}
              <div className='card_actions'>
                <button
                  className='btn_open'
                  onClick={() => openProject(project.id)}
                >
                  Open
                </button>
                <button
                  className='btn_delete'
                  onClick={() => openDeleteModal(project)}
                >
                  Delete
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Create Project Modal */}
      <Modal
        isOpen={isCreateOpen}
        title='Create Project'
        onClose={() => setIsCreateOpen(false)}
      >
        <div className='create_form'>

          <div className='form_field'>
            <label>Project Name</label>
            <input
              type='text'
              name='name'
              value={createForm.name}
              onChange={handleCreateChange}
              placeholder='Enter project name'
              className={createErrors.name ? 'input_error' : ''}
            />
            {createErrors.name && <p className='error_msg'>{createErrors.name}</p>}
          </div>

          <div className='form_field'>
            <label>Description</label>
            <textarea
              name='description'
              value={createForm.description}
              onChange={handleCreateChange}
              placeholder='Enter project description'
              rows={4}
              className={createErrors.description ? 'input_error' : ''}
            />
            {createErrors.description && <p className='error_msg'>{createErrors.description}</p>}
          </div>

          <div className='form_actions'>
            <button
              className='btn_cancel'
              onClick={() => setIsCreateOpen(false)}
              disabled={isCreating}
            >
              Cancel
            </button>
            <button
              className='btn_submit'
              onClick={handleCreate}
              disabled={isCreating}
            >
              {isCreating ? 'Creating...' : 'Create Project'}
            </button>
          </div>

        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        title='Delete Project'
        message={`Are you sure you want to delete "${selectedProject?.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteOpen(false)}
        isLoading={isDeleting}
      />

    </div>
  )
}

export default Projects