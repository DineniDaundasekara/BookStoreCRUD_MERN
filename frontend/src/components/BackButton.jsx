import { Link } from 'react-router-dom';
import { BsArrowLeft } from 'react-icons/bs';

const BackButton = ({ destination= '/' }) => {
  return (
    <div className='flex'>
        <Link 
        to={destination}
        className='bg-[#5c2c09] text-white px-4 py-1 rounded-1g w-fit'
        >
            <BsArrowLeft className='text-2xl' />
        </Link>

    </div>
  )
}

export default BackButton