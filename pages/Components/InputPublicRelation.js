import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Card, Upload, message, Row, Col } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { collection, addDoc, getDocs, orderBy, query } from 'firebase/firestore';
import { db, app } from '../api/firebase/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export default function InputPublicRelation() {
    const [newItem, setNewItem] = useState({
        EventName: '',
        EventDetail: '',
        EventMore: '',
        EventCategory: '',
        LevelEvent: [],
        Postdate: '',
        EventImg: null,
    });

    const [fileList, setFileList] = useState([]);
    const [previewImage, setPreviewImage] = useState(null);
    const [sections, setSections] = useState([]);

    const handleSelectAllChange = (e) => {
        const checked = e.target.checked;
        if (checked) {
            setNewItem({ ...newItem, LevelEvent: sections.map(section => section.Section) });
        } else {
            setNewItem({ ...newItem, LevelEvent: [] });
        }
    };

    const onChange = (checkedValues) => {
        setNewItem({ ...newItem, LevelEvent: checkedValues });
    };

    const handleUpload = async () => {
        const storageInstance = getStorage(app);
        let downloadURLs = [];

        try {
            for (const file of fileList) {
                const storageRef = ref(storageInstance, `publicrelation/images/${file.name}`);
                await uploadBytes(storageRef, file);
                const downloadURL = await getDownloadURL(storageRef);
                downloadURLs.push(downloadURL);
                setNewItem(prevItem => ({ ...prevItem, EventImg: downloadURL }));
            }

            message.success('Upload image success');
            setFileList([]);
            setPreviewImage(null);
            return downloadURLs;
        } catch (error) {
            console.error('Failed to upload image:', error);
            message.error('Upload image failed');
            return [];
        }
    };

    const handleSubmit = async () => {
        try {
            const postDate = new Date(newItem.Postdate).toLocaleDateString('th-TH');
            const downloadURLs = await handleUpload();
            const updatedItem = { ...newItem, EventImg: downloadURLs.length ? downloadURLs[0] : null, Postdate: postDate };

            await addDoc(collection(db, 'publicrelation'), updatedItem);

            message.success('เพิ่มข้อมูลประชาสัมพันธ์สำเร็จ');
            setNewItem({
                EventName: '',
                EventDetail: '',
                EventMore: '',
                EventCategory: '',
                LevelEvent: [],
                Postdate: '',
                EventImg: null,
            });
        } catch (error) {
            console.error('Failed to submit form:', error);
            message.error('เพิ่มข้อมูลประชาสัมพันธ์ไม่สำเร็จ');
        }
    };

    const handlePreview = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewImage(reader.result);
        };
    };

    const addItem = async (e) => {
        e.preventDefault();
        if (newItem.EventName && newItem.EventDetail && newItem.EventMore && newItem.EventCategory && newItem.LevelEvent.length) {
            await handleSubmit();
        } else {
            message.error('กรุณากรอกข้อมูลให้ครบทุกช่อง');
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            const q = query(collection(db, 'section'), orderBy('SectionID', 'desc'));
            const querySnapshot = await getDocs(q);
            const sectionsList = [];
            querySnapshot.forEach((doc) => {
                sectionsList.push(doc.data());
            });
            setSections(sectionsList);
        };
        fetchData();
    }, []);

    return (
        <div className="flex min-h-full items-center justify-center mt-6 sm:px-6 lg:px-8">
            <Card style={{ width: "90%" }}>
                <Form
                    layout="inline"
                    name='publicrelationForm'
                    onFinish={addItem}
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
                                beforeUpload={(file) => {
                                    setFileList([...fileList, file]);
                                    handlePreview(file);
                                    return false;
                                }}
                                showUploadList={false}
                                accept=".jpg,.jpeg,.png"
                            >
                                <Button icon={<InboxOutlined />}>เลือกรูปภาพ</Button>
                            </Upload>
                        </Form.Item>
                        {previewImage && (
                            <div className="mt-2">
                                <img src={previewImage} alt="Image Preview" style={{ maxWidth: '100%' }} />
                            </div>
                        )}
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
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
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
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
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
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            />
                        </Form.Item>
                    </div>

                    <div className='mt-2 w-full sm:w-2/4'>
                        <label>หมวดหมู่ข้อมูลประชาสัมพันธ์</label>
                        <Form.Item
                            key="EventCategory"
                            name="EventCategory"
                            rules={[{ required: true, message: 'กรุณาเลือกหมวดหมู่ข้อมูลประชาสัมพันธ์' }]}
                        >
                            <select
                                value={newItem.EventCategory}
                                onChange={(e) => setNewItem({ ...newItem, EventCategory: e.target.value })}
                                id="EventCategory"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            >
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
                                <div>
                                    <Row>
                                        {sections.map((section) => (
                                            <Col span={12} key={section.SectionID}>
                                                <Checkbox value={section.Section}>{section.Section}</Checkbox>
                                            </Col>
                                        ))}
                                        <Col span={24}>
                                            <Checkbox value="สาธารณะ(ทุกคน)" onChange={handleSelectAllChange}>
                                                สาธารณะ(ทุกคน)
                                            </Checkbox>
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

                    <div className='w-full sm:w-10/12 mt-2'></div>
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
            </Card>
        </div>
    );
}
