import React, { useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import DOMPurify from 'dompurify';

function InputForm({ onSubmit, isLoading }) {
    const [inputs, setInputs] = useState(Array(10).fill(''));
    

    const sanitizeInput = (input) => {
        // Using DOMPurify to sanitize input
        return DOMPurify.sanitize(input);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const sanitizedInputs = inputs.map((input) => sanitizeInput(input));
        console.log(sanitizedInputs)
        console.log(inputs)
        onSubmit(sanitizedInputs);
    };

    const handleInputChange = (index, value) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    return (
        <form onSubmit={handleSubmit} noValidate autoComplete="off">
            <Grid container spacing={2}>
                {inputs.map((input, index) => (
                    <Grid item xs={12} sm={6} md={4} key={index}>
                        <TextField
                            fullWidth
                            label={`Panel ${index + 1}`}
                            variant="outlined"
                            value={input}
                            onChange={(e) => handleInputChange(index, e.target.value)}
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
    );
}

export default InputForm;

