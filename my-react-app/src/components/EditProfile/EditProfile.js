import './EditProfile.css';

function EditProfile() {
    return (
      <div className="EditProfile">
        <form action="">
          <div className="profLabel">
            <h1>Edit Profile</h1>
          </div>
  
          <div className="form-group">
            <label className="labele">First Name:</label>
            <input type="text" clasName="input-field" id="name" name="name" />
          </div>
  
          <div className="form-group">
            <label className="labele">Last Name:</label>
            <input type="text" clasName="input-field" id="name1" name="name1" />
          </div>
  
          <div className="form-group">
            <label className="labele">Email Address:</label>
            <input type="text" clasName="input-field" id="email" name="email" />
          </div>
  
          <div className="form-group">
            <label className="labele">Phone Number:</label>
            <input type="text" clasName="input-field" id="phone" name="phone" />
          </div>
  
          <div className="form-group">
            <label className="labele">Home Address:</label>
            <input type="text" clasName="input-field" id="address" name="address" />
          </div>
  
          <div className="form-group">
            <label className="labele">City:</label>
            <input type="text" clasName="input-field" id="city" name="city" />
          </div>
  
          <div className="form-group">
            <label className="labele">State:</label>
            <input type="text" clasName="input-field" id="state" name="state" />
          </div>
  
          <div className="form-group">
            <label className="labele">Zip Code:</label>
            <input type="text" clasName="input-field" id="zip" name="zip" />
          </div>
  
          <div className="input-container">
            <button type="submit">Update Information</button>
          </div>
        </form>
      </div>
    );
  }
  
  

export default EditProfile;