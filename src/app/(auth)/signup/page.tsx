// "use client"
// import React, { useState } from 'react'
// import Link from 'next/link'
// import { motion } from "framer-motion"
// import { MdEmail, MdLock, MdElectricBike } from "react-icons/md"
// import { useRouter } from 'next/navigation'
// import encryption from '@/utils/encryption'

// const page = () => {
//     const [name, setName] = useState('');
//     const router = useRouter();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [isLoading, setIsLoading] = useState(false);

//     const handelSubmit = async () => {
//         setIsLoading(true);
//         try {
//             const { payload, hmac } = encryption(password);

//             const res = await fetch('/api/signup', {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ name, email, payload, hmac })
//             })
//             const data = await res.json();
//             console.log(data);
//             if (!res.ok) {
//                 console.log(data.message);
//             }
//             setIsLoading(false);
//             router.push('/signin');
//         } catch (err) {
//             console.log(err);
//             setIsLoading(false);
//         }
//     }

//     return (
        
//     )
// }

// export default page