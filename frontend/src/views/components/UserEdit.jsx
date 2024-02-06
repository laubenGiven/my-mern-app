// Assuming you have a UserEdit component
const UserEdit = ({ userId, isLoggedIn }) => {
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      role: '',
      password: '',
      photo: null,
    });
  
    const [editStatus, setEditStatus] = useState(null);
  
    const handleInputChange = (e) => {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    };
  
    const handleFileChange = (e) => {
      setFormData({
        ...formData,
        photo: e.target.files[0],
      });
    };
  
    const handleUserEdit = async () => {
      if (isLoggedIn) {
        try {
          const data = new FormData();
          data.append('firstName', formData.firstName);
          data.append('lastName', formData.lastName);
          data.append('email', formData.email);
          data.append('role', formData.role);
          data.append('password', formData.password);
          if (formData.photo) {
            data.append('photo', formData.photo);
          }
  
          const response = await axios.put(`http://localhost:5000/api/users/edit/${userId}`, data, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
  
          console.log(response.data);
          setEditStatus('success');
  
          // Optionally, you can perform additional actions or update the UI
        } catch (error) {
          console.error(error.response.data);
          setEditStatus('error');
        }
      } else {
        console.log('User not logged in');
      }
    };
  
    return (
      <div>
        {editStatus === 'success' && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Success!</strong>
            <span className="block sm:inline"> User updated successfully.</span>
          </div>
        )}
  
        {editStatus === 'error' && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> Unable to update user. Please try again.</span>
          </div>
        )}
  
        {/* Your input fields for user details */}
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleInputChange}
          placeholder="First Name"
          className="p-2 border rounded shadow-sm"
          required
        />
        {/* ... other input fields ... */}
        <input
          ref={fileInputRef}
          type="file"
          name="photo"
          onChange={handleFileChange}
          className="p-2 border rounded shadow-sm"
        />
  
        <button onClick={handleUserEdit} className="p-2 bg-green-500 text-white rounded hover:bg-green-700">
          Edit User
        </button>
      </div>
    );
  };
  
  export default UserEdit;
  