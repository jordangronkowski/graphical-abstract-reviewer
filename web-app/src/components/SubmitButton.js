// FILE: src/components/SubmitButton.js
import React from 'react';

const SubmitButton = ({ onSubmit }) => {
    return (
        <button id="submitButton" onClick={onSubmit}>
            Submit
        </button>
    );
};

export default SubmitButton;