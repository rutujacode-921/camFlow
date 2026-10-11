import React, { useState } from 'react';
import { X, Plus, Trash2, Edit2, Check, Sparkles, Image, ExternalLink } from 'lucide-react';

const PRESET_PROJECT_IMAGES = [
  {
    title: "Minimalist Studio Gear",
    category: "Commercial Tech",
    url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Velvet Glow Skincare",
    category: "Beauty Editorial",
    url: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Underwater Light Symphony",
    category: "Fine Art",
    url: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Nordic Ceramic Still Life",
    category: "Product Design",
    url: "https://images.unsplash.com/photo-1512496015851-a90fb38ba796?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Silk & Glass Aesthetic",
    category: "Luxury Fashion",
    url: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
  },
  {
    title: "Golden Hour Architecture",
    category: "Cinematic Space",
    url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80"
  }
];

export default function ProjectManagerModal({ 
  isOpen, 
  onClose, 
  creator, 
  onAddProject, 
  onUpdateProject, 
  onDeleteProject 
}) {
  if (!isOpen || !creator) return null;

  const [isAdding, setIsAdding] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Commercial',
    image: PRESET_PROJECT_IMAGES[0].url,
    client: '',
    year: '2026',
    deliverables: '3x High-Res Assets + 1x Short Reel'
  });

  const handleStartAdd = () => {
    setFormData({
      title: '',
      category: 'Commercial Photography',
      image: PRESET_PROJECT_IMAGES[0].url,
      client: '',
      year: '2026',
      deliverables: '3x High-Res Assets + 1x Short Reel'
    });
    setEditingProjectId(null);
    setIsAdding(true);
  };

  const handleStartEdit = (project) => {
    setFormData({
      title: project.title || '',
      category: project.category || 'Commercial',
      image: project.image || PRESET_PROJECT_IMAGES[0].url,
      client: project.client || '',
      year: project.year || '2026',
      deliverables: project.deliverables || 'Deliverables'
    });
    setEditingProjectId(project.id);
    setIsAdding(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.image) return;

    setIsSubmitting(true);
    if (editingProjectId) {
      await onUpdateProject(creator.id, editingProjectId, formData);
    } else {
      await onAddProject(creator.id, formData);
    }
    setIsSubmitting(false);
    setIsAdding(false);
    setEditingProjectId(null);
  };

  const handleDelete = async (projectId) => {
    if (window.confirm("Remove this showcase project from your public editorial portfolio?")) {
      await onDeleteProject(creator.id, projectId);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-3xl bg-[#FAFAF8] rounded-3xl shadow-2xl border border-sage-200/80 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 sm:px-8 py-5 border-b border-sage-200/60 bg-white flex items-center justify-between">
          <div>
            <div className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-sage-800">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Day 3 Portfolio Engine</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-editorial font-semibold text-ink-900 mt-0.5">
              Manage Showcase Projects
            </h2>
          </div>
          <button 
            onClick={onClose}
            className="p-2 rounded-full hover:bg-sage-100 text-ink-500 hover:text-ink-900 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Content */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          
          {/* Action Bar */}
          {!isAdding && (
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-semibold text-ink-900">
                  Featured Projects Archive ({creator.otherProjects?.length || 0})
                </h4>
                <p className="text-xs text-ink-500">
                  Manage the editorial gallery showcased on your primary portfolio landing.
                </p>
              </div>

              <button
                onClick={handleStartAdd}
                className="inline-flex items-center space-x-1.5 px-4 py-2 bg-ink-900 hover:bg-black text-white rounded-full text-xs font-semibold transition-all shadow-sm"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add New Project</span>
              </button>
            </div>
          )}

          {/* ADD / EDIT FORM DRAWER */}
          {isAdding && (
            <form onSubmit={handleSubmit} className="bg-white p-5 sm:p-6 rounded-2xl border border-sage-200 space-y-5 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-sage-100 pb-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-sage-800">
                  {editingProjectId ? 'Edit Showcase Project' : 'Add New Editorial Project'}
                </span>
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="text-xs text-ink-500 hover:text-ink-800"
                >
                  Cancel
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink-700 uppercase tracking-wider mb-1">
                    Project Title
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Minimalist Ceramic Study"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAFAF8] border border-sage-200 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink-700 uppercase tracking-wider mb-1">
                    Discipline / Category
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    placeholder="e.g. Commercial Still Life"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAFAF8] border border-sage-200 text-xs focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink-700 uppercase tracking-wider mb-1">
                    Client / Brand Partner (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.client}
                    onChange={(e) => setFormData({ ...formData, client: e.target.value })}
                    placeholder="e.g. Lumina Workspace"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAFAF8] border border-sage-200 text-xs focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink-700 uppercase tracking-wider mb-1">
                    Deliverables Summary
                  </label>
                  <input
                    type="text"
                    value={formData.deliverables}
                    onChange={(e) => setFormData({ ...formData, deliverables: e.target.value })}
                    placeholder="e.g. 3x High-Res Photos + 1x IG Reel"
                    className="w-full px-3 py-2 rounded-xl bg-[#FAFAF8] border border-sage-200 text-xs focus:outline-none"
                  />
                </div>
              </div>

              {/* Preset Visuals Selector */}
              <div>
                <label className="block text-xs font-semibold text-ink-700 uppercase tracking-wider mb-2">
                  Select Visual Preset or Enter Custom Image URL
                </label>
                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2 mb-3">
                  {PRESET_PROJECT_IMAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setFormData({ ...formData, image: preset.url })}
                      className={`relative aspect-[4/3] rounded-xl overflow-hidden border-2 transition-all ${
                        formData.image === preset.url
                          ? 'border-sage-800 scale-95 shadow-md'
                          : 'border-transparent opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img src={preset.url} alt={preset.title} className="w-full h-full object-cover" />
                      {formData.image === preset.url && (
                        <div className="absolute inset-0 bg-sage-900/30 flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>

                <input
                  type="url"
                  required
                  value={formData.image}
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  placeholder="Or paste custom image URL (https://...)"
                  className="w-full px-3 py-2 rounded-xl bg-[#FAFAF8] border border-sage-200 text-xs focus:outline-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-4 py-2 text-xs font-semibold text-ink-600 hover:text-ink-900"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-sage-800 hover:bg-sage-900 text-white rounded-full text-xs font-semibold shadow-sm transition-all"
                >
                  {isSubmitting ? 'Saving Project...' : editingProjectId ? 'Update Project' : 'Publish Project'}
                </button>
              </div>
            </form>
          )}

          {/* CURRENT PROJECTS GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {(creator.otherProjects || []).map((project) => (
              <div
                key={project.id}
                className="group relative bg-white rounded-2xl overflow-hidden border border-sage-200 shadow-sm transition-all hover:shadow-md"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-sage-100">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2 bg-black/60 backdrop-blur-sm text-white px-2 py-0.5 rounded-full text-[10px] font-semibold">
                    {project.category}
                  </div>
                </div>

                <div className="p-3.5 space-y-1">
                  <h5 className="text-xs font-semibold text-ink-900 truncate">
                    {project.title}
                  </h5>
                  <p className="text-[11px] text-ink-500">
                    {project.client ? `Client: ${project.client}` : 'CamFlow Verified'}
                  </p>
                </div>

                {/* Edit & Delete Overlay Buttons */}
                <div className="absolute top-2 left-2 flex items-center space-x-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => handleStartEdit(project)}
                    className="p-1.5 rounded-full bg-white/95 text-ink-700 hover:text-ink-900 shadow-sm hover:scale-105 transition-all"
                    title="Edit Project"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(project.id)}
                    className="p-1.5 rounded-full bg-white/95 text-rose-600 hover:text-rose-800 shadow-sm hover:scale-105 transition-all"
                    title="Delete Project"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
}

