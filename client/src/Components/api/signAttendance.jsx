import { useState } from "react";
import axios from "axios";

const studentSignIn = () => {
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
      const errorMessage = error.response.data.message[0] || "Network Error";
      setMessage(errorMessage);
    }
  };

  return { message, registerStudent };
};

export default studentSignIn;
