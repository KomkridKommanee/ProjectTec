import React, { useEffect, useState, ChangeEvent } from 'react';
import { Button, Checkbox, Form, Input, Radio, Card, Select, Modal, Row, Col } from 'antd';
import { message, Upload } from 'antd';
import { collection, addDoc, updateDoc, doc, getDocs, orderBy, query } from 'firebase/firestore'; // เพิ่ม updateDoc และ doc
import { db } from '../api/firebase/firebase';
import { EyeOutlined, EyeInvisibleOutlined } from '@ant-design/icons';



export default function InputSection() { // รับ prop setIsDataComplete เพื่อใช้ในการกำหนดสถานะของปุ่ม

    const [newItem, setNewItem] = useState({

        Section: '',

    });



    const handleSubmit = async (values) => {
        try {

            await addDoc(collection(db, 'section'), {
                ...values,

            });

            message.success('เพิ่มข้อมูลหมู่เรียนสำเร็จ');
        } catch (error) {
            console.error('Failed to submit form:', error);
            message.error('เพิ่มข้อมูลหมู่เรียนไม่สำเร็จ');
        }
    };


    // Add item to database
    const addSection = async (e) => {
        e.preventDefault();
        if (newItem.Section !== '') {
            await handleSubmit(newItem);

        } else {
            message.error('กรุณากรอกข้อมูลให้ครบทุกช่อง');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(db, 'section'), orderBy('SectionID', 'desc'));
            const querySnapshot = await getDocs(q);
            let latestID = 0;
            querySnapshot.forEach((doc) => {
                const sectionID = doc.data().SectionID;
                if (sectionID > latestID) {
                    latestID = sectionID;
                }
            });
            setNewItem({ ...newItem, SectionID: latestID + 1 });
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
                        <label htmlFor="Section">หมู่เรียน</label>
                        <Form.Item
                            key="Section"
                            name="Section"
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณากรอกหมู่เรียน'
                                },
                            ]}
                        >
                            <Input

                                value={newItem.Section}
                                onChange={(e) => setNewItem({ ...newItem, Section: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </Form.Item>
                    </div>
                   
                    
                   
                    <div className='w-full sm:w-10/12 mt-2'>

                    </div>
                    <div className='w-full sm:w-2/12 mt-10'>
                        <button
                            onClick={addSection}
                            type="submit"
                            className="px-4 py-2 bg-green-500 transition ease-in-out delay-75 hover:bg-green-600 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                        >
                            เพิ่มหมู่เรียน
                        </button>

                    </div>
                </Form>
            </Card></div>
    )
}