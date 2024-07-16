import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Sites() {
    const [sites, setSites] = useState([]);
    const [newSite, setNewSite] = useState({ name: '', location: '', description: '' });

    useEffect(() => {
        axios.get('http://localhost:3002/sites')
            .then(response => setSites(response.data))
            .catch(error => console.error('Erreur lors de la récupération des sites:', error));
    }, []);

    const handleAddSite = () => {
        axios.post('http://localhost:3002/sites', newSite)
            .then(response => {
                setSites([...sites, response.data]);
                setNewSite({ name: '', location: '', description: '' });
            })
            .catch(error => console.error('Erreur lors de l\'ajout du site:', error));
    };

    return (
        <div>
            <h1>Sites</h1>
            <input type="text" placeholder="Name" value={newSite.name} onChange={e => setNewSite({ ...newSite, name: e.target.value })} />
            <input type="text" placeholder="Location" value={newSite.location} onChange={e => setNewSite({ ...newSite, location: e.target.value })} />
            <input type="text" placeholder="Description" value={newSite.description} onChange={e => setNewSite({ ...newSite, description: e.target.value })} />
            <button onClick={handleAddSite}>Add Site</button>
            <ul>
                {sites.map(site => (
                    <li key={site._id}>{site.name} - {site.location}</li>
                ))}
            </ul>
        </div>
    );
}

export default Sites;
