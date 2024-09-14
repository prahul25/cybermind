'use client'
import { useState, ChangeEvent, FormEvent } from "react";
import Image from "next/image";

// Define the shape of the form data
interface FormData {
  logo: File | null;
  jobRole: string;
  experience: string;
  location: string;
  salary: string;
  description: string;
}

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormData>({
    logo: null,
    jobRole: "",
    experience: "",
    location: "",
    salary: "",
    description: "",
  });
  const [loading, setLoading] = useState<boolean>(false); 

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === "file") {
      setFormData({ ...formData, [name]: files ? files[0] : null });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const body = new FormData();
    body.append("logo", formData.logo as Blob);
    body.append("jobRole", formData.jobRole);
    body.append("experience", formData.experience);
    body.append("location", formData.location);
    body.append("salary", formData.salary);
    body.append("description", formData.description);

    try {
      const response = await fetch("/api/send-jobposting", {
        method: "POST",
        body,
      });

      const data = await response.json();
      if (response.ok) {
        alert("Job posted successfully!");
      } else {
        alert(data.message || "Failed to post job");
      }
    } catch (error) {
      console.error("Error posting job:", error);
      alert("An error occurred while posting the job.");
    } finally {
      setLoading(false); 
      closeModal();
    }
  };

  return (
    <>
      <div className="fixed flex justify-center h-16 top-4 w-full">
        <div className="bg-gray-100 border border-gray-400 w-6/12 rounded-full flex items-center p-3 gap-2 md:gap-9">
          <Image
            src="/cyberlogo.png"
            alt="cybermind logo"
            width={40}
            height={40}
          />
          <p>Home</p>
          <p>Find Jobs</p>
          <p>Find Talents</p>
          <p>About us</p>
          <p>Testimonials</p>
          <button
            className="px-4 py-1 bg-violet-500 rounded-full text-white"
            onClick={openModal}
          >
            Create Jobs
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl">
            <div className="w-full flex justify-between items-center">
              <h2 className="text-2xl mb-4">Create Job Posting</h2>
              <button
                type="button"
                className="px-4 py-[2px] bg-red-600 text-white text-xl rounded-md"
                onClick={closeModal}
              >
                X
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="logo">
                  Company Logo
                </label>
                <input
                  id="logo"
                  name="logo"
                  type="file"
                  className="w-full p-2 border rounded-md"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="flex gap-3">
                <div className="w-full">
                  <label className="block text-sm font-medium mb-1" htmlFor="jobRole">
                    Job Role
                  </label>
                  <input
                    id="jobRole"
                    name="jobRole"
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Job Role"
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="w-full">
                  <label className="block text-sm font-medium mb-1" htmlFor="salary">
                    Salary (in k)
                  </label>
                  <input
                    id="salary"
                    name="salary"
                    type="number"
                    className="w-full p-2 border rounded-md"
                    placeholder="Salary"
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-full">
                  <label className="block text-sm font-medium mb-1" htmlFor="experience">
                    Experience
                  </label>
                  <input
                    id="experience"
                    name="experience"
                    type="text"
                    className="w-full p-2 border rounded-md"
                    placeholder="Experience"
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="w-full">
                  <label className="block text-sm font-medium mb-1" htmlFor="location">
                    Location
                  </label>
                  <select
                    id="location"
                    name="location"
                    className="w-full p-[10px] border rounded-md"
                    onChange={handleChange}
                    required
                  >
                    <option value="" disabled selected>
                      Select Location
                    </option>
                    <option value="Onsite">Onsite</option>
                    <option value="Remote">Remote</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1" htmlFor="description">
                  Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  className="w-full p-2 border rounded-md"
                  placeholder="Job Description"
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="submit"
                  className={`px-4 py-2 ${loading ? "bg-gray-500" : "bg-[#00AAFF]"} w-full text-white rounded-md`}
                  disabled={loading}
                >
                  {loading ? "Uploading job..." : "Post Job"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Navbar;
