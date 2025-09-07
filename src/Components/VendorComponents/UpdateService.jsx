import { useState, useEffect } from "react";
import axios from "axios";
import "./UpdateService.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateService = () => {
  const vendorId = 1; // ✅ Replace with dynamic vendorId when needed

  const [services, setServices] = useState([]); // ✅ Store all services locally
  const [selectedServiceId, setSelectedServiceId] = useState(""); // ✅ Track selected service
  const [originalData, setOriginalData] = useState({}); // ✅ Store original service data
  const [formData, setFormData] = useState({}); // ✅ Store updated fields

  // ✅ Fetch all services for the vendor
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await axios.get(`http://localhost:8086/services/vendor/${vendorId}`,{withCredentials:true,});
        console.log("Fetched services:", response.data);
        setServices(response.data || []);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchServices();
  }, []);

  // ✅ Handle service selection from dropdown
  const handleServiceSelect = (e) => {
    const serviceId = e.target.value;
    setSelectedServiceId(serviceId);

    if (!serviceId) {
      setFormData({});
      setOriginalData({});
      return;
    }

    // ✅ Find selected service
    const selectedService = services.find(service => service.id.toString() === serviceId);
    if (selectedService) {
      setOriginalData(selectedService); // Store original data
      setFormData({}); // Reset formData (only store changed fields)
    }
  };

  // ✅ Handle form input changes (only store changed values)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  // ✅ Handle toggle button for Active/Inactive status
  const toggleActiveStatus = () => {
    setFormData((prev) => ({
      ...prev,
      status: (prev.status ?? originalData.status) === "Active" ? "Inactive" : "Active"
    }));
  };

  // ✅ Submit updated service details
  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ Merge updated fields with original data
    const updatedService = {
      ...originalData,
      ...formData,
      charges: parseFloat(formData.charges) || originalData.charges // Ensure charges is a number
    };

    try {
      await axios.put(`http://localhost:8086/updateService`, updatedService, {
        headers: { "Content-Type": "application/json" }
      });

      toast.success("Service Updated Successfully!");

      // ✅ Refresh the service list after update
      setServices(services.map(service => (service.id.toString() === selectedServiceId ? updatedService : service)));

      // ✅ Reset form and dropdown after update
      setSelectedServiceId("");
      setOriginalData({});
      setFormData({});

    } catch (error) {
      console.error("Error updating service:", error);
      alert("Failed to update service.");
    }
  };

  return (
    <div className="UpdateService">
         <ToastContainer 
              position="top-center" 
              autoClose={2000} 
              hideProgressBar={false} 
              newestOnTop={false} 
              closeOnClick 
              rtl={false} 
              pauseOnFocusLoss 
              draggable 
              pauseOnHover 
            />
      <div className="UpdateService-container">
        <h2 className="UpdateService-heading">Update Service</h2>

        {/* ✅ Service Selection Dropdown */}
        <label className="UpdateService-label">Select Service to Update</label>
        <select className="UpdateService-input" onChange={handleServiceSelect} value={selectedServiceId}>
          <option value="">-- Select a Service --</option>
          {services.map((service) => (
            <option key={service.id} value={service.id}>{service.serviceType}</option>
          ))}
        </select>

        {selectedServiceId && originalData.serviceType && (
          <form className="UpdateService-form" onSubmit={handleSubmit}>
            <label className="UpdateService-label">Service Image</label>
            <input
              className="UpdateService-input"
              type="text"
              name="image"
              value={formData.image ?? originalData.image}
              onChange={handleChange}
              required
            />

            <label className="UpdateService-label">Service Type</label>
            <input
              className="UpdateService-input"
              type="text"
              name="serviceType"
              value={formData.serviceType ?? originalData.serviceType}
              onChange={handleChange}
              required
            />

            <label className="UpdateService-label">Location</label>
            <input
              className="UpdateService-input"
              type="text"
              name="location"
              value={formData.location ?? originalData.location}
              onChange={handleChange}
              required
            />

            <label className="UpdateService-label">Charges</label>
            <input
              className="UpdateService-input"
              type="number"
              step="0.01"
              name="charges"
              value={formData.charges ?? originalData.charges}
              onChange={handleChange}
              required
            />

            {/* ✅ Toggle Button for Active/Inactive */}
            <label className="UpdateService-label">Active Status</label>
            <button
              type="button"
              className={`UpdateService-toggle ${(formData.status ?? originalData.status) === "Active" ? "active" : "inactive"}`}
              onClick={toggleActiveStatus}
            >
              {(formData.status ?? originalData.status) === "Active" ? "ON" : "OFF"}
            </button>

            <label className="UpdateService-label">Timing</label>
            <input
              className="UpdateService-input"
              type="text"
              name="timing"
              value={formData.timing ?? originalData.timing}
              onChange={handleChange}
            />

            <label className="UpdateService-label">Description</label>
            <textarea
              className="UpdateService-textarea"
              name="description"
              value={formData.description ?? originalData.description}
              onChange={handleChange}
            ></textarea>

            <button type="submit" className="UpdateService-button">Update Service</button>
          </form>
        )}
      </div>
    </div>
  );
};

export default UpdateService;