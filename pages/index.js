import { Button, Form, Card, Input, Image } from 'antd';
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from './api/firebase/firebase'; // ตรวจสอบให้แน่ใจว่าได้เชื่อมต่อ Firebase อย่างถูกต้อง

export const Login1 = () => {
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้าเมื่อกดปุ่มเข้าสู่ระบบ

    const username = e.target.username.value.trim();
    const password = e.target.password.value.trim();

    if (!username || !password) {
      alert('กรุณากรอกชื่อผู้ใช้งานและรหัสผ่าน');
      return;
    }

    try {
      // ค้นหาผู้ใช้ใน Firestore โดยใช้ชื่อผู้ใช้
      const userQuery = query(collection(db, 'user'), where('UserName', '==', username));
      const querySnapshot = await getDocs(userQuery);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]; // ดึงเอกสารผู้ใช้ตัวแรกจาก query
        const userData = userDoc.data();

        // ตรวจสอบว่ารหัสผ่านถูกต้องหรือไม่
        if (userData.Password === password) {
          alert('เข้าสู่ระบบสำเร็จ');
          
          // เก็บ UserID ใน localStorage
          localStorage.setItem('UserID', userDoc.id); // บันทึก UserID ใน localStorage
          console.log('UserID เก็บใน localStorage:', userDoc.id);

          // เปลี่ยนหน้าเว็บตามประเภทผู้ใช้งาน
          if (userData.UserType === 'แอดมิน') {
            router.push('/Admin/Home_Admin');
          } else if (userData.UserType === 'อาจารย์') {
            router.push('/Teachers/Home_Teachers');
          } else {
            alert('ประเภทผู้ใช้งานไม่ถูกต้อง');
          }
        } else {
          alert('รหัสผ่านไม่ถูกต้อง');
        }
      } else {
        alert('ไม่พบผู้ใช้งานในระบบ');
      }
    } catch (error) {
      console.error('การเข้าสู่ระบบล้มเหลว:', error);
      alert('เกิดข้อผิดพลาดในการเข้าสู่ระบบ');
    }
  };

  return (
    <>
      <Card className='bg-white pt-8 w-full rounded-3xl'>
        <div className='w-full my-3 text-cyan-600 md:text-cyan-600 text-2xl md:text-2xl md:px-8 py-0 rounded-3xl text-center font-bold'>
          <Image className='h-fit' src="/logolru.png" alt="Logo" preview={false} />
          <div className='w-full text-cyan-600 md:text-cyan-600 text-3xl md:text-3xl md:px-4 rounded-3xl text-center font-extrabold'>
            ComSciLRU
          </div>
          <p className="text-center mt-2 text-cyan-600">
            ประชาสัมพันธ์สาขาวิชาวิทยาการคอมพิวเตอร์ คณะวิทยาศาสตร์และเทคโนโลยี มหาวิทยาลัยราชภัฏเลย
          </p>
        </div>
        <div className='mt-3 text-center items-center justify-items-center'>
          <Card className='lg:px-40 rounded-3xl border-8 border-cyan-600 md:py-5 px-2 md:px-5 lg:max-w-7xl mx-auto shadow-lg'>
            <div className="w-full">
              <form onSubmit={handleLogin}>
                <div className="py-4">
                  <Input
                    name="username"
                    className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="username"
                    type="text"
                    placeholder="ชื่อผู้ใช้งาน"
                  />
                </div>
                <div className="py-4 pb-6">
                  <Input.Password
                    name="password"
                    className="shadow appearance-none rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                    id="password"
                    placeholder="รหัสผ่าน"
                  />
                </div>
                <div className="pt-4">
                  <Button
                    type="primary"
                    htmlType="submit"
                    className="w-full text-xl"
                    style={{
                      background: 'linear-gradient(to right, #00bcd4, #1e90ff)',
                      border: 'none',
                    }}
                  >
                    เข้าสู่ระบบ
                  </Button>
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
