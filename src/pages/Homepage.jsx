import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../component/Navbar.jsx';
import axios from 'axios';
import Card from '../component/Card.jsx';

const Homepage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/notes');
        setNotes(res.data);
      } catch (error) {
        console.error('Fetch error:', error);
        toast.error('Failed to fetch notes');
        setNotes([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchNotes();
  }, []); 

  return (
    <div className="min-h-screen ">
      <Navbar />
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg">loading...</span>
        </div>
      ) : notes.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No notes found</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
          {notes.map((note) => (
            <Card key={note._id} note={note} setNotes={setNotes}/>
          ))}
        </div>
      )}
    </div>
  );
};

export default Homepage;
