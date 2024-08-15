import React, { useRef, useState, useEffect } from "react";
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from "../contexts/AuthContext";

const Manager = () => {
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "", showPassword: false });
    const [passwordArray, setPasswordArray] = useState([]);
    const { API } = useAuth();
    

    useEffect(() => {
        getPasswords();
    }, []);

    const getToken = () =>{
        return localStorage.getItem('token');
    };

    const getPasswords = async () => {
        try {
            const token = getToken();
            const req = await fetch(`${API}/manager/`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (!req.ok) {
                throw new Error('Failed to fetch passwords');
            }
            const passwords = await req.json();
            setPasswordArray(passwords);
        } catch (error) {
            console.error('Error fetching passwords:', error);
            toast.error('Failed to fetch passwords', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
        }
    };

    const copyText = (text) => {
        navigator.clipboard.writeText(text);
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    };

    const showPassword = (index) => {
        const updatedPasswords = [...passwordArray];
        updatedPasswords[index] = {
            ...updatedPasswords[index],
            showPassword: !updatedPasswords[index].showPassword
        };
        setPasswordArray(updatedPasswords);
    };

    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
            const id = form.id || uuidv4();
            try {
                const token = getToken();
                const response = await fetch(`${API}/manager/`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({ ...form, id })
                });
                if (!response.ok) {
                    throw new Error('Failed to save password');
                }
                setForm({ site: "", username: "", password: "" });
                getPasswords();
                toast('Password saved!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } catch (error) {
                console.error('Error saving password:', error);
                toast.error('Failed to save password', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        } else {
            toast.error('Error: Password not saved!');
        }
    };

    const deletePassword = async (id) => {
        if (window.confirm("Do you really want to delete this password?")) {
            try {
                const token = getToken();
                const response = await fetch(`${API}/manager/${id}`, {
                    method: "DELETE",
                    headers:{
                        Authorization: `Bearer ${token}`,
                    }
                });
                if (!response.ok) {
                    throw new Error('Failed to delete password');
                }
                getPasswords();
                toast.success('Password Deleted!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } catch (error) {
                console.error('Error deleting password:', error);
                toast.error('Failed to delete password: Network error', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            }
        }
    };
    
    
    

    const editPassword = (id) => {
        const passwordToEdit = passwordArray.find(item => item.id === id);
        setForm({ ...passwordToEdit, showPassword: false });
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    return (
        <div className="container mx-auto p-4">
            <ToastContainer />
            <div className="absolute inset-0 -z-10 h-full w-full bg-green-100 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div>
            </div>
            <div className="p-3 md:mycontainer min-h-[88.2vh]">
                <h1>
                    <span className="text-green-500">&lt;</span>
                    <span>Pass</span><span className="text-green-500">Guard/&gt;</span>
                </h1>
                <p className="text-green-900 text-lg text-center">
                    Your own Password Manager
                </p>
                <div className="flex flex-col p-4 text-black gap-8 items-center">
                    <input value={form.site} onChange={handleChange} placeholder="Enter Website URL" className="rounded-full border-green-500 w-full p-4 py-1" type="text" name="site" id="site" />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-8">
                        <input value={form.username} onChange={handleChange} placeholder="Enter Username" className="rounded-full border border-green-500 w-full p-4 py-1" type="text" name="username" id="username" />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder="Enter Password" className="rounded-full border-green-500 w-full p-4 py-1" type={form.showPassword ? "text" : "password"} name="password" id="password" />
                            <span className="absolute right-[3px] top-[4px] cursor-pointer" onClick={() => setForm({ ...form, showPassword: !form.showPassword })}>
                                <img className="p-1" width={26} src="/icons/eye.png" alt="eye" />
                            </span>
                        </div>
                    </div>
                    <button onClick={savePassword} className="flex justify-center items-center gap-2 bg-green-400 rounded-full px-8 py-2 w-fit border border-green-900">
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover"></lord-icon>
                        Save
                    </button>
                </div>
                <div className="passwords">
                    <h2 className="font-bold text-2xl py-4">Your Passwords</h2>
                    {passwordArray.length === 0 && <div>No passwords to show</div>}
                    {passwordArray.length !== 0 && <div className="overflow-x-auto">
                        <table className="table-auto w-full rounded-md overflow-hidden mb-10">
                            <thead className="bg-green-800 text-white">
                                <tr>
                                    <th className="py-2">Site</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Password</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-green-100">
                                {passwordArray.map((item, index) => (
                                    <tr key={`${item.id}-${index}`} className="hover:bg-green-300 duration-300">
                                        <td className="py-2 border border-white text-center">
                                            <div className="flex items-center justify-center">
                                                <a href={item.site} target="_blank" rel="noopener noreferrer">{item.site}</a>
                                            </div>
                                        </td>
                                        <td className="py-2 border border-white text-center">
                                            <div className="flex items-center justify-center">
                                                <span>{item.username}</span>
                                                <span className="ml-2 cursor-pointer" onClick={() => copyText(item.username)}>
                                                    <img className="p-1" width={26} src="/icons/copy.png" alt="copy" />
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-2 border border-white text-center">
                                            <div className="flex items-center justify-center">
                                                {item.showPassword ? (
                                                    <span>{item.password}</span>
                                                ) : (
                                                    <span>********</span>
                                                )}
                                                <span className="ml-2 cursor-pointer" onClick={() => {
                                                    showPassword(index);
                                                }}>
                                                    <img className="p-1" width={26} src="/icons/eye.png" alt="eye" />
                                                </span>
                                            </div>
                                        </td>
                                        <td className="py-2 border border-white text-center">
                                            <div className="flex items-center justify-center">
                                                <span className="cursor-pointer" onClick={() => editPassword(item.id)}>
                                                    <img className="p-1" width={26} src="/icons/edit.png" alt="edit" />
                                                </span>
                                                <span className="cursor-pointer ml-2" onClick={() => deletePassword(item.id)}>
                                                    <img className="p-1" width={26} src="/icons/delete.png" alt="delete" />
                                                </span>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>}
                </div>
            </div>
        </div>
    );
};

export default Manager;
