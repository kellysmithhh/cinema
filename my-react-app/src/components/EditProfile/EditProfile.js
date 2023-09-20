import './EditProfile.css';

function EditProfile() {
    return (
       <div className="EditProfile">
             <form-group action="">
                <div className="profLabel">
                    <h1>Edit Profile</h1>
                </div>
                <div class="formg">
                    <labele className="labele">First Name: </labele>
                    <input type="text" id="name" name="name"></input>
                </div>
                
                <div class="formg"> 
                    <labele className="labele">Last Name: </labele>
                    <input type="text" id="name1" name="name1"></input>
                </div>

                <div class="formg">
                    <labele className="labele">Last Name: </labele>
                    <input type="text" id="name1" name="name1"></input>
                </div>

                <div class="formg">
                    <labele className="labele">Last Name: </labele>
                    <input type="text" id="name1" name="name1"></input>
                </div>


                <div class="formg">
                    <labele className="labele">Email Address: </labele>
                    <input type="text" id="email" name="email"></input>
                </div>


                <div class="formg"> 
                    <labele className="labele">Phone Number: </labele>
                    <input type="text" id="phone" name="phone"></input>
                </div>


               
                <div class="formg"> 
                    <labele className="labele">Home Address: </labele>
                    <input type="text" id="address" name="address"></input>
                </div>


                <div class="formg"> 
                    <labele className="labele">City: </labele>
                    <input type="text" id="city" name="city"></input>
                </div>

                
                <div class="formg"> 
                    <labele className="labele">State: </labele>
                    <input type="text" id="state" name="state"></input>
                </div>

                <div class="formg"> 
                    <labele className="labele">Zip Code: </labele>
                    <input type="text" id="zip" name="zip"></input>
                </div>

               
                

                

                <div className="input-container">
                    <button type="submit">Update Information</button>
                </div>
             </form-group>
       </div>
    );
}

export default EditProfile;