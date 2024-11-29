import React, { useState, useEffect } from 'react';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const EditBook = () => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [publishYear, setPublishYear] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:5555/books/${id}`)
      .then((Response) => {
        setAuthor(Response.data.author);
        setPublishYear(Response.data.publishYear);
        setTitle(Response.data.title);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
        alert('An error happened. Please Check console');
        console.log(error);
      });
  }, [id]);

  const handleEditBook = () => {
    const data = {
      title,
      author,
      publishYear,
    };
    setLoading(true);
    axios
      .put(`http://localhost:5555/books/${id}`, data)
      .then(() => {
        setLoading(false);
        enqueueSnackbar('Book Edited successfully', { variant: 'success' });
        navigate('/');
      })
      .catch((error) => {
        setLoading(false);
        enqueueSnackbar('Error', { variant: 'error' });
        console.log(error);
      });
  };

  return (
    <div style={{ backgroundColor: '#d9b282', minHeight: '100vh', padding: '16px' }}>
      {/* BackButton at the top */}
      <BackButton />
      
      {/* Centered form container */}
      <div className="flex justify-center items-center mt-8">
        {loading ? (
          <Spinner />
        ) : (
          <div
            className="flex flex-col border-2 rounded-xl w-[600px] p-4"
            style={{ borderColor: '#5c2c09', backgroundColor: 'rgba(255, 255, 255, 0.8)' }}
          >
            <h1 className="text-3xl my-4 text-center">Edit Book</h1>
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Author</label>
              <input
                type="text"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>
            <div className="my-4">
              <label className="text-xl mr-4 text-gray-500">Publish Year</label>
              <input
                type="text"
                value={publishYear}
                onChange={(e) => setPublishYear(e.target.value)}
                className="border-2 border-gray-500 px-4 py-2 w-full"
              />
            </div>
            <button
            style={{ width: '100%' }}
            className="p-2 bg-[#5c2c09] text-white rounded-md"
            onClick={handleEditBook}
          >
            Save
          </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditBook;
