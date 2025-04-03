
const JobLoadingState = () => {
  return (
    <div className="flex justify-center py-12">
      <div className="animate-pulse flex flex-col items-center">
        <div className="h-6 w-32 bg-gray-200 rounded mb-4"></div>
        <div className="h-24 w-full max-w-2xl bg-gray-200 rounded"></div>
      </div>
    </div>
  );
};

export default JobLoadingState;
