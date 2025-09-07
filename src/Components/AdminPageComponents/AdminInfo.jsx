import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';
import { FaUsers, FaUserTie, FaFileAlt, FaCheckCircle } from 'react-icons/fa';
import './AdminInfo.css';
import axios from 'axios';
import { useEffect,useState } from 'react';


function AdminInfo() {
  const [usersCount, setUsersCount] = useState(84198);  // Set initial value (change if dynamic)
  const [recruitersCount, setRecruitersCount] = useState(0);
  const [pendingVerifications, setPendingVerifications] = useState(0);
  const [reportsCount, setReportsCount] = useState(0);


  useEffect(() => {
    axios.get("http://localhost:8086/applicant/count")
      .then(response => setUsersCount(response.data))
      .catch(error => console.error("Error fetching user count:", error));

    // Fetch recruiter count
    axios.get("http://localhost:8086/recruiter/count")
      .then(response => setRecruitersCount(response.data))
      .catch(error => console.error("Error fetching recruiter count:", error));
      axios.get("http://localhost:8086/unverified/count")
      .then(response => setPendingVerifications(response.data))
      .catch(error => console.error("Error fetching pending verifications:", error));
      axios.get("http://localhost:8086/reports/count") // 👈 New API call
      .then(response => setReportsCount(response.data))
      .catch(error => console.error("Error fetching reports count:", error));
  }, []);

  const activeUsers = usersCount + recruitersCount;

  const data = [
    { name: 'Users', value: usersCount },
    { name: 'Recruiters', value: recruitersCount },
  ];
  
  const COLORS = ['#3498DB', '#E74C3C'];
  return (
    <div className="admin-info-container">
      <div className="admin-card admin-users">
        <FaUsers size={24} />
        <h3 className="admin-card-title">Applicants</h3>
        <p className="admin-card-value">{usersCount.toLocaleString()}</p>
      </div>
      <div className="admin-card admin-recruiters">
        <FaUserTie size={24} />
        <h3 className="admin-card-title">RECRUITERS</h3>
        <p className="admin-card-value">{recruitersCount.toLocaleString()}</p>
      </div>
      <div className="admin-card admin-reports">
        <FaFileAlt size={24} />
        <h3 className="admin-card-title">REPORTS</h3>
        <p className="admin-card-value">{reportsCount.toLocaleString()}</p>
      </div>
      <div className="admin-card admin-verifications">
        <FaCheckCircle size={24} />
        <h3 className="admin-card-title">PENDING VERIFICATIONS</h3>
        <p className="admin-card-value">{pendingVerifications.toLocaleString()}</p>
      </div>
      
      <div className="admin-chart-container">
        <h3 className="admin-chart-title">Active Users</h3>
        <div className="admin-chart-wrapper">
          <PieChart width={500} height={300}>
            <Pie data={data} dataKey="value" outerRadius={100} fill="#8884d8">
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
          </PieChart>
          <div className="admin-chart-overlay">
            <p>Active Users</p>
            <p>{activeUsers}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminInfo;
