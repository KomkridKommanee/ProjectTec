import React, { useState } from 'react';
import { Button, Input, Space, Table, Modal, Form, Checkbox, Row, Col, Radio } from 'antd';
import Addgarbage from './test2';


export default function Garbage () {
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

  return (
    <div style={{backgroundColor:'white'}}>
      <div>
        <div >
          <h1 className="text-3xl font-bold text-black"></h1>
          <div>
            <div  >เพิ่มอัตราค่าขยะ</div>
          </div>
        </div>
        <div className="mb-4">
          <input type="text" placeholder="ค้นหา"  />
        </div>
        <div className="overflow-x-auto">
          <table >
            <thead>
              <tr >
                <th>No</th>
                <th>อัตราค่าขยะ</th>
                <th>วันที่เปิดใช้งาน</th>
                <th>สถานะ</th>
                <th>แก้ไข</th>
                <th>View</th>
              </tr>
            </thead>
            <tbody style={{ color: '#696969' }}>
              <tr>
                <td>1</td>
                <td>30</td>
                <td>1 มกราคม 2567</td>
                <td>ปิดใช้งาน</td>
                <td><button style={{
                  backgroundColor : 'gold',
                  color: "#fff",
                  padding: "4px 8px",
                  border: "none",
                  borderRadius: "4px",
                  cursor : "pointer"
                }}>แก้ไข</button></td>

                <td><button style={{
                  backgroundColor : "#6699FF",
                  color: "#fff",
                  padding: "4px 8px",
                  border: "none",
                  borderRadius: "4px",
                  cursor : "pointer"
                }}>View</button></td>
              </tr>
            </tbody>
            <tbody style={{ color: '#696969' }} >
              <tr>
                <td>2</td>
                <td>40</td>
                <td>1 มีนาคม 2567</td>
                <td>ใช้งานอยู่</td>
                <td><button style={{
                  backgroundColor : 'gold',
                  color: "#fff",
                  padding: "4px 8px",
                  border: "none",
                  borderRadius: "4px",
                  cursor : "pointer"
                }}>แก้ไข</button></td>
                <td><button style={{
                  backgroundColor : "#6699FF",
                  color: "#fff",
                  padding: "4px 8px",
                  border: "none",
                  borderRadius: "4px",
                  cursor : "pointer"
                }}>View</button></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <Form className="mx-auto max-w-7xl grid grid-cols-2 gap-2 lg:gap-12 my-10 container justify-items-center p-2">
                <div></div>

                <div className="flex flex-col col-span-2 border-b w-full text-center pb-5 text-lg">
                    <div className="flex justify-end mb-2">
                        <button type="button" onClick={showAdd} className="inline-block px-6 py-3 mr-3 font-bold text-center text-white uppercase align-middle transition-all rounded-lg cursor-pointer bg-gradient-to-tl from-cyan-700 to-cyan-500 leading-pro text-xs ease-soft-in tracking-tight-soft shadow-soft-md bg-150 bg-x-25 hover:scale-110 hover:rotate-2 hover:bg-cyan-700 hover:text-cyan-200 hover:shadow-lg active:opacity-85">
                            เพิ่มข้อมูลผู้ใช้
                        </button>
                    </div>
                    
                </div>
            </Form>
      <Modal
                width={'90%'}
                title="เพิ่มข้อมูลผู้ใช้งาน"
                open={setIsModaladd}
                onCancel={cancelAdd}
                footer={[

                ]}
            >
                {/* Pass the onSubmit function to the InputUser component */}
                <Addgarbage onSubmit={onSubmit} />
            </Modal>
    </div>
  );
};

