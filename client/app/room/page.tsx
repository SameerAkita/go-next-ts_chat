'use client'

import ChatBody from '@/components/chat_body'
import React, { useState } from 'react'

export type Message = {
    content: string
    client_id: string
    username: string
    room_id: string
    type: 'receive' | 'self'
}

function page() {
    const [messages, setMessages] = useState<Array<Message>>([
        {
            content: 'hello',
            client_id: '1',
            username: 'user1',
            room_id: '1',
            type: 'self',
        },
        {
            content: 'hello',
            client_id: '2',
            username: 'user2',
            room_id: '1',
            type: 'receive',
        },
    ])

  return (
    <div className='flex flex-col w-full'>
        <div className='px-4'>
            <ChatBody data={messages} />
        </div>
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