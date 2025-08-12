import axios, { type AxiosResponse } from 'axios';
import type { NewUser } from '../types/Users/NewUser';
import type { LoginUser } from '../types/Users/LoginUser';
import type { User } from '../types/Users/User';
import  { API_URL } from '../constants/MiscConstants';


const AuthService = "authentication-service";
const RegisterEndpoint = "register";
const LoginEndpoint = "login";

const token = localStorage.getItem("authToken");

// GETTING CONFIRMING INFORMATION FROM DATABASE METHODS
export async function getAllUsernames(username: string) {
    return await axios.get(`${API_URL}/${AuthService}/${RegisterEndpoint}/checkUsername`,  {
        params: { username }
    });
}

export async function getUserInformation(token: string) {
    return await axios.get(`${API_URL}/${AuthService}/getUser`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function getUserByUsername(username:string){
    return await axios.get(`${API_URL}/${AuthService}/${RegisterEndpoint}/getUserByUsername`,{
        params: { username },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function getUserByUserId(userId: number): Promise<AxiosResponse<User>>{
    return await axios.get(`${API_URL}/${AuthService}/${RegisterEndpoint}/getUserByUserId`,{
        params: { userId },
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export async function getAllGenres(){
    return await axios.get(`${API_URL}/${AuthService}/${RegisterEndpoint}/getAllGenres`)
}


export async function getAllEmails(email: string) {
    return await axios.get(`${API_URL}/${AuthService}/${RegisterEndpoint}/checkEmail`, {
        params: { email }
    });
}


//REGISTERING NEW USER
export async function saveNewUser(newUser: NewUser){
    return await axios.post(`${API_URL}/${AuthService}/${RegisterEndpoint}`, newUser );
}


//LOGGING IN THE USER
export async function login(loginUser: LoginUser){
    return await axios.post(`${API_URL}/${AuthService}/${LoginEndpoint}`, loginUser );
}

//UPDATING THE EXISTING USER
export async function updateUserProfile(existingUser: User | null){
    return await axios.post(`${API_URL}/${AuthService}/${RegisterEndpoint}/updateUserProfile`, existingUser );
}

