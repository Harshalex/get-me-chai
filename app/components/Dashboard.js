import React, { useRef, useState } from "react";
import CustomInput from "./CustomInput";

function Dashboard() {
  const [form, setForm] = useState({
    name: "", // Changed from "Name" to "name" for consistency
    email: "",
    username: "",
    profilePicture: null,
    coverPicture: null,
    razorid: "",
    razorsecret:"" 
  });
  
  const ref = useRef();

  const inputFields = [
    { name: "name", type: "text", label: "Name", value: form.name },
    { name: "email", type: "email", label: "Email", value: form.email },
    { name: "username", type: "text", label: "Username", value: form.username },
    { name: "profilePicture", type: "file", label: "Profile Picture" },
    { name: "coverPicture", type: "file", label: "Cover Picture" },
    { name: "razorid", type: "text", label: "Razorpay ID", value: form.razorid },
    { name: "razorsecret", type: "text", label: "Razorpay Secret", value: form.razorsecret }
  ];

  const handelSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", form);

    // Example: If you need to send the form data to an API
    const formData = new FormData();
    formData.append("name", form.name);
    formData.append("email", form.email);
    formData.append("username", form.username);
    formData.append("profilePicture", form.profilePicture);
    formData.append("coverPicture", form.coverPicture);
    formData.append("credentials", form.razorid);
    formData.append("credentials", form.razorid);
    
    ref.current.reset();

  };

  const handelChange = (e) => {
    const { name, type, value, files } = e.target;

    if (type === "file") {
      // Handle file input
      setForm((prevForm) => ({
        ...prevForm,
        [name]: files[0], // Store the selected file
      }));
    } else {
      // Handle text input
      setForm((prevForm) => ({
        ...prevForm,
        [name]: value, // Update the corresponding field
      }));
    }
  };

  return (
    <div className="w-[65%] mx-auto py-6 px-10 flex flex-col gap-4">
      <h1 className="font-bold text-2xl text-center">Welcome to Your Dashboard</h1>
      <div className="mt-4">
        <form ref={ref}
         onSubmit={handelSubmit}>
          {inputFields.map((field, index) => (
            <CustomInput
              key={index}
              name={field.name}
              label={field.label}
              type={field.type}
              onChange={handelChange}
              value={field.type === "file" ? undefined : field.value} // Do not pass value for file inputs
              error={false}
            />
          ))}
          <button
            type="submit"
            className="bg-blue-600 text-white my-2 py-2 px-4 rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default Dashboard;