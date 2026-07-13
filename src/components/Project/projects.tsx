import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './projects.scss'
import Modal from '../layout/modal/modal'
import { IProject, ICreateProjectModel } from './project.model'
import { ProjectService } from '../../services'
import ConfirmModal from '../layout/modal/Confirm-modal'
import { formatDate } from '../../handler/date-handler'

const Projects = () => {
  const navigate = useNavigate()

  const [projects, setProjects] = useState<IProject[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [error, setError] = useState<string>('')

  // Create modal states
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false)
  const [createForm, setCreateForm] = useState<ICreateProjectModel>({ name: '', description: '' })
  const [createErrors, setCreateErrors] = useState<ICreateProjectModel>({ name: '', description: '' })
  const [isCreating, setIsCreating] = useState<boolean>(false)

  // Edit modal states
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false)
  const [editForm, setEditForm] = useState<ICreateProjectModel>({ name: '', description: '' })
  const [editErrors, setEditErrors] = useState<ICreateProjectModel>({ name: '', description: '' })
  const [isUpdating, setIsUpdating] = useState<boolean>(false)
  const [selectedEditProject, setSelectedEditProject] = useState<IProject | null>(null)

  // Delete modal states
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false)
  const [selectedProject, setSelectedProject] = useState<IProject | null>(null)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

  /**
   * 
   * fetch project when component loads for first time
   */

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      setIsLoading(true)
      setError('')
      const data = await ProjectService.getProjects()
      setProjects(data)
    } catch (err) {
      setError('Failed to load projects. Please try again!')
    } finally {
      setIsLoading(false)
    }
  }

 /**
   * 
   * Create Project
   * 
   */

  const handleCreateChange = (e: any) => {
    setCreateForm({ ...createForm, [e.target.name]: e.target.value })
    setCreateErrors({ ...createErrors, [e.target.name]: '' })
  }

   /**
   * 
   * Validate form
   * @returns true if valid
   * 
   */

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

   /**
   * 
   * Call API to create
   * @returns void
   * 
   */

  const handleCreate = async () => {
    if (!validateCreate()) return

    try {
      setIsCreating(true)
      const newProject = await ProjectService.createProject(createForm)
      setProjects([...projects, newProject])
      setIsCreateOpen(false)
      setCreateForm({ name: '', description: '' })
    } catch (err) {
      setError('Failed to create project!')
    } finally {
      setIsCreating(false)
    }
  }

   /**
   * 
   * Open Edit Modal
   * @param ProjectDetails
   * 
   */
 
  const openEditModal = (project: IProject) => {
    setSelectedEditProject(project)
    setEditForm({ name: project.name, description: project.description })
    setEditErrors({ name: '', description: '' })
    setIsEditOpen(true)
  }

    /**
   * 
   * Edit Project
   * 
   */
 

  const handleEditChange = (e: any) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value })
    setEditErrors({ ...editErrors, [e.target.name]: '' })
  }

   /**
   * 
   * Validate form
   * @returns true if valid
   * 
   */

  const validateEdit = (): boolean => {
    let isValid = true
    const newErrors = { name: '', description: '' }

    if (!editForm.name.trim()) {
      newErrors.name = 'IProject name is required'
      isValid = false
    }

    if (!editForm.description.trim()) {
      newErrors.description = 'Description is required'
      isValid = false
    }

    setEditErrors(newErrors)
    return isValid
  }

  /**
   * 
   * Call API to update
   * @returns void
   * 
   */

  const handleUpdate = async () => {
    if (!validateEdit()) return
    if (!selectedEditProject) return

    try {
      setIsUpdating(true)

      const updatedProject = await ProjectService.updateProject(
        selectedEditProject.id,
        editForm
      )

      // Update project in list immediately
      setProjects(projects.map((p) =>
        p.id === selectedEditProject.id ? updatedProject : p
      ))

      setIsEditOpen(false)
      setSelectedEditProject(null)

    } catch (err) {
      setError('Failed to update project!')
    } finally {
      setIsUpdating(false)
    }
  }


  const openDeleteModal = (project: IProject) => {
    setSelectedProject(project)
    setIsDeleteOpen(true)
  }

  /**
   * 
   * Call API to delete
   * @returns void
   * 
   */

  const handleDelete = async () => {
    if (!selectedProject) return

    try {
      setIsDeleting(true)
      await ProjectService.deleteProject(selectedProject.id)
      setProjects(projects.filter((p) => p.id !== selectedProject.id))
      setIsDeleteOpen(false)
      setSelectedProject(null)
    } catch (err) {
      setError('Failed to delete project!')
    } finally {
      setIsDeleting(false)
    }
  }

  const openProject = (id: number) => {
    navigate(`/projects/${id}`)
  }

  return (
    <div className='projects_page'>

      {/* Page Header */}
      <div className='page_header'>
        <h1>Projects</h1>
        <button className='btn btn-primary' onClick={() => setIsCreateOpen(true)}>
          + Create IProject
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
          <p>No projects yet!</p>
          <button className='btn btn-primary' onClick={() => setIsCreateOpen(true)}>
            Create your first project
          </button>
        </div>
      )}

      {/* Projects Grid */}
      {!isLoading && !error && projects.length > 0 && (
        <div className='projects_grid'>
          {projects.map((project) => (
            <div key={project.id} className='project_card'>

              {/* Card Header with icons */}
              <div className='card_header'>
                <h2>{project.name}</h2>

                {/* Edit and Delete Icons */}
                <div className='card_icons'>
                  {/* Edit Icon */}
                  <button
                    className='icon_btn edit_icon'
                    onClick={() => openEditModal(project)}
                    title='Edit IProject'
                  >
                    ✏️
                  </button>

                  {/* Delete Icon */}
                  <button
                    className='icon_btn delete_icon'
                    onClick={() => openDeleteModal(project)}
                    title='Delete IProject'
                  >
                    🗑️
                  </button>
                </div>
              </div>

              {/* Date */}
              <span className='card_date'>
                Created: {formatDate(project.created_at)}
              </span>

              {/* Description */}
              <p className='card_description'>{project.description}</p>

              {/* Stats */}
              <div className='card_stats'>
                <div className='stat'>
                  <span className='stat_value'>{project.files_count || 0}</span>
                  <span className='stat_label'>Files</span>
                </div>
                <div className='stat'>
                  <span className='stat_value'>{project.jobs_count || 0}</span>
                  <span className='stat_label'>Jobs</span>
                </div>
              </div>

              {/* Open Button */}
              <div className='card_actions'>
                <button
                  className='btn btn-primary'
                  onClick={() => openProject(project.id)}
                >
                  Open
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

      {/* Create IProject Modal */}
      <Modal
        isOpen={isCreateOpen}
        title='Create IProject'
        onClose={() => setIsCreateOpen(false)}
      >
        <div className='create_form'>
          <div className='form_field'>
            <label>IProject Name</label>
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
            <button className='btn' onClick={() => setIsCreateOpen(false)} disabled={isCreating}>
              Cancel
            </button>
            <button className='btn btn-primary' onClick={handleCreate} disabled={isCreating}>
              {isCreating ? 'Creating...' : 'Create IProject'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Edit IProject Modal */}
      <Modal
        isOpen={isEditOpen}
        title='Edit IProject'
        onClose={() => setIsEditOpen(false)}
      >
        <div className='create_form'>
          <div className='form_field'>
            <label>IProject Name</label>
            <input
              type='text'
              name='name'
              value={editForm.name}
              onChange={handleEditChange}
              placeholder='Enter project name'
              className={editErrors.name ? 'input_error' : ''}
            />
            {editErrors.name && <p className='error_msg'>{editErrors.name}</p>}
          </div>

          <div className='form_field'>
            <label>Description</label>
            <textarea
              name='description'
              value={editForm.description}
              onChange={handleEditChange}
              placeholder='Enter project description'
              rows={4}
              className={editErrors.description ? 'input_error' : ''}
            />
            {editErrors.description && <p className='error_msg'>{editErrors.description}</p>}
          </div>

          <div className='form_actions'>
            <button className='btn' onClick={() => setIsEditOpen(false)} disabled={isUpdating}>
              Cancel
            </button>
            <button className='btn btn-primary' onClick={handleUpdate} disabled={isUpdating}>
              {isUpdating ? 'Updating...' : 'Update IProject'}
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={isDeleteOpen}
        title='Delete IProject'
        message={`Are you sure you want to delete "${selectedProject?.name}"? This action cannot be undone.`}
        onConfirm={handleDelete}
        onCancel={() => setIsDeleteOpen(false)}
        isLoading={isDeleting}
      />

    </div>
  )
}

export default Projects