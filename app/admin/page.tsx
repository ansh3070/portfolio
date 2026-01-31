'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
)

export default function AdminPanel() {
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [projects, setProjects] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    category: 'web',
    project_link: ''
  })

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const { data } = await supabase.auth.getSession()
      if (!data.session) {
        router.push('/admin/login')
        return
      }
      setUser(data.session.user)
      fetchProjects()
    } catch (error) {
      console.error('Auth error:', error)
      router.push('/admin/login')
    }
  }

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      router.push('/admin/login')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      if (editingId) {
        const { error } = await supabase
          .from('projects')
          .update(formData)
          .eq('id', editingId)

        if (error) throw error
        alert('Project updated successfully!')
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([formData])

        if (error) throw error
        alert('Project added successfully!')
      }

      resetForm()
      fetchProjects()
    } catch (error) {
      console.error('Error saving project:', error)
      alert('Error saving project')
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id)

      if (error) throw error
      alert('Project deleted successfully!')
      fetchProjects()
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Error deleting project')
    }
  }

  const handleEdit = (project: any) => {
    setFormData({
      title: project.title,
      description: project.description,
      image_url: project.image_url,
      category: project.category,
      project_link: project.project_link
    })
    setEditingId(project.id)
    setShowForm(true)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      category: 'web',
      project_link: ''
    })
    setEditingId(null)
    setShowForm(false)
  }

  return (
    <div className="admin-container">
      <style>{`
        .admin-container {
          min-height: 100vh;
          background: var(--bg);
          color: var(--text);
          padding: 2rem;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }

        .admin-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 2rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 1rem;
        }

        .admin-header h1 {
          font-size: 2rem;
          font-weight: 700;
        }

        .admin-actions {
          display: flex;
          gap: 1rem;
        }

        .btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 0.5rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-primary {
          background: var(--primary);
          color: white;
        }

        .btn-primary:hover {
          background: var(--primary-dark);
        }

        .btn-secondary {
          background: var(--bg-secondary);
          color: var(--text);
          border: 1px solid var(--border);
        }

        .btn-secondary:hover {
          background: var(--border);
        }

        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        .form-container {
          background: var(--bg-secondary);
          padding: 2rem;
          border-radius: 0.75rem;
          margin-bottom: 2rem;
          border: 1px solid var(--border);
        }

        .form-group {
          margin-bottom: 1.5rem;
        }

        .form-group label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: 600;
          font-size: 0.95rem;
        }

        .form-group input,
        .form-group textarea,
        .form-group select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid var(--border);
          border-radius: 0.5rem;
          background: var(--bg);
          color: var(--text);
          font-family: inherit;
          font-size: 1rem;
        }

        .form-group textarea {
          resize: vertical;
          min-height: 100px;
        }

        .form-actions {
          display: flex;
          gap: 1rem;
          justify-content: flex-end;
        }

        .projects-table {
          width: 100%;
          border-collapse: collapse;
          background: var(--bg-secondary);
          border-radius: 0.75rem;
          overflow: hidden;
          border: 1px solid var(--border);
        }

        .projects-table thead {
          background: var(--primary);
          color: white;
        }

        .projects-table th {
          padding: 1rem;
          text-align: left;
          font-weight: 600;
        }

        .projects-table td {
          padding: 1rem;
          border-top: 1px solid var(--border);
        }

        .projects-table tr:hover {
          background: var(--bg);
        }

        .category-badge {
          display: inline-block;
          padding: 0.25rem 0.75rem;
          border-radius: 9999px;
          font-size: 0.875rem;
          font-weight: 600;
          background: var(--primary);
          color: white;
        }

        .actions-cell {
          display: flex;
          gap: 0.5rem;
        }

        .btn-edit {
          background: var(--secondary);
          color: white;
        }

        .btn-edit:hover {
          opacity: 0.9;
        }

        .btn-delete {
          background: #ef4444;
          color: white;
        }

        .btn-delete:hover {
          background: #dc2626;
        }

        .loading {
          text-align: center;
          padding: 2rem;
          font-size: 1.1rem;
        }

        .empty-state {
          text-align: center;
          padding: 3rem 2rem;
          background: var(--bg-secondary);
          border-radius: 0.75rem;
          border: 1px solid var(--border);
        }

        .empty-state p {
          color: var(--text-light);
          margin-bottom: 1.5rem;
        }

        .back-link {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          color: var(--primary);
          text-decoration: none;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .back-link:hover {
          text-decoration: underline;
        }
      `}</style>

      <Link href="/" className="back-link">
        ← Back to Portfolio
      </Link>

      <div className="admin-header">
        <div>
          <h1>Project Management</h1>
          {user && <p style={{ fontSize: '0.9rem', color: '#64748b', marginTop: '0.25rem' }}>Logged in as: {user.email}</p>}
        </div>
        <div className="admin-actions">
          {showForm && (
            <button className="btn btn-secondary" onClick={resetForm}>
              Cancel
            </button>
          )}
          {!showForm && (
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>
              + Add Project
            </button>
          )}
          <button className="btn btn-secondary" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      {showForm && (
        <div className="form-container">
          <h2>{editingId ? 'Edit Project' : 'Add New Project'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="title">Project Title *</label>
              <input
                type="text"
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="description">Description *</label>
              <textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="image_url">Image URL *</label>
              <input
                type="url"
                id="image_url"
                value={formData.image_url}
                onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                required
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-group">
              <label htmlFor="category">Category *</label>
              <select
                id="category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                required
              >
                <option value="web">Web</option>
                <option value="animation">Animation</option>
                <option value="design">Design</option>
                <option value="software">Software</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="project_link">Project Link</label>
              <input
                type="url"
                id="project_link"
                value={formData.project_link}
                onChange={(e) => setFormData({ ...formData, project_link: e.target.value })}
                placeholder="https://example.com"
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn btn-primary">
                {editingId ? 'Update Project' : 'Add Project'}
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="loading">Loading projects...</div>
      ) : projects.length === 0 ? (
        <div className="empty-state">
          <p>No projects yet. Create your first one!</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>
            + Add Project
          </button>
        </div>
      ) : (
        <table className="projects-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project) => (
              <tr key={project.id}>
                <td>
                  <strong>{project.title}</strong>
                </td>
                <td>
                  <span className="category-badge">{project.category}</span>
                </td>
                <td>{project.description.substring(0, 50)}...</td>
                <td>
                  <div className="actions-cell">
                    <button
                      className="btn btn-sm btn-edit"
                      onClick={() => handleEdit(project)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-delete"
                      onClick={() => handleDelete(project.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
