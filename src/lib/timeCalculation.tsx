import React from 'react';
import { formatDistanceToNow } from 'date-fns'; // Importing date-fns for easier time calculations

type JobPostingProps = {
  createdAt: string;
};

const JobPostingTime: React.FC<JobPostingProps> = ({ createdAt }) => {
  // Calculate the time difference using date-fns `formatDistanceToNow` function
  const timeAgo = formatDistanceToNow(new Date(createdAt), { addSuffix: true });

  return (
    <div>
      <p>{timeAgo}</p>
    </div>
  );
};

export default JobPostingTime;
