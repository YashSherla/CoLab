import { useEffect, useState } from "react"
import { io } from "socket.io-client"

const socket = io('http://localhost:3000')
export const RealTime = () =>{
    const [message,setMessage] = useState<string[]>([]);
    const [task,setTask] = useState<string[]>([]);
    const [input,setInput] = useState('');

    useEffect(()=>{
        socket.on('message',(msg)=>{
            const updateMessages = (prevMessages:any) => [...prevMessages, msg];
            setMessage(updateMessages)
            localStorage.setItem('messages', JSON.stringify(updateMessages));
        })
        socket.on('taskCreated',(task)=>{
            const updateTask = (pre:any)=>[...pre,task];
           setTask(updateTask)
           localStorage.setItem('tasks', JSON.stringify(updateTask));
        })
        return () =>{
            socket.off('message')
            socket.off('taskCreated')
        }
    },[])
    const sendMessage = () =>{
       if (input.trim()) {
        socket.emit('message',input)
        setInput('')
       }
    }
    return <div className="flex flex-col items-center space-y-3">
        <h1>Socket.IO Chat</h1>
        <div>
            {
                task.map((task:any,_)=>{
                    return <div key={_}>
                        <h1>{task.name}</h1>
                        <p>{task.description}</p>
                        <p>{task.deadline}</p>
                    </div>
                })
            }
        </div>
        <div>
            {
                message.map((msg:any,_)=>{
                    return <div key={_}>
                        {msg}
                    </div>
                })
            }
        </div>
        <div className="flex flex-col w-min space-y-4">
            <input type="text" onChange={(e)=>setInput(e.target.value)} className="border-2 p-2 border-blue-400 rounded" placeholder="Enter your message.."/>
            <button onClick={sendMessage} className="border-2 p-3 bg-red-400">Send Message</button>
        </div>
    </div>
}
