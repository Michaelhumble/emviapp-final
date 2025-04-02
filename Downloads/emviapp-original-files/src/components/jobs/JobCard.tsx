
import { MapPin, Clock, DollarSign, CalendarClock } from 'lucide-react';
import { Job } from '../../types/job';

interface JobCardProps {
  job: Job;
}

const JobCard = ({ job }: JobCardProps) => {
  return (
    <div className="bg-gradient-to-b from-gray-800/80 to-gray-900/80 backdrop-blur-md rounded-xl border border-gray-700/50 overflow-hidden hover:shadow-xl hover:shadow-purple-900/10 transition-all duration-300">
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <span className={`inline-block px-2.5 py-0.5 text-xs rounded-full mb-3 ${
              job.employment_type === 'Full-time' 
                ? 'bg-green-500/20 text-green-300' 
                : job.employment_type === 'Part-time'
                ? 'bg-blue-500/20 text-blue-300'
                : 'bg-purple-500/20 text-purple-300'
            }`}>
              {job.employment_type}
            </span>
            <h3 className="text-xl font-medium text-white">{job.title}</h3>
            <div className="text-purple-300 text-sm mt-1">{job.company}</div>
          </div>
          {job.logo && (
            <img 
              src={job.logo} 
              alt={`${job.company} logo`} 
              className="w-12 h-12 object-contain rounded-md"
            />
          )}
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-start">
            <MapPin size={18} className="text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300 text-sm">{job.location}</span>
          </div>
          
          <div className="flex items-start">
            <DollarSign size={18} className="text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300 text-sm">{job.salary}</span>
          </div>
          
          <div className="flex items-start">
            <Clock size={18} className="text-purple-400 mr-2 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300 text-sm">
              {job.posted_date} · {job.application_deadline ? `Apply by ${job.application_deadline}` : 'Open until filled'}
            </span>
          </div>
        </div>

        <div className="mt-4 text-sm text-gray-300 line-clamp-3">
          {job.description}
        </div>
        
        <div className="flex justify-between items-center mt-6">
          <div className="flex flex-wrap gap-2">
            {job.tags && job.tags.map((tag, index) => (
              <span 
                key={index}
                className="px-2 py-1 bg-gray-700/50 rounded-md text-xs text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
          
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-lg flex items-center transition-colors">
            <CalendarClock size={16} className="mr-2" />
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
