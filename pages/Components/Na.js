import { Fragment, useEffect, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../api/firebase/firebase'; // นำเข้า Firestore

const navigation = [
  { name: 'หน้าแรก', href: './Home_Admin', current: false },
  { name: 'จัดการข้อมูลผู้ใช้งาน', href: './User', current: false },
  { name: 'จัดการข้อมูลประชาสัมพันธ์', href: './PublicRelationsManagement_Admin', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function Example2() {
  const router = useRouter();
  const [userImg, setUserImg] = useState('/favicon.ico'); // รูปโปรไฟล์เริ่มต้น

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const UserID = localStorage.getItem('UserID'); // ดึง UserID จาก localStorage
        if (UserID) {
          const userDocRef = doc(db, 'user', UserID);
          const userDoc = await getDoc(userDocRef);

          if (userDoc.exists()) {
            const userData = userDoc.data();
            if (userData.UserImg) {
              setUserImg(userData.UserImg); // ถ้ามี UserImg ให้ใช้ URL ของมัน
            }
          }
        }
      } catch (error) {
        console.error('เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <Disclosure as="nav" style={{ backgroundColor: '#D2F6F2' }} className="md:py-1 py-1 shadow-lg">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-600 hover:bg-cyan-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    className="h-12 w-auto border-2 border-cyan-300 rounded-lg"
                    src="/logolru.png"
                    alt="Logo"
                  />
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className={classNames(
                          router.pathname === item.href
                            ? 'bg-cyan-700 text-white'
                            : 'text-black hover:bg-cyan-600 hover:text-white',
                          'rounded-md px-4 py-2 text-md font-medium transition duration-300 ease-in-out'
                        )}
                        aria-current={router.pathname === item.href ? 'page' : undefined}
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                {/* Profile dropdown */}
                <Menu as="div" className="relative ml-3">
                  <div>
                    <Menu.Button className="flex rounded-full bg-cyan-100 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:ring-offset-2 focus:ring-offset-cyan-600">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-14 w-14 rounded-full border-2 border-cyan-300"
                        src={userImg} // ใช้รูปจาก UserImg หรือ favicon.ico
                        alt="Profile"
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="../Components/Profile"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            โปรไฟล์ของคุณ
                          </a>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <a
                            href="/"
                            className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                          >
                            ลงชื่อออก
                          </a>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2 ">
              {navigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={classNames(
                    router.pathname === item.href
                      ? 'bg-cyan-700 text-white'
                      : 'text-black hover:bg-cyan-600 hover:text-white',
                    'block rounded-md px-3 py-2 text-base font-medium transition duration-300 ease-in-out'
                  )}
                  aria-current={router.pathname === item.href ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}
