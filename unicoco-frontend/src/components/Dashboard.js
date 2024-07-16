import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div>
            <h1>Dashboard</h1>
            <ul>
                <li><Link to="/workers">Workers</Link></li>
                <li><Link to="/products">Products</Link></li>
                <li><Link to="/sites">Sites</Link></li>
            </ul>
        </div>
    );
}

export default Dashboard;
