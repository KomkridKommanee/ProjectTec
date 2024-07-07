import Example2 from '../Components/Na';
import InputStudent from '../Components/InputStudents';
import EditStudent from '../Components/EditstudentS';
import React, { useEffect, useState, useRef } from 'react';
import { db } from '../api/firebase/firebase';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons'
import { Button, Input, Space, Table, Modal, Form, Checkbox, Row, Col, Radio } from 'antd';
import Highlighter from 'react-highlight-words';


export default function UserManagement() {
    


    const [isEditModalVisible, setIsEditModalVisible] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const handleCancel = () => {
        setIsEditModalVisible(false);
    };






    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const [data, setData] = useState([]);

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

    useEffect(() => {
        const fetchData = async () => {
            const querySnapshot = await getDocs(collection(db, 'student'));
            const documents = querySnapshot.docs.map(doc => doc.data());
            setData(documents);
        };
        fetchData();
    }, []);


    const [setIsModaladd, setIsAddOpen] = useState(false);


    const showAdd = () => {
        setIsAddOpen(true);
    };
    const cancelAdd = () => {
        setIsAddOpen(false);
    };



    const handleDelete = (record) => {
        Modal.confirm({
            title: 'ยืนยันการลบข้อมูล',
            content: 'คุณแน่ใจแล้วใช่ไหมที่ต้องการลบข้อมูลนี้?',
            okText: 'ตกลง',
            cancelText: 'ยกเลิก',
            onOk() {
                deleteRecord(record);
            },
            onCancel() {
                console.log('ยกเลิกการลบข้อมูล');
            },
        });
    };
    
    const deleteRecord = async (record) => {
        try {
            await deleteDoc(doc(db, 'student', record.id)); // ใช้ record.id แทน record.key
            const updatedData = data.filter(item => item.id !== record.id); // ใช้ item.id แทน item.key
            setData(updatedData);
            console.log('Document successfully deleted!');
        } catch (error) {
            console.error('Error deleting document: ', error);
        }
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
    const querySnapshot = await getDocs(collection(db, 'student'));
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


    




    const columns = [
        {
            title: 'ชื่อ-นามสกุลข้อมูลนักศึกษา',
            key: 'FullName',
            width: '30%',
            ...getColumnSearchProps('NameThai'),
            render: (text, record) => `${record.NameThai} ${record.SurnameThai}`,
        },
        {
            title: 'หมู่เรียน',
            dataIndex: 'Section',
            key: 'Section',
            width: '15%',
            ...getColumnSearchProps('Section'),
        },
        {
            title: 'แก้ไข',
            width: '10%',
            render: (text, record) => (
                <Button
                    icon={<EditOutlined />}
                    onClick={() => handleEdit(record)}
                    className="flex items-center justify-center  px-4 py-2 bg-yellow-400 transition ease-in-out delay-75 hover:bg-yellow-500 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                >
                    
                </Button>
            ),
        },

        {
            title: 'ลบ',
            width: '10%',
            render: (text, record) => (
                <Button
                    icon={<DeleteOutlined />}
                    onClick={() => handleDelete(record)}
                    className="flex items-center justify-center  px-4 py-2 bg-red-600 transition ease-in-out delay-75 hover:bg-red-700 text-white text-sm font-medium rounded-md hover:-translate-y-1 hover:scale-110"
                >
                    
                </Button>
            ),
        },
    ];

    return (
        <>
            <Example2 className=" top-10" />
            <div className=' justify-self-center py-5 md:py-7 shadow-xl'>
                <p className=' text-3xl md:text-2xl text-start pl-44 font-bold'>จัดการข้อมูลนักศึกษา</p>
            </div>
            <Form className="mx-auto max-w-7xl grid grid-cols-2 gap-2 lg:gap-12 my-10 container justify-items-center p-2">
                <div></div>

                <div className="flex flex-col col-span-2 border-b w-full text-center pb-5 text-lg">
                    <div className="flex justify-end mb-2">
                        <button type="button" onClick={showAdd} className="inline-block px-6 py-3 mr-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-cyan-700 to-cyan-500 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-110 hover:rotate-2 hover:bg-cyan-700 hover:text-cyan-200 hover:shadow-lg active:opacity-85">
                            เพิ่มข้อมูลนักศึกษา
                        </button>
                    </div>
                    <Table columns={columns} dataSource={data} />
                </div>
            </Form>
            <Modal
                width={'90%'}
                title="แก้ไขข้อมูลนักศึกษา"
                open={isEditModalVisible}
                onCancel={handleCancel}
                footer={null} // Set footer to null to hide the default footer
            >
                <EditStudent selectedItem={selectedItem} onCancel={handleCancel} onUpdate={handleUpdate}  />
            </Modal>

            <Modal
                width={'90%'}
                title="เพิ่มข้อมูลนักศึกษา"
                open={setIsModaladd}
                onCancel={cancelAdd}
                footer={[

                ]}
            >
                {/* Pass the onSubmit function to the InputUser component */}
                <InputStudent onSubmit={onSubmit} />
            </Modal>
        </>
    )
}
