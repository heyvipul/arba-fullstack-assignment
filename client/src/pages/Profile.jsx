import React, { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { useSelector } from 'react-redux';
import toast, { Toaster } from "react-hot-toast"


const Profile = () => {
  const [login, setLogin] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { isAuthenticated } = useSelector((store) => store.userReducer);
  const [showPopup, setshowPopup] = useState(false)
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const signupDetails = JSON.parse(localStorage.getItem("signup")) || null;;
  // console.log(signupDetails);
  if (signupDetails) {
    var { userName, email, id } = signupDetails;
  }

  const handleAccept = () => {
    localStorage.setItem('hasAccepted', true);
    setShowDialog(false);
  };

  const handleCancel = () => {
    setShowDialog(false);
  };

  const handleSeeTC = () => {
    setShowDialog(true);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      if (newPassword !== confirmNewPassword) {
        return toast.error("New password and confirm password do not match!");
      }
      const response = await fetch(`http://localhost:8000/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          currentPassword,
          newPassword,
        }),
      });
      toast.success("Password change successfully!");
      setshowPopup(false)
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      console.error("Error updating password:", error);
      toast.error("Failed to update password. Please try again.");
      setshowPopup(false)
    }
  };

  if (isAuthenticated && signupDetails) {
    return (
      <>
        <Toaster />
        <div className='profile-div'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6-YwrVVjOv028wj9HZ_0_GUizZdQhoxB_C2Q_0yfYgA&s" alt="" />
          <h4 style={{ marginBottom: "-15px" }}>{userName || "User"}</h4>
          <p>{email || "user@gmail.com"}</p>
          <button>Update Profile</button>
          <div>
            <button onClick={handleSeeTC}>See T&C</button>
            <button onClick={() => setshowPopup(true)}>Change Password</button>
          </div>
        </div>
        {showDialog && (
          <>
            <div className="popup-background"></div>
            <div className="popup">
              <div className="dialog-content">
                <h2>Terms & Conditions</h2>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore quidem enim exercitationem modi eligendi in soluta excepturi illum consequuntur accusamus suscipit voluptate ipsum quod pariatur nesciunt ex quas omnis molestiae recusandae quo beatae, repudiandae culpa? Nemo, qui fugiat? Vel soluta saepe accusantium officiis, rerum sunt commodi corporis dicta et asperiores.
                </p>
                <div className='popup-btns'>
                  <button onClick={handleCancel}>Cancel</button>
                  <button onClick={handleAccept}>Accept</button>
                </div>
              </div>
            </div>
          </>
        )}
        {showPopup && (
          <React.Fragment>
            <div className='backdrop' ></div>
            <div className='store-add-div'>
              <form onSubmit={handleChangePassword}>
                <h2>Change Password</h2>
                <input
                  type="password"
                  placeholder="Current Password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <input
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                />
                <button style={{
                  padding: "6px",
                  backgroundColor: "rgb(0,171,197)",
                  border: "none",
                  color: "white",
                  fontWeight: "bold",
                  cursor: "pointer"
                }} type="submit">Change Password</button>
              </form>
              <div>
                <button style={{ marginTop: "20px", cursor: "pointer", backgroundColor: "rgb(0, 171, 197)", border: "none", color: "white", fontWeight: "bold" }} onClick={() => setshowPopup(false)}>Cancel</button>
              </div>
            </div>
          </React.Fragment>
        )}
      </>
    );
  }

  else return (
    <>
      {login ? <Signup login={login} setLogin={setLogin} /> : <Login login={login} setLogin={setLogin} />}
    </>
  );
};

export default Profile;
