import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { controlService } from '@/_services';

function List({ match }) {
    const { path } = match;
    const [controls, setControls] = useState(null);

    useEffect(() => {
        controlService.getAll().then(x => setControls(x));
    }, []);

    function deleteControl(id) {
        setControls(controls.map(x => {
            if (x.id === id) { x.isDeleting = true; }
            return x;
        }));
        controlService.delete(id).then(() => {
            setControls(controls => controls.filter(x => x.id !== id));
        });
    }

    return (
        <div>
            <h1>Controls</h1>
            <Link to={`${path}/add`} className="btn btn-sm btn-success mb-2">Add Control</Link>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th style={{ width: '30%' }}>Tech</th>
                        <th style={{ width: '30%' }}>Control</th>
                        <th style={{ width: '30%' }}>Type</th>
                        <th style={{ width: '10%' }}></th>
                    </tr>
                </thead>
                <tbody>
                    {controls && controls.map(control =>
                        <tr key={control.id}>
                            <td>{control.tech} </td>
                            <td> {control.name} {control.description} </td>
                            <td>{control.type} {control.mapping}</td>
                            <td style={{ whiteSpace: 'nowrap' }}>
                                <Link to={`${path}/edit/${control.id}`} className="btn btn-sm btn-primary mr-1">Edit</Link>
                                <button onClick={() => deleteControl(control.id)} className="btn btn-sm btn-danger btn-delete-control" disabled={control.isDeleting}>
                                    {control.isDeleting 
                                        ? <span className="spinner-border spinner-border-sm"></span>
                                        : <span>Delete</span>
                                    }
                                </button>
                            </td>
                        </tr>
                    )}
                    {!controls &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="spinner-border spinner-border-lg align-center"></div>
                            </td>
                        </tr>
                    }
                    {controls && !controls.length &&
                        <tr>
                            <td colSpan="4" className="text-center">
                                <div className="p-2">No Controls To Display</div>
                            </td>
                        </tr>
                    }
                </tbody>
            </table>
        </div>
    );
}

export { List };