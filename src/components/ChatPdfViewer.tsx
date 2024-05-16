import React from 'react'

type Props = {
    pdf_url?:string
}

const ChatPdfViewer = (props: Props) => {
  return (
    <div className=' w-full h-full iframe-scrollbar'>
        <iframe src={`https://docs.google.com/gview?url=${'https://research.google.com/pubs/archive/44678.pdf'}&embedded=true`} className='w-full h-full min-h-[600px] iframe-scrollbar '>

        </iframe>

    </div>
  )
}



export default ChatPdfViewer