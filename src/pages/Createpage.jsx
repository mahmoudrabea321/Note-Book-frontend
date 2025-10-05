import React, { useState } from 'react';
import { ArrowLeft } from "lucide-react";
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import API from '../config';

const CreatePage = () => {
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
    <div className="mx-4 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-8">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-blue-200 mb-6 hover:text-white hover:scale-105 transition-transform"
        >
          <ArrowLeft className="size-5" />
          Back
        </Link>

        {/* Title */}
        <h1 className="text-3xl font-semibold text-white mb-8 text-center">Create a New Note</h1>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-blue-100 mb-2">Title</label>
            <input 
              type="text"
              placeholder="Enter title..."
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white 
                         placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 
                         transition-all duration-300"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description Input */}
          <div>
            <label className="block text-sm font-medium text-blue-100 mb-2">Content</label>
            <textarea 
              placeholder="Write your content here..." 
              className="w-full px-4 py-3 min-h-[180px] rounded-xl bg-white/20 border border-white/30 text-white 
                         placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 
                         transition-all duration-300 resize-none"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button 
              type="submit"
              className="btn bg-blue-500 border-none text-white font-semibold px-8 py-2 rounded-xl 
                         hover:bg-blue-600 hover:shadow-lg hover:scale-105 
                         transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
  );
};

export default CreatePage;
