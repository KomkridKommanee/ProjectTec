import React, { useEffect, useState } from 'react';
import { Spin, Form, Card} from 'antd';
import Link from 'next/link';
import { doc, getDoc } from 'firebase/firestore'; // นำเข้า getDoc และ doc จาก Firebase
import { db } from '../api/firebase/firebase'; // นำเข้า Firebase ที่ตั้งค่าไว้

import Example2 from '../Components/Na';


export default function User() {

    const [userInfo, setUserInfo] = useState({ NameThai: '', SurnameThai: '' });
    const [loading, setLoading] = useState(true); // เพิ่ม state สำหรับตรวจสอบสถานะการโหลด
    const [error, setError] = useState(null); // เพิ่ม state สำหรับจัดการข้อผิดพลาด

    useEffect(() => {
        // ฟังก์ชันสำหรับดึงข้อมูล user จาก Firestore
        const fetchUserData = async () => {
            try {
                const userID = localStorage.getItem('UserID');
                if (!userID) {
                    console.error('UserID not found in localStorage');
                    setError('UserID not found in localStorage');
                    setLoading(false);
                    return;
                }

                const userDocRef = doc(db, 'user', userID); // ใช้ userID ที่เก็บใน localStorage
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUserInfo({ NameThai: userData.NameThai, SurnameThai: userData.SurnameThai });
                } else {
                    console.error('No user found with the given UserID');
                    setError('ไม่พบข้อมูลผู้ใช้ในระบบ');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
                setError('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, []);

    return (
        <>
            <Example2 className=" top-10" />
            <div className='justify-self-center py-5 md:py-7 shadow-lg bg-gradient-to-r from-cyan-600 to-blue-500'>
                {loading ? (
                    <div className="flex items-center justify-center">
                        <Spin size="large" className="text-white" />
                        <p className='text-3xl md:text-2xl text-start text-white pl-4 font-bold'>
                            กำลังโหลดข้อมูล...
                        </p>
                    </div>
                ) : error ? (
                    <p className='text-3xl md:text-2xl text-start text-white pl-44 font-bold'>
                        {error}
                    </p>
                ) : (
                    <p className='text-3xl md:text-2xl text-start text-white pl-44 font-bold'>
                        คุณ {userInfo.NameThai} {userInfo.SurnameThai}
                    </p>
                )}
            </div>
            <Form className="flex bg-bottom bg-wite min-h-full items-center justify-center py-12 sm:px-5 xs:w-auto xs:h-auto sm:w-auto sm:h-auto md:h-auto md:w-auto lg:h-auto lg:w-auto md:text-start text-center px-2">

                <div className=' mt-3 text-center items-center justify-items-center py-6' >
                    <Link href="./UserManagement">
                        <Card className="lg:px-96 px-20 md:px-40 p-0.5 mb-5 overflow-hidden text-lg md:text-xl font-bold text-black bg-gradient-to-r from-cyan-100 to-blue-100 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 border-4 border-cyan-600 shadow-md transition duration-500 transform hover:scale-105">
                            ข้อมูลผู้ใช้งาน
                        </Card>
                    </Link>
                    <Link href="./StudentsManagement">
                        <Card className="lg:px-96 px-20 md:px-40 p-0.5 mb-5 overflow-hidden text-lg md:text-xl font-bold text-black bg-gradient-to-r from-cyan-100 to-blue-100 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 border-4 border-cyan-600 shadow-md transition duration-500 transform hover:scale-105">
                            ข้อมูลนักศึกษา
                        </Card>
                    </Link>
                    <Link href="./SectionManagement">
                        <Card className="lg:px-96 px-20 md:px-40 p-0.5 mb-5 overflow-hidden text-lg md:text-xl font-bold text-black bg-gradient-to-r from-cyan-100 to-blue-100 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 border-4 border-cyan-600 shadow-md transition duration-500 transform hover:scale-105">
                            ข้อมูลหมู่เรียน
                        </Card>
                    </Link>

                </div>

            </Form>
        </>
    )
}