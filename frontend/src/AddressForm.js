import React, { useState, useEffect } from 'react';

const AddressForm = ({ selectedAddress, fetchAddresses }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    if (selectedAddress) {
      setName(selectedAddress.name);
      setPhone(selectedAddress.phone);
      setEmail(selectedAddress.email);
    }
  }, [selectedAddress]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newAddress = { name, phone, email };

    if (selectedAddress) {
      // Update address
      await fetch(`/api/address/${selectedAddress._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAddress),
      });
    } else {
      // Create new address
      await fetch('/api/address', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAddress),
      });
    }

    fetchAddresses();
    setName('');
    setPhone('');
    setEmail('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <button type="submit">{selectedAddress ? 'Update' : 'Add'}</button>
    </form>
  );
};

export default AddressForm;
