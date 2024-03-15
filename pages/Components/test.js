import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Radio, Card, Select, Modal, Row, Col } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { collection,addDoc } from 'firebase/firestore';

export default function InputPublicRelation() { // รับ prop setIsDataComplete เพื่อใช้ในการกำหนดสถานะของปุ่ม


    const { Dragger } = Upload;
    const props = {
        name: 'file',
        multiple: false,
        action: 'https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188',
        onChange(info) {
            const { status } = info.file;
            if (status !== 'uploading') {
                console.log(info.file, info.fileList);
            }
            if (status === 'done') {
                message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
                message.error(`${info.file.name} file upload failed.`);
            }
        },
        onDrop(e) {
            console.log('Dropped files', e.dataTransfer.files);
        },
    };

    const [selectAll, setSelectAll] = useState(false);

    const handleSelectAllChange = (e) => {
        setSelectAll(e.target.checked);
    };

    const onChange = (checkedValues) => {
        if (selectAll) {
            checkedValues = ['A', 'B', 'C', 'D', 'E', 'F'];
        }
        console.log('checked = ', checkedValues);
        // เรียกใช้ฟังก์ชันเพื่อตรวจสอบข้อมูลว่าครบถ้วนหรือไม่
        checkDataCompleteness(checkedValues);
    };

    const handleSubmit = async (values) => {
        try {
            // Perform any necessary form validation

            // Call the parent component's onSubmit function to handle the submit action
            await onSubmit(values);

            // Reset the form if needed
            // form.resetFields();
        } catch (error) {
            console.error('Failed to submit form:', error);
        }
    };
    const [newItem, setNewItem] = useState({EventName:'',EvenDetail:'',EvenMore:'',EvenCategory:'',LevelEvent:''});
    // Add item to database
    const addItem = async (e) =>{
        e.prevenDefault();
        if(newItem.EventName !=='' && newItem.EvenDetail !=='' && newItem.EvenMore !=='' && newItem.EvenCategory !=='' && newItem.LevelEvent !==''){
            //setItem([...Item, newItem]);
            await addDoc(collection(db, 'publicrelation'),{
                EventName: newItem.EventName.trim(),
                EvenDetail: newItem.EvenDetail,
                EvenMore: newItem.EvenMore,
                EvenCategory: newItem.EvenCategory,
                LevelEvent: newItem.LevelEvent,
            });
        }
    }

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
                    <div className='w-full sm:w-full mt-2 my-8 py-3'>
                        <label htmlFor="EventImg">รูปประชาสัมพันธ์</label>
                        <Dragger {...props} >
                            <p className="ant-upload-drag-icon">
                                <InboxOutlined />
                            </p>
                            <p className="ant-upload-text">Click or drag file to this area to upload</p>
                            <p className="ant-upload-hint">
                                Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                                banned files.
                            </p>
                        </Dragger>
                    </div>

                    <div className='w-full sm:w-full mt-2'>
                        <label htmlFor="EventName">ชื่อประชาสัมพันธ์</label>
                        <Form.Item
                            name="EventName"
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาใส่ชื่อประชาสัมพันธ์'
                                },
                            ]}
                        >
                            <Input 
                            value={newItem.EventName}
                            onChange={(e) => setNewItem({...newItem, EventName: e.target.value })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </Form.Item>
                    </div>
                    <div className='mt-2 w-full sm:w-full'>
                        <label htmlFor="EvenDetail">รายละเอียดข้อมูลประชาสัมพันธ์</label>
                        <Form.Item
                            name="EvenDetail"
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาใส่ข้อมูลประชาสัมพันธ์'
                                },
                            ]}
                        >
                            <Input 
                            value={newItem.EvenDetail}
                            onChange={(e) => setNewItem({...newItem, EvenDetail: e.target.value })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </Form.Item>
                    </div>
                    <div className='mt-2 w-full sm:w-full'>
                        <label htmlFor="EvenMore">รายละเอียดเพิ่มเติมข้อมูลประชาสัมพันธ์</label>
                        <Form.Item
                            name="EvenMore"
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาใส่รายละเอียดเพิ่มเติมข้อมูลประชาสัมพันธ์'
                                },
                            ]}
                        >
                            <Input 
                            value={newItem.EvenMore}
                            onChange={(e) => setNewItem({...newItem, EvenMore: e.target.value })}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </Form.Item>
                    </div>
                    <div className=' mt-2 w-full sm:w-2/4'>
                        <label>หมวดหมู่ข้อมูลประชาสัมพันธ์</label>
                        <Form.Item
                            name="EvenCategory"
                            rules={[{ required: true, message: 'กรุณาเลือกหมวดหมู่ข้อมูลประชาสัมพันธ์' }]}
                        >
                            <select 
                            value={newItem.EvenCategory}
                            onChange={(e) => setNewItem({...newItem, EvenCategory: e.target.value })}
                            id="EvenCategory" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected disabled>เลือกหมวดหมู่ข้อมูลประชาสัมพันธ์</option>
                                <option value="1M">นิทรรศการ/บรรยากาศการเรียน</option>
                                <option value="2M">บทความ/ข่าวสารทางวิชาการ</option>
                                <option value="3M">การจัดสัมมนา</option>
                                <option value="4M">กิจกรรมทางสังคม</option>
                                <option value="5M">นักศึกษาท่ประสบความสำเร็จ</option>
                                <option value="6M">การเข้าร่วมการแข่งขัน/โครงการทำนุบำรุง</option>
                            </select>
                        </Form.Item>
                    </div>
                    <div className='w-full sm:w-2/4 mt-2'>
                        <label htmlFor="LevelEvent">สิทธิการรับรู้ข้อมูลประชาสัมพันธ์</label>
                        <Form.Item
                            name="LevelEvent"
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาใส่สิทธิการรับรู้ข้อมูลประชาสัมพันธ์',
                                },
                            ]}
                        >
                            <Checkbox.Group
                                style={{ width: '100%' }}
                                onChange={onChange}
                                value={newItem.LevelEvent}
                                
                            >
                                <div 
                                value={newItem.LevelEvent}
                                onChange={(e) => setNewItem({...newItem, LevelEvent: e.target.value })}
                                >
                                <Row>
                                    <Col span={12}>
                                        <Checkbox value="A">อาจารย์</Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="B">นักศึกษาปีที่1</Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="C">นักศึกษาปีที่2</Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="D">นักศึกษาปีที่3</Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value='E'>นักศึกษาปีที่4</Checkbox>
                                    </Col>
                                    <Col span={12}>
                                        <Checkbox value="F" onChange={handleSelectAllChange}>สาธารณะ(ทุกคน)</Checkbox>
                                    </Col>
                                </Row>
                                </div>
                            </Checkbox.Group>
                        </Form.Item>
                    </div>
                    <button
                    onClick={addItem}  
                    type="submit"             
                    className="text-white bg-green-600 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-8 py-2.5 text-center mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                    >
                        444
                    </button>       
                </Form>
            </Card></div>
    )
}