import React from 'react'

type Props = {
    pdf_url?:string
}

const ChatPdfViewer = ({pdf_url}: Props) => {
  return (
    <div className=' w-full h-full iframe-scrollbar'>
        <iframe src={`https://docs.google.com/gview?url=${pdf_url}&embedded=true`} className='w-full h-full min-h-[520px] iframe-scrollbar '>
        </iframe>

    </div>
  )
}



export default ChatPdfViewer