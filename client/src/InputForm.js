import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import DOMPurify from 'dompurify';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function InputForm({ onSubmit, isLoading }) {
    const [inputs, setInputs] = useState(Array(10).fill(''));
    const [errors, setErrors] = useState(Array(10).fill(false));
    

    const sanitizeInput = (input) => {
        // Using DOMPurify to sanitize input
        return DOMPurify.sanitize(input);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            const sanitizedInputs = inputs.map((input) => sanitizeInput(input));
            // console.log(sanitizedInputs)
            // console.log(inputs)

            const hasErrors = sanitizedInputs.some((input) => !input.trim());

            if (hasErrors) {
                setErrors((prevErrors) => prevErrors.map(() => true));
            } else {
                // Clearing errors state
                setErrors((prevErrors) => prevErrors.map(() => false));

                // Calling onSubmit only if there are no errors
                onSubmit(sanitizedInputs);
            }
        } catch (error) {
            toast.error("Error: " + error.message, {
                position: "top-right",
                autoClose: 6000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
    };

    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);

        // Clear the error when user starts typing in the input field
        setErrors((prevErrors) => prevErrors.map(() => false));
    };

    return (
        <>
            <ToastContainer />
            <form onSubmit={handleSubmit} noValidate autoComplete="off">
                <Grid container spacing={2}>
                    {inputs.map((input, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <TextField
                                fullWidth
                                label={`Panel ${index + 1} *`}
                                variant="outlined"
                                value={input}
                                onChange={(e) => handleInputChange(index, e.target.value)}
                                error={errors[index] && !input.trim()} 
                                helperText={errors[index] && !input.trim() ? 'This field is required' : ''}
                            />
                        </Grid>
                    ))}

                    <Grid item xs={12} style={{ textAlign: 'right' }}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={isLoading}
                            style={{ padding: '10px', fontSize: '18px' }}
                        >
                            {isLoading ? 'Generating...' : 'Generate Comic'}
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

export default InputForm;

