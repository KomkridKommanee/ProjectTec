import { Carousel, Card } from 'antd';
import Example from './Components/Navbar1';
import FooterTab from './Components/footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Image from 'next/image'

export default function userMag() {
    return (
        <>
            <header className="shadow" style={{ backgroundColor: '#600c0c' }}>
                <Example className=" top-10" />
            </header>
            <main>
                <div style={{ backgroundColor: '#600c0c' }}>
                    <div className=' pt-2 md:pt-10 px-2 md:px-5 lg:max-w-7xl mx-auto h-full align-middle justify-center'>
                        <Carousel
                            autoplay
                            dotPosition={'top'}
                            className='shadow-xl'
                            
                        >
                            <Image className='rounded-2xl' alt='image1' src="/krutingfood5.png" width={1000} height={600} priority={true}/>
                            <Image className='rounded-2xl' alt='image2' src="/krutingfood4.png" width={1000} height={600} priority={true}/>
                            <Image className='rounded-2xl' alt='image3' src="/krutingfood2.png" width={1000} height={600} priority={true}/>

                        </Carousel>
                    </div>
                    <div className=' my-4 md:my-8 max-w-xs md:max-w-xl mx-auto bg-red-900 p-2 px-8 rounded-full'>
                        <hr className="h-px lg:mx-auto max-w-2xl border-slate-300 border-2 dark:bg-gray-700"></hr>
                    </div>
                    <div className=' rounded-ss-full items-center border-0 mx-auto pb-2 lg:pb-16 w-full mt-4 md:mt-10  py-6 pt-8 sm:px-6 lg:px-8 h-full' style={{ backgroundColor: '#c01c1c' }}></div>

                </div> 
                {/* md:flex hidden */}
                <div className=' justify-self-center py-5 md:py-10 shadow-xl'>
                    <p className=' text-base md:text-2xl text-center '>เลือกดูแพ็คเกจสุดคุ้มที่โดนใจ</p>
                    <p className='text-xl md:text-3xl text-center'>ครูติ้งจัดให้อร่อยคุ้มทุกเมนู</p>
                </div>
                <div className=' bg-slate-500 bg-opacity-10'>
                <div className='grid grid-cols-2 justify-items-center gap-x-10 align-middle py-4 md:py-10 max-w-5xl mx-2 md:mx-auto'>
                    <a href='table# ' className='py-3 bg-red-700 text-center w-full border-neutral-300 rounded-md shadow-xl'>
                        <p className='text-white text-lg md:text-2xl transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-150'>โต๊ะจีน</p>
                    </a>
                    <a href='./Buffet#' className='py-3 text-center bg-amber-500 w-full border-neutral-300 rounded-md shadow-xl'>
                        <p className='text-white text-lg md:text-2xl transition ease-in-out delay-50 hover:-translate-y-1 hover:scale-150'>บุฟเฟ่ต์</p>
                    </a>
                </div>
                <div className="grid px-5 grid-cols-3 gap-4 my-10 max-w-5xl mx-auto">
                    <Image src="/30.jpg" alt='f' width={500} height={500}/>
                    <Image src="/28.jpg" alt='f' width={500} height={500}/>
                    <Image src="/14.jpg" alt='f' width={500} height={500}/>
                    <div className='col-span-3 gap-4 grid grid-cols-3'>
                        <div className='grid'>
                    <Image src="/5.jpg" alt='f' width={500} height={500}/>
                    <Image src="/4.jpg" alt='f' width={500} height={500}/>
                        </div>
                    <Image className="col-span-2" src="/13.jpg" alt='f' width={1000} height={1000} priority={true}/>
                    </div>
                </div>
                <div className='grid grid-cols-2 max-w-5xl mx-auto'>
                    <div className=' justify-self-center scale-75 xl:mt-0 mx-auto transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-90 rounded-2xl shadow-lg shadow-black bg-red-900 '>
                        <div className='text-white text-2xl p-5 mt-5 justify-self-center'>
                            <p>ครูติ้งโต๊ะจีน</p>
                            <p className='text-sm'>รับจัดโต๊ะจีนและบุฟเฟต์ในจังหวัดเลย</p>
                            <Image className='w-auto lg:w-60 mt-8 rounded-xl' src="/krutingline.png" alt='f' width={500} height={500} />
                        </div>
                    </div>
                    <div className='flex justify-center h-full align-middle'>
                        <div className=' self-center '>
                            <p className=' w-full text-3xl '>อร่อย สะอาด ถูกปากแน่นอน</p>
                            <p className=' md:w-full md:text-xl text-base'>จะบุฟเฟต์หรือโต๊ะจีนก็คุ้ม ลองเลือกคำนวณรายการได้เลย</p>
                        </div>
                    </div>
                </div>
                </div>
                <FooterTab />
            </main>
        </>

    )
}