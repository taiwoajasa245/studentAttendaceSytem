// src/api/signAttendance.js
import { useState } from "react";
import axios from "axios";

const useStudentSignIn = () => {
  const [message, setMessage] = useState("");

  const registerStudent = async (values) => {
    const URL = import.meta.env.VITE_SERVER_URL;

    try {
      const res = await axios.post(`${URL}/api/sign`, values, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = res.data;

      if (data.status === 200) {
        setMessage(data.message);
      } else {
        setMessage("An unexpected error occurred");
      }
    } catch (error) {
      // Handle errors more explicitly
      if (error.response) {
        // Server responded with a status other than 200 range
        const errorMessage = error.response.data.message[0] || "Bad Request";
        setMessage(errorMessage);
      } else if (error.request) {
        // Request was made but no response was received
        setMessage("No response from server. Please try again later.");
      } else {
        // Something happened in setting up the request
        setMessage("Error in setting up request.");
      }
    }
  };

  return { message, registerStudent };
};

export default useStudentSignIn;
