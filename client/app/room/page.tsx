import React, { useState } from 'react'

export type Message = {
    content: string
    client_id: string
    username: string
    room_id: string
    type: 'recieve' | 'self'
}

function page() {
    const [messages, setMessages] = useState<Array<Message>>()

  return (
    <div className='flex flex-col w-full'>
        <div className='fixed bottom-0 mt-4 w-full'>
            <div className='flex md:flex-row px-4 py-2 bg-gray-200 md:mx-4 rounded-md'>
                <div className='flex w-full mr-4 rounded-md border border-blue-500'>
                    <textarea 
                        placeholder='type your message here'
                        className='w-full h-10 p-2 rounded-md focus:outline-none bg-white'
                        style={{ resize: 'none' }}
                    />
                </div>
                <div className='flex items-center'>
                    <button className='p-2 rounded-md bg-blue-500 text-white'>
                        Send
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page