import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Card, message, Upload, Spin } from 'antd';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db, app } from '../api/firebase/firebase';
import { useRouter } from 'next/router';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { UploadOutlined } from '@ant-design/icons';
import Example4 from './Na3';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();
    const router = useRouter();
    const [fileList, setFileList] = useState([]);

    const storage = getStorage(app);

    // Fetch user data from Firestore
    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const UserID = localStorage.getItem('UserID');
                if (!UserID) {
                    message.error('กรุณาเข้าสู่ระบบก่อน');
                    router.push('/'); // Redirect to login page
                    return;
                }

                const userDocRef = doc(db, 'user', UserID);
                const userDoc = await getDoc(userDocRef);

                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setUserData(userData);
                    form.setFieldsValue(userData);

                    // Set fileList if UserImg exists
                    if (userData.UserImg) {
                        setFileList([
                            {
                                uid: '-1',
                                name: 'profile-pic',
                                status: 'done',
                                url: userData.UserImg
                            }
                        ]);
                    }
                } else {
                    message.error('ไม่พบข้อมูลผู้ใช้');
                }
            } catch (error) {
                console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', error);
                message.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้');
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [form, router]);

    // Handle form submission
    const onFinish = async (values) => {
        try {
            const UserID = localStorage.getItem('UserID');
            if (!UserID) {
                message.error('ไม่พบ ID ของผู้ใช้');
                return;
            }

            let oldImageURL = userData?.UserImg; // Get old profile image URL
            let imageDeleted = false; // Flag to check if old image is deleted

            // Upload new profile image
            if (fileList.length > 0 && fileList[0].originFileObj) {
                // Delete old image if it exists
                if (oldImageURL) {
                    const oldImageName = oldImageURL.split('/').pop().split('?')[0];
                    const oldImageRef = ref(storage, `user/images/${oldImageName}`);
                    try {
                        await deleteObject(oldImageRef); // ลบรูปภาพเก่าจาก Firebase Storage
                        imageDeleted = true;
                    } catch (deleteError) {
                        console.error('เกิดข้อผิดพลาดในการลบรูปภาพเก่า:', deleteError);
                    }
                }

                // Upload new image
                const file = fileList[0].originFileObj;
                const storageRef = ref(storage, `user/images/${file.name}`);
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);
                values.UserImg = downloadURL;
            } else if (oldImageURL) {
                // Retain old image URL if no new image is uploaded
                values.UserImg = oldImageURL;
            }

            const userDocRef = doc(db, 'user', UserID);
            await updateDoc(userDocRef, values);

            message.success('อัปเดตโปรไฟล์สำเร็จ');
        } catch (error) {
            console.error('เกิดข้อผิดพลาดในการอัปเดตโปรไฟล์:', error);
            message.error(`เกิดข้อผิดพลาดในการอัปเดตโปรไฟล์: ${error.message}`);
        }
    };

    // Handle file selection and automatically replace the previous image
    const handleChange = (info) => {
        if (info.fileList.length > 0) {
            // Automatically replace the previous image with the new one
            setFileList([info.fileList[info.fileList.length - 1]]);
        }
    };

    // Handle back button click
    const handleBack = () => {
        if (userData) {
            if (userData.UserType === 'แอดมิน') {
                router.push('../Admin/Home_Admin');
            } else if (userData.UserType === 'อาจารย์') {
                router.push('../Teachers/Home_Teachers');
            } else {
                message.error('ไม่สามารถระบุประเภทผู้ใช้');
            }
        } else {
            message.error('ไม่พบข้อมูลผู้ใช้');
        }
    };

    if (loading) {
        return <div className="flex items-center justify-center">
            <Spin size="large" className="text-black" />
            <p className='text-3xl md:text-2xl text-start text-black pl-4 font-bold'>
                กำลังโหลดข้อมูล...
            </p>
        </div>;
    }
    return (
        <>
            <Example4 className="top-10" />
            <div className='w-full sm:w-1/12 mt-5 ml-5'>
                <Form.Item>
                    <button
                        type="button"
                        onClick={handleBack}
                        className="px-4 py-2 bg-red-500 transition ease-in-out delay-75 hover:bg-red-600 text-white rounded-md hover:-translate-y-1 hover:scale-110 w-full text-lg font-semibold"
                    >
                        ย้อนกลับ
                    </button>
                </Form.Item>
            </div>

            <div className="flex min-h-full items-center justify-center mt-6 sm:px-6 lg:px-8 font-semibold">

                <Card style={{ width: "90%" }} >

                    <Form form={form} layout="inline" onFinish={onFinish}>
                        <div className='w-full sm:w-full mt-2  items-center'>
                            <div className='max-w-xs w-full flex justify-end'>
                                <Form.Item name="UserImg" style={{ marginBottom: 0 }}>
                                    <Upload
                                        listType="picture"
                                        beforeUpload={() => false} // Prevent automatic upload
                                        onChange={handleChange}
                                        fileList={fileList}
                                        showUploadList={false} // Hide file list
                                        customRequest={() => { }} // Prevent default upload behavior
                                    >
                                        <Button icon={<UploadOutlined />} className='font-semibold'>อัปโหลดรูปภาพ</Button>
                                    </Upload>
                                </Form.Item>
                            </div>

                            {/* Image container */}
                            {fileList.length > 0 && (
                                <div className='flex justify-center mt-4'>
                                    <img
                                        src={fileList[0].url || URL.createObjectURL(fileList[0].originFileObj)}
                                        alt="Profile"
                                        style={{ width: 200, height: 200, objectFit: 'cover', borderRadius: '50%' }}
                                    />
                                </div>
                            )}
                        </div>


                        <div className='w-full sm:w-full mt-2'>
                            <label htmlFor="Username">Username</label>
                            <Form.Item
                                name="UserName"
                                rules={[{ required: true, message: 'กรุณากรอกชื่อผู้ใช้!' }]}
                            >
                                <Input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </Form.Item>
                        </div>
                        <div className=' mt-2 w-full sm:w-2/4'>
                            <label htmlFor="NameThai">ชื่อภาษาไทย</label>
                            <Form.Item
                                name="NameThai"
                                rules={[{ required: true, message: 'กรุณากรอกชื่อภาษาไทย' }]}
                            >
                                <Input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </Form.Item>
                        </div>
                        <div className=' mt-2 w-full sm:w-2/4'>
                            <label htmlFor="SurnameThai">นามสกุลภาษาไทย</label>
                            <Form.Item
                                name="SurnameThai"
                                rules={[{ required: true, message: 'กรุณากรอกนามสกุลภาษาไทย' }]}
                            >
                                <Input
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </Form.Item>
                        </div>
                        <div className=' mt-2 w-full sm:w-2/4'>
                            <label htmlFor="NameEng">ชื่อภาษาอังกฤษ</label>
                            <Form.Item
                                name="NameEng"
                                rules={[{ required: true, message: 'กรุณากรอกชื่อภาษาอังกฤษ' }]}
                            >
                                <Input

                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </Form.Item>
                        </div>
                        <div className=' mt-2 w-full sm:w-2/4'>
                            <label htmlFor="SurnameEng">นามสกุลภาษาอังกฤษ</label>
                            <Form.Item
                                name="SurnameEng"
                                rules={[{ required: true, message: 'กรุณากรอกนามสกุลภาษาอังกฤษ' }]}
                            >
                                <Input

                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                />
                            </Form.Item>
                        </div>
                        <div className='w-full sm:w-full mt-2'>
                            <label htmlFor="Email">อีเมล</label>
                            <Form.Item
                                name="Email"
                                rules={[{ required: true, message: 'กรุณากรอกอีเมล!' }]}
                            >
                                <Input type="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </Form.Item>
                        </div>
                        <div className='w-full sm:w-full mt-2'>
                            <label htmlFor="Tel">เบอร์โทรศัพท์</label>
                            <Form.Item
                                name="Tel"
                                rules={[{ required: true, message: 'กรุณากรอกเบอร์โทรศัพท์!' }]}
                            >
                                <Input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </Form.Item>
                        </div>


                        <div className='w-full sm:w-full mt-10'>
                            <Form.Item>
                                <button type="primary" htmlType="submit" className="px-4 py-2 bg-green-500 transition ease-in-out delay-75 hover:bg-green-600 text-white rounded-md hover:-translate-y-1 hover:scale-110 w-full text-lg font-semibold">
                                    บันทึกข้อมูลผู้ใช้งาน</button>

                            </Form.Item>
                        </div>

                    </Form>
                </Card>
            </div>
        </>
    );
};

export default Profile;
