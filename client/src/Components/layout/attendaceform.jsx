import React, { useEffect, useState } from "react";
import useStudentSignIn from "../api/signAttendance";
import { Toaster, toast } from "sonner";

const AttendanceForm = () => {
  const { message, registerStudent } = useStudentSignIn();

  const [formData, setFormData] = useState({
    name: "",
    matric: "",
    code: "",
  });

  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const resultMessage = await registerStudent(formData);

    if (message) {
      if (message.includes("Recorded")) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    }
  };

  useEffect(() => {
    if (message) {
      if (message.includes("Recorded")) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    }
  }, [message]);

  return (
    <>
      <div
        className={`h-screen flex items-center justify-center ${
          isDarkMode ? "bg-gray-900" : "bg-gray-200"
        }`}
      >
        <div className="w-full max-w-xs">
          <div className="flex justify-end mb-2">
            {/* Dark mode toggle button */}
            <button
              className={`text-sm py-1 px-3 rounded ${
                isDarkMode
                  ? "bg-gray-800 text-white"
                  : "bg-gray-200 text-gray-800"
              } focus:outline-none`}
              onClick={toggleDarkMode}
            >
              {isDarkMode ? "Light Mode" : "Dark Mode"}
            </button>
          </div>

          <form
            onSubmit={handleSubmit}
            className={`bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 ${
              isDarkMode ? "darkMode" : "lightMode"
            }`}
          >
            <div className="mb-4">
              <label
                className={`block text-gray-700 text-sm font-bold mb-2 ${
                  isDarkMode ? "darkMode" : "lightMode"
                }`}
                htmlFor="name"
              >
                Name
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                  isDarkMode ? "darkModeInput" : "lightModeInput"
                }`}
                type="text"
                name="name"
                id="name"
                required
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                className={`block text-gray-700 text-sm font-bold mb-2 ${
                  isDarkMode ? "darkMode" : "lightMode"
                }`}
                htmlFor="matric"
              >
                Matric Number
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                  isDarkMode ? "darkModeInput" : "lightModeInput"
                }`}
                type="text"
                name="matric"
                id="matric"
                required
                minLength="9"
                maxLength="9"
                placeholder="e.g 900995003"
                value={formData.matric}
                onChange={handleChange}
              />
            </div>

            <div className="mb-6">
              <label
                className={`block text-gray-700 text-sm font-bold mb-2 ${
                  isDarkMode ? "darkMode" : "lightMode"
                }`}
                htmlFor="code"
              >
                Code
              </label>
              <input
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                  isDarkMode ? "darkModeInput" : "lightModeInput"
                }`}
                type="text"
                name="code"
                id="code"
                required
                value={formData.code}
                onChange={handleChange}
              />
            </div>

            <Toaster position="top-right" richColors />

            <div className="flex items-center justify-between">
              <button
                className={`bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ${
                  isDarkMode ? "darkModeButton" : "lightModeButton"
                }`}
                type="submit"
              >
                Sign Attendance
              </button>
            </div>
          </form>

          <p
            className={`text-center text-gray-500 text-xs ${
              isDarkMode ? "darkMode" : "lightMode"
            }`}
          >
            ©2023 Developed by The Department of Science and Technology
            Education, LASU. and with 💌 by Taiwo All rights reserved.
          </p>
        </div>
      </div>

      {/* Toast notifications */}
      <Toaster position="top-right" richColors />
    </>
  );
};

export default AttendanceForm;
