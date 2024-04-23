"use client"
import { useEffect, useState } from 'react';

const Profile = () => {
  const[email, setEmail] = useState();
 const [selectedVoiceAge, setSelectedVoiceAge] = useState('young');

 const handleVoiceAgeChange = (event) => {
   setSelectedVoiceAge(event.target.value);
 };

 const fetchUser = async () => {
  try {
    const res = await fetch("/api/get-name", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    console.log("User data fetched:", data.email);
    setEmail(data.email);
  } catch (error) {
    console.error("Error fetching user:", error);
  }
};
useEffect(() => {
  fetchUser();
}, []);
  
 return (
   <div className="flex items-center justify-center">
     <div className="bg-custom-pink shadow-lg rounded-lg p-12 max-w-md w-full">
       <h1 className="text-2xl font-bold text-center mb-4">Profile</h1>
       <div className="mb-4">
         <label className="block mb-2 font-semibold" htmlFor="email">
           Email:
         </label>
         <p className="bg-gray-100 px-4 py-2 rounded">{email}</p>
       </div>
       <div className="mb-4">
         <label className="block mb-2 font-semibold" htmlFor="voiceAge">
           Chatbot Persona:
         </label>
         <select
           id="voiceAge"
           className="block w-full border-gray-300 rounded p-2 focus:outline-none focus:border-custom-pink"
           value={selectedVoiceAge}
           onChange={handleVoiceAgeChange}
         >
           <option value="young">Young</option>
           <option value="middle">Middle Aged</option>
           <option value="old">Old</option>
         </select>
       </div>
     </div>
   </div>
 );
};

export default Profile;