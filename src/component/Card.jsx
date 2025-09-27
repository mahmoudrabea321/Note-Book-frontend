import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2 as DeleteIcon, Pencil } from 'lucide-react';
import toast from 'react-hot-toast';
import axios from 'axios'; 

const Card = ({ note,setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); 

    const confirmDelete = window.confirm("Are you sure you want to delete this note?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:5000/api/notes/${id}`); 
      setNotes(prevNotes => prevNotes.filter(note => note._id !== id));
      toast.success('The note was deleted');
      console.log('Successfully deleted');
    } catch (error) {
      console.error('Error deleting note:', error);
      toast.error('Failed to delete');
    }
  };

  return (
    <div className="mt-6 bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300">
      <Link to={`/note/${note._id}`} className="block">
        <div className="p-5">
          <h1 className="text-xl font-semibold mb-2 text-gray-800">
            {note?.title || 'Untitled Note'}
          </h1>
          <p className="text-gray-600 mb-4">
            {note?.description || 'No content available'}
          </p>
        </div>
      </Link>

      <div className="px-5 py-3 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
        <span className="text-xs text-gray-500">
          Created: {new Date(note.createdAt).toLocaleDateString()}
        </span>

        <div className="flex gap-2">
          <button
            className="p-1 text-red-600 hover:text-red-800 transition-colors"
            onClick={(e) => handleDelete(e, note._id)} 
          >
            <DeleteIcon className="size-4" />
          </button>

          <Link to={`/note/${note._id}`}>
            <button className="p-1 text-blue-600 hover:text-blue-800 transition-colors">
              <Pencil className="size-4" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
