import { useState } from 'react';
import { createParkingSpot } from '../services/api';
import { useNavigate } from 'react-router-dom';

const ParkingForm = ({ onAdd }) => {

   const navigate = useNavigate();
  const [formData, setFormData] = useState({
    parkingSpotNumber: '',
    licensePlateCar: '',
    brandCar: '',
    modelCar: '',
    colorCar: '',
    responsibleName: '',
    apartment: '',
    block: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'licensePlateCar' && value.length > 7) return;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createParkingSpot(formData);
      onAdd();
      setFormData({
        parkingSpotNumber: '',
        licensePlateCar: '',
        brandCar: '',
        modelCar: '',
        colorCar: '',
        responsibleName: '',
        apartment: '',
        block: '',
      });
       navigate('/dashboard');
    } catch (error) {
      alert('Error creating parking spot', error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700">Número da vaga de estacionamento</label>
        <input type="text" name="parkingSpotNumber" value={formData.parkingSpotNumber} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Placa de carro (7 caracteres)</label>
        <input type="text" name="licensePlateCar" value={formData.licensePlateCar} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" maxLength="7" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Brand Car</label>
        <input type="text" name="brandCar" value={formData.brandCar} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Model Car</label>
        <input type="text" name="modelCar" value={formData.modelCar} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Color Car</label>
        <input type="text" name="colorCar" value={formData.colorCar} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Responsible Name</label>
        <input type="text" name="responsibleName" value={formData.responsibleName} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Apartment</label>
        <input type="text" name="apartment" value={formData.apartment} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700">Block</label>
        <input type="text" name="block" value={formData.block} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" required />
      </div>
      <button type="submit" className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700">Add Parking Spot</button>
    </form>
  );
};

export default ParkingForm;
