import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios'

const Main = () => {

  const [notes, setNotes] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setNotes(res.data.data);
    }
    catch (err) {
      console.error("Failed to load tasks:", err);
    }
  };
  fetchTasks();
  }, []);

  const handleAdd = async() => {
    const note = (document.getElementById('input')).value;
    if (note.trim()) {
      const res = await API.post("/tasks", { description: note });
      setNotes(prev => [...prev, res.data.data]);
      (document.getElementById('input')).value = '';
    }
  };

  const handleDelete = async (id) => {
    await API.delete(`/tasks/${id}`);
    setNotes(prev => prev.filter(note => note._id !== id));
  };

  const saveEdit = async () => {
  const newText = document.getElementById('edit').value;
    await API.put(`/tasks/${editingId}`, { description: newText });
    setNotes(prev =>
      prev.map(note => note._id === editingId ? { ...note, description: newText } : note)
    );
    setEditingId(null);
};

  const cancelEdit = () => {
    setEditingId(null);
  };



/*
    const user = localStorage.getItem('currentUser');
    const username = localStorage.getItem('currentUsername');
    const navigate = useNavigate();
    const [notes, setNotes] = useState(() => {
        const storedNotes = localStorage.getItem(`notes_${user}`);
        return storedNotes ? JSON.parse(storedNotes) : [];
    });

  const [editingId, setEditingId] = useState(null);

  const handleAdd = () => {
    const note = (document.getElementById('input')).value;
    if (note.trim()) {
      const updatedNotes = [...notes, { id: Date.now(), text: note }];
      setNotes(updatedNotes);
      localStorage.setItem(`notes_${user}`, JSON.stringify(updatedNotes));
      (document.getElementById('input')).value = '';
    }
  };

  const handleDelete = (id) => {
    const updatedNotes = notes.filter(note => note.id !== id);
    setNotes(updatedNotes);
    localStorage.setItem(`notes_${user}`, JSON.stringify(updatedNotes));
  };

  const saveEdit = () => {
    const newText = document.getElementById('edit').value;
    const updated = notes.map(note =>
      note.id === editingId ? { ...note, text: newText } : note
    );
    setNotes(updated);
    localStorage.setItem(`notes_${user}`, JSON.stringify(updated));
    setEditingId(null);
  };

  const cancelEdit = () => {
    setEditingId(null);
  };*/


  return (
    <>

    <header>
    <div class="logo"></div>
    <nav>
      <button className="nav" onClick={()=>{navigate("/"); localStorage.removeItem("token")}}>Home</button>
      <button className="nav" onClick={()=>{navigate("/login"); localStorage.removeItem("token")}}>Login</button>
      <button className="nav" onClick={()=>{navigate("/register"); localStorage.removeItem("token")}}>Register</button>
      <button className="nav" onClick={()=>{navigate("/"); localStorage.removeItem("token")}}>Log Out</button>  
    </nav>
    </header>

    <div class = 'header'>
      <h1>Your Smart Notes</h1>
      <div><textarea class = 'addnote' id="input" placeholder="Enter a note"/></div>
      <button class = 'addbutton' onClick={handleAdd}>Add</button>
    </div>
      <ul>
        {notes.map(note => (
          <li key={note._id}>
            {editingId == note._id ? (
            <>
            <div><textarea style = {{backgroundColor: 'white'}} class = "textbox" id = "edit" defaultValue = {note.description}/></div>
            <button class = 'leftButtons' onClick={saveEdit}>Save</button>
            <button class = 'rightButtons' onClick={cancelEdit}>Cancel</button>
            </>
          ) : (
            <>
            <div class = "textbox">{note.description}</div>
            <button class = 'leftButtons' onClick={() => setEditingId(note._id)}>Edit</button>
            <button class = 'rightButtons' onClick={() => handleDelete(note._id)}>Delete</button>
            </>
          )}
          </li>
        ))}
      </ul>

      <button class = 'logout' onClick={() => {
        localStorage.removeItem("token");
        navigate('/')}}>Log Out</button>
    </>
  )
};

export default Main;