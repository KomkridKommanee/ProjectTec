import React, { useEffect, useState } from 'react';
import { Button, Form, Input, Card, Select, message } from 'antd';
import { updateDoc, doc, getDocs, collection } from 'firebase/firestore';
import { db } from '../api/firebase/firebase';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

export default function EditStudent({ selectedItem, onUpdate, onCancel }) {
    const [editedItem, setEditedItem] = useState(selectedItem);
    const [sections, setSections] = useState([]);

    useEffect(() => {
        setEditedItem(selectedItem);
    }, [selectedItem]);

    useEffect(() => {
        const fetchSections = async () => {
            const querySnapshot = await getDocs(collection(db, 'section'));
            const sectionsList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setSections(sectionsList);
        };
        fetchSections();
    }, []);

    const handleChange = (name, value) => {
        setEditedItem({ ...editedItem, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await updateDoc(doc(db, 'student', editedItem.id), editedItem);
            onUpdate(editedItem);
            message.success('Update success');
        } catch (error) {
            console.error('Failed to update:', error);
            message.error('Update failed');
        }
    };

    return (
        <div className="flex min-h-full items-center justify-center mt-6 sm:px-6 lg:px-8">
            <Card style={{ width: "90%" }}>
                <Form layout="inline" onFinish={handleSubmit}>
                    <div className='w-full sm:w-full mt-2'>
                        <label htmlFor="Username">Username</label>
                        <Form.Item>
                            <Input
                                value={editedItem.UserName}
                                onChange={(e) => handleChange('UserName', e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </Form.Item>
                    </div>
                    <div className='w-full sm:w-full mt-2'>
                        <label htmlFor="Password">Password</label>
                        <Form.Item>
                            <Input.Password
                                value={editedItem.Password}
                                onChange={(e) => handleChange('Password', e.target.value)}
                                iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </Form.Item>
                    </div>
                    <div className='w-full sm:w-full mt-2'>
                        <label htmlFor="StudentNo">รหัสนักศึกษา</label>
                        <Form.Item>
                            <Input
                                value={editedItem.StudentNo}
                                onChange={(e) => handleChange('StudentNo', e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </Form.Item>
                    </div>
                    <div className='mt-2 w-full sm:w-2/4'>
                        <label htmlFor="NameThai">ชื่อภาษาไทย</label>
                        <Form.Item>
                            <Input
                                value={editedItem.NameThai}
                                onChange={(e) => handleChange('NameThai', e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </Form.Item>
                    </div>
                    <div className='mt-2 w-full sm:w-2/4'>
                        <label htmlFor="SurnameThai">นามสกุลภาษาไทย</label>
                        <Form.Item>
                            <Input
                                value={editedItem.SurnameThai}
                                onChange={(e) => handleChange('SurnameThai', e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </Form.Item>
                    </div>
                    <div className='mt-2 w-full sm:w-2/4'>
                        <label htmlFor="NameEng">ชื่อภาษาอังกฤษ</label>
                        <Form.Item>
                            <Input
                                value={editedItem.NameEng}
                                onChange={(e) => handleChange('NameEng', e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </Form.Item>
                    </div>
                    <div className='mt-2 w-full sm:w-2/4'>
                        <label htmlFor="SurnameEng">นามสกุลภาษาอังกฤษ</label>
                        <Form.Item>
                            <Input
                                value={editedItem.SurnameEng}
                                onChange={(e) => handleChange('SurnameEng', e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </Form.Item>
                    </div>
                    <div className='mt-2 w-full sm:w-2/4'>
                        <label htmlFor="Section">หมู่เรียน</label>
                        <Form.Item>
                            <Select
                                value={editedItem.Section}
                                onChange={(value) => handleChange('Section', value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            >
                                {sections.map((section) => (
                                    <Select.Option key={section.id} value={section.Section}>
                                        {section.Section}
                                    </Select.Option>
                                ))}
                            </Select>
                        </Form.Item>
                    </div>
                    <div className='mt-2 w-full sm:w-2/4'>
                        <label htmlFor="Tel">เบอร์โทรศัพท์</label>
                        <Form.Item>
                            <Input
                                value={editedItem.Tel}
                                onChange={(e) => handleChange('Tel', e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </Form.Item>
                    </div>
                    <div className='w-full sm:w-full mt-2'>
                        <label htmlFor="Bdate">วัน/เดือน/ปีเกิด</label>
                        <Form.Item>
                            <Input
                                type="date"
                                name="Bdate"
                                value={new Date(editedItem.Bdate).toLocaleDateString('th-TH', {
                                    day: '2-digit',
                                    month: '2-digit',
                                    year: 'numeric'
                                }).replace(/\//g, '-')}
                                onChange={(e) => handleChange('Bdate', e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </Form.Item>
                    </div>
                    <div className='mt-2 w-full sm:w-full'>
                        <label htmlFor="Email">อีเมลอื่นๆ</label>
                        <Form.Item>
                            <Input
                                value={editedItem.Email}
                                onChange={(e) => handleChange('Email', e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                            />
                        </Form.Item>
                    </div>
                    <div className='w-full sm:w-10/12 mt-2'></div>
                    <div className='w-full sm:w-2/12 mt-10'>
                        <Form.Item>
                            <button
                                type="primary"
                                htmlType="submit"
                                className="px-4 py-2 bg-green-500 transition ease-in-out delay-75 hover:bg-green-600 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                            >
                                บันทึกข้อมูลนักศึกษา
                            </button>
                        </Form.Item>
                    </div>
                </Form>
            </Card>
        </div>
    );
}
