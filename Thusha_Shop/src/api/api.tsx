
import axios from "axios";

export interface FaceShapeResponse {
  face_shape: string;  // Must match the backend's JSON key exactly
}

/**
 * Sends the image file to the backend API for face shape detection.
 * @param file - The image file (from upload or captured photo)
 * @returns The detected face shape response.
 */
export const detectFaceShape = async (file: File): Promise<FaceShapeResponse> => {
  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await axios.post<FaceShapeResponse>(
      "http://localhost:8000/api/detect/",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("API error during face shape detection:", error);
    throw error;
  }
};
