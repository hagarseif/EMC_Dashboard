import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../assets/global.css';

const EditTeam = ({ form, toggleFom, data }) => {

  // console.log('Data prop in EditService:', data);
  const { teamMemberId, name: initialName, image: initialImage,title: initialtitle } = data || {};

  

  const [name, setName] = useState(initialName || '');
  const [title, setTitle] = useState(initialtitle || '');
  const [image, setImage] = useState(initialImage || null);

  const handelInput = (e) => {
    setName(e.target.value);
  };
  const handelTitle = (e) => {
    setTitle(e.target.value);
  };

  const onhandeleditImage = (e) => {    
    setImage(e.target.files[0]);
  };

const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const handelEdit = (e) => {
    e.preventDefault();
    console.log('Name:', name);
    console.log('Icon:', image);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('title',title);
    formData.append('image',image);
    axios
      .put(`http://emc2db-001-site1.itempurl.com/api/TeamMember/UpdateMember/${teamMemberId}`, formData,config)
      .then((res) => {
        console.log(res.data);
        
      })
      .catch((err) => {
        console.log(err.response);
       
      });

    // Close the form after submission
    toggleFom();
  };

  useEffect(() => {
    // Reset form fields if data changes
    setName(initialName || '');
    setImage(initialImage || null);
  }, [initialName, initialImage,teamMemberId]);

  return (
    <>
      {form && (
        <div className="overlay min-h-screen flex items-center justify-center">
          <div className="form bg-white p-8 rounded shadow-md w-full max-w-md">
            <form className="popup" onSubmit={handelEdit}>
              <div className="mb-4">
                <label htmlFor="text-input" className="block text-sm font-bold text-gray-700">
                  Name:
                </label>
                <input
                  type="text"
                  id="text-input"
                  name="text-input"
                  placeholder="Enter Name"
                  className="w-full px-3 py-2 border rounded mt-1"
                  onChange={handelInput}
                  value={name}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="text-input" className="block text-sm font-bold text-gray-700">
                  Job Title:
                </label>
                <input
                  type="text"
                  id="text-input"
                  name="text-input"
                  placeholder="Enter Job Title"
                  className="w-full px-3 py-2 border rounded mt-1"
                  onChange={handelTitle}
                  value={title}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="file-input" className="block text-sm font-bold text-gray-700">
                  Image:
                </label>
                <input
                  type="file"
                  id="file-input"
                  name="file-input"
                  className="w-full px-3 py-2 border rounded mt-1"
                  onChange={onhandeleditImage}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Submit
              </button>
            </form>
            <button className="close-btn btn btn-danger py-0 px-2 rounded-t-sm" onClick={toggleFom}>
              x
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default EditTeam;

