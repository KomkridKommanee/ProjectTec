import { Checkbox, Card, Input, Image, checked } from 'antd';
import Example from './Components/Navbar1.js';
import FooterTab from './Components/footer.js';
const { TextArea } = Input;
import React from "react";
import { useState } from 'react';
import axios from 'axios';

let all = [];

export default function Buffet() {
    const [allchecked, setAllChecked] = React.useState([]);
    let sum = 0;
    function handleChange(e) {
        if (e.target.checked) {
            setAllChecked([allchecked + ',' + e.target.value]);
            return all.push(parseInt(e.target.value, 10));
        } else {
            setAllChecked(allchecked.filter((item) => item !== e.target.value));
            return all.push(parseInt(-e.target.value, 10));
        }
    }
    for (let i = 0; i < all.length; i++) {
        sum += all[i];
    }
    console.log(sum)
    console.log(all)

    const [message, setMessage] = useState('');

    const handleChange2 = (event) => {
        setMessage(event.target.value);
    }

// line notify 
    const [formData, setFormData] = useState({
        message: '',
        message2: '',
        message3: '',
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('/api/notify', formData);
            alert('Message sent successfully to LINE Notify!');
            setFormData({ message: '', message2: '', message3: '' }); 
        } catch (error) {
            console.error('Error sending message:', error);
        }
    };

    return (
        <>
            <header className="shadow sticky" style={{ backgroundColor: '#600c0c' }}>
                <Example className=" top-10" />
            </header>
            <main>
                <div className='justify-items-center bg-left-bottom bg-gradient-to-b pb-24 from-red-800 via-red-500 to-yellow-50 min-h-full'>
                    <div className='text-center bg-black py-10 bg-opacity-20'>
                        <p className='text-3xl text-white'>เลือกรายการบุฟเฟต์</p>
                        <p className=' text-slate-200'>คำนวณราคาตามจำนวนคนและรายการอาหาร</p>
                    </div>
                    <div className='mx-auto max-w-3xl grid grid-cols-2 gap-2 lg:gap-12 my-10 container justify-items-center p-2'>
                        <div className='text-white col-span-2 border-b w-full text-center pb-5 text-lg '>ส่วนที่ 1 เลือกรายการบุฟเฟต์</div>
                        <Card className='w-full text-sm md:text-base col-span-1 rounded-3xl ' >
                            <div className=' text-lg mb-3 py-3'>
                                <p className='text-center rounded-full text-white bg-red-700 shadow-lg mx-auto lg:mx-20'>เมนูลาบ น้ำพริกและเมนูทอด</p>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ลาบหมู</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ลาบไก่</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ลาบปลาดุก</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>น้ำพริกลงเรือ</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>น้ำพริกเห็ดฟาง</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>น้ำพริกกระปิ</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>น้ำพริกอ่อง</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>น้ำพริกหนุ่ม</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>น้ำพริกหมูสับ</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ทอดน่องไก่</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ทอดปลา</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ทอดหมูกระเทียม</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ทอดมันปลา</Checkbox>
                            </div>
                        </Card>

                        <Card className='w-full text-sm md:text-base col-span-1 rounded-3xl'>
                            <div className=' text-lg bg mb-3 py-3'>
                                <p className='text-center rounded-full text-white bg-red-700 shadow-lg mx-auto lg:mx-20'>เมนูผัด</p>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ผัดกระเพรา</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ผัดพริกแกง</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ผัดพริกหยวก</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ผัดผักรวม</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ผัดขิง</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ผัดเปรี้ยวหวาน</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ไก่ผัดเม็ดมะม่วง</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ผัดเห็ดสามอย่าง</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ผัดวุ้นเส้น</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ผัดฉ่าไก่-หมู-ดอลลี่</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ไก่ผัดโหระพา</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ปลานิลราดพริก</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ผัดเผ็ดไก่-หมู</Checkbox>
                            </div>
                        </Card>
                        <Card className='w-full text-sm md:text-base col-span-1 rounded-3xl'>
                            <div className=' text-lg bg mb-3 py-3'>
                                <p className='text-center rounded-full text-white bg-red-700 shadow-lg mx-auto lg:mx-20'>เมนูแกง</p>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>แกงเผ็ด-หมู ไก่</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>แกงเขียวหวาน</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>แกงข่าไก่</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>แกงเทโพ</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>แกงไตปลา</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>แกงคั่วไก่-คั่วกลิ้งหมู</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>แกงส้มปลาทอด</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>แกงส้มไข่-ชะโอม ทอด</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>แกงสายบัว</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>แกงจืดมะระยัดไส้หมูสับ</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>แกงอ่อมหมู</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>แกงเลียง</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>แกงมัสมั่นไก่</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>แกงเห็ดสามอย่าง</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>แกงหน่อไม้</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>แกงจืดไชเท้าซี่โครงหมู</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>แพนงหมู-ไก่</Checkbox>
                            </div>
                        </Card>
                        <Card className='w-full text-sm md:text-base col-span-1 rounded-3xl '>
                            <div className=' text-lg bg mb-3 py-3'>
                                <p className='text-center rounded-full text-white bg-red-700 shadow-lg mx-auto lg:mx-20'>เมนูซุปและต้ม</p>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ต้มยำไก่</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ต้มยำปลานิล</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ต้มยำปลาน้ำโขง</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ต้มแซ่บซี่โครงอ่อนหมู</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ต้มจืดหมูสับ-เต้าหู้ไข่</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ต้มจับฉ่าย</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ต้มยำขาหมู</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ต้มแซ่บเล้ง</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ต้มผักกาดดอง</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ตุ๋นซี่ไก่ฟักเห็ดหอม</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ตุ๋นเยื่อไผ่</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ตุ๋นซี่โครงอ่อน</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>พะโล้ไข่-หมู</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-0 md:px-3 py-1' onChange={handleChange} value={50}>ไข่ลูกเขย</Checkbox>
                            </div>
                        </Card>
                        <Card className='w-full text-sm md:text-base col-span-full max-w-sm rounded-3xl'>
                            <div className=' text-lg bg mb-3 py-3'>
                                <p className='text-center rounded-full text-white bg-red-700 shadow-lg mx-auto lg:mx-20'>เมนูของหวาน</p>
                            </div>
                            <div>
                                <Checkbox className='px-3 py-1' onChange={handleChange} value={30}>รวมมิตรกะทิสด</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-3 py-1' onChange={handleChange} value={30}>เฉาก๊วย</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-3 py-1' onChange={handleChange} value={30}>สาคู-เผือก-ข้าวโพด</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-3 py-1' onChange={handleChange} value={30}>ทับทิมกรอบ</Checkbox>
                            </div>
                            <div>
                                <Checkbox className='px-3 py-1' onChange={handleChange} value={30}>ลอดช่อง</Checkbox>
                            </div>
                        </Card>
                        <div className='col-span-2 w-full text-base justify-self-center text-slate-700 bg-red-100 grid grid-cols-10 px-10 py-4 md:mt-0 mt-12 rounded-3xl'><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 11.25l.041-.02a.75.75 0 011.063.852l-.708 2.836a.75.75 0 001.063.853l.041-.021M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9-3.75h.008v.008H12V8.25z" /></svg>
                            <div className='col-span-9 text-center'>ราคานี้รวมค่าใช้จ่าย ข้าวสวย+ ถ้วย จาน + ช้อนส้อม+ อุปกรณ์ต่างๆ +น้ำดื่มในรูปแบบกดดื่มได้</div>
                            <p className='text-center text-red-800 text-md col-span-full'>(ไม่รวมโต๊ะเก้าอี้)</p>
                        </div>
                        <Card className='col-span-2 w-full md:-mt-5 -mt-0 rounded-3xl'>
                            <div className=' grid grid-cols-3 max-w-xs mx-auto'>
                                <p className='text-lg col-span-2 mt-1'>ระบุจำนวนคน</p>
                                <Input onChange={handleChange2} type='number' className="text-center bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                            </div>
                        </Card>
                        <div className='col-span-2 text-center md:mt-0 mt-12 w-full text-black bg-white text-2xl px-5 py-12 rounded-3xl '>
                            <p className=''>รวมราคา&nbsp;&nbsp;{sum * message}&nbsp;&nbsp;บาท</p>
                        </div>
                        <div className='text-white col-span-2 border-b w-full text-center pb-5 text-lg  md:mt-0 mt-12'>ส่วนที่ 2 กรอกข้อมูลเพื่อรอตอบกลับ</div>
                        <Card className='col-span-2 w-full rounded-3xl md:mt-0 mt-12' title="ข้อมูลติดต่อ">
                                <form className=' grid grid-cols-4 gap-5 max-w-xl mx-auto w-full' onSubmit={handleSubmit}>
                                    <p>ชื่อ - นามสกุล</p>
                                    <Input
                                        required
                                        type='text'
                                        name="message"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        className="col-span-3 text-start bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                    <p>ที่อยู่</p>
                                    <TextArea
                                        required
                                        value={formData.message2}
                                        onChange={handleInputChange}
                                        className='col-span-3  rounded-3xl'
                                        name="message2"
                                        rows={4}
                                        defaultValue={''}
                                    />
                                    <p>เบอร์โทรติดต่อ</p>
                                    <Input
                                        required
                                        type='number'
                                        name="message3"
                                        value={formData.message3}
                                        onChange={handleInputChange}
                                        rows={4}
                                        className="col-span-3 text-start bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-3xl focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                                        <div className='col-span-full justify-self-end'>
                                        <button type="submit" className=' bg-red-700 border-x-yellow-300 border-4 shadow text-white hover:bg-green-400 hover:text-white hover:-translate-y-1 hover:scale-110 transition ease-in-out delay-150 px-6 py-2 rounded-3xl'>
                                            ยืนยัน
                                        </button>
                                    </div>
                                </form>
                        </Card>
                    </div>
                </div>

                <div className=' bg-red-700 '>
                    <div className='text-white col-span2 md:col-span-1 text-2xl py-10 max-w-5xl mx-10 md:mx-auto font-mono '>
                        <p>ครูติ้งโต๊ะจีน</p>
                        <p className='text-sm'>รับจัดโต๊ะจีนและบุฟเฟต์ในจังหวัดเลย</p>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-4 mt-10 max-w-5xl mx-auto mb-24 px-3">
                    <Image src='30.jpg' alt='f' />
                    <Image src='28.jpg' alt='f' />
                    <Image src='14.jpg' alt='f' />
                    <div className='col-span-3 gap-4 grid grid-cols-3'>
                        <div className='grid'>
                            <Image src='5.jpg' alt='f' />
                            <Image src='4.jpg' alt='f' />
                        </div>
                        <div className="col-span-2">
                            <Image src='13.jpg' alt='f' />
                        </div>
                    </div>
                </div>


                <FooterTab />
            </main>
        </>

    )
}