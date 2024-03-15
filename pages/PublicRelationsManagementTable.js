// import React, { useEffect, useState, useRef } from 'react';
// import { EyeOutlined } from '@ant-design/icons'
// import { db } from './api/firebase/firebase';
// import { collection, getDocs } from 'firebase/firestore';
// import { EditOutlined } from '@ant-design/icons';
// import { SearchOutlined } from '@ant-design/icons';
// import { Button, Input, Space, Table, Modal } from 'antd';
// import Highlighter from 'react-highlight-words';
// import EditPublicRelation from './Components/EditPublicRelation';

// export default function PublicRelationsManagementTable() {

  

//   const [searchText, setSearchText] = useState('');
//   const [searchedColumn, setSearchedColumn] = useState('');
//   const searchInput = useRef(null);
//   const handleSearch = (selectedKeys, confirm, dataIndex) => {
//     confirm();
//     setSearchText(selectedKeys[0]);
//     setSearchedColumn(dataIndex);
//   };
//   const handleReset = (clearFilters) => {
//     clearFilters();
//     setSearchText('');
//   };
//   const getColumnSearchProps = (dataIndex) => ({
//     filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
//       <div
//         style={{
//           padding: 8,
//         }}
//         onKeyDown={(e) => e.stopPropagation()}
//       >
//         <Input
//           ref={searchInput}
//           placeholder={`Search ${dataIndex}`}
//           value={selectedKeys[0]}
//           onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
//           onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
//           style={{
//             marginBottom: 8,
//             display: 'block',
//           }}
//         />
//         <Space>
//           <Button
//             type="primary"
//             onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
//             icon={<SearchOutlined />}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Search
//           </Button>
//           <Button
//             onClick={() => clearFilters && handleReset(clearFilters)}
//             size="small"
//             style={{
//               width: 90,
//             }}
//           >
//             Reset
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               confirm({
//                 closeDropdown: false,
//               });
//               setSearchText(selectedKeys[0]);
//               setSearchedColumn(dataIndex);
//             }}
//           >
//             Filter
//           </Button>
//           <Button
//             type="link"
//             size="small"
//             onClick={() => {
//               close();
//             }}
//           >
//             close
//           </Button>
//         </Space>
//       </div>
//     ),
//     filterIcon: (filtered) => (
//       <SearchOutlined
//         style={{
//           color: filtered ? '#1677ff' : undefined,
//         }}
//       />
//     ),
//     onFilter: (value, record) =>
//       record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
//     onFilterDropdownOpenChange: (visible) => {
//       if (visible) {
//         setTimeout(() => searchInput.current?.select(), 100);
//       }
//     },
//     render: (text) =>
//       searchedColumn === dataIndex ? (
//         <Highlighter
//           highlightStyle={{
//             backgroundColor: '#ffc069',
//             padding: 0,
//           }}
//           searchWords={[searchText]}
//           autoEscape
//           textToHighlight={text ? text.toString() : ''}
//         />
//       ) : (
//         text
//       ),
//   });

//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const querySnapshot = await getDocs(collection(db, 'publicrelation'));
//       const documents = querySnapshot.docs.map(doc => doc.data());
//       setData(documents);
//     };
//     fetchData();
//   }, []);

//   const columns = [
//     {
//       title: 'ชื่อข้อมูลประชาสัมพันธ์',
//       dataIndex: 'EventName',
//       key: 'EventName',
//       width: '30%',
//       ...getColumnSearchProps('EventName'),
//     },
//     {
//       title: 'รายละเอียดข้อมูลประชาสัมพันธ์',
//       dataIndex: 'EventDetail',
//       key: 'EventDetail',
//       ...getColumnSearchProps('EventDetail'),
//     },
//     {
//       title: 'EventMore',
//       dataIndex: 'EventMore',
//       key: 'EventMore',
//     },
//     {
//       title: 'หมวดหมู่ข้อมูลประชาสัมพันธ์',
//       dataIndex: 'EventCategory',
//       key: 'EventCategory',
//       width: '20%',
//       ...getColumnSearchProps('EventCategory'),
//     },
//     {
//       title: 'LevelEvent',
//       dataIndex: 'LevelEvent',
//       key: 'LevelEvent',
//       render: (text, record) => (
//         <ul>
//           {record.LevelEvent.map(level => (
//             <li key={level}>{level}</li>
//           ))}
//         </ul>
//       ),
//     },
//     {
//       title: 'วันที่โพสต์',
//       dataIndex: 'Postdate',
//       key: 'Postdate',
//       width: '20%',
//       ...getColumnSearchProps('Postdate'),
//     },
//     {
//       title: 'สถานะ',
//       width: '10%',

//     },
//     {
//       title: 'แก้ไข',
//       width: '10%',
//       render: (text, record) => (
//         <Button
          
//           icon={<EditOutlined />}
//           className="flex items-center justify-center focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
//         >
//           Edit
//         </Button>
//       ),
//     },
//     {
//       title: 'ดู',
//       width: '10%',
//       render: (text, record) => (
//         <Button
//           icon={<EyeOutlined />}
//           className="flex items-center justify-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
//         >

//         </Button>

//       ),
//     },
//   ];

//   return (
//     <>
//       <Table columns={columns} dataSource={data} />
//     </>
//   );
// }
import React, { useEffect, useState, useRef } from 'react';
import { EyeOutlined } from '@ant-design/icons'
import { db } from './api/firebase/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { EditOutlined } from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Input, Space, Table, Modal, Form, Input as AntInput } from 'antd';
import Highlighter from 'react-highlight-words';

export default function PublicRelationsManagementTable() {

  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef(null);
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);

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
      const querySnapshot = await getDocs(collection(db, 'publicrelation'));
      const documents = querySnapshot.docs.map(doc => doc.data());
      setData(documents);
    };
    fetchData();
  }, []);

  const handleEdit = (record) => {
    setSelectedItem(record);
    setIsEditModalVisible(true);
  };

  const handleEditModalCancel = () => {
    setIsEditModalVisible(false);
    setSelectedItem(null);
  };

  const handleEditModalOk = () => {
    // Implement your update logic here
    setIsEditModalVisible(false);
    setSelectedItem(null);
  };

  const columns = [
    {
      title: 'ชื่อข้อมูลประชาสัมพันธ์',
      dataIndex: 'EventName',
      key: 'EventName',
      width: '30%',
      ...getColumnSearchProps('EventName'),
    },
    {
      title: 'รายละเอียดข้อมูลประชาสัมพันธ์',
      dataIndex: 'EventDetail',
      key: 'EventDetail',
      ...getColumnSearchProps('EventDetail'),
    },
    {
      title: 'EventMore',
      dataIndex: 'EventMore',
      key: 'EventMore',
    },
    {
      title: 'หมวดหมู่ข้อมูลประชาสัมพันธ์',
      dataIndex: 'EventCategory',
      key: 'EventCategory',
      width: '20%',
      ...getColumnSearchProps('EventCategory'),
    },
    {
      title: 'LevelEvent',
      dataIndex: 'LevelEvent',
      key: 'LevelEvent',
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
      width: '20%',
      ...getColumnSearchProps('Postdate'),
    },
    {
      title: 'สถานะ',
      width: '10%',

    },
    {
      title: 'แก้ไข',
      width: '10%',
      render: (text, record) => (
        <Button
          onClick={() => handleEdit(record)}
          icon={<EditOutlined />}
          className="flex items-center justify-center focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
        >
          Edit
        </Button>
      ),
    },
    {
      title: 'ดู',
      width: '10%',
      render: (text, record) => (
        <Button
          icon={<EyeOutlined />}
          className="flex items-center justify-center focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
        >
          View
        </Button>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={data} />
      <Modal
        title="Edit Public Relation"
        open={isEditModalVisible}
        onOk={handleEditModalOk}
        onCancel={handleEditModalCancel}
      >
        {selectedItem && (
          <Form
            initialValues={selectedItem}
            labelCol={{ span: 2 }}
            wrapperCol={{ span: 50 }}
          >
            <Form.Item label="ชื่อข้อมูลประชาสัมพันธ์">
              <AntInput value={selectedItem.EventName} />
            </Form.Item>
            <Form.Item label="รายละเอียดข้อมูลประชาสัมพันธ์">
              <AntInput value={selectedItem.EventDetail} />
            </Form.Item>
            <Form.Item label="รายละเอียดเพิ่มเติมข้อมูลประชาสัมพันธ์">
              <AntInput value={selectedItem.EventMore} />
            </Form.Item>
            <Form.Item label="หมวดหมู่ข้อมูลประชาสัมพันธ์">
              <AntInput value={selectedItem.EventCategory} />
            </Form.Item>
            <Form.Item label="สิทธิการรับรู้ข้อมูลประชาสัมพันธ์">
              <AntInput value={selectedItem.LevelEvent} />
            </Form.Item>
            <Form.Item label="วันที่โพสต์">
              <AntInput value={selectedItem.Postdate} />
            </Form.Item>
          </Form>
        )}
      </Modal>
    </>
  );
}
