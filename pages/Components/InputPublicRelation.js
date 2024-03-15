import React, { useEffect, useState, ChangeEvent } from 'react';
import { Button, Checkbox, Form, Input, Radio, Card, Select, Modal, Row, Col,  } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { collection, addDoc, updateDoc, doc, getDocs, orderBy, query, limit } from 'firebase/firestore'; // เพิ่ม getDocs ด้วย
import { db } from '../api/firebase/firebase';
import { storage } from '../api/firebase/firebase'; // Make sure this import is correct




export default function InputPublicRelation() { 


    const [newItem, setNewItem] = useState({
        EventName: '',
        EventDetail: '',
        EventMore: '',
        EventCategory: '',
        LevelEvent: '',
        Postdate: '',
        EventImg: '',
    });
    
    const [selectAll, setSelectAll] = useState(false);
    const [fileList, setFileList] = useState([]);

    const handleSelectAllChange = (e) => {
        setSelectAll(e.target.checked); // Update selectAll state
        let updatedLevelEvent = []; // Initialize updatedLevelEvent
        if (e.target.checked) { // If selectAll is checked
            updatedLevelEvent = ['อาจารย์', 'นักศึกษาปีที่1', 'นักศึกษาปีที่2', 'นักศึกษาปีที่3', 'นักศึกษาปีที่4', 'สาธารณะ(ทุกคน)'];
        }
        setNewItem({ ...newItem, LevelEvent: updatedLevelEvent }); // Update LevelEvent in newItem
    };
    

    const onChange = (checkedValues) => {
        let updatedLevelEvent = [...newItem.LevelEvent]; // Copy the existing values
        if (selectAll) {
            updatedLevelEvent = ['อาจารย์', 'นักศึกษาปีที่1', 'นักศึกษาปีที่2', 'นักศึกษาปีที่3', 'นักศึกษาปีที่4', 'สาธารณะ(ทุกคน)'];
        } else {
            checkedValues.forEach((value) => {
                if (!updatedLevelEvent.includes(value)) {
                    updatedLevelEvent.push(value); // Add the value if it's not already included
                }
            });
        }
        setNewItem({ ...newItem, LevelEvent: updatedLevelEvent });
    };

    const handleSubmit = async () => {
        try {
            await handleUpload(newItem);
            const postDate = new Date(newItem.Postdate).toLocaleDateString('th-TH'); // แปลงวันที่เป็นรูปแบบ 'วัน-เดือน-ปี'
            await addDoc(collection(db, 'publicrelation'), {
                ...newItem,
                Postdate: postDate,
            });
            message.success('เพิ่มข้อมูลประชาสัมพันธ์สำเร็จ');
            setNewItem({
                EventName: '',
                EventDetail: '',
                EventMore: '',
                EventCategory: '',
                LevelEvent: '',
                Postdate: '',
                EventImg: null,
            });
            setIsModaladd(false);
            setFileList([]); // Clear the fileList after successful upload
        } catch (error) {
            console.error('Failed to submit form:', error);
            message.error('เพิ่มข้อมูลประชาสัมพันธ์ไม่สำเร็จ');
        }
    };
    

        // รูปภาพ
        const handleUpload = async (newItem) => { // Accept newItem as parameter
            try {
                const storageRef = storage.ref();
                for (const file of fileList) {
                    const fileRef = storageRef.child(file.name);
                    await fileRef.put(file);
                    const downloadURL = await fileRef.getDownloadURL();
                    setNewItem({ ...newItem, EventImg: downloadURL }); // Update EventImg in newItem
                }
                message.success('Upload image success');
                setFileList([]); // Clear fileList after successful upload
            } catch (error) {
                console.error('Failed to upload image:', error);
                message.error('Upload image failed');
            }
        };
        
        

        const [isModaladd, setIsModaladd] = useState(false);
    // Add item to database
    const addItem = async (e) => {
        e.preventDefault();
        if (newItem.EventName && newItem.EventDetail && newItem.EventMore && newItem.EventCategory && newItem.LevelEvent) {
            await handleSubmit();
             // ปิด Modal หลังจากเพิ่มข้อมูลสำเร็จ
        } else {
            message.error('กรุณากรอกข้อมูลให้ครบทุกช่อง');
        }
    };
    
    
    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(db, 'publicrelation'), orderBy('EventID', 'desc'));
            const querySnapshot = await getDocs(q);
            let latestID = 0;
            querySnapshot.forEach((doc) => {
                const eventID = doc.data().EventID;
                if (eventID > latestID) {
                    latestID = eventID;
                }
            });
            setNewItem({ ...newItem, EventID: latestID + 1 });
        };
        fetchData();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps
    
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
                        <label htmlFor="EventImg">รูปข้อมูลประชาสัมพันธ์</label>
                        <Form.Item
                            name="EventImg"
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาเลือกรูปข้อมูลประชาสัมพันธ์',
                                },
                            ]}
                        >
                            <Upload
                                name="EventImg"
                                fileList={fileList}
                                beforeUpload={(file) => { setFileList([...fileList, file]); return false; }}
                                showUploadList={false}
                                accept=".jpg,.jpeg,.png"
                            >
                                <Button icon={<InboxOutlined />}>เลือกรูปภาพ</Button>
                            </Upload>
                        </Form.Item>
                    </div>



                    <div className='w-full sm:w-full mt-2'>
                        <label htmlFor="EventName">ชื่อข้อมูลประชาสัมพันธ์</label>
                        <Form.Item
                            key="EventName"
                            name="EventName"
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาใส่ชื่อข้อมูลประชาสัมพันธ์'
                                },
                            ]}
                        >
                            <Input
                                
                                value={newItem.EventName}
                                onChange={(e) => setNewItem({ ...newItem, EventName: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </Form.Item>
                    </div>
                    <div className='mt-2 w-full sm:w-full'>
                        <label htmlFor="EventDetail">รายละเอียดข้อมูลประชาสัมพันธ์</label>
                        <Form.Item
                            name="EventDetail"
                            key="EventDetail"
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาใส่ข้อมูลประชาสัมพันธ์'
                                },
                            ]}
                        >
                            <textarea
                                value={newItem.EventDetail}
                                onChange={(e) => setNewItem({ ...newItem, EventDetail: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </Form.Item>
                    </div>
                    <div className='mt-2 w-full sm:w-full'>
                        <label htmlFor="EventMore">รายละเอียดเพิ่มเติมข้อมูลประชาสัมพันธ์</label>
                        <Form.Item
                            name="EventMore"
                            key="EventMore"
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาใส่รายละเอียดเพิ่มเติมข้อมูลประชาสัมพันธ์'
                                },
                            ]}
                        >
                            <Input
                                value={newItem.EventMore}
                                onChange={(e) => setNewItem({ ...newItem, EventMore: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                        </Form.Item>
                    </div>
                    <div className=' mt-2 w-full sm:w-2/4'>
                        <label>หมวดหมู่ข้อมูลประชาสัมพันธ์</label>
                        <Form.Item
                        key="EventCategory"
                            name="EventCategory"
                            rules={[{ required: true, message: 'กรุณาเลือกหมวดหมู่ข้อมูลประชาสัมพันธ์' }]}
                        >
                            <select
                                value={newItem.EventCategory}
                                onChange={(e) => setNewItem({ ...newItem, EventCategory: e.target.value })}
                                id="EventCategory" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                                <option selected disabled>เลือกหมวดหมู่ข้อมูลประชาสัมพันธ์</option>
                                <option value="นิทรรศการ/บรรยากาศการเรียน">นิทรรศการ/บรรยากาศการเรียน</option>
                                <option value="บทความ/ข่าวสารทางวิชาการ">บทความ/ข่าวสารทางวิชาการ</option>
                                <option value="การจัดสัมมนา">การจัดสัมมนา</option>
                                <option value="กิจกรรมทางสังคม">กิจกรรมทางสังคม</option>
                                <option value="นักศึกษาที่ประสบความสำเร็จ">นักศึกษาที่ประสบความสำเร็จ</option>
                                <option value="การเข้าร่วมการแข่งขัน/โครงการทำนุบำรุง">การเข้าร่วมการแข่งขัน/โครงการทำนุบำรุง</option>
                            </select>
                        </Form.Item>
                    </div>
                    <div className='w-full sm:w-2/4 mt-2'>
                        <label htmlFor="LevelEvent">สิทธิการรับรู้ข้อมูลประชาสัมพันธ์</label>
                        <Form.Item
                        key='LevelEvent'
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


                                >
                                    <Row>
                                        <Col span={12}>
                                            <Checkbox value="อาจารย์">อาจารย์</Checkbox>
                                        </Col>
                                        <Col span={12}>
                                            <Checkbox value="นักศึกษาปีที่3">นักศึกษาปีที่3</Checkbox>
                                        </Col>
                                        <Col span={12}>
                                            <Checkbox value="นักศึกษาปีที่1">นักศึกษาปีที่1</Checkbox>
                                        </Col>
                                        <Col span={12}>
                                            <Checkbox value="นักศึกษาปีที่4">นักศึกษาปีที่4</Checkbox>
                                        </Col>
                                        <Col span={12}>
                                            <Checkbox value='นักศึกษาปีที่2'>นักศึกษาปีที่2</Checkbox>
                                        </Col>
                                        <Col span={12}>
                                            <Checkbox value="สาธารณะ(ทุกคน)" onChange={handleSelectAllChange}>สาธารณะ(ทุกคน)</Checkbox>
                                        </Col>
                                    </Row>
                                </div>
                            </Checkbox.Group>
                        </Form.Item>
                    </div>
                    <div className='w-full sm:w-full mt-2'>
                        <label htmlFor="Postdate">วันที่โพสต์</label>
                        <Form.Item
                        key="postdate"
                            name="Postdate"
                            rules={[
                                {
                                    required: true,
                                    message: 'กรุณาเลือกวันที่โพสต์',
                                },
                            ]}
                        >
                            <Input
                                type="date"
                                value={newItem.Postdate}
                                onChange={(e) => setNewItem({ ...newItem, Postdate: e.target.value })}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </Form.Item>
                    </div>
                    <div className='w-full sm:w-10/12 mt-2'>

                    </div>
                    <div className='w-full sm:w-2/12 mt-10'>
                        <button
                            onClick={addItem}
                            type="submit"
                            className="px-4 py-2 bg-green-500 transition ease-in-out delay-75 hover:bg-green-600 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                        >
                            เพิ่มข้อมูลประชาสัมพันธ์
                        </button>

                    </div>
                </Form>
            </Card></div>
    )
}