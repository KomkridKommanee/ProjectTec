import React, { useEffect, useState, ChangeEvent } from 'react';
import { Button, Checkbox, Form, Input, Radio, Card, Select, Modal, Row, Col } from 'antd';
import { message, Upload } from 'antd';
import { collection, addDoc, updateDoc, doc, getDocs, orderBy, query } from 'firebase/firestore'; // เพิ่ม updateDoc และ doc
import { db } from '../api/firebase/firebase';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';



export default function InputStudent() { // รับ prop setIsDataComplete เพื่อใช้ในการกำหนดสถานะของปุ่ม

    const [newItem, setNewItem] = useState({
        UserName: '',
        Password: '',
        StudentNo: '',
        NameThai: '',
        SurnameThai: '',
        NameEng: '',
        SurnameEng: '',
        Section: '',
        Tel: '',
        Email: '',
        Bdate: '',

    });



    const handleSubmit = async (values) => {
        try {

            await addDoc(collection(db, 'student'), {
                ...values,

            });

            message.success('เพิ่มข้อมูลนักศึกษาสำเร็จ');
        } catch (error) {
            console.error('Failed to submit form:', error);
            message.error('เพิ่มข้อมูลนักศึกษาไม่สำเร็จ');
        }
    };


    // Add item to database
    const addStudent = async (e) => {
        e.preventDefault();
        if (newItem.UserName !== '' && newItem.Password !== '' && newItem.StudentNo !== '' && newItem.NameThai !== '' && newItem.SurnameThai !== '' && newItem.NameEng !== '' && newItem.SurnameEng !== '' && newItem.Section !== '' && newItem.Tel !== '' && newItem.Email !== '' && newItem.Bdate !== '' && newItem.Section !== '') {
            await handleSubmit(newItem);

        } else {
            message.error('กรุณากรอกข้อมูลให้ครบทุกช่อง');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(db, 'student'), orderBy('StudentID', 'desc'));
            const querySnapshot = await getDocs(q);
            let latestID = 0;
            querySnapshot.forEach((doc) => {
                const studentID = doc.data().StudentID;
                if (studentID > latestID) {
                    latestID = studentID;
                }
            });
            setNewItem({ ...newItem, StudentID: latestID + 1 });
        };
        fetchData();
    }, []);
    // Read items from database

    // Delete items from database


    return (
        <div className="flex min-h-full items-center justify-center mt-6 sm:px-6 lg:px-8">
            <Card style={{ width: "90%" }}>
                <Form
                    layout="inline"
                    name='publicrelationForm'
                    onFinish={handleSubmit}

                >
                    <div className='w-full sm:w-full mt-2'>
                        <label htmlFor="UserName">Username (อีเมลมหาวิทยาลัย)</label>
                        <Form.Item
                            key="UserName"
                            name="UserName"
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณากรอกอีเมลมหาวิทยาลัยราชภัฏเลย'
                                },
                            ]}
                        >
                            <Input

                                value={newItem.UserName}
                                onChange={(e) => setNewItem({ ...newItem, UserName: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </Form.Item>
                    </div>
                    <div className='mt-2 w-full sm:w-full'>
                        <label htmlFor="Password">Password</label>
                        <Form.Item
                            name="Password"
                            key="Password"
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาใส่ Password'
                                },
                            ]}
                        >
                            <Input.Password
                                type="password"
                                value={newItem.Password}
                                onChange={(e) => setNewItem({ ...newItem, Password: e.target.value })}
                                iconRender={(visible) => (visible ? <EyeOutlined onClick={(e) => setNewItem({ ...newItem, Password: '' })} /> : <EyeInvisibleOutlined onClick={(e) => setNewItem({ ...newItem, Password: '' })} />)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </Form.Item>
                    </div>
                    <div className='w-full sm:w-full mt-2'>
                        <label htmlFor="StudentNo">รหัสนักศึกษา</label>
                        <Form.Item
                            key="StudentNo"
                            name="StudentNo"
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณากรอกอีเมลมหาวิทยาลัยราชภัฏเลย'
                                },
                            ]}
                        >
                            <Input

                                value={newItem.StudentNo}
                                onChange={(e) => setNewItem({ ...newItem, StudentNo: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </Form.Item>
                    </div>
                    <div className='mt-2 w-full sm:w-2/4'>
                        <label htmlFor="NameThai">ชื่อภาษาไทย</label>
                        <Form.Item
                            name="NameThai"
                            key="NameThai"
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาใส่ชื่อภาษาไทย'
                                },
                            ]}
                        >
                            <Input
                                value={newItem.NameThai}
                                onChange={(e) => setNewItem({ ...newItem, NameThai: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </Form.Item>
                    </div>
                    <div className='mt-2 w-full sm:w-2/4'>
                        <label htmlFor="SurnameThai">นามสกุลภาษาไทย</label>
                        <Form.Item
                            name="SurnameThai"
                            key="SurnameThai"
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาใส่นามสกุลภาษาไทย'
                                },
                            ]}
                        >
                            <Input
                                value={newItem.SurnameThai}
                                onChange={(e) => setNewItem({ ...newItem, SurnameThai: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </Form.Item>
                    </div>
                    <div className='mt-2 w-full sm:w-2/4'>
                        <label htmlFor="NameEng">ชื่อภาษาอังกฤษ</label>
                        <Form.Item
                            name="NameEng"
                            key="NameEng"
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาใส่ชื่อภาษาอังกฤษ'
                                },
                            ]}
                        >
                            <Input
                                value={newItem.NameEng}
                                onChange={(e) => setNewItem({ ...newItem, NameEng: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </Form.Item>
                    </div>
                    <div className='mt-2 w-full sm:w-2/4'>
                        <label htmlFor="SurnameEng">นามสกุลภาษาอังกฤษ</label>
                        <Form.Item
                            name="SurnameEng"
                            key="SurnameEng"
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาใส่นามสกุลภาษาอังกฤษ'
                                },
                            ]}
                        >
                            <Input
                                value={newItem.SurnameEng}
                                onChange={(e) => setNewItem({ ...newItem, SurnameEng: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </Form.Item>
                    </div>
                    <div className=' mt-2 w-full sm:w-2/4'>
                        <label>หมู่เรียน</label>
                        <Form.Item
                            key="Section"
                            name="Section"
                            rules={[{ required: true, message: 'กรุณาเลือกหมู่เรียน' }]}
                        >
                            <select
                                value={newItem.Section}
                                onChange={(e) => setNewItem({ ...newItem, Section: e.target.value })}
                                id="Section" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected disabled>เลือกหมู่เรียน</option>
                                <option value="ว.6405">ว.6405</option>
                                <option value="ว.6504">ว.6504</option>
                                <option value="ว.6604">ว.6604</option>
                                <option value="ว.6704">ว.6704</option>
                                <option value="ว.6705">ว.6705</option>
                                <option value="ว.6707">ว.6707</option>


                            </select>
                        </Form.Item>
                    </div>
                    <div className='mt-2 w-full sm:w-2/4'>
                        <label htmlFor="Tel">เบอร์โทรศัพท์</label>
                        <Form.Item
                            name="Tel"
                            key="Tel"
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาใส่เบอร์โทรศัพท์'
                                },
                            ]}
                        >
                            <Input
                                type='tel'
                                value={newItem.Tel}
                                onChange={(e) => setNewItem({ ...newItem, Tel: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </Form.Item>
                    </div>
                    <div className='w-full sm:w-full mt-2'>
                        <label htmlFor="Bdate">วัน/เดือน/ปีเกิด</label>
                        <Form.Item
                            key="Bdate"
                            name="Bdate"
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาเลือกวันที่โพสต์',
                                },
                            ]}
                        >
                            <Input
                                type="date"
                                value={newItem.Bdate}
                                onChange={(e) => setNewItem({ ...newItem, Bdate: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </Form.Item>
                    </div>
                    <div className='w-full sm:w-full mt-2'>
                        <label htmlFor="Email">อีเมลอื่นๆ</label>
                        <Form.Item
                            key="Email"
                            name="Email"
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาใส่อีเมล',
                                },
                            ]}
                        >
                            <Input
                                value={newItem.Email}
                                onChange={(e) => setNewItem({ ...newItem, Email: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </Form.Item>
                    </div>
                    <div className='w-full sm:w-10/12 mt-2'>

                    </div>
                    <div className='w-full sm:w-2/12 mt-10'>
                        <button
                            onClick={addStudent}
                            type="submit"
                            className="px-4 py-2 bg-green-500 transition ease-in-out delay-75 hover:bg-green-600 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                        >
                            เพิ่มข้อมูลนักศึกษา
                        </button>

                    </div>
                </Form>
            </Card></div>
    )
}