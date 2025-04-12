
import React from "react";

const DecorativeBackground: React.FC = () => {
  return (
    <>
      <div className="absolute top-0 right-0 w-72 h-72 bg-primary/5 rounded-full filter blur-3xl opacity-30" aria-hidden="true"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-pink-100 rounded-full filter blur-3xl opacity-20" aria-hidden="true"></div>
    </>
  );
};

export default DecorativeBackground;
