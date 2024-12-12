async function generateImage() {
    const description = document.getElementById("description").value;
    const status = document.getElementById("status");
   

    status.textContent = "Generando imagen...";
    resultImage.src = "";

    try {
        const response = await fetch("https://demoimage.openai.azure.com/openai/deployments/dall-e-3TCS/images/generations?api-version=2024-02-01", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "api-key": "6mPktTQE4KYdDLzSN1lszQsDZBVebP940vdhq2jEBhvDDk2WAGi2JQQJ99ALACYeBjFXJ3w3AAABACOGr5xP"
            },
            body: JSON.stringify({ prompt: description, size: "1024x1024" })
        });

        if (response.ok) {
            const data = await response.json();
            const imageUrl = data.result.data[0].url;

            if (imageUrl) {
                const newWindow = window.open();
                newWindow.document.write(`
                    <html>
                    <head>
                        <title>Imagen Generada</title>
                        <style>
                            body {
                                display: flex;
                                justify-content: center;
                                align-items: center;
                                height: 100vh;
                                margin: 0;
                                background-color: #f4f4f4;
                            }
                            img {
                                max-width: 90%;
                                max-height: 90%;
                                border: 1px solid #ccc;
                                border-radius: 10px;
                            }
                        </style>
                    </head>
                    <body>
                        <img src="${imageUrl}" alt="Imagen generada por DALL·E">
                    </body>
                    </html>
                `);
            } else {
                status.textContent = "No se generó ninguna imagen.";
            }
        } else {
            status.textContent = `Error: ${response.status} - ${response.statusText}`;
        }
    } catch (error) {
        status.textContent = "Error en la conexión. Verifica tu configuración.";
        console.error(error);
    }
}
