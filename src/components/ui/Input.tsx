import React from 'react';

interface InputProps {
    type: string;
    name: string;
    label: string;
    value: string | number | undefined;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    error?: string;
}

const Input: React.FC<InputProps> = ({ type, name, label, value, onChange, error }) => {
    return (
        <div>
            <label htmlFor={name}>{label}</label>
            {type === "textarea" ? (
                <textarea id={name} name={name} value={value} onChange={onChange} />
            ) : (
                <input type={type} id={name} name={name} value={value} onChange={onChange} />
            )}
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
};

export default Input;
