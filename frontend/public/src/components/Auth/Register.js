// import React, { useState } from 'react';

// const Register = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       alert('Passwords do not match');
//       return;
//     }
//     // Logic for handling registration (e.g., API call)
//     console.log('Register submitted', { email, password });
//   };

//   return (
//     <div className="register-form">
//       <h2>Register</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label htmlFor="email">Email:</label>
//           <input 
//             type="email" 
//             id="email" 
//             value={email} 
//             onChange={(e) => setEmail(e.target.value)} 
//             required 
//           />
//         </div>
//         <div>
//           <label htmlFor="password">Password:</label>
//           <input 
//             type="password" 
//             id="password" 
//             value={password} 
//             onChange={(e) => setPassword(e.target.value)} 
//             required 
//           />
//         </div>
//         <div>
//           <label htmlFor="confirmPassword">Confirm Password:</label>
//           <input 
//             type="password" 
//             id="confirmPassword" 
//             value={confirmPassword} 
//             onChange={(e) => setConfirmPassword(e.target.value)} 
//             required 
//           />
//         </div>
//         <button type="submit">Register</button>
        
//       </form>
//     </div>
//   );
// };

// export default Register;