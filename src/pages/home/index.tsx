import { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../constant';
import Question from '../../components/Question';
import { useOutletContext } from 'react-router';

export const Home = () => {
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState<string | null>(null);
  const { getUser } = useOutletContext<{ getUser: () => void }>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await axios.patch(`${API_URL}/quiz/check-answer`, {
      answer: answer,
    });
    
    if (response.data.isCorrect) {
      setResult('Correct! 🎉');
      getUser();
    } else {
      setResult(`Incorrect`);
    }
  };

  const isValidNumber = (value: string) => /^-?\d*\.?\d{0,2}$/.test(value);

  const setAnswerHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (isValidNumber(e.target.value)) {
      setAnswer(e.target.value);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-8 text-center">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full border border-gray-200">
        <h2 className="mb-6 text-2xl font-semibold text-gray-800">
          <Question />
        </h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            value={answer}
            onChange={setAnswerHandler}
            placeholder="Enter your answer"
            className="px-3 py-3 text-base rounded-lg border border-gray-300 bg-white text-gray-800 text-center focus:outline-none"
            required
          />
          
          <button
            type="submit"
            className="px-6 py-3 text-base font-semibold text-white bg-black border-none rounded-lg cursor-pointer focus:bg-gray-600"
          >
            Submit Answer
          </button>
        </form>
        
        {result && (
          <div className={`mt-4 p-3 rounded-lg text-white font-medium ${
            result.includes('Correct') 
              ? 'bg-green-500' 
              : 'bg-red-500'
          }`}>
            {result}
          </div>
        )}
      </div>
    </div>
  );
};