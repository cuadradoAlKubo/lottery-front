import { useState } from "react";

const useImageUploader = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const uploadImage = async (url: any, imageFile: any, method = "POST") => {
    console.log(imageFile);
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch(url, {
        method: method,
        body: formData,
      });
      console.log(response);
      if (!response.ok) {
        throw new Error("Error al enviar la imagen");
      }

      setSuccess(true);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { loading, error, success, uploadImage };
};

export default useImageUploader;
