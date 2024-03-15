import { radio } from '@material-tailwind/react';
import { Button, Form, Radio, Card, Space, Input, Divider, Image, Checkbox } from 'antd';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';


export const Login = () => {

    const router = useRouter();

    const handleLogin = (e) => {
        e.preventDefault(); // เพื่อป้องกันการรีเฟรชหน้าเมื่อกดปุ่ม "เข้าสู่ระบบ"

        // เขียนโค้ดส่วนที่จะดำเนินการเมื่อผู้ใช้กดปุ่ม "เข้าสู่ระบบ" ที่นี่
        const username = e.target.username.value; // รับค่า username จาก input field
        const password = e.target.password.value; // รับค่า password จาก input field

        // ตรวจสอบว่า username และ password ตรงตามที่กำหนดหรือไม่
        if (username === 'Film' && password === '1234') {
            // ถ้าตรงกันให้ทำการเข้าสู่ระบบ
            alert('เข้าสู่ระบบสำเร็จ');
            router.push('/Admin/Home_Admin');
            // ในที่นี้สามารถเปลี่ยนเส้นทางไปหน้าหลังเข้าสู่ระบบได้โดยการใช้ Router หรือสร้างตัวแปร state เพื่อบอกว่าผู้ใช้ได้เข้าสู่ระบบแล้ว
        } else {
            // ถ้าไม่ตรงให้แสดงข้อความแจ้งเตือน
            console.log('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
            alert('User หรือ Password ผิด');
        }
    };

    return (
        <>
            <Card className='bg-white pt-2 w-full  rounded-3xl'>
                <div className='w-full my-3 text-cyan-600 md:text-cyan-600 text-2xl md:text-2xl md:px-8 py-0 rounded-3xl text-center font-bold'>
                    <Image className='h-fit'
                        src="/logolru.png"
                        alt="Trulli"
                    />
                    <div className='w-full text-cyan-600 md:text-cyan-600 text-3xl md:text-3xl md:px-4 rounded-3xl text-center font-extrabold'>
                        ComSciLRU
                    </div>
                    <br />
                    ประชาสัมพันธ์สาขาวิชาวิทยาการคอมพิวเตอร์
                    <br />
                    คณะวิทยาศาสตร์และเทคโนโลยี
                    <br />
                    มหาวิทยาลัยราชภัฏเลย
                </div>
                <div className=' mt-3 text-center items-center justify-items-center' >
                    <Card className='lg:px-40 rounded-3xl bg: border-8 border-cyan-600 md:py-5 px-2 md:px-5 lg:max-w-7xl mx-auto'>

                        <div className="w-full">
                            <form onSubmit={handleLogin}> {/* ให้โยนฟังก์ชัน handleLogin เข้าไปเมื่อกดปุ่มส่งฟอร์ม */}
                                <div className=" py-4">

                                    <input
                                        name="username" // กำหนดชื่อฟิลด์เป็น "username"
                                        className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                        id="username"
                                        type="text"
                                        placeholder="Username"
                                    />
                                </div>
                                <div className="py-4 pb-6">

                                    <input
                                        name="password" // กำหนดชื่อฟิลด์เป็น "password"
                                        className="shadow appearance-none border-2 border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                        id="password"
                                        type="password"
                                        placeholder="Password"
                                    />
                                </div>
                                <div className="">
                                    <button type="submit" className="text-white bg-gradient-to-r from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-bold rounded-lg px-5 py-2.5 text-center me-2 mb-2 w-full text-xl">
                                        เข้าสู่ระบบ
                                    </button>
                                </div>
                            </form>
                        </div>
                    </Card>
                </div>
            </Card>
        </>
    )
}

export default Login