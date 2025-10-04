import { useEffect, useState } from 'react'; 
import axios from 'axios';
import { ArrowLeft, Trash2Icon } from 'lucide-react';
import toast from 'react-hot-toast';
import { useNavigate, Link, useParams } from 'react-router-dom'; 
import API from '../config'

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
      await axios.delete(`http://localhost:5000/api/notes/${id}`);
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
        await axios.put(`http://localhost:5000/api/notes/${id}`, note);
        toast.success('Note was updated');
      } else {
        await axios.post('http://localhost:5000/api/notes', note);
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
    <div className="mx-4 min-h-screen bg-base-100">
      <div className="max-w-3xl mx-auto py-8">
        
        {/* Top buttons */}
        <div className="flex justify-between items-center mb-6">
          <Link 
            to="/" 
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gray-200 text-gray-700 shadow-sm hover:bg-gray-300 transition-all duration-300"
          >
            <ArrowLeft className="size-5" />
            Back
          </Link>
          
          <button 
            className="flex items-center gap-2 px-4 py-2 rounded-lg bg-red-500 text-white shadow-md hover:bg-red-600 active:scale-95 transition-all duration-300" 
            onClick={handleDelete}
          >
            <Trash2Icon className="size-5" />
            Delete
          </button>
        </div>

        {/* Note form */}
        <div className="card bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-2xl font-bold mb-6">The Note</h1>
          <form onSubmit={handleSave}>
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Title</label>
              <input
                type="text"
                placeholder="Enter title..."
                className="input input-bordered w-full"
                value={note.title}
                onChange={(e) => setNote({ ...note, title: e.target.value })} 
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Description</label>
              <textarea
                placeholder="Write your content here..."
                className="textarea textarea-bordered w-full min-h-[200px]"
                value={note.description}
                onChange={(e) => setNote({ ...note, description: e.target.value })} 
                required
              />
            </div>

            <div className="flex justify-end">
              <button 
                type="submit" 
                className="px-5 py-2 rounded-lg bg-blue-500 text-white font-medium shadow-md hover:bg-blue-600 active:scale-95 transition-all duration-300 disabled:opacity-50"
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
    </div>
  );
};

export default NotePage;
