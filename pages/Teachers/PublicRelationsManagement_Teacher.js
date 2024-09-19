import Example3 from '../Components/Na2';
import InputPublicRelation from '../Components/InputPublicRelation';
import React, { useEffect, useState, useRef } from 'react';
import { db } from '../api/firebase/firebase';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { EyeOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, Space, Table, Modal, Form, Checkbox, Row, Col, Radio, Switch, Card, Upload } from 'antd';
import Highlighter from 'react-highlight-words';
import EditPublicRelation from '../Components/EditPublicRelation';


export default function PublicRelationsManagement() {
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [data, setData] = useState([]);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isViewModalVisible, setIsViewModalVisible] = useState(false);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div style={{ padding: 8 }} onKeyDown={(e) => e.stopPropagation()}>
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{ marginBottom: 8, display: 'block' }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                    >
                        Search
                    </Button>
                    <Button onClick={() => clearFilters && handleReset(clearFilters)} size="small" style={{ width: 90 }}>
                        Reset
                    </Button>
                    <Button type="link" size="small" onClick={() => close()}>
                        Close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => <SearchOutlined style={{ color: filtered ? '#1677ff' : undefined }} />,
        onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }} searchWords={[searchText]} autoEscape textToHighlight={text ? text.toString() : ''} />
            ) : (
                text
            ),
    });

    useEffect(() => {
        fetchData();
    }, []);

    // Fetch data sorted by EventID in ascending order
    const fetchData = async () => {
        const q = query(collection(db, 'publicrelation'), orderBy('EventID', 'asc')); // Sorting by EventID
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
        setData(data);
    };

    const handleEdit = (record) => {
        setSelectedItem(record);
        setIsEditModalVisible(true);
    };

    const handleUpdate = (updatedItem) => {
        const updatedData = data.map((item) => (item.id === updatedItem.id ? updatedItem : item));
        setData(updatedData);
        setIsEditModalVisible(false);
    };

    const handleCancel = () => {
        setIsEditModalVisible(false);
    };

    const showViewModal = (item) => {
        setSelectedItem(item);
        setIsViewModalVisible(true);
    };

    const columns = [
        {
            title: 'ชื่อข้อมูลประชาสัมพันธ์',
            dataIndex: 'EventName',
            key: 'EventName',
            width: '25%',
            ...getColumnSearchProps('EventName'),
        },
        {
            title: 'หมวดหมู่ข้อมูลประชาสัมพันธ์',
            dataIndex: 'EventCategory',
            key: 'EventCategory',
            width: '15%',
            ...getColumnSearchProps('EventCategory'),
        },
        {
            title: 'สิทธิการรับรู้ข้อมูลประชาสัมพันธ์',
            dataIndex: 'LevelEvent',
            key: 'LevelEvent',
            width: '15%',
            render: (text, record) => (
                <ul>
                    {record.LevelEvent.map((level) => (
                        <li key={level}>{level}</li>
                    ))}
                </ul>
            ),
        },
        {
            title: 'วันที่โพสต์',
            dataIndex: 'Postdate',
            key: 'Postdate',
            width: '15%',
        },
        {
            title: 'สถานะ',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <Switch loading defaultChecked checked={status} />,
        },
        {
            title: 'แก้ไข',
            width: '10%',
            render: (text, record) => (
                <Button
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(record)}
                    className="flex items-center justify-center px-4 py-2 bg-yellow-400 transition ease-in-out hover:bg-yellow-500 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                />
            ),
        },
        {
            title: 'ดู',
            width: '10%',
            render: (text, record) => (
                <Button
                    icon={<EyeOutlined />}
                    onClick={() => showViewModal(record)}
                    className="flex items-center justify-center px-4 py-2 bg-green-500 transition ease-in-out hover:bg-green-600 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                />
            ),
        },
    ];

    return (
        <>
            <Example3 className="top-10" />
            <div className="justify-self-center py-5 md:py-7 shadow-xl bg-gradient-to-r from-cyan-600 to-blue-500">
                <p className="text-3xl md:text-2xl text-white text-start font-bold pl-44">จัดการข้อมูลประชาสัมพันธ์</p>
            </div>
            <Form className="mx-auto max-w-7xl my-10">
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => setIsAddOpen(true)}
                        className="cursor-pointer text-white font-bold relative text-[14px] w-[15em] h-[3em] text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[10px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[15px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700"
                    >
                        เพิ่มข้อมูลประชาสัมพันธ์
                    </button>
                </div>
                <Table columns={columns} dataSource={data} rowKey="id" pagination={{ pageSize: 6 }} />
            </Form>

            <Modal width={'90%'} title="แก้ไขข้อมูลประชาสัมพันธ์" open={isEditModalVisible} onCancel={handleCancel} footer={null}>
                <EditPublicRelation selectedItem={selectedItem} onCancel={handleCancel} onUpdate={handleUpdate} />
            </Modal>

            <Modal width={'90%'} title="รายละเอียดข้อมูลประชาสัมพันธ์" visible={isViewModalVisible} onCancel={() => setIsViewModalVisible(false)} footer={null}>
                {selectedItem && (
                    <div className="flex min-h-full items-center justify-center mt-6 sm:px-6 lg:px-8">
                        <Card style={{ width: '90%' }}>
                            <Form layout="inline">
                                <div className="w-full sm:w-full mt-2">
                                    <label>รูปข้อมูลประชาสัมพันธ์</label>
                                    <div className="flex justify-center">
                                        <img src={selectedItem.EventImg} alt="event" style={{ maxWidth: '100%' }} />
                                    </div>
                                </div>

                                <div className="w-full mt-2">
                                    <label>ชื่อข้อมูลประชาสัมพันธ์</label>
                                    <p>{selectedItem.EventName}</p>
                                </div>

                                <div className="w-full mt-2">
                                    <label>รายละเอียดข้อมูลประชาสัมพันธ์</label>
                                    <p>{selectedItem.EventDetail}</p>
                                </div>

                                <div className="w-full mt-2">
                                    <label>หมวดหมู่ข้อมูลประชาสัมพันธ์</label>
                                    <p>{selectedItem.EventCategory}</p>
                                </div>

                                <div className="w-full mt-2">
                                    <label>วันที่โพสต์</label>
                                    <p>{selectedItem.Postdate}</p>
                                </div>

                            </Form>
                        </Card>
                    </div>
                )}
            </Modal>

            <Modal width={'90%'} title="เพิ่มข้อมูลประชาสัมพันธ์" open={isAddOpen} onCancel={() => setIsAddOpen(false)} footer={null}>
                <InputPublicRelation onSubmit={handleUpdate} onClose={() => setIsAddOpen(false)} />
            </Modal>
        </>
    );
}

