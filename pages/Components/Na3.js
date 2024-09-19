import { Disclosure } from '@headlessui/react'

export default function Example4() {
  return (
    <Disclosure as="nav" style={{ backgroundColor: '#D2F6F2' }} className="md:py-1 py-1 font-bold text-lg shadow-lg">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
            <div className="relative flex h-16 items-center justify-center">
              {/* Added centering and spacing */}
              <p className='text-4xl md:text-3xl text-center font-extrabold text-cyan-700'>
                Your Profile
              </p>
            </div>
          </div>
        </>
      )}
    </Disclosure>
  )
}
