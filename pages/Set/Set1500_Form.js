import { radio } from '@material-tailwind/react';
import React, { useState } from 'react';
import { Button, Form, Radio, Card, Space, Input, Image, Divider } from 'antd';
import Link from 'next/link';
import Example from '../Components/Navbar1';
import FooterTab from '../Components/footer';

export default function Set1500_Form() {

    const [value1, setValue1] = useState(1);
    const [value2, setValue2] = useState(2);
    const [value3, setValue3] = useState(3);
    const [value4, setValue4] = useState(4);
    const [value5, setValue5] = useState(5);
    const [value6, setValue6] = useState(6);
    const [value7, setValue7] = useState(7);
    const [value8, setValue8] = useState(8);
    const onChange1 = (e) => {
        console.log('radio checked', e.target.value);
        setValue1(e.target.value);
    };
    const onChange2 = (e) => {
        console.log('radio checked', e.target.value);
        setValue2(e.target.value);
    };
    const onChange3 = (e) => {
        console.log('radio checked', e.target.value);
        setValue3(e.target.value);
    };
    const onChange4 = (e) => {
        console.log('radio checked', e.target.value);
        setValue4(e.target.value);
    };
    const onChange5 = (e) => {
        console.log('radio checked', e.target.value);
        setValue5(e.target.value);
    };
    const onChange6 = (e) => {
        console.log('radio checked', e.target.value);
        setValue6(e.target.value);
    };
    const onChange7 = (e) => {
        console.log('radio checked', e.target.value);
        setValue7(e.target.value);
    };
    const onChange8 = (e) => {
        console.log('radio checked', e.target.value);
        setValue8(e.target.value);
    };
    const [message, setMessage] = useState('');
    const handleChange2 = (event) => {
        // 👇 Get input value from "event"
        setMessage(event.target.value);
    };
    const [message1, setMessage1] = useState('');
    const handleChange3 = (event) => {
        // 👇 Get input value from "event"
        setMessage1(event.target.value);
    };
    let inputvar = message;

    let total = Math.round(((inputvar * 2) * 0.70) / 8);

    let inputvar1 = message1;

    let total1 = Math.round(inputvar1 * 1600);

    return (
        <>
            <Example className=" top-10" />
            <Form className="flex bg-bottom bg-red-800 min-h-full items-center justify-center py-12 sm:px-5 md:text-start text-center px-2">

                <Card className='bg-white pt-8 w-full lg:mx-36 rounded-3xl'>
                    <div className='w-full my-3 text-red-800 md:text-white text-xl md:text-xl md:bg-red-800 md:px-8 py-2 rounded-3xl'>
                        โต๊ะจีนราคา 1,600 บาท
                    </div>
                    <div className=' mt-4 text-center' >
                        <Card className='lg:px-20 bg-red-800 rounded-3xl mx-1'>
                            <div className='grid grid-cols-2'>
                                <div className=' my-5 col-span-2 xl:col-span-1 self-center'>
                                    <Image className='h-fit'
                                        src="/16.jpg"
                                        alt="Trulli"

                                    />
                                </div>
                                <Card className=' bg-orange-100 my-4 col-span-2 xl:col-span-1'>
                                    <div className='grid grid-cols-5'>
                                        <p className=' text-start w-full my-3 text-red-800 text-lg col-span-full'>
                                            รายการอาหาร
                                        </p>
                                        <p className=' text-start w-full my-2 text-red-800 text-base col-span-1 border-b border-yellow-300 pb-3'>
                                            จานที่ 1 :
                                        </p>
                                        <Radio.Group onChange={onChange1} value={value1} className=' col-span-4 '>
                                            <Radio value={1} className=' text-start w-full my-2 text-red-800 text-base col-span-4 '>
                                                ข้าวเกรียบ
                                            </Radio>
                                            <Radio value={2} className=' text-start w-full my-2 text-red-800 text-base col-span-5 border-b border-yellow-300 pb-3'>
                                                หมี่กรอบ
                                            </Radio>
                                        </Radio.Group>
                                        <p className=' text-start w-full my-2 text-red-800 text-base col-span-1 border-b border-yellow-300 pb-3'>
                                            จานที่ 2 :
                                        </p>
                                        <Radio.Group onChange={onChange2} value={value2} className=' col-span-4 '>
                                            <Radio value={1} className=' text-start w-full my-2 text-red-800 text-base col-span-4 border-b border-yellow-300 pb-3'>
                                                ออเดิร์ฟจีน
                                            </Radio>
                                        </Radio.Group>
                                        <p className=' text-start w-full my-2 text-red-800 text-base col-span-1 border-b border-yellow-300 pb-3'>
                                            จานที่ 3 :
                                        </p>
                                        <Radio.Group onChange={onChange3} value={value3} className=' col-span-4 '>
                                            <Radio value={1} className=' text-start w-full my-2 text-red-800 text-base col-span-4 '>
                                                หมูมะนาวเส้นแก้ว
                                            </Radio>
                                            <Radio value={2} className=' text-start w-full my-2 text-red-800 text-base col-span-4 '>
                                                ยำหมูตะไคร้ทรงเครื่อง
                                            </Radio>
                                            <Radio value={3} className=' text-start w-full my-2 text-red-800 text-base col-span-5 border-b border-yellow-300 pb-3'>
                                                ยำรวม
                                            </Radio>
                                        </Radio.Group>
                                        <p className=' text-start w-full my-2 text-red-800 text-base col-span-1 border-b border-yellow-300 pb-3'>
                                            จานที่ 4 :
                                        </p>
                                        <Radio.Group onChange={onChange4} value={value4} className=' col-span-4 '>
                                            <Radio value={1} className=' text-start w-full my-2 text-red-800 text-base col-span-4 '>
                                                ไก่พะโล้
                                            </Radio>
                                            <Radio value={2} className=' text-start w-full my-2 text-red-800 text-base col-span-5 border-b border-yellow-300 pb-3'>
                                                ไก่ผัดเม็ดมะม่วง
                                            </Radio>
                                        </Radio.Group>
                                        <p className=' text-start w-full my-2 text-red-800 text-base col-span-1 border-b border-yellow-300 pb-3'>
                                            จานที่ 5 :
                                        </p>
                                        <Radio.Group onChange={onChange5} value={value5} className=' col-span-4 '>
                                            <Radio value={1} className=' text-start w-full my-2 text-red-800 text-base col-span-4 '>
                                                ปลานึ่งมะนาว
                                            </Radio>
                                            <Radio value={2} className=' text-start w-full my-2 text-red-800 text-base col-span-5 border-b border-yellow-300 pb-3'>
                                            ปลาสามรส
                                            </Radio>

                                        </Radio.Group>
                                        <p className=' text-start w-full my-2 text-red-800 text-base col-span-1 border-b border-yellow-300 pb-3'>
                                            จานที่ 6 :
                                        </p>
                                        <Radio.Group onChange={onChange6} value={value6} className=' col-span-4 '>
                                            <Radio value={1} className=' text-start w-full my-2 text-red-800 text-base col-span-4 '>
                                            ต้มยำขาหมูน้ำข้น
                                            </Radio>
                                            <Radio value={2} className=' text-start w-full my-2 text-red-800 text-base col-span-5 border-b border-yellow-300 pb-3'>
                                                กระเพาะปลา
                                            </Radio>

                                        </Radio.Group>
                                        <p className=' text-start w-full my-2 text-red-800 text-base col-span-1 border-b border-yellow-300 pb-3'>
                                            จานที่ 7 :
                                        </p>
                                        <Radio.Group onChange={onChange7} value={value7} className=' col-span-4 '>
                                            <Radio value={1} className=' text-start w-full my-2 text-red-800 text-base col-span-4 '>
                                                ข้าวผัดเกลือ
                                            </Radio>
                                            <Radio value={2} className=' text-start w-full my-2 text-red-800 text-base col-span-5 border-b border-yellow-300 pb-3'>
                                                หมี่ซั่ว
                                            </Radio>

                                        </Radio.Group>
                                        <p className=' text-start w-full my-2 text-red-800 text-base col-span-1 border-b border-yellow-300 pb-3'>
                                            จานที่ 8 :
                                        </p>
                                        <Radio.Group onChange={onChange8} value={value8} className=' col-span-4 '>
                                            <Radio value={1} className=' text-start w-full my-2 text-red-800 text-base col-span-4 '>
                                            ของหวานรวมมิตร
                                            </Radio>
                                            <Radio value={2} className=' text-start w-full my-2 text-red-800 text-base col-span-4 '>
                                            ทับทิมกรอบ
                                            </Radio>
                                            <Radio value={3} className=' text-start w-full my-2 text-red-800 text-base col-span-5 border-b border-yellow-300 pb-3'>
                                            ผลไม้กระป๋อง
                                            </Radio>

                                        </Radio.Group>

                                    </div>
                                </Card>
                            </div>


                        </Card>
                    </div>

                    <div className=' mt-4 text-center' >
                        <Card className='lg:px-20 bg-red-800  rounded-3xl mx-1'>
                            <div className='grid grid-cols-2'>
                                <Card className=' bg-orange-100 col-span-2 xl:col-span-1'>
                                    <div className='grid grid-cols-6'>
                                        <p className=' text-start w-full my-3 text-red-800 text-lg col-span-full'>
                                            เงื่อนไข
                                        </p>

                                        <p className=' text-start w-full my-2 text-red-800 text-base pb-3 col-span-3' >
                                            จำนวนการ์ดเชิญ
                                        </p>
                                        <Input onChange={handleChange2} id='1' type='Number' className=' text-center w-full my-2 text-red-800 text-base border-b-2 border-yellow-300 pt-0 pb-0 rounded-xl col-span-2 -ml-5'>
                                        </Input>
                                        <p className=' text-start w-full my-2 text-red-800 text-base  pb-3 col-span-1' >
                                            การ์ด
                                        </p>

                                        <p className=' text-start w-full my-2 text-red-800 text-base col-span-3  pb-3 '>
                                            จำนวนโต๊ะที่แนะนำ
                                        </p>
                                        <Input value={total} aria-labelledby='1' className=' text-center w-full my-2 text-red-800 text-base border-b-2 border-yellow-300 pt-0 pb-0 rounded-xl col-span-2 -ml-5'>
                                        </Input>
                                        <p className=' text-start w-full my-2 text-red-800 text-base  pb-3 col-span-1' >
                                            โต๊ะ
                                        </p>
                                        <p className=' text-start w-full my-2 text-red-800 text-base pb-3 col-span-3' >
                                            จำนวนโต๊ะ
                                        </p>
                                        <Input onChange={handleChange3} id='2' type='Number' className=' text-center w-full my-2 text-red-800 text-base border-b-2 border-yellow-300 pt-0 pb-0 rounded-xl col-span-2 -ml-5'>
                                        </Input>
                                        <p className=' text-start w-full my-2 text-red-800 text-base  pb-3 col-span-1' >
                                            คน
                                        </p>
                                        <p className=' text-start w-full my-2 text-red-800 text-base pb-3 col-span-3' >
                                            มัดจำ
                                        </p>
                                        <p className=' text-start w-full my-2 text-red-800 text-base pb-3 col-span-2 ' >
                                            5,000
                                        </p>
                                        <p className=' text-start w-full my-2 text-red-800 text-base  pb-3 col-span-1' >
                                            บาท
                                        </p>
                                        <p className=' text-start w-full my-2 text-red-800 text-base col-span-3  pb-3 '>
                                            รวมเงิน
                                        </p>
                                        <Input value={total1} aria-labelledby='2' className=' text-center w-full my-2 text-red-800 text-base border-b-2 border-yellow-300 pt-0 pb-0 rounded-xl col-span-2 -ml-5'>
                                        </Input>
                                        <p className=' text-start w-full my-2 text-red-800 text-base  pb-3 col-span-1' >
                                            บาท
                                        </p>
                                    </div>

                                </Card>
                                <div className='col-span-2 xl:col-span-1 self-center'>
                                    <Image
                                        className='w-full'
                                        alt='f'
                                        src="/14.jpg" />
                                </div>
                            </div>


                        </Card>
                    </div>
                </Card>
            </Form>
            <FooterTab />
        </>
    )
}