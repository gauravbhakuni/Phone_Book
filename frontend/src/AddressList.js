import React from 'react';

const AddressList = ({ addresses, fetchAddresses, setSelectedAddress }) => {
  const handleDelete = async (id) => {
    await fetch(`/api/address/${id}`, {
      method: 'DELETE',
    });
    fetchAddresses();
  };

  return (
    <ul>
      {addresses.map((address) => (
        <li key={address._id}>
          <div>
            <strong>{address.name}</strong>
            <br />
            {address.phone}
            <br />
            {address.email}
          </div>
          <div>
            <button className="edit" onClick={() => setSelectedAddress(address)}>Edit</button>
            <button className="delete" onClick={() => handleDelete(address._id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default AddressList;
