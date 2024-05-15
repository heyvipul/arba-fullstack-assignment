import React, { useEffect, useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { useSelector } from 'react-redux';
import toast, { Toaster } from "react-hot-toast"


const Profile = () => {
  const [login, setLogin] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const [showPopup, setshowPopup] = useState(false)
  const [avatarPopup, setAvatarPopup] = useState(false)
  const { isAuthenticated } = useSelector((store) => store.userReducer);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const signupDetails = JSON.parse(localStorage.getItem("signup")) || null;
  // console.log(signupDetails);
  if (signupDetails) {
    var { userName, email, id, avatar } = signupDetails;
  }

  const [avatarNew, setAvatarNew] = useState(avatar)
  const [selectedFile, setSelectedFile] = useState(null);
  // console.log(avatar);

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


  //function for upload image 

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    // console.log(selectedFile);
    if (!selectedFile) {
      return toast.error("file is empty!")
    };
    const formData = new FormData();
    formData.append('avatar', selectedFile);
    formData.append('userId', id); 

    try {
      const response = await fetch('https://arba-backend-j9r7.onrender.com/update-avatar', {
        method: 'POST',
        body: formData,
      });
      const data = await response.json();
      console.log(data);
      toast.success("avatar updated successfully!")
      if (data.avatar) {
        setAvatarNew(data.avatar); // Update the avatar in state
        localStorage.setItem("signup", JSON.stringify({
          ...signupDetails,
          avatar: data.avatar
        }));
        setAvatarPopup(false); // Close the popup
      }
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };


  //function for change password
  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      if (newPassword !== confirmNewPassword || newPassword === "" || currentPassword === "") {
        return toast.error("Password not match!");
      }
      const response = await fetch(`https://arba-backend-j9r7.onrender.com/user/${id}`, {
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
          <img
            src={avatarNew ? `https://arba-backend-j9r7.onrender.com${avatarNew}` : "https://cdn-icons-png.freepik.com/256/149/149071.png?semt=ais_hybrid"}
            alt="avatar.img" />
          <h4 style={{ marginBottom: "-15px" }}>{userName || "User"}</h4>
          <p>{email || "user@gmail.com"}</p>
          <button onClick={() => setAvatarPopup(true)}>Update Avatar</button>
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
        {avatarPopup && (
          <React.Fragment>
            <div className='backdrop' ></div>
            <div className='store-add-div'>
              <form onSubmit={handleFileUpload}>
                <input type="file" onChange={handleFileChange} />
                <button style={{ marginTop: "20px", cursor: "pointer", backgroundColor: "rgb(0, 171, 197)", border: "none", color: "white", fontWeight: "bold" }} type="submit">Upload</button>
              </form>
              <div>
                <button style={{ marginTop: "20px", cursor: "pointer", backgroundColor: "rgb(0, 171, 197)", border: "none", color: "white", fontWeight: "bold" }} onClick={() => setAvatarPopup(false)}>Cancel</button>
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
