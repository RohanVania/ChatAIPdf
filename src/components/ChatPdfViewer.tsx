"use client"
import React, { useState } from 'react';

const SkeletonLoader = () => (
  <div className="animate-pulse bg-gray-300 rounded-lg h-full w-full min-h-[520px]"></div>
);

type Props = {
  pdf_url?: string;
};

const ChatPdfViewer = ({ pdf_url }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  // Function to handle the onLoad event of the iframe
  const handleLoad = () => {
    console.log("loading")
    setIsLoading(false); // Set isLoading to false when the iframe content has loaded
  };

  return (
    <div className='w-full h-full iframe-scrollbar'>
      {isLoading && <SkeletonLoader />} 
      {/* Render the skeleton loader if isLoading is true */}
      <iframe
        src={`https://docs.google.com/gview?url=${pdf_url }&embedded=true`}
        className={`w-full h-full min-h-[520px] iframe-scrollbar ${isLoading ? 'hidden' : ''}`}
        onLoad={handleLoad} // Call handleLoad when the iframe content has loaded
      />
    </div>
  );
};

export default ChatPdfViewer;