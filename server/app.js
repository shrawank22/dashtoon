require('dotenv').config();

const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();

app.use(cors());

app.use(express.json());

const API_ENDPOINT = "https://xdwvg9no7pefghrn.us-east-1.aws.endpoints.huggingface.cloud";
const API_KEY = process.env.API_KEY;

app.post('/generateComic', async (req, res) => {
    try {
        const promises = req.body.texts.map(text =>
            axios.post(API_ENDPOINT, { inputs: text }, {
                headers: {
                    "Accept": "image/png",
                    "Authorization": `Bearer ${API_KEY}`,
                    "Content-Type": "application/json"
                },
                responseType: 'arraybuffer'
            })
        );

        const images = await Promise.all(promises);
        const imageBuffers = images.map(response => response.data.toString('base64'));
        res.send({ images: imageBuffers });
    } catch (error) {
        // console.error("Error generating comic:", error.message);
        res.status(500).send({ message: error.message });
    }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});



// const sharp = require("sharp");

// async function addTextOnImage() {
//   try {
//     const width = 750;
//     const height = 483;
//     const text = "Sammy the Shark";

//     const svgImage = `
//     <svg width="${width}" height="${height}">
//       <style>
//       .title { fill: #001; font-size: 70px; font-weight: bold;}
//       </style>
//       <text x="50%" y="50%" text-anchor="middle" class="title">${text}</text>
//     </svg>
//     `;
//     const svgBuffer = Buffer.from(svgImage);
//     const image = await sharp("sammy.png")
//       .composite([
//         {
//           input: svgBuffer,
//           top: 0,
//           left: 0,
//         },
//       ])
//       .toFile("sammy-text-overlay.png");
//   } catch (error) {
//     console.log(error);
//   }
// }

// addTextOnImage();
