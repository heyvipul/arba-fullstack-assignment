
export const USER_LOGOUT = "USER_LOGOUT";
export const USER_LOGIN_REQUEST = "USER_LOGIN_REQUEST";
export const USER_LOGIN_SUCCESS = "USER_LOGIN_SUCCESS";
export const USER_SIGNUP = "USER_SIGNUP"
const api = "https://arba-backend-1-z79g.onrender.com"
const token = "dfhkcjknxykesjhiuvcnkesdd"


export const handleLogin = ({userName,password}) => async(dispatch)  => {
    try {
        dispatch({type : USER_LOGIN_REQUEST})
        const response = await fetch(`${api}/login`,{
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({userName,password}),
        })
        const data = await response.json();
        console.log({data:data});

        localStorage.setItem('token',token);

        dispatch({type : USER_LOGIN_SUCCESS, payload : data})
        alert("Login successful")
        
    } catch (error) {
        console.log({loginerror:error});
    }
}

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
  