import React, { useState } from 'react';
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import API from '../config'

const Createpage = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title.trim() || !description.trim()) {
      return toast.error('All fields are required');
    }

    try {
      setLoading(true);
      await axios.post(`${API}/api/notes`, { title, description });
      toast.success('Note created successfully!');
      navigate('/');
    } catch (error) {
      console.error('Failed to create note:', error);
      toast.error('Failed to create note');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-4 min-h-screen bg-base-100">
      <div className="max-w-3xl mx-auto py-8">
        {/* Back Button */}
        <Link 
          to="/" 
          className="btn btn-ghost mb-6 flex items-center gap-2 hover:scale-105 transition-transform"
        >
          <ArrowLeft className="size-5" />
          Back
        </Link>

        {/* Card */}
        <div className="card bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">Create a new note</h1>
          <form onSubmit={handleSubmit}>
            
            {/* Title */}
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input 
                type="text"
                placeholder="Enter title..." 
                className="input input-bordered w-full"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Description */}
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Content</label>
              <textarea 
                placeholder="Write your content here..." 
                className="textarea textarea-bordered w-full min-h-[200px]"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            {/* Submit Button */}
            <div className="flex justify-end">
              <button 
                type="submit"
                className="btn btn-primary px-6 py-2 rounded-xl text-gray-950* 
                           shadow-md transition-all duration-300
                           hover:bg-blue-600 hover:shadow-lg hover:scale-105
                           disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={loading}
              >
                {loading ? (
                  <span className="loading loading-spinner"></span>
                ) : (
                  "Create Note"
                )}
              </button>
            </div>

          </form>
        </div>
      </div>
    </div>
  );
};

export default Createpage;
