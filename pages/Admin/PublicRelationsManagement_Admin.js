import Example2 from '../Components/Na';
import InputPublicRelation from '../Components/InputPublicRelation';
import React, { useEffect, useState, useRef } from 'react';
import { db, app } from '../api/firebase/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc, query, orderBy } from 'firebase/firestore';
import { EyeOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, Space, Table, Modal, Form, Checkbox, Row, Col, Radio, Switch, Card, Upload } from 'antd';
import Highlighter from 'react-highlight-words';
import EditPublicRelation from '../Components/EditPublicRelation';


export default function PublicRelationsManagementAdmin() {

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [data, setData] = useState([]);
    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);
    const [sections, setSections] = useState([]);

    




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
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                    onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                    style={{
                        marginBottom: 8,
                        display: 'block',
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false,
                            });
                            setSearchText(selectedKeys[0]);
                            setSearchedColumn(dataIndex);
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0,
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            ),
    });




    const [setIsModaladd, setIsAddOpen] = useState(false);


    const showAdd = () => {
        setIsAddOpen(true);
    };
    const cancelAdd = () => {
        setIsAddOpen(false);
    };


    const onSubmit = async (values) => {
        // Perform any necessary actions with the form values, such as saving them to a database
        console.log('Form values:', values);

        // Close the modal after the form is submitted
        setIsModaladd(false);

        // Optionally, you can fetch the updated data here
        fetchData();
    };


    const [isViewModalVisible, setIsViewModalVisible] = useState(false);


    const showViewModal = (item) => {
        setSelectedItem(item);
        setIsViewModalVisible(true);
    };
    //แก้ไข

    useEffect(() => {
        fetchData();
    }, []);
    const fetchData = async () => {
        const querySnapshot = await getDocs(collection(db, 'publicrelation'));
        const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Sort the data by Postdate in descending order
        data.sort((a, b) => new Date(b.Postdate) - new Date(a.Postdate));

        setData(data);
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

    const handleLevelEventChange = (values) => {
        if (values.includes('สาธารณะ(ทุกคน)')) {
            setEditedItem({
                ...editedItem,
                LevelEvent: sections.map(section => section.Section).concat('สาธารณะ(ทุกคน)')
            });
        } else {
            setEditedItem({ ...editedItem, LevelEvent: values });
        }
    };

    const handleSelectAllChange = (e) => {
        const checked = e.target.checked;
        if (checked) {
            setEditedItem({ ...editedItem, LevelEvent: sections.map(section => section.Section) });
        } else {
            setEditedItem({ ...editedItem, LevelEvent: [] });
        }
    };



    const columns = [
        {
            title: 'ชื่อข้อมูลประชาสัมพันธ์',
            dataIndex: 'EventName',
            key: 'EventName',
            width: '25%',
            ...getColumnSearchProps('EventName'),
        },
        // {
        //     title: 'รายละเอียดข้อมูลประชาสัมพันธ์',
        //     dataIndex: 'EventDetail',
        //     key: 'EventDetail',
        //     ...getColumnSearchProps('EventDetail'),
        // },
        // {
        //     title: 'EventMore',
        //     dataIndex: 'EventMore',
        //     key: 'EventMore',
        // },
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
            ...getColumnSearchProps('LevelEvent'),
            render: (text, record) => (
                <ul>
                    {record.LevelEvent.map(level => (
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
            ...getColumnSearchProps('Postdate'),
        },
        {
            title: 'สถานะ',
            dataIndex: 'status',
            key: 'status',
            render: (status) => <Switch checked={status} disabled />,
        },

        {
            title: 'แก้ไข',
            width: '10%',
            render: (text, record) => (
                <Button
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(record)}
                    className="flex items-center justify-center px-4 py-2 bg-yellow-400 transition ease-in-out delay-75 hover:bg-yellow-500 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                >

                </Button>
            ),
        },

        {
            title: 'ดู',
            width: '10%',
            render: (text, record) => (
                <Button
                    icon={<EyeOutlined />}
                    onClick={() => showViewModal(record)}
                    className="flex items-center justify-center  px-4 py-2 bg-green-500 transition ease-in-out delay-75 hover:bg-green-600 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                >

                </Button>
            ),
        },
    ];

    return (
        <>
            <Example2 className=" top-10" />
            <div className=' justify-self-center py-5 md:py-7 shadow-xl'>
                <p className=' text-3xl md:text-2xl text-start pl-44 font-bold'>จัดการข้อมูลประชาสัมพันธ์</p>
            </div>
            <Form className="mx-auto max-w-7xl grid grid-cols-2 gap-2 lg:gap-12 my-10 container justify-items-center p-2">
                <div></div>

                <div className="flex flex-col col-span-2 border-b w-full text-center pb-5 text-lg">
                    <div className="flex justify-end mb-2">
                        <button type="button" onClick={showAdd} className="cursor-pointer text-white font-bold relative text-[14px] w-[15em] h-[3em] text-center bg-gradient-to-r from-violet-500 from-10% via-sky-500 via-30% to-pink-500 to-90% bg-[length:400%] rounded-[10px] z-10 hover:animate-gradient-xy hover:bg-[length:100%] before:content-[''] before:absolute before:-top-[5px] before:-bottom-[5px] before:-left-[5px] before:-right-[5px] before:bg-gradient-to-r before:from-violet-500 before:from-10% before:via-sky-500 before:via-30% before:to-pink-500 before:bg-[length:400%] before:-z-10 before:rounded-[15px] before:hover:blur-xl before:transition-all before:ease-in-out before:duration-[1s] before:hover:bg-[length:10%] active:bg-violet-700 focus:ring-violet-700">
                            เพิ่มข้อมูลประชาสัมพันธ์
                        </button>
                    </div>
                    <Table columns={columns} dataSource={data} />
                    {isEditModalVisible && (
                        <Modal
                            width={'90%'}
                            title="แก้ไขข้อมูลประชาสัมพันธ์"
                            visible={isEditModalVisible}
                            onCancel={handleCancel}
                            footer={null}
                        >
                            <EditPublicRelation selectedItem={selectedItem} onCancel={handleCancel} onUpdate={handleUpdate} status={status} />
                        </Modal>
                    )}

                </div>
            </Form>


            <Modal
                width={'90%'}
                title="รายละเอียดข้อมูล"
                visible={isViewModalVisible}
                onCancel={() => setIsViewModalVisible(false)}
                footer={null}
            >
                {selectedItem && (
                    <div className="flex min-h-full items-center justify-center mt-6 sm:px-6 lg:px-8">
                        <Card style={{ width: "90%" }}>
                            <Form layout="inline">
                                <div className='w-full sm:w-full mt-2'>

                                    <label htmlFor="EventImg">รูปข้อมูลประชาสัมพันธ์</label>
                                    <Form.Item >
                                        <div
                                            listType="picture-card"
                                            showUploadList={false}

                                        >
                                            <div className=" items-center justify-items-center">
                                                <img src={selectedItem.EventImg} alt="event" style={{ maxWidth: '100%' }} />
                                            </div>
                                        </div>
                                    </Form.Item>
                                </div>
                                <div className='w-full sm:w-full mt-2'>

                                    <label htmlFor="EventName">ชื่อข้อมูลประชาสัมพันธ์</label>
                                    <Form.Item >
                                        <Input name="EventName" value={selectedItem.EventName} disabled />
                                    </Form.Item>
                                </div>
                                <div className='mt-2 w-full sm:w-full'>
                                    <label htmlFor="EventDetail">รายละเอียดข้อมูลประชาสัมพันธ์</label>
                                    <Form.Item >
                                        <Input name="EventDetail" value={selectedItem.EventDetail} disabled />
                                    </Form.Item>
                                </div>
                                <div className='mt-2 w-full sm:w-full'>
                                    <label htmlFor="EventMore">รายละเอียดเพิ่มเติมข้อมูลประชาสัมพันธ์</label>
                                    <Form.Item>
                                        <Input name="EventMore" value={selectedItem.EventMore} disabled />
                                    </Form.Item>
                                </div>
                                <div className=' mt-2 w-full sm:w-2/4'>
                                    <label>หมวดหมู่ข้อมูลประชาสัมพันธ์</label>
                                    <Form.Item>
                                        <Input name="EventCategory" value={selectedItem.EventCategory} disabled />
                                    </Form.Item>
                                </div>
                                <div className='w-full sm:w-2/4 mt-2'>
                                    <label htmlFor="LevelEvent">สิทธิการรับรู้ข้อมูลประชาสัมพันธ์</label>
                                    <Form.Item>
                                        <Checkbox.Group value={selectedItem.LevelEvent} disabled style={{ width: '100%' }}>
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
                                        </Checkbox.Group>
                                    </Form.Item>
                                </div>
                                <div className='w-full sm:w-2/4 mt-2'>
                                    <label htmlFor="Postdate">วันที่โพสต์</label>
                                    <Form.Item>
                                        <Input type="date" name="Postdate" value={selectedItem.Postdate} disabled />
                                    </Form.Item>
                                </div>
                                <div className='w-full sm:w-full mt-2'>
                                    <label>สถานะ</label>
                                    <Form.Item>
                                        <Switch checked={selectedItem.status} disabled />
                                    </Form.Item>
                                </div>
                                <div className='w-full sm:w-3/4 mt-2'></div>
                                <div className='w-full sm:w-1/4 mt-10'>
                                    {/* <Button type="primary" onClick={handleCancel}>Back</Button> */}
                                </div>
                            </Form>
                        </Card>
                    </div>
                )}
            </Modal>


            <Modal
                width={'90%'}
                title="เพิ่มข้อมูลประชาสัมพันธ์"
                open={setIsModaladd}
                onCancel={cancelAdd}
                footer={[

                ]}
            >
                {/* Pass the onSubmit function to the InputPublicRelation component */}
                <InputPublicRelation onSubmit={onSubmit} />
            </Modal>
        </>
    )
}
