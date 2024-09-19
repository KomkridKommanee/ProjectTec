import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Card, Upload, message, Switch, Row, Col } from 'antd';
import { InboxOutlined, CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { updateDoc, doc, collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db, app } from '../api/firebase/firebase';
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';

export default function EditPublicRelation({ selectedItem, onCancel, onUpdate }) {
  const [status, setStatus] = useState(selectedItem.status);
  const [editedItem, setEditedItem] = useState(selectedItem);
  const [fileList, setFileList] = useState([]);
  const [previewImage, setPreviewImage] = useState(selectedItem.EventImg || null);
  const [sections, setSections] = useState([]);

  useEffect(() => {
    setEditedItem(selectedItem);
    setPreviewImage(selectedItem.EventImg || null);
  }, [selectedItem]);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  const handleUpload = async () => {
    const storageInstance = getStorage(app);
    let downloadURLs = [];

    try {
      if (fileList.length > 0 && editedItem.EventImg) {
        const oldImageRef = ref(storageInstance, editedItem.EventImg);
        await deleteObject(oldImageRef);
      }
      for (const file of fileList) {
        const storageRef = ref(storageInstance, `publicrelation/images/${file.name}`);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        downloadURLs.push(downloadURL);
        setEditedItem((prevItem) => ({ ...prevItem, EventImg: downloadURL }));
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
      const downloadURLs = await handleUpload();
      const updatedItem = { ...editedItem, EventImg: downloadURLs.length ? downloadURLs[0] : editedItem.EventImg };
      await updateDoc(doc(db, 'publicrelation', editedItem.id), updatedItem);
      onUpdate(updatedItem);

      message.success('Update success');
    } catch (error) {
      console.error('Failed to update:', error);
      message.error('Update failed');
    }
  };

  const handlePreview = (file) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
  };

  const handleStatusChange = (checked) => {
    setEditedItem({ ...editedItem, status: checked });
    setStatus(checked);
  };

  const handleLevelEventChange = (values) => {
    if (values.includes('สาธารณะ(ทุกคน)')) {
      setEditedItem({
        ...editedItem,
        LevelEvent: sections.map(section => section.Section).concat('อาจารย์', 'สาธารณะ(ทุกคน)')
      });
    } else {
      setEditedItem({ ...editedItem, LevelEvent: values });
    }
  };

  const handleSelectAllChange = (e) => {
    const checked = e.target.checked;
    if (checked) {
      setEditedItem({ ...editedItem, LevelEvent: sections.map(section => section.Section).concat('อาจารย์') });
    } else {
      setEditedItem({ ...editedItem, LevelEvent: [] });
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center mt-6 sm:px-6 lg:px-8">
      <Card style={{ width: "90%" }}>
        <Form
          layout="inline"
          onFinish={handleSubmit}>
          <div className='w-full sm:w-full mt-2'>
            <label htmlFor="EventImg" className=' font-bold '>รูปภาพข้อมูลประชาสัมพันธ์</label>
            <Form.Item>
              <Upload
                name="EventImg"
                fileList={fileList}
                beforeUpload={(file) => {
                  setFileList([file]);
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
            <label htmlFor="EventName" className=' font-bold '>ชื่อข้อมูลประชาสัมพันธ์</label>
            <Form.Item>
              <Input
                name="EventName"
                value={editedItem.EventName}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </div>
          <div className='mt-2 w-full sm:w-full'>
            <label htmlFor="EventDetail" className=' font-bold '>รายละเอียดข้อมูลประชาสัมพันธ์</label>
            <Form.Item>
              <textarea
                name="EventDetail"
                value={editedItem.EventDetail}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </div>
          <div className='mt-2 w-full sm:w-full'>
            <label htmlFor="EventMore" className=' font-bold '>รายละเอียดเพิ่มเติมข้อมูลประชาสัมพันธ์</label>
            <Form.Item>
              <Input
                name="EventMore"
                value={editedItem.EventMore}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </div>
          <div className='mt-2 w-full sm:w-2/4'>
            <label className=' font-bold '>หมวดหมู่ข้อมูลประชาสัมพันธ์</label>
            <Form.Item>
              <select
                name="EventCategory"
                value={editedItem.EventCategory}
                onChange={handleChange}
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
            <label htmlFor="LevelEvent" className=' font-bold '>สิทธิการรับรู้ข้อมูลประชาสัมพันธ์</label>
            <Form.Item>
              <Checkbox.Group
                value={editedItem.LevelEvent}
                onChange={handleLevelEventChange}
                style={{ width: '100%' }}
              >
                <div>
                  <Row>
                    {sections.map((section) => (
                      <Col span={12} key={section.SectionID}>
                        <Checkbox value={section.Section}>{section.Section}</Checkbox>
                      </Col>
                    ))}
                    <Col span={12}>
                      <Checkbox value="อาจารย์">
                        อาจารย์
                      </Checkbox>
                    </Col>
                    <Col span={12}>
                      <Checkbox value="สาธารณะ(ทุกคน)" onChange={handleSelectAllChange}>
                        สาธารณะ(ทุกคน)
                      </Checkbox>
                    </Col>
                  </Row>
                </div>
              </Checkbox.Group>
            </Form.Item>
          </div>
          <div className='w-full sm:w-2/4 mt-2'>
            <label htmlFor="Postdate" className=' font-bold '>วันที่โพสต์</label>
            <Form.Item>
              <Input
                type="date"
                name="Postdate"
                value={new Date(editedItem.Postdate).toLocaleDateString('th-TH', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric'
                }).replace(/\//g, '-')}
                onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              />
            </Form.Item>
          </div>
          <div className='w-full sm:w-2/4 mt-2'></div>
          <div className='w-full sm:w-full mt-2'>
            <label className=' font-bold '>สถานะ</label>
            <Form.Item>
              <Switch 
                checked={status} onChange={handleStatusChange} />
            </Form.Item>
          </div>
          <div className='w-full sm:w-9/12 mt-2'></div>
          <div className='w-full sm:w-3/12 mt-10'>
            <Form.Item>
              <button type="primary" htmlType="submit" className="px-4 py-2 bg-green-500 transition ease-in-out delay-75 hover:bg-green-600 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110">
                บันทึกข้อมูลประชาสัมพันธ์
              </button>
            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
}
