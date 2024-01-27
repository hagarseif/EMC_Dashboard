import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../../../assets/global.css';

const EditService = ({ form, toggleFom, data }) => {

  // console.log('Data prop in EditService:', data);
  const { serviceId, name: initialName, icon: initialIcon } = data || {};

  

  const [name, setName] = useState(initialName || '');
  const [icon, setIcon] = useState(initialIcon || null);

  const handelInput = (e) => {
    setName(e.target.value);
  };

  const onhandeleditIcon = (e) => {    
      setIcon(e.target.files[0]);
  };

const config = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };
  const handelEdit = (e) => {
    e.preventDefault();
    console.log('Name:', name);
    console.log('Icon:', icon);
    const formData = new FormData();
    formData.append('name', name);
    formData.append('icon',icon);
    console.log('Icon:', icon);
    axios
      .put(`http://emc2db-001-site1.itempurl.com/api/Serviece/UpdateService/${serviceId}`, formData,config)
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
    setIcon(initialIcon || null);
  }, [initialName, initialIcon,serviceId]);

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
                  placeholder="Edit Name"
                  className="w-full px-3 py-2 border rounded mt-1"
                  onChange={handelInput}
                  value={name}
                />
              </div>
              <div className="mb-4">
                <label htmlFor="file-input" className="block text-sm font-bold text-gray-700">
                  Icon:
                </label>
                <input
                  type="file"
                  id="file-input"
                  name="file-input"
                  className="w-full px-3 py-2 border rounded mt-1"
                  onChange={onhandeleditIcon}
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

export default EditService;

