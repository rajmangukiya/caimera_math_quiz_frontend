import { io } from "socket.io-client";
import { SOCKET_URL } from "../constant";
import { useState, useEffect } from "react";

const Question = () => {
  const [question, setQuestion] = useState<string | null>(null);
  const socket = io(SOCKET_URL);
  
  socket.on('question', (question: string) => {
    setQuestion(question);
  });
  
  useEffect(() => {
    socket.emit('getQuestion');
  }, []);

  return (  
    <div>What is {question}?</div>
  )
}

export default Question