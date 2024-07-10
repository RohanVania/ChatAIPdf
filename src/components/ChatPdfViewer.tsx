"use client"
import React, { useState } from 'react';
import { Worker } from '@react-pdf-viewer/core';
import { Viewer } from '@react-pdf-viewer/core';

// Import the styles
import '@react-pdf-viewer/core/lib/styles/index.css';

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
        // src={`https://docs.google.com/gview?url=${pdf_url }&embedded=true`}
        src={pdf_url }
        className={`w-full h-full min-h-[520px] iframe-scrollbar ${isLoading ? 'hidden' : ''}`}
        onLoad={handleLoad} // Call handleLoad when the iframe content has loaded
      />
    </div>
    //     <div className='w-full h-full iframe-scrollbar'>
    //   {isLoading && <SkeletonLoader />} 
    //   {/* Render the skeleton loader if isLoading is true */}
    //   <iframe
    //     src={`https://docs.google.com/gview?url=${pdf_url }&embedded=true`}
    //     className={`w-full h-full min-h-[520px] iframe-scrollbar ${isLoading ? 'hidden' : ''}`}
    //     onLoad={handleLoad} // Call handleLoad when the iframe content has loaded
    //   />
    // </div>
    // <div className='w-full h-full iframe-scrollbar'>
    //   {/* {isLoading && <SkeletonLoader />}
    //   {/* Render the skeleton loader if isLoading is true */}
    //   <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.4.120/build/pdf.worker.min.js">
    //     <div
    //       style={{
    //         // border: '1px solid rgba(0, 0, 0, 0.3)',
    //         // background:"red",
    //         // height: '650px',
    //       }}
    //     >
    //       <Viewer fileUrl={pdf_url!}  />
    //       </div>
    //   </Worker> 
    // </div>
    // <div className='w-full h-full iframe-scrollbar'>
    //   {isLoading && <SkeletonLoader />}
    //   {/* Render the skeleton loader if isLoading is true */}
    //   <Document>
    //     <Page style={styles.page}>
    //       <Text style={styles.text}>
    //         Here is a URL: {' '}
    //         <Text style={styles.link}>
    //           {pdf_url}
    //         </Text>
    //       </Text>
    //     </Page>
    //   </Document>
    // </div>
  );
};


export default ChatPdfViewer;