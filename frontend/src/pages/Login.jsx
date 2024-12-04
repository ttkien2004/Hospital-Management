// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { InputText } from 'primereact/inputtext';
// import { Password } from 'primereact/password';
// import { Button } from 'primereact/button';
// import { Card } from 'primereact/card';
// import 'primereact/resources/themes/lara-light-indigo/theme.css';
// import 'primeicons/primeicons.css';
// import 'primeflex/primeflex.css';  // Đảm bảo đã import PrimeFlex

// const Login = () => {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const navigate = useNavigate();

//     const handleSubmit = (e) => {
//         e.preventDefault();
//         // Xử lý logic đăng nhập ở đây
//         console.log('Email:', email);
//         console.log('Password:', password);
//     };

//     return (
//         <div className="flex justify-content-center align-items-center min-h-screen bg-blue-100">
//             <Card className="w-full sm:w-8 md:w-6 lg:w-4 p-5 shadow-2 border-round-lg">
//                 <div className="text-center mb-4">
//                     <div className="text-900 text-3xl font-medium mb-3">Đăng Nhập</div>
//                     <div className="text-500">Vui lòng nhập thông tin của bạn để đăng nhập</div>
//                 </div>

//                 <form onSubmit={handleSubmit} className="p-fluid">
//                     <div className="field mb-4">
//                         <span className="p-float-label p-input-icon-right">
//                             <InputText
//                                 id="email"
//                                 value={email}
//                                 onChange={(e) => setEmail(e.target.value)}
//                                 className="w-full"
//                                 required
//                                 placeholder="Nhập email của bạn"
//                             />
//                             <label htmlFor="email">Email</label>
//                         </span>
//                     </div>

//                     <div className="field mb-4">
//                         <span className="p-float-label">
//                             <Password
//                                 id="password"
//                                 value={password}
//                                 onChange={(e) => setPassword(e.target.value)}
//                                 toggleMask
//                                 className="w-full"
//                                 required
//                                 feedback={false}
//                                 placeholder="Nhập mật khẩu của bạn"
//                             />
//                             <label htmlFor="password">Mật khẩu</label>
//                         </span>
//                     </div>

//                     <Button
//                         type="submit"
//                         label="Đăng nhập"
//                         // icon="pi pi-sign-in"
//                         className="w-full mt-3 p-button-rounded p-button-primary"
//                     />
//                 </form>
//             </Card>
//         </div>
//     );
// };

// export default Login;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputText } from 'primereact/inputtext';
import { Password } from 'primereact/password';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primeicons/primeicons.css';
import 'primeflex/primeflex.css';  // Đảm bảo đã import PrimeFlex

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // Thêm state để lưu thông báo lỗi
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra nếu các trường để trống
        if (!email || !password) {
            setError('Vui lòng nhập đầy đủ thông tin');
            return;
        }

        setError('');  // Reset lỗi nếu các trường hợp đều hợp lệ

        // Xử lý logic đăng nhập ở đây
        console.log('Email:', email);
        console.log('Password:', password);

        // Giả sử đăng nhập thành công, bạn có thể điều hướng đến trang khác
        navigate('/dashboard');
    };

    return (
        <div className="flex justify-content-center align-items-center min-h-screen bg-blue-100">
            <Card className="w-full sm:w-8 md:w-6 lg:w-4 p-5 shadow-2 border-round-lg">
                <div className="text-center mb-4">
                    <div className="text-900 text-3xl font-medium mb-3">Đăng Nhập</div>
                    <div className="text-500">Vui lòng nhập thông tin của bạn để đăng nhập</div>
                </div>

                {error && <div className="p-mb-3 p-text-danger text-center">{error}</div>} {/* Hiển thị lỗi nếu có */}

                <form onSubmit={handleSubmit} className="p-fluid">
                    <div className="field mb-4">
                        <span className="p-float-label p-input-icon-right">
                            <InputText
                                id="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full"
                                required
                                placeholder="Nhập email của bạn"
                            />
                            <label htmlFor="email">Email</label>
                        </span>
                    </div>

                    <div className="field mb-4">
                        <span className="p-float-label">
                            <Password
                                id="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                toggleMask
                                className="w-full"
                                required
                                feedback={false}
                                placeholder="Nhập mật khẩu của bạn"
                            />
                            <label htmlFor="password">Mật khẩu</label>
                        </span>
                    </div>

                    <Button
                        type="submit"
                        label="Đăng nhập"
                        className="w-full mt-3 p-button-rounded p-button-primary"
                    />
                </form>
            </Card>
        </div>
    );
};

export default Login;
