import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import './projects.scss'
import Modal from '../modal/modal'

const Projects = () => {

  const navigate = useNavigate()

  // States
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Create modal states
  const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false)
  const [createForm, setCreateForm] = useState<any>({ name: '', description: '' })
  const [createErrors, setCreateErrors] = useState<any>({ name: '', description: '' })
  const [isCreating, setIsCreating] = useState<boolean>(false)

  // Delete modal states


  // Fetch projects on load
 

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

 
      {/* Create Project Modal */}
      <Modal
        isOpen={isCreateOpen}
        title='Create Project'
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
              disabled={isCreating}
            >
              {isCreating ? 'Creating...' : 'Create Project'}
            </button>
          </div>

        </div>
      </Modal>

    </div>
  )
}

export default Projects