import { radio } from '@material-tailwind/react';
import React, { useState } from 'react';
import { Button, Form, Radio, Card, Space, Input, Image, Divider } from 'antd';
import Link from 'next/link';

import Example2 from '../Components/Na';


export default function User() {
    return (
        <>
            <Example2 className=" top-10" />
            <div className=' justify-self-center py-5 md:py-7 shadow-xl'>
                <p className=' text-3xl md:text-2xl text-start pl-44 font-bold'>Admin ComSciLRU</p>
            </div>
            <Form className="flex bg-bottom bg-wite min-h-full items-center justify-center py-12 sm:px-5 xs:w-auto xs:h-auto sm:w-auto sm:h-auto md:h-auto md:w-auto lg:h-auto lg:w-auto md:text-start text-center px-2">

                <div className=' mt-3 text-center items-center justify-items-center py-6' >
                    <Link href="./UserManagement">
                    <Card className=" lg:px-96 px-20 md:px-40 p-0.5 mb-2 me-2 overflow-hidden text-lg md:text-xl font-bold text-black bg-gradient-to-r from-cyan-50 to-blue-50 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 border-4 border-cyan-600">
                    ข้อมูลผู้ใช้งาน
                    </Card>
                    </Link>
                    <Link href="./StudentsManagement">
                    <Card className="my-5 lg:px-96 px-20 md:px-40 p-0.5 mb-2 me-2 overflow-hidden text-lg md:text-xl font-bold text-black bg-gradient-to-r from-cyan-50 to-blue-50 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 border-4 border-cyan-600">
                    ข้อมูลนักศึกษา
                    </Card>
                    </Link>
                    <Link href="./SectionManagement">
                    <Card className="my-5 lg:px-96 px-20 md:px-40 p-0.5 mb-2 me-2 overflow-hidden text-lg md:text-xl font-bold text-black bg-gradient-to-r from-cyan-50 to-blue-50 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 border-4 border-cyan-600">
                    ข้อมูลหมู่เรียน
                    </Card>
                    </Link>

                </div>

            </Form>
        </>
    )
}