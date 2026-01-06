'use client'

import ChatBody from '@/components/chat_body'
import React, { useRef, useState, useContext, useEffect } from 'react'
import { WebsocketContext } from '@/modules/websocket_provider'
import { useRouter } from 'next/navigation'
import { API_URL } from '@/constants'

export type Message = {
    content: string
    client_id: string
    username: string
    room_id: string
    type: 'receive' | 'self'
}

function page() {
    const [messages, setMessages] = useState<Array<Message>>([])
    const textarea = useRef<HTMLTextAreaElement>(null)
    const { conn } = useContext(WebsocketContext)
    const [users, setUsers] = useState<Array<{ username: string }>>()

    const router = useRouter()

    // get clients in the room
    useEffect(() => {
        if (conn == null) {
            router.push('/')
            return
        }

        const roomId = conn.url.split('/'[5])
        async function getUsers() {
            try {
                const res = await fetch(`${API_URL}/ws/getClients/${roomId}`, {
                    method: 'GET',
                    headers: { 'Content-Type': 'application/json' },
                })

                const data = await res.json()
                console.log('data: ', JSON.stringify(data))
                setUsers(data)
            } catch (e) {
                console.error(e)
            }
            getUsers()
        }
    }, []) 

    useEffect(() => {}, []) // handle websocket connection

    const sendMessage = () => {
        if (!textarea.current?.value) return
        if (conn == null) {
            router.push('/home')
            return
        }

        conn.send(textarea.current.value)
        textarea.current.value = ''
    }

  return (
    <div className='flex flex-col w-full'>
        <div className='px-4'>
            <ChatBody data={messages} />
        </div>
        <div className='fixed bottom-0 mt-4 w-full'>
            <div className='flex md:flex-row px-4 py-2 bg-gray-200 md:mx-4 rounded-md'>
                <div className='flex w-full mr-4 rounded-md border border-blue-500'>
                    <textarea 
                        ref={textarea}
                        placeholder='type your message here'
                        className='w-full h-10 p-2 rounded-md focus:outline-none bg-white'
                        style={{ resize: 'none' }}
                    />
                </div>
                <div className='flex items-center'>
                    <button 
                        className='p-2 rounded-md bg-blue-500 text-white'
                        onClick={sendMessage}
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default page