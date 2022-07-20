   
   import jwt_decode from "jwt-decode";

   const setToken = (token) => {
    localStorage.setItem("auth_token", token);
    

}

const clearToken  = () => {
    localStorage.clear();
}

const checkAuthenticated = () => {
    const token = localStorage.getItem("auth_token");
    if(token == null) {
        return false;
    }
    const currentEpoch = Math.round(new Date().getTime()/1000)
    const decoded = decodeToken(token);
    const expTime = decoded['exp']
    if( expTime > currentEpoch) {
        return true;
    }
    return false;

}

const getToken = () => {
   return localStorage.getItem("auth_token");
    
}

const decodeToken = (token) => {
    return jwt_decode(token)  

}

export default checkAuthenticated ;
export  { setToken, clearToken, getToken, decodeToken};