import React from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
    return (
        <div className="dashboard">
            <h1>Dashboard</h1>
            <nav>
                <ul>
                    <li>
                        <Link to="/workers">Manage Workers</Link>
                    </li>
                    <li>
                        <Link to="/products">Manage Products</Link>
                    </li>
                    <li>
                        <Link to="/sites">Manage Sites</Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default Dashboard;
