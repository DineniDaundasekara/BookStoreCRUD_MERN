import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((Response) => {
        setBook(Response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

  return (
    <div
      className="relative"
      style={{ backgroundColor: '#d9b282', minHeight: '100vh' }}
    >
      {/* Position the BackButton in the top-left corner */}
      <div className="absolute top-4 left-4">
        <BackButton />
      </div>

      <div
        className="grid place-items-center"
        style={{ minHeight: 'calc(100vh - 2rem)' }}
      >
        <div
          className="flex flex-col border-2 rounded-xl w-fit p-4"
          style={{
            borderColor: '#5c2c09',
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
          }}
        >
          <h1 className="text-3xl my-4 text-center">Show Book</h1>
          {loading ? (
            <Spinner />
          ) : (
            <>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">Id</span>
                <span>{book._id}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">Title</span>
                <span>{book.title}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">Author</span>
                <span>{book.author}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">Publish Year</span>
                <span>{book.publishYear}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">Create Time</span>
                <span>{new Date(book.createdAt).toString()}</span>
              </div>
              <div className="my-4">
                <span className="text-xl mr-4 text-gray-500">
                  Last Update Time
                </span>
                <span>{new Date(book.updatedAt).toString()}</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShowBook;

