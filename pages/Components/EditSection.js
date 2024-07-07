import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Radio, Card, Select, Modal, Row, Col, Upload, message, } from 'antd';
import { updateDoc, doc } from 'firebase/firestore';
import { db, storage } from '../api/firebase/firebase';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';

export default function EditSection({ selectedItem, onUpdate, onCancel }) {


    useEffect(() => {
        setEditedItem(selectedItem);
    }, [selectedItem]);

    const handleChange = (name, value) => {
        setEditedItem({ ...editedItem, [name]: value });
    };

    const handleSubmit = async () => {
        try {
            await updateDoc(doc(db, 'section', editedItem.id), editedItem);
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
                        <label htmlFor="Section">Section</label>
                        <Form.Item >
                            <Input
                                value={editedItem.Section}
                                onChange={(e) => handleChange('Section', e.target.value)}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </Form.Item>
                    </div>
                    
                    <div className='w-full sm:w-10/12  mt-2'>

                    </div>

                    <div className='w-full sm:w-2/12 mt-10'>
                        <Form.Item>
                            <button type="primary" htmlType="submit" className="px-4 py-2 bg-green-500 transition ease-in-out delay-75 hover:bg-green-600 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110">
                                บันทึกข้อมูลหมู่เรียน</button>

                        </Form.Item>
                    </div>
                </Form>
            </Card>
        </div>

    );
};

