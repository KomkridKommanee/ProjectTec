import { radio } from '@material-tailwind/react';
import { Button, Form, Radio, Card, Space, Input, Image, Divider } from 'antd';
import Link from 'next/link';
import Example from '../Components/Navbar1';
import FooterTab from '../Components/footer';
import React from 'react';

export default function Set1800() {
    return (
        <>
        <Example className=" top-10" />
        <Form className="flex bg-bottom bg-red-800 min-h-full items-center justify-center py-12 sm:px-5 md:text-start text-center px-2">
            
            <Card className='bg-white pt-8 w-full lg:mx-36 rounded-3xl'>
                <div className='w-full my-3 text-red-800 md:text-white text-xl md:text-xl md:bg-red-800 md:px-8 py-2 rounded-3xl'>
                โต๊ะจีนราคา 1,800 บาท
                </div>
                <div className=' mt-4 text-center' >
                    <Card className='lg:px-20 bg-red-800 rounded-3xl mx-1'>
                        <div className='grid grid-cols-2'>
                        <div className=' my-5 col-span-2 xl:col-span-1 self-center'>
                                <Image className='h-fit'
                                    src="/3.jpg"
                                    
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
                                    <p className=' text-start w-full my-2 text-red-800 text-base col-span-4 border-b border-yellow-300 pb-3'>
                                        ข้าวเกรียบ , หมี่กรอบ
                                    </p>
                                    <p className=' text-start w-full my-2 text-red-800 text-base col-span-1 border-b border-yellow-300 pb-3'>
                                        จานที่ 2 :
                                    </p>
                                    <p className=' text-start w-full my-2 text-red-800 text-base col-span-4 border-b border-yellow-300 pb-3'>
                                        ออเดิร์ฟจีน
                                    </p>
                                    <p className=' text-start w-full my-2 text-red-800 text-base col-span-1 border-b border-yellow-300 pb-3'>
                                        จานที่ 3 :
                                    </p>
                                    <p className=' text-start w-full my-2 text-red-800 text-base col-span-4 border-b border-yellow-300 pb-3'>
                                        ยำโป๊ยเซียน , หมูมะนาวเส้นแก้ว , ยำหมูยอหนัง , ยำใหญ่
                                    </p>
                                    <p className=' text-start w-full my-2 text-red-800 text-base col-span-1 border-b border-yellow-300 pb-3'>
                                        จานที่ 4 :
                                    </p>
                                    <p className=' text-start w-full my-2 text-red-800 text-base col-span-4 border-b border-yellow-300 pb-3'>
                                        พะโล้ขาหมูยอดผัก , ตุ๋นน่องไก่มะนาวดอง
                                    </p>
                                    <p className=' text-start w-full my-2 text-red-800 text-base col-span-1 border-b border-yellow-300 pb-3'>
                                        จานที่ 5 :
                                    </p>
                                    <p className=' text-start w-full my-2 text-red-800 text-base col-span-4 border-b border-yellow-300 pb-3'>
                                        แป๊ะซะปลาช่อน , แป๊ะซะปลานิล
                                    </p>
                                    <p className=' text-start w-full my-2 text-red-800 text-base col-span-1 border-b border-yellow-300 pb-3'>
                                        จานที่ 6 :
                                    </p>
                                    <p className=' text-start w-full my-2 text-red-800 text-base col-span-4 border-b border-yellow-300 pb-3'>
                                        ต้มแซ่บซี่โครงหมู , ต้มยำปลาน้ำโขง
                                    </p>
                                    <p className=' text-start w-full my-2 text-red-800 text-base col-span-1 border-b border-yellow-300 pb-3'>
                                        จานที่ 7 :
                                    </p>
                                    <p className=' text-start w-full my-2 text-red-800 text-base col-span-4 border-b border-yellow-300 pb-3'>
                                        หมี่ซั่ว , ข้าวผัดกุ้ง
                                    </p>
                                    <p className=' text-start w-full my-2 text-red-800 text-base col-span-1 '>
                                        จานที่ 8 :
                                    </p>
                                    <p className=' text-start w-full my-2 text-red-800 text-base col-span-4 '>
                                        ทับทิมกรอบมะพร้าวอ่อน
                                    </p>
                                    <p className=' col-span-3'>

                                    </p>
                                    <Link href="./Set1800_Form" className='col-span-2 my-2'>
                                        <button type="button" className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 ">
                                            ขอใบเสนอราคา

                                        </button>
                                    </Link>
                                </div>
                            </Card>
                        </div>


                    </Card>
                </div>

                <div className=' mt-4 text-center' >
                    <Card className='lg:px-20 bg-red-800  rounded-3xl mx-1'>
                        <div className='grid grid-cols-2'>
                        <Card className=' bg-orange-100 col-span-2 xl:col-span-1'>
                                <div className='grid grid-cols-5'>
                                    <p className=' text-start w-full my-3 text-red-800 text-lg col-span-full'>
                                        เงื่อนไข
                                    </p>
                                    <p className=' text-start w-full my-2 text-red-800 text-sm border-b border-yellow-300 pb-3 col-span-1' >
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                        </svg>


                                    </p>
                                    <p className=' text-start w-full my-2 text-red-800 text-base col-span-4 border-b border-yellow-300 pb-3 '>
                                        ราคาดังกล่าว รวมทุกอย่างแล้ว มีโต๊ะ เก้าอี้ จาน ถ้วย ช้อน ตะเกียบ ผ้าคลุมโต๊ะ ผ้าคลุมเก้าอี้ โต็ะมีผ้าคลุม เก้าอี้มีโบว์ผูก สวยงาม สะอาด จัดแบบนี้ทุกราคา…
                                    </p>
                                    <p className=' text-start w-full my-2 text-red-800 text-sm col-span-1 border-b border-yellow-300 pb-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                        </svg>

                                    </p>
                                    <p className=' text-start w-full my-2 text-red-800 text-base col-span-4 border-b border-yellow-300 pb-3 '>
                                        เจ้าภาพเตรียม ชุดน้ำเองให้ทางร้านเสิร์ฟวางที่โต๊ะให้
                                    </p>
                                    <p className=' text-start w-full my-2 text-red-800 text-sm col-span-1 border-b border-yellow-300 pb-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                                            <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                                        </svg>

                                    </p>
                                    <p className=' text-start w-full my-2 text-red-800 text-base col-span-4 border-b border-yellow-300 pb-3 '>
                                        1 โต๊ะนั่งได้ 8 ท่าน โต๊ะหน้ากว้าง 120 ซม.
                                    </p>
                                    <p className=' text-start w-full my-2 text-red-800 text-base col-span-1 border-b border-yellow-300 pb-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z" clipRule="evenodd" />
                                            <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
                                        </svg>

                                    </p>
                                    <p className=' text-start w-full my-2 text-red-800 text-base col-span-4 border-b border-yellow-300 pb-3 '>
                                        งานเลี้ยงพระ 9 รูป แนะนำให้จัด 2 โต๊ะ
                                    </p>
                                    <p className=' text-start w-full my-2 text-red-800 text-base col-span-1 border-b border-yellow-300 pb-3'>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                            <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z" clipRule="evenodd" />
                                        </svg>

                                    </p>
                                    <p className=' text-start w-full my-2 text-red-800 text-base col-span-4 border-b border-yellow-300 pb-3 '>
                                        ทางร้านมีบริการจัด ข้าวและอาหารพระพุทธ เจ้าที่ ศาลพระภูมิ เป็นถ้วยเล็กๆ ให้ฟรี!!! ไม่คิดค่าบริการเพิ่มเติม
                                    </p>

                                </div>

                            </Card>
                            <div className='col-span-2 xl:col-span-1 self-center'>
                            <Image
                                    className='w-full'
                                    alt='f'
                                    src="/15.jpg" />
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