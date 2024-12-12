async function generateImage() {
    const description = document.getElementById("description").value;
    const status = document.getElementById("status");
    const resultImage = document.getElementById("resultImage");

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
            resultImage.src = data.url;
            status.textContent = "";
        } else {
            status.textContent = "Error al generar la imagen.";
        }
    } catch (error) {
        status.textContent = "Error en la conexión.";
    }
}
