import { Checkbox, Card, Input, Image } from 'antd';
import Example from './Components/Navbar1';
import FooterTab from './Components/footer';
const { TextArea } = Input;
import React from "react";


export default function userMag() {
    return (
        <>
            <header className="shadow sticky" style={{ backgroundColor: '#600c0c' }}>
                <Example className=" top-10" />
            </header>
            <main>
                <div className=' justify-items-center pb-24 bg-red-800 min-h-full'>

                    <div className=''>
                        <div className='mx-auto max-w-3xl py-20 '>
                            {/* <p className='text-3xl text-white mx-8 md:mx-0'>ผลงาน</p> */}
                            <div className=' text-slate-200 text-lg mx-8 md:mx-0'>เมนูอาหาร<hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr></div>
                            <div class="grid grid-cols-3 gap-4 mt-10 mb-16 px-3">
                                <div className="col-span-3">
                                    <Image className=' shadow-lg' src='/krutingfood3.png' alt='f' />
                                </div>
                                <Image src='/1.jpg' alt='f'/>
                                <Image src='/1 copy.jpg' alt='f'/>
                                <Image src='/3.jpg' alt='f' />
                                <div className='col-span-3 gap-4 grid grid-cols-3'>
                                    <div className='grid'>
                                        <Image src='/7.jpg' alt='f' />
                                        <Image src='/8.jpg' alt='f' />
                                    </div>
                                    <div className="col-span-2" >
                                    <Image src='/10.jpg' alt='f' />
                                    </div>
                                </div>
                                <Image className='w-10/12' src='/12.jpg' alt='f' />
                                <Image className='w-10/12' src='/13.jpg' alt='f' />
                                <Image className='w-10/12' src='/14.jpg' alt='f' />
                            </div>
                        </div>
                    </div>

                    <div className='bg-opacity-20 bg-gray-900 '>
                        <div className='mx-auto max-w-3xl py-20 px-3'>
                            <div className=' text-slate-200 text-end text-lg mx-8 md:mx-0'>โต๊ะจีน<hr className="h-px bg-gray-200 border-0 dark:bg-gray-700"></hr></div>
                            <div class="grid grid-cols-3 gap-4 mt-10 mb-16">
                                <div className='col-span-3 gap-4 grid grid-cols-3'>
                                    <div className='grid'>
                                        <Image src='/30.jpg' alt='f'/>
                                        <Image src='/25.jpg' alt='f'/>
                                    </div>
                                    <div className="col-span-2">
                                    <Image  src='/11.jpg' alt='f'/>
                                    </div>
                                </div>
                                <Image src='/19.jpg' alt='f'/>
                                <Image src='/5.jpg' alt='f'/>
                                <Image src='/4.jpg' alt='f'/>
                                <div className="col-span-3">
                                    <Image src='/2.jpg' alt='f'/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mx-auto max-w-2xl py-20 '>
                        <div className='gap-4 grid grid-cols-2 justify-items-center'>
                            <div className='grid bg-opacity-10 bg-black w-full px-3'>
                                <p className=' self-center w-full text-white text-xl text-center'>อาหารเลี้ยงพระ</p>
                            </div>
                            <div className='grid gap-4'>
                                <Image src='/31.jpg' alt='f'/>
                                <Image className='h-0.5' src='/32.jpg' alt='f'/>
                            </div>
                        </div>
                    </div>

                    <div className='bg-opacity-20 bg-gray-900'>
                        <div className='mx-auto max-w-2xl py-20 '>
                            <div className='gap-4 grid grid-cols-2 justify-items-center px-3'>
                                <div className='grid gap-4'>
                                    <Image src='/1.png' alt='f'/>
                                    <Image src='/6.jpg' alt='f'/>
                                </div>
                                <div className='grid bg-opacity-10 bg-black w-full'>
                                    <p className=' self-center w-full text-white text-xl text-center'>ของหวาน</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className=' bg-red-700 '>
                    <div className='text-white col-span2 md:col-span-1 text-2xl py-10 max-w-5xl mx-10 md:mx-auto font-mono'>
                        <p>ครูติ้งโต๊ะจีน</p>
                        <p className='text-sm'>รับจัดโต๊ะจีนและบุฟเฟต์ในจังหวัดเลย</p>
                    </div>
                </div>

                
                <FooterTab />
            </main>
        </>

    )
}
