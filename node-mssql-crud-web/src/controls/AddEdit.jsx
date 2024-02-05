import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import { controlService, alertService } from '@/_services';

function AddEdit({ history, match }) {
    const { id } = match.params;
    const isAddMode = !id;
    
    // form validation rules 
    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required('Name is required'),
        description: Yup.string()
            .required('Description is required'),
        family: Yup.string()
            .required('Family is required'),
        tech: Yup.string()
            .required('Tech is required'),
        type: Yup.string()
            .required('Type is required'),
        mapping: Yup.string()
            .required('Mapping is required')
    });

    // functions to build form returned by useForm() hook
    const { register, handleSubmit, reset, setValue, errors, formState } = useForm({
        resolver: yupResolver(validationSchema)
    });

    function onSubmit(data) {
        return isAddMode
            ? createControl(data)
            : updateControl(id, data);
    }

    function createControl(data) {
        return controlService.create(data)
            .then(() => {
                alertService.success('Control added', { keepAfterRouteChange: true });
                history.push('.');
            })
            .catch(alertService.error);
    }

    function updateControl(id, data) {
        return controlService.update(id, data)
            .then(() => {
                alertService.success('Control updated', { keepAfterRouteChange: true });
                history.push('..');
            })
            .catch(alertService.error);
    }

    useEffect(() => {
        if (!isAddMode) {
            // get user and set form fields
            controlService.getById(id).then(control => {
                const fields = ['name', 'description', 'family', 'tech', 'type', 'mapping'];
                fields.forEach(field => setValue(field, control[field]));
            });
        }
    }, []);

    return (
        <form onSubmit={handleSubmit(onSubmit)} onReset={reset}>
            <h1>{isAddMode ? 'Add Control' : 'Edit Control'}</h1>
            <div className="form-row">
                <div className="form-group col">
                    <label>Name</label>
                    <input name="name" type="text" ref={register} className={`form-control ${errors.name ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.name?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Description</label>
                    <input name="description" type="text" ref={register} className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.description?.message}</div>
                </div>
                <div className="form-group col-5">
                    <label>Family</label>
                    <input name="family" type="text" ref={register} className={`form-control ${errors.family ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.family?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-7">
                    <label>Tech</label>
                    <input name="tech" type="text" ref={register} className={`form-control ${errors.tech ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.tech?.message}</div>
                </div>
                <div className="form-group col">
                    <label>Type</label>
                    <input name="type" type="text" ref={register} className={`form-control ${errors.type ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.type?.message}</div>
                </div>
            </div>
            <div className="form-row">
                <div className="form-group col-7">
                    <label>Mapping</label>
                    <input name="mapping" type="text" ref={register} className={`form-control ${errors.mapping ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.mapping?.message}</div>
                </div>
                
            </div>
            
            <div className="form-group">
                <button type="submit" disabled={formState.isSubmitting} className="btn btn-primary">
                    {formState.isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Save
                </button>
                <Link to={isAddMode ? '.' : '..'} className="btn btn-link">Cancel</Link>
            </div>
        </form>
    );
}

export { AddEdit };