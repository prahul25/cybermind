"use client";
import Filter from "@/components/Filter";
import JobPostingTime from "@/lib/timeCalculation";
import axios from "axios";
import React from "react";
import { GoPersonAdd } from "react-icons/go";
import { RiBuildingLine } from "react-icons/ri";
import { GoStack } from "react-icons/go";
import { CldImage } from "next-cloudinary";

type JobPosting = {
  _id: string;
  logo: string;
  jobRole: string;
  experience: number;
  location: string;
  salary: number;
  description: string;
  createdAt:string;
};

type FilterChangeEvent = {
  type: "jobRole" | "location" | "salary";
  value: string | number;
};

function Home() {
  // Initialize both arrays to be empty by default
  const [jobPostingData, setJobPostingData] = React.useState<JobPosting[]>([]);
  const [filteredData, setFilteredData] = React.useState<JobPosting[]>([]);
  const [filters, setFilters] = React.useState({
    jobRole: "",
    location: "",
    salary: 100,
  });
  const [loading, setLoading] = React.useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(`/api/get-jobposting`);
      const jobPostings = response.data.data;
      setJobPostingData(jobPostings);
      setFilteredData(jobPostings); 
      setLoading(false);
    } catch (error) {
      console.error("Error fetching job postings:", error);
      setLoading(false);
    }
  };

  const handleFilterChange = ({ type, value }: FilterChangeEvent) => {
    setFilters((prev) => ({
      ...prev,
      [type]: value,
    }));
  };

  React.useEffect(() => {
    fetchData();
  }, []);

  React.useEffect(() => {
 
    if (!jobPostingData || jobPostingData.length === 0) return;

    
    const filtered = jobPostingData.filter((job) => {
      const matchesJobRole = filters.jobRole
        ? job.jobRole.toLowerCase().includes(filters.jobRole.toLowerCase())
        : true;

      
      const matchesLocation = filters.location
        ? job.location.toLowerCase() === filters.location.toLowerCase()
        : true;

      
      const matchesSalary =
        job.salary >= filters.salary || filters.salary === 100;

    
      return matchesJobRole && matchesLocation && matchesSalary;
    });

   
    setFilteredData(filtered);
  }, [filters, jobPostingData]);


  if (loading) {
    return <p className="text-white">Loading job postings...</p>;
  }

  return (
    <div className="bg-white h-screen mt-60">
      <Filter onFilterChange={handleFilterChange} />
      {/* Job Postings */}
      <div className="flex flex-wrap">
        {loading && <p className="text-white">Loading job postings...</p>}
        {filteredData.length > 0 ? ( 
          filteredData.map((job) => (
            <div
              key={job._id}
              className="job-card p-6 w-96 bg-white shadow-md  text-gray-600 shadow-slate-200 m-2 rounded-md"
            >
              <div className="flex gap-14 justify-between">
                <CldImage
                  src={job.logo}
                  alt={job.jobRole}
                  width={60}
                  height={60}
                  className="circular-logo"
                />
                <div className="flex items-start">
                  <p className="bg-[#B0D9FF] px-2 py-[3px] rounded-lg">
                    <JobPostingTime createdAt={job.createdAt} />
                  </p>
                </div>
              </div>

              <p className="font-bold mt-4 text-black">{job.jobRole}</p>
              <div className="flex gap-8 my-2">
                <p className="flex items-center gap-[4px]">
                  <GoPersonAdd /> {job.experience}yr Exp
                </p>
                <p className="flex items-center gap-[4px]">
                  <RiBuildingLine /> {job.location}
                </p>
                <p className="flex items-center gap-[4px]">
                  <GoStack /> ₹{job.salary}k
                </p>
              </div>
              <p className="my-2 text-sm">{job.description}</p>
              <button
                type="button"
                className="flex w-full justify-center items-center rounded-lg bg-[#00AAFF] py-2 text-white"
              >
                Apply now
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-700">No jobs match your criteria.</p>
        )}
      </div>
    </div>
  );
}

export default Home;
