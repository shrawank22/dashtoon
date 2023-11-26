import React, { useState } from 'react';
import InputForm from './InputForm';
import axios from 'axios';
import Navbar from './Navbar';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, Typography, Grid } from '@mui/material';


function App() {
    const [comicImages, setComicImages] = useState([]);
    const [isLoading, setIsLoading] = useState(false); 
    const [showInputForm, setShowInputForm] = useState(true);

    

    const generateComic = async (texts) => {
        setIsLoading(true);
        try {
            const apiUrl = 'http://localhost:3001';
            console.log(apiUrl)
            const response = await axios.post(`${apiUrl}/generateComic`, { texts });
            // console.log(response.data.images);
            setComicImages(response.data.images);

            setShowInputForm(false);
        } catch (error) {
            toast.error("Error generating comic: " + error.message, {
                position: "top-right",
                autoClose: 10000,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
        }
        setIsLoading(false); 
    };

    const handleGenerateComicClick = () => {
        setShowInputForm(!showInputForm);
    };

    return (
        <>
            <Navbar onGenerateComicClick={handleGenerateComicClick} />
            <Container maxWidth="lg" style={{marginTop: '10px'}}>
                <ToastContainer />
                <Typography variant="h2" component="h2" gutterBottom style={{textAlign: 'center'}}>
                    Comic Strip Generator
                </Typography>
                { showInputForm && <InputForm onSubmit={generateComic} isLoading={isLoading}/> }
                <Grid container spacing={3} style={{ marginTop: '20px' }}>
                    {comicImages.map((image, index) => (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                            <img 
                                src={`data:image/png;base64,${image}`} 
                                alt={`Comic Panel ${index + 1}`} 
                                style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                            />
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </>
    );
}

export default App;