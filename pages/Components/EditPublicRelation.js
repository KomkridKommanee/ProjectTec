import React, { useEffect, useState } from 'react';
import { Button, Checkbox, Form, Input, Radio, Card, Select, Modal, Row, Col, Upload, message, Switch } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { updateDoc, doc } from 'firebase/firestore';
import { db, storage } from '../api/firebase/firebase';

export default function EditPublicRelation({ selectedItem, onCancel, onUpdate }) {
  const [editedItem, setEditedItem] = useState(selectedItem);

  useEffect(() => {
    setEditedItem(selectedItem);
  }, [selectedItem]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedItem({ ...editedItem, [name]: value });
  };

  const handleUpload = async (file) => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(selectedItem.EventName);
      await fileRef.put(file);
      const downloadURL = await fileRef.getDownloadURL();
      setEditedItem({ ...editedItem, EventImg: downloadURL });
      message.success('Upload image success');
    } catch (error) {
      console.error('Failed to upload image:', error);
      message.error('Upload image failed');
    }
  };

  const handleSubmit = async () => {
    try {
      await updateDoc(doc(db, 'publicrelation', editedItem.id), editedItem);
      onUpdate(editedItem);

      message.success('Update success');
    } catch (error) {
      console.error('Failed to update:', error);
      message.error('Update failed');
    }
  };

  const [status, setStatus] = useState(selectedItem.status);


  const handleStatusChange = (checked) => {
    setEditedItem({ ...editedItem, status: checked });
    setStatus(checked);
  };

  const handleLevelEventChange = (values) => {
    if (values.includes('สาธารณะ(ทุกคน)')) {
      setEditedItem({
        ...editedItem,
        LevelEvent: [
          'อาจารย์',
          'นักศึกษาปีที่1',
          'นักศึกษาปีที่2',
          'นักศึกษาปีที่3',
          'นักศึกษาปีที่4',
          'สาธารณะ(ทุกคน)'
        ]
      });
    } else {
      setEditedItem({ ...editedItem, LevelEvent: values });
    }
  };




  return (
    <div className="flex min-h-full items-center justify-center mt-6 sm:px-6 lg:px-8">
      <Card style={{ width: "90%" }}>
        <Form
          layout="inline"
          onFinish={handleSubmit}>
          <div className='w-full sm:w-full mt-2'>
            <label htmlFor="EventImg">รูปภาพข้อมูลประชาสัมพันธ์</label>
            <Form.Item >
              <Upload
                beforeUpload={handleUpload}
                showUploadList={false}
                accept=".jpg,.jpeg,.png"
              >
                <Button icon={<InboxOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>

          </div>
          <div className='w-full sm:w-full mt-2'>
            <label htmlFor="EventName">ชื่อข้อมูลประชาสัมพันธ์</label>
            <Form.Item
            >
              <Input name="EventName" value={editedItem.EventName} onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </Form.Item>
          </div>
          <div className='mt-2 w-full sm:w-full'>
            <label htmlFor="EventDetail">รายละเอียดข้อมูลประชาสัมพันธ์</label>
            <Form.Item >
              <textarea name="EventDetail" value={editedItem.EventDetail} onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </Form.Item>
          </div>
          <div className='mt-2 w-full sm:w-full'>
            <label htmlFor="EventMore">รายละเอียดเพิ่มเติมข้อมูลประชาสัมพันธ์</label>
            <Form.Item >
              <Input name="EventMore" value={editedItem.EventMore} onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
            </Form.Item>
          </div>
          <div className=' mt-2 w-full sm:w-2/4'>
            <label>หมวดหมู่ข้อมูลประชาสัมพันธ์</label>
            <Form.Item >
              <select name="EventCategory" value={editedItem.EventCategory} onChange={handleChange}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
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
            <Form.Item>
              <Checkbox.Group
                options={[
                  { label: 'อาจารย์', value: 'อาจารย์' },
                  { label: 'นักศึกษาปีที่1', value: 'นักศึกษาปีที่1' },
                  { label: 'นักศึกษาปีที่2', value: 'นักศึกษาปีที่2' },
                  { label: 'นักศึกษาปีที่3', value: 'นักศึกษาปีที่3' },
                  { label: 'นักศึกษาปีที่4', value: 'นักศึกษาปีที่4' },
                  { label: 'สาธารณะ(ทุกคน)', value: 'สาธารณะ(ทุกคน)' }
                ]}
                value={editedItem.LevelEvent}
                onChange={handleLevelEventChange}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </div>

          <div className='w-full sm:w-2/4 mt-2'>
            <label htmlFor="Postdate">วันที่โพสต์</label>
            <Form.Item >
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
          <div className='w-full sm:w-2/4 mt-2'>

          </div>
          <div className='w-full sm:w-full mt-2'>
            <label>สถานะ</label>
            <Form.Item>
              <Switch checked={status} onChange={handleStatusChange} />
            </Form.Item>
          </div>

          <div className='w-full sm:w-9/12  mt-2'>

          </div>

          <div className='w-full sm:w-3/12 mt-10'>
            <Form.Item>
              <button type="primary" htmlType="submit" className="px-4 py-2 bg-green-500 transition ease-in-out delay-75 hover:bg-green-600 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110">
                บันทึกข้อมูลประชาสัมพันธ์</button>

            </Form.Item>
          </div>
        </Form>
      </Card>
    </div>
  );
}
