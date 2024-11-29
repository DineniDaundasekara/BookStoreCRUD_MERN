import React, { useEffect, useState} from 'react';
import axios from 'axios';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import { AiOutlineEdit } from 'react-icons/ai';
import { BsInfoCircle } from 'react-icons/bs';
import { MdOutlineAddBox, MdOutlineDelete } from 'react-icons/md';
import BooksTable from '../components/home/BooksTable';
import BookCard from '../components/home/BookCard';
const Home = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showType, setShowType] = useState('table');
  useEffect(() => {
    setLoading(true);
    axios
    .get('http://localhost:5555/books')
    .then((Response) =>{
      setBooks(Response.data.data);
      setLoading(false);
    })
    .catch ((error) => {
      console.log(error);
      setLoading(false);

    });
  }, []);
  return (
    <div
    className="min-h-screen p-2 bg-cover bg-center flex justify-start items-start" 
      style={{
        backgroundImage: "url('/src/images/background3.gif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Main container to center everything */}
      <div className="flex flex-col justify-center items-center w-full">
        
        {/* Buttons outside the transparent background box */}
        <div className="flex justify-center items-center gap-x-10 mb-4">
        <button
          className="px-8 py-4 rounded-lg"
          style={{
            backgroundColor: '#5c2c09',
            color: 'white',
          }}
          onClick={() => setShowType('table')}
        >
          Table
        </button>
        <button
          className="px-8 py-4 rounded-lg"
          style={{
            backgroundColor: '#5c2c09',
            color: 'white',
          }}
          onClick={() => setShowType('card')}
        >
          Card
        </button>
        </div>

        {/* Transparent box containing the main content */}
        <div className="w-full max-w-7xl bg-white bg-opacity-70 rounded-lg p-8 shadow-lg">
          <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl text-black">Book List</h2><br/>

            <h1 className="text-3xl text-black">WELCOME ADMIN!</h1><br/>
            <Link to="/books/create">
              <MdOutlineAddBox className="text-[#5c2c09] text-4xl" />
            </Link>
          </div>

          {/* Conditional rendering based on the selected view type */}
          {loading ? (
            <Spinner />
          ) : showType === 'table' ? (
            <BooksTable books={books} />
          ) : (
            <BookCard books={books} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;