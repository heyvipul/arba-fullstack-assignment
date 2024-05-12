
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_SIGNUP = "USER_SIGNUP"

// const api = "https://arba-backend-1-z79g.onrender.com"
const api = "http://localhost:8000"

export const handleLogin = ({ userName, password}) => async (dispatch) => {
  try {
    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: userName,
        password: password
      })
    });
    const data = await response.json();
    if (response.ok) {
      localStorage.setItem('token', data.token); 
      localStorage.setItem("signup", JSON.stringify({
        userName : userName,
        email : data.userDoc.email,
        id : data.userDoc._id
      }));
      dispatch({ type: USER_LOGIN_SUCCESS, payload: data.token });
      alert("Login successfull")

    } else {
      console.log("Login failed: ", data.message);
      alert("Login failed")
    }

  } catch (error) {
    console.error("Login error: ", error);
    alert("Login in error")
  }
};



export const handleSignup = ({ fullName, userName, email, password }) => async (dispatch) => {
  try {
    const response = await fetch(`${api}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: fullName,
        userName: userName,
        email: email,
        password: password,
      }),
    });
    if (!response.ok) {
      throw new Error('Signup failed');
    }
    const data = await response.json();
    console.log(data);
    dispatch({ type: USER_SIGNUP, payload: data });
    alert("Signup successful! Please Login");
  } catch (error) {
    console.log('Signup failed:', error);

  }
}
