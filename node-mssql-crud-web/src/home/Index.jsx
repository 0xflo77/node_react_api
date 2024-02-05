import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div>
            <h1>React - CRUD with React Hook Form</h1>
            <p>List, add, edit and delete controls with React and the React Hook Form library.</p>
            <p><Link to="controls">&gt;&gt; Manage Controls</Link></p>
        </div>
    );
}

export { Home };