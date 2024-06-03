import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'

const schema = yup.object().shape({
    usernameOrEmail: yup.string().email('Invalid email format').required('Email is required'),
    password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
    name: yup.string(),
    terms: yup.bool().oneOf([true], 'You must accept the terms and conditions')
});

const Signup = () => {
    const [formData, setFormData] = useState(null);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const onSubmit = async (data) => {
        setFormData(data);
        setError(null);
        console.log('Form Data:', data);

        const formDataObj = new FormData();
        formDataObj.append('usernameOrEmail', data.usernameOrEmail);
        formDataObj.append('password', data.password);
        formDataObj.append('name', data.name);
        formDataObj.append('terms', data.terms);
        if (data.profilePicture[0]) {
            formDataObj.append('profilePicture', data.profilePicture[0]);
        }

        try {
            const response = await axios.post('/api/users/register', formDataObj, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log(response.data);
            // Simulate sending a welcome email notification
            setTimeout(() => {
                alert('Welcome email sent to ' + data.usernameOrEmail);
                navigate('/posts'); // Redirect to the post list screen
            }, 1000);
        } catch (error) {
            console.error('Error registering user:', error);
            setError('Registration failed. Please try again.');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-center">SignUp</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="usernameOrEmail">
                        Username or Email *
                    </label>
                    <input
                        type="text"
                        name="usernameOrEmail"
                        {...register('usernameOrEmail')}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.usernameOrEmail && <p className="text-red-500 text-xs mt-1">{errors.usernameOrEmail.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password *
                    </label>
                    <input
                        type="password"
                        name="password"
                        {...register('password')}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Confirm Password *
                    </label>
                    <input
                        type="password"
                        name="confirmPassword"
                        {...register('confirmPassword')}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                    {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
                    </label>
                    <input
                        type="text"
                        name="name"
                        {...register('name')}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="profilePicture">
                        Profile Picture
                    </label>
                    <input
                        type="file"
                        name="profilePicture"
                        {...register('profilePicture')}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        <input
                            type="checkbox"
                            name="terms"
                            {...register('terms')}
                            className="mr-2 leading-tight"
                        />
                        I agree to the terms and conditions
                    </label>
                    {errors.terms && <p className="text-red-500 text-xs mt-1">{errors.terms.message}</p>}
                </div>
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Register
                    </button>
                </div>
                {formData && (
                    <div className="mt-4 p-4 bg-green-100 text-green-700 rounded">
                        Registration successful! Welcome email sent to {formData.usernameOrEmail}.
                    </div>
                )}
            </form>
        </div>
    );
};

export default Signup
