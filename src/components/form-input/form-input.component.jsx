import React from 'react';

import './form-input.style.scss';

//This component does perform one "prop drilling" but only to the parents. By giving back a function prop (which 
// is like telling the father: this function that you have? it is time to invoke it!)
const FormInput = ({ handleChange, label, ...otherProps }) => (
    <div className="group">
        <input className="form-input" 
        onChange={handleChange} {...otherProps} />
        {
            label ?
            (<label 
            className={`${otherProps.value.length
             ? 'shrink' : ''} form-input-label`}>
                 {label}
            </label>)
            : null
        }
    </div>
)

export default FormInput