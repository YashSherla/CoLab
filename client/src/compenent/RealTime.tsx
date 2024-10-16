import { useEffect, useState } from "react"
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://localhost:3000";
export const RealTime = () =>{
    // const [task,setTasks] = useState([]);
    // useEffect(() => {
    //     socket.on('taskUpdated', (updatedTask) => {
    //         console.log('Task updated:', updatedTask);
    //         setTasks((prevTasks:any) =>
    //             prevTasks.map((task:any) => (task._id === updatedTask._id ? updatedTask : task))
    //         );
    //     });
    //     return () => {
    //         socket.off('taskUpdated');
    //     };
    // }, []);
    const [response, setResponse] = useState("");
    useEffect(() => {
        const socket = socketIOClient(ENDPOINT);
        socket.on("FromAPI", data => {
        setResponse(data);
        });

    }, []);
    return <div>
       {response}
    </div>
}

