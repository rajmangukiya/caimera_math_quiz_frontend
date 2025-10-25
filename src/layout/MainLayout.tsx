import axios from 'axios';
import { useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import { API_URL } from '../constant';

axios.defaults.withCredentials = true;

export const MainLayout = () => {
    const [user, setUser] = useState<{
        id: number;
        score: number;
        createdAt: string;
    } | null>(null);

    const getUser = async () => {
        const user = await axios.get(`${API_URL}/user`);
        setUser(user.data.user as {
            id: number;
            score: number;
            createdAt: string;
        });
    }

    useEffect(() => {
        getUser();
    }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="bg-black border-b border-gray-800 shadow-lg">
        <div className="px-6 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-white ">User: <span className="text-blue-500 text-sm">{user?.id}</span></h1>
          <h1 className="text-2xl font-bold text-white ">Welcome to Live Quiz</h1>
          <h1 className="text-2xl font-bold text-white ">Score: {user?.score}</h1>
        </div>
      </div>
      
      <div className="flex-1 overflow-auto bg-gray-50">
        <Outlet context={{ getUser }} />
      </div>
    </div>
  );
};
