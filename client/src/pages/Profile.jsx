import React, { useState } from 'react';
import Login from '../components/Login';
import Signup from '../components/Signup';
import { useSelector } from 'react-redux';

const Profile = () => {
  const [login, setLogin] = useState(false);
  const [showDialog, setShowDialog] = useState(false);
  const { isAuthenticated } = useSelector((store) => store.userReducer);

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

  if (isAuthenticated) {
    return (
      <>
        <div className='profile-div'>
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6-YwrVVjOv028wj9HZ_0_GUizZdQhoxB_C2Q_0yfYgA&s" alt="" />
          <h4 style={{ marginBottom: "-15px" }}>User 1</h4>
          <p>Lorem ipsum dolor sit amet.</p>
          <button>Update Profile</button>
          <div>
            <button onClick={handleSeeTC}>See T&C</button>
            <button>Change Password</button>
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
      </>
    );
  }

  return (
    <>
      {login ? <Signup login={login} setLogin={setLogin} /> : <Login login={login} setLogin={setLogin} />}
    </>
  );
};

export default Profile;
