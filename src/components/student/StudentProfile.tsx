import React, { useState } from "react";

const StudentProfile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [studentInfo, setStudentInfo] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "(555) 555-5555",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudentInfo({ ...studentInfo, [name]: value });
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    console.log("Saved student info:", studentInfo); 
    setIsEditing(false); 
  };
  
  return (
    <div style={styles.container}>
      <div style={styles.profileHeader}>
        <img
          src="https://via.placeholder.com/150"
          alt="Student Avatar"
          style={styles.avatar}
        />
        <div>
          <h2 style={styles.name}>{studentInfo.name}</h2>
        </div>
      </div>
      <div style={styles.detailsSection}>
        <h3 style={styles.sectionTitle}>Profile Details</h3>
        <div style={styles.detailItem}>
          <strong>Email:</strong> {studentInfo.email}
        </div>
        <div style={styles.detailItem}>
          <strong>Phone:</strong> {studentInfo.phone}
        </div>
        <div style={styles.detailItem}>
          <strong>Member since:</strong> January 2023
        </div>
      </div>
      <div style={styles.editSection}>
        <button onClick={toggleEdit} style={styles.editButton}>
          {isEditing ? "Cancel" : "Edit Profile"}
        </button>
        {isEditing && (
           <form onSubmit={handleSubmit} style={styles.editForm as React.CSSProperties}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="name"
                value={studentInfo.name}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="email"
                value={studentInfo.email}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <div>
              <label>Phone:</label>
              <input
                type="text"
                name="phone"
                value={studentInfo.phone}
                onChange={handleChange}
                style={styles.input}
              />
            </div>
            <button type="submit" style={styles.saveButton}>
              Save Changes
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "800px",
    margin: "20px auto",
    padding: "20px",
    backgroundColor: "#ffffff",
    borderRadius: "10px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    fontFamily: "'Arial', sans-serif",
  },
  profileHeader: {
    display: "flex",
    alignItems: "center",
    borderBottom: "2px solid #f1f1f1",
    paddingBottom: "15px",
    marginBottom: "20px",
  },
  avatar: {
    borderRadius: "50%",
    width: "120px",
    height: "120px",
    marginRight: "20px",
    border: "3px solid #007bff",
  },
  name: {
    fontSize: "28px",
    fontWeight: "600",
    color: "#333",
    margin: 0,
  },
  bio: {
    fontSize: "16px",
    color: "#555",
  },
  detailsSection: {
    marginBottom: "20px",
  },
  sectionTitle: {
    fontSize: "22px",
    fontWeight: "500",
    color: "#007bff",
    marginBottom: "10px",
  },
  detailItem: {
    fontSize: "16px",
    marginBottom: "5px",
    color: "#333",
  },
  courseSection: {
    marginBottom: "20px",
  },
  courseList: {
    listStyleType: "none",
    padding: 0,
  },
  courseItem: {
    background: "#f7f9fc",
    padding: "10px",
    marginBottom: "8px",
    borderRadius: "5px",
  },
  editSection: {
    marginTop: "20px",
  },
  editButton: {
    padding: "10px 15px",
    backgroundColor: "#007bff",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "15px",
  },
  editForm: {
    display: "flex",
    flexDirection: "column",
  },
  input: {
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  saveButton: {
    padding: "10px",
    backgroundColor: "#28a745",
    color: "#ffffff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default StudentProfile;
