import React, { useEffect, useState, ChangeEvent } from 'react';
import { Button, Checkbox, Form, Input, Radio, Card, Select, Modal, Row, Col, message, Upload } from 'antd';
import { collection, addDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../api/firebase/firebase';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';



export default function InputStudent({ onClose }) { // รับ prop setIsDataComplete เพื่อใช้ในการกำหนดสถานะของปุ่ม

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


    const [sections, setSections] = useState([]);

    const handleSubmit = async (values) => {
        try {
            await addDoc(collection(db, 'student'), {
                ...values,
            });
            message.success('เพิ่มข้อมูลนักศึกษาสำเร็จ');
            onClose();
        } catch (error) {
            console.error('Failed to submit form:', error);
            message.error('เพิ่มข้อมูลนักศึกษาไม่สำเร็จ');
        }
    };

    const addStudent = async (e) => {
        e.preventDefault();
        if (Object.values(newItem).every((field) => field !== '')) {
            await handleSubmit(newItem);
        } else {
            message.error('กรุณากรอกข้อมูลให้ครบทุกช่อง');
        }
    };

    useEffect(() => {
        const fetchStudentID = async () => {
            const q = query(collection(db, 'student'), orderBy('StudentID', 'desc'));
            const querySnapshot = await getDocs(q);
            let latestID = 0;
            querySnapshot.forEach((doc) => {
                const studentID = doc.data().StudentID;
                if (studentID > latestID) {
                    latestID = studentID;
                }
            });
            setNewItem((prevItem) => ({ ...prevItem, StudentID: latestID + 1 }));
        };

        const fetchSections = async () => {
            const querySnapshot = await getDocs(collection(db, 'section'));
            const fetchedSections = querySnapshot.docs.map((doc) => doc.data().Section);
            setSections(fetchedSections);
        };

        fetchStudentID();
        fetchSections();
    }, []);

    return (
        <div className="flex min-h-full items-center justify-center mt-6 sm:px-6 lg:px-8">
            <Card style={{ width: "90%" }}>
                <Form
                    layout="inline"
                    name='studentForm'
                    onFinish={addStudent}

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
                                {
                                    pattern: /^sb\d{10}@lru\.ac\.th$/,
                                    message: 'Username ต้องเริ่มต้นด้วย sb ตามด้วยตัวเลข 10 ตัว และตามด้วย @lru.ac.th',
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
                                {
                                    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                                    message: 'Password ต้องมีตัวอักษรและตัวเลข อย่างน้อย 6 ตัวอักษร',
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
                                    message: 'กรุณาใส่รหัสนักศึกษา',
                                },
                                {
                                    validator: (_, value) => {
                                        if (value === newItem.UserName.slice(2, 12)) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject(new Error('รหัสนักศึกษาต้องตรงกับตัวเลข 10 ตัวใน Username'));
                                    },
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
                                {
                                    pattern: /^[ก-๙]+$/,
                                    message: 'ชื่อภาษาไทยต้องเป็นตัวอักษรภาษาไทยเท่านั้น',
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
                                {
                                    pattern: /^[ก-๙]+$/,
                                    message: 'นามสกุลภาษาไทยต้องเป็นตัวอักษรภาษาไทยเท่านั้น',
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
                                {
                                    pattern: /^[A-Za-z]+$/,
                                    message: 'ชื่อภาษาอังกฤษต้องเป็นตัวอักษรภาษาอังกฤษเท่านั้น',
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
                                {
                                    pattern: /^[A-Za-z]+$/,
                                    message: 'นามสกุลภาษาอังกฤษต้องเป็นตัวอักษรภาษาอังกฤษเท่านั้น',
                                },
                            ]}
                        >
                            <Input
                                value={newItem.SurnameEng}
                                onChange={(e) => setNewItem({ ...newItem, SurnameEng: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </Form.Item>
                    </div>
                    <div className='mt-2 w-full sm:w-2/4'>
                        <label>หมู่เรียน</label>
                        <Form.Item
                            key="Section"
                            name="Section"
                            rules={[{ required: true, message: 'กรุณาเลือกหมู่เรียน' }]}
                        >
                            <select
                                value={newItem.Section}
                                onChange={(e) => setNewItem({ ...newItem, Section: e.target.value })}
                                id="Section"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
                                <option selected disabled>เลือกหมู่เรียน</option>
                                {sections.map((section, index) => (
                                    <option key={index} value={section}>{section}</option>
                                ))}
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
                                {
                                    pattern: /^[0-9]{10}$/,
                                    message: 'เบอร์โทรศัพท์ต้องเป็นตัวเลข 10 หลัก',
                                },
                            ]}
                        >
                            <Input
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
                                {
                                    type: 'email',
                                    message: 'รูปแบบอีเมลไม่ถูกต้อง',
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
                            type="primary"
                            htmlType="submit"
                            className="px-4 py-2 bg-green-500 transition ease-in-out delay-75 hover:bg-green-600 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                        >
                            เพิ่มข้อมูลนักศึกษา
                        </button>

                    </div>
                </Form>
            </Card></div>
    )
}