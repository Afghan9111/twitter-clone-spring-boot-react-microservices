import { useEffect, useState } from 'react';
import type { NewUser } from '../types/Users/NewUser';
import { useRegisterValidation } from '../hooks/useRegisterValidation';
import { getAllGenres, saveNewUser } from '../api/UserService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import  GenreItem  from '../components/GenreItem';

import '../styles/pages-styles/RegisterPage.css';
import '../styles/components-styles/GenreContainer.css';
import { backgroundPhotoUrlConstant, profilePhotoUrlConstant } from '../constants/PhotoUrls';


const RegisterPage = () => {
    const [user, setUser] = useState<NewUser>({name: "",  
        password: "", email: "", 
        username: "", 
        profilePhoto: profilePhotoUrlConstant,
        backgroundPhoto:backgroundPhotoUrlConstant
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isDisabled, setIsDisabled] = useState(false);

    const { validate } = useRegisterValidation(user);

    const [genres, setGenres] = useState<string[]>([]);

    const navigate = useNavigate();

    useEffect(()=> {
        async function getGenres() {
            try {
                const {data} = await getAllGenres();
                if (data) {
                    setGenres(data);
                }
            }
            catch (error ){
                console.log(error);
            }
        }
        getGenres();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validate()) return;

        setIsDisabled(true);
        const result = await saveNewUser(user);
        if (result.data === "success") {
            navigate("/");
            toast("Sign-up Successful! You may login now.")
        }
    };

    const togglePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        setShowPassword(e.target.checked);
    };

    console.log(genres);

    return (
        <div className="container">
            <div className="formContainer">
                <p className='createAccountHeading'>Create your account</p>
                <form className="form" onSubmit={handleSubmit}>
                    <div className='formTableContainer'>
                        <table>
                        <tbody>
                            <tr>
                                <td><label htmlFor='username' className='label'>Username:</label></td>
                                <td>
                                    <input
                                        type='text'
                                        id='username'
                                        name='username'
                                        className='inputField'
                                        value={user.username}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            
                            <tr>
                                <td><label htmlFor='name' className='label'>Name:</label></td>
                                <td>
                                    <input
                                        type='text'
                                        id='name'
                                        name='name'
                                        className='inputField'
                                        value={user.name}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor='email' className='label'>Email:</label></td>
                                <td>
                                    <input
                                        type='email'
                                        id='email'
                                        name='email'
                                        className='inputField'
                                        value={user.email}
                                        onChange={handleChange}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <td><label htmlFor='password' className='label'>Password:</label></td>
                                <td>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id='password'
                                        name='password'
                                        className='inputField'
                                        value={user.password}
                                        onChange={handleChange}
                                    />
                                    <input type='checkbox' checked={showPassword} onChange={togglePassword} />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </div>

                    <p className='interestsParagraphTag'>Choose your interests If none, just leave it.</p>
                    <div className='genreContainer'>
                        {
                            genres.map((genreItem, index) => (
                                <div style={{display:'flex', justifyContent:'center'}}>
                                    <GenreItem key={index}  genreItem={{
                                        title: genreItem
                                    }} />
                                </div>
                            )
                        )
                        }
                    </div>
                    <div className='buttonContainer'>
                        <div style={{display: 'flex',justifyContent:'center', alignItems:'center'}}>
                            <button className='submitButton'disabled={isDisabled} type="submit">Create Account</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterPage;
