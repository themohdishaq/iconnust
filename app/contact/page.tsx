import React from 'react'
export const contactOffices = [
  {
    id: "nipo",
    name: "National Innovation & Patent Office (NIPO)",
    phone: "+92-51-90856230",
    email: "director@icon.nust.edu.pk",
    address: "CIE Building, NUST Campus, H-12, Islamabad, Pakistan",
  },
  {
    id: "cac",
    name: "Corporate Advisory Council (CAC)",
    phone: "+92-51-90856230",
    email: "director@icon.nust.edu.pk",
    address: "CIE Building, NUST Campus, H-12, Islamabad, Pakistan",
  },
  {
    id: "tto",
    name: "Technology Transfer Office (TTO)",
    phone: "+92-51-90856230",
    email: "director@icon.nust.edu.pk",
    address: "CIE Building, NUST Campus, H-12, Islamabad, Pakistan",
  },
];
function Contact() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-4">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {contactOffices.map((office) => (
            <div key={office.id} className="bg-white shadow-md rounded-lg p-6">
                <h2 className="text-2xl text-[#00558F] font-semibold mb-4">{office.name}</h2>
                <p className="mb-2"><strong>Phone:</strong> {office.phone}</p>
                <p className="mb-2"><strong>Email:</strong> {office.email}</p>
                <p className="mb-2"><strong>Address:</strong> {office.address}</p>
            </div>
        ))}
      </div>
    </div>
  )
}

export default Contact