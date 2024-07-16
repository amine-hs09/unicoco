import React, { useState, useEffect } from 'react';
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

function Workers() {
  const [workers, setWorkers] = useState([]);
  const [newWorker, setNewWorker] = useState({ name: '', role: '', active: true });

  useEffect(() => {
    axios.get('http://localhost:3001/workers')
      .then(response => setWorkers(response.data))
      .catch(error => console.error('Error fetching workers:', error));

    socket.on('workerAdded', worker => {
      setWorkers(prevWorkers => [...prevWorkers, worker]);
    });

    socket.on('workerDeleted', workerId => {
      setWorkers(prevWorkers => prevWorkers.filter(worker => worker._id !== workerId));
    });

    return () => {
      socket.off('workerAdded');
      socket.off('workerDeleted');
    };
  }, []);

  const handleAddWorker = () => {
    axios.post('http://localhost:3001/workers', newWorker)
      .then(response => {
        setNewWorker({ name: '', role: '', active: true });
      })
      .catch(error => console.error('Error adding worker:', error));
  };

  const handleDeleteWorker = (workerId) => {
    axios.delete(`http://localhost:3001/workers/${workerId}`)
      .then(() => {
        setWorkers(prevWorkers => prevWorkers.filter(worker => worker._id !== workerId));
      })
      .catch(error => console.error('Error deleting worker:', error));
  };

  return (
    <div>
      <h2>Workers</h2>
      <ul>
        {workers.map(worker => (
          <li key={worker._id}>
            {worker.name} - {worker.role}
            <button onClick={() => handleDeleteWorker(worker._id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          placeholder="Name"
          value={newWorker.name}
          onChange={e => setNewWorker({ ...newWorker, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Role"
          value={newWorker.role}
          onChange={e => setNewWorker({ ...newWorker, role: e.target.value })}
        />
        <button onClick={handleAddWorker}>Add Worker</button>
      </div>
    </div>
  );
}

export default Workers;
