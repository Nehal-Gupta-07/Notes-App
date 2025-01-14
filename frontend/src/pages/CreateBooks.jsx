import React , {useState}from 'react'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'

const CreateBook = () => {
  const [title,setTitle] = useState('');
  const [person,setPerson] = useState('');
  const [deadline,setDeadline] = useState('');
  const [description,setDescription] = useState('');
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate();
  const handleSaveBook = ()=>{
    const data ={
      title,
      person,
      deadline,
      description
    };
    setLoading(true);
    axios
      .post('http://localhost:5555/books',data)
      .then(()=>{
        setLoading(false);
        navigate('/');
      })
      .catch((error)=>{
        console.log(error);
        setLoading(false);
      })
  };

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className='text-3xl my-4'>Create Note</h1>
      {loading? <Spinner/> : ''}
      <div className='flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto'>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Title</label>
          <input 
            type="text"
            value={title}
            onChange={(e)=>setTitle(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' 
            />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>People</label>
          <input 
            type="text"
            value={person}
            onChange={(e)=>setPerson(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' 
            />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Deadline</label>
          <input 
            type="date"
            value={deadline}
            onChange={(e)=>setDeadline(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' 
            />
        </div>
        <div className='my-4'>
          <label className='text-xl mr-4 text-gray-500'>Description</label>
          <input 
            type="text"
            value={description}
            onChange={(e)=>setDescription(e.target.value)}
            className='border-2 border-gray-500 px-4 py-2 w-full' 
            />
        </div>
        <button className='p-2 bg-sky-300 m-8' onClick={handleSaveBook}>
          Save
        </button>
      </div>
    </div>
  )
}

export default CreateBook