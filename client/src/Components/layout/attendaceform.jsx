import React, { useState } from "react";
import studentSignIn from "../api/signAttendance";
import { Toaster, toast } from "sonner";
import { useEffect } from "react";

const AttendanceForm = () => {
  const { message, registerStudent } = studentSignIn();

//   useEffect(() => {
//     if (message) {
//       if (message.toLowerCase().includes('recoreded')) {
//         toast.success(message);
//       } else {
//         toast.error(message);
//       }
//     }
//   }, [message]);




  const [formData, setFormData] = useState({
    name: "",
    matric: "",
    code: "",
  });

  // listen for input values
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await registerStudent(formData);

    // Display toast notification based on the message
    if (message) {
      if (message.includes('Recorded')) {
        toast.success(message);
      } else {
        toast.error(message);
      }
    }
    
  };

  return (
    <>
      <div className=" h-screen flex items-center justify-center bg-gray-200">
        <div className="w-full max-w-xs">
          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
          >
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="name"
              >
                Name
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="name"
                id="name"
                required
                placeholder="John Doe "
                value={formData.name}
                onChange={handleChange}
              />
            </div>

            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="matric"
              >
                Matric Number
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
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
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="code"
              >
                Code
              </label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                type="text"
                name="code"
                id="code"
                required
                value={formData.code}
                onChange={handleChange}
              />
            </div>

            <Toaster position="top-right" richColors/>
        

            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Sign Attendance
              </button>
            </div>
          </form>

          <p className="text-center text-gray-500 text-xs">
            ©2023 Developed by The Department of Science and Technology
            Education, LASU. and with 💌 by Taiwo All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
};

export default AttendanceForm;
