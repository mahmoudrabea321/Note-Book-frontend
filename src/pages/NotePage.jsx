import { useEffect, useState } from 'react';
import axios from 'axios';
import { ArrowLeft, Trash2Icon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate, Link, useParams } from 'react-router-dom';
import API from '../config';

const NotePage = () => {
  const [note, setNote] = useState({ title: '', description: '' });
  const [save, setSave] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNote = async () => {
      if (!id) return;
      try {
        const res = await axios.get(`${API}/api/notes/${id}`);
        setNote(res.data);
      } catch (err) {
        toast.error('Failed to load note');
        console.error(err);
      }
    };

    fetchNote();
  }, [id]);

  const handleDelete = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`${API}/api/notes/${id}`);
      toast.success('Note was deleted');
      navigate('/');
    } catch {
      console.error('Failed to delete');
      toast.error('Failed to delete');
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    if (!note.title.trim() || !note.description.trim()) {
      return toast.error('All fields are required');
    }
    setSave(true);

    try {
      if (id) {
        await axios.put(`${API}/api/notes/${id}`, note);
        toast.success('Note was updated');
      } else {
        await axios.post(`${API}/api/notes`, note);
        toast.success('Note was created');
      }
      navigate('/');
    } catch {
      console.error('Failed to save');
      toast.error('Failed to save');
    } finally {
      setSave(false);
    }
  };

  return (
    <div className="mx-4 min-h-screen flex justify-center items-center">
      <div className="w-full max-w-2xl bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-2xl p-8">
        
        {/* Top Buttons */}
        <div className="flex justify-between items-center mb-6">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-blue-200 hover:text-white hover:scale-105 transition-transform"
          >
            <ArrowLeft className="size-5" />
            Back
          </Link>

          <button 
            className="inline-flex items-center gap-2 bg-red-500 text-white px-4 py-2 rounded-xl 
                       shadow-md hover:bg-red-600 hover:shadow-lg hover:scale-105 
                       transition-all duration-300"
            onClick={handleDelete}
          >
            <Trash2Icon className="size-5" />
            Delete
          </button>
        </div>

        {/* Form */}
        <h1 className="text-3xl font-semibold text-white mb-8 text-center">Edit Your Note</h1>

        <form onSubmit={handleSave} className="space-y-6">
          
          {/* Title Input */}
          <div>
            <label className="block text-sm font-medium text-blue-100 mb-2">Title</label>
            <input
              type="text"
              placeholder="Enter title..."
              className="w-full px-4 py-3 rounded-xl bg-white/20 border border-white/30 text-white 
                         placeholder:text-blue-200 focus:outline-none focus:ring-2 focus:ring-blue-500 
                         transition-all duration-300"
              value={note.title}
              onChange={(e) => setNote({ ...note, title: e.target.value })}
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
              value={note.description}
              onChange={(e) => setNote({ ...note, description: e.target.value })}
              required
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button 
              type="submit"
              className="btn bg-blue-500 border-none text-white font-semibold px-8 py-2 rounded-xl 
                         hover:bg-blue-600 hover:shadow-lg hover:scale-105 
                         transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={save}
            >
              {save ? (
                <span className="loading loading-spinner"></span>
              ) : (
                'Save'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NotePage;
