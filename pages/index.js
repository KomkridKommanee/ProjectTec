import { Button, Form, Card, Input, Image, message } from 'antd';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './api/firebase/firebase';

export const Login1 = () => {
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault(); // เพื่อป้องกันการรีเฟรชหน้าเมื่อกดปุ่ม "เข้าสู่ระบบ"

    const username = e.target.username.value; // รับค่า username จาก input field
    const password = e.target.password.value; // รับค่า password จาก input field

    try {
      // Query Firestore to find the user with the given username
      const userQuery = query(collection(db, 'user'), where('UserName', '==', username));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        const userData = userDoc.data();

        // Check if the password matches
        if (userData.Password === password) {
          message.success('เข้าสู่ระบบสำเร็จ');
          router.push('/Admin/Home_Admin');
        } else {
          message.error('รหัสผ่านไม่ถูกต้อง');
        }
      } else {
        message.error('ไม่พบผู้ใช้');
      }
    } catch (error) {
      console.error('Failed to login:', error);
      message.error('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
  };

  return (
    <>
      <Card className='bg-white pt-2 w-full rounded-3xl'>
        <div className='w-full my-3 text-cyan-600 md:text-cyan-600 text-2xl md:text-2xl md:px-8 py-0 rounded-3xl text-center font-bold'>
          <Image className='h-fit' src="/logolru.png" alt="Trulli" />
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
        <div className='mt-3 text-center items-center justify-items-center'>
          <Card className='lg:px-40 rounded-3xl border-8 border-cyan-600 md:py-5 px-2 md:px-5 lg:max-w-7xl mx-auto'>
            <div className="w-full">
              <form onSubmit={handleLogin}>
                <div className="py-4">
                  <input
                    name="username"
                    className="shadow appearance-none border-2 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="Username"
                  />
                </div>
                <div className="py-4 pb-6">
                  <input
                    name="password"
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
  );
}

export default Login1;
