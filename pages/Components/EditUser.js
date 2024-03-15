import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Radio, Card, Select, Modal, Row, Col, Upload, message, } from 'antd';
import { updateDoc, doc } from 'firebase/firestore';
import { db, storage } from '../api/firebase/firebase';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

export default function EditUser({ selectedItem, onUpdate, onCancel }) {
    

    useEffect(() => {
        setEditedItem(selectedItem);
    }, [selectedItem]);

    const handleChange = (name, value) => {
        setEditedItem({ ...editedItem, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await updateDoc(doc(db, 'user', editedItem.id), editedItem);
            onUpdate(editedItem);
            message.success('Update success');
        } catch (error) {
            console.error('Failed to update:', error);
            message.error('Update failed');
        }
    };
    const [editedItem, setEditedItem] = useState(selectedItem);
    
    

    return (
        <div className="flex min-h-full items-center justify-center mt-6 sm:px-6 lg:px-8">
            <Card style={{ width: "90%" }}>
        <Form layout="inline"
          onFinish={handleSubmit}>
            <div className='w-full sm:w-full mt-2'>
            <label htmlFor="Username">Username</label>
            <Form.Item >
                <Input
                    value={editedItem.UserName}
                    onChange={(e) => handleChange('UserName', e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </Form.Item>
            </div>
            <div className='w-full sm:w-full mt-2'>
            <label htmlFor="Password">Password</label>
            <Form.Item >
                <Input.Password
                                value={editedItem.Password}
                                onChange={(e) => handleChange('Password', e.target.value)}
                                iconRender={(visible) => (visible ? <EyeOutlined /> : <EyeInvisibleOutlined />)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </Form.Item>
            </div>
            <div className=' mt-2 w-full sm:w-2/4'>
            <label htmlFor="NameThai">ชื่อภาษาไทย</label>
            <Form.Item >
                <Input
                    value={editedItem.NameThai}
                    onChange={(e) => handleChange('NameThai', e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </Form.Item>
            </div>
            <div className=' mt-2 w-full sm:w-2/4'>
            <label htmlFor="SurnameThai">นามสกุลภาษาไทย</label>
            <Form.Item >
                <Input
                    value={editedItem.SurnameThai}
                    onChange={(e) => handleChange('SurnameThai', e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </Form.Item>
            </div>
            <div className=' mt-2 w-full sm:w-2/4'>
            <label htmlFor="NameEng">ชื่อภาษาอังกฤษ</label>
            <Form.Item >
                <Input
                    value={editedItem.NameEng}
                    onChange={(e) => handleChange('NameEng', e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </Form.Item>
            </div>
            <div className=' mt-2 w-full sm:w-2/4'>
            <label htmlFor="SurnameEng">นามสกุลภาษาอังกฤษ</label>
            <Form.Item >
                <Input
                    value={editedItem.SurnameEng}
                    onChange={(e) => handleChange('SurnameEng', e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </Form.Item>
            </div>
            <div className=' mt-2 w-full sm:w-2/4'>
            <label htmlFor="UserType">ระดับผู้ใช้งาน</label>
            <Form.Item >
                <select
                    value={editedItem.UserType}
                    onChange={(e) => handleChange('UserType', e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                    <option value="แอดมิน">แอดมิน</option>
                    <option value="อาจารย์">อาจารย์</option>
                </select>
            </Form.Item>
            </div>
            <div className=' mt-2 w-full sm:w-2/4'>
            <label htmlFor="Tel">เบอร์โทรศัพท์</label>
            <Form.Item >
                <Input
                    value={editedItem.Tel}
                    onChange={(e) => handleChange('Tel', e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </Form.Item>
            </div>
            <div className=' mt-2 w-full sm:w-full'>
            <label htmlFor="Email">อีเมล</label>
            <Form.Item >
                <Input
                    value={editedItem.Email}
                    onChange={(e) => handleChange('Email', e.target.value)}
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                />
            </Form.Item>
            </div>
            <div className='w-full sm:w-10/12  mt-2'>

          </div>

          <div className='w-full sm:w-2/12 mt-10'>
            <Form.Item>
              <button type="primary" htmlType="submit" className="px-4 py-2 bg-green-500 transition ease-in-out delay-75 hover:bg-green-600 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110">
                บันทึกข้อมูลผู้ใช้งาน</button>

            </Form.Item>
          </div>
        </Form>
        </Card>
        </div>

    );
};

