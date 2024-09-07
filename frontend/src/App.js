import React, { useState, useEffect } from 'react';
import AddressForm from './AddressForm';
import AddressList from './AddressList';
import './style.css'; // Import the CSS file

const App = () => {
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);

  const fetchAddresses = async () => {
    try {
      const response = await fetch('/api/address');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setAddresses(data);
    } catch (error) {
      console.error('Failed to fetch addresses:', error);
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return (
    <div className="container">
      <h1>Address Book</h1>
      <AddressForm
        selectedAddress={selectedAddress}
        fetchAddresses={fetchAddresses}
      />
      <AddressList
        addresses={addresses}
        fetchAddresses={fetchAddresses}
        setSelectedAddress={setSelectedAddress}
      />
    </div>
  );
};

export default App;
