import React from 'react'

export const VerifyUser = () => {
    const testUser = [
        {
            name: "Abcd",
            email: "abcd@mail.com",
            coachifyId: "2233",
            verified: false,
        },
        {
            name: "xyz",
            email: "xyz@mail.com",
            coachifyId: "2232",
            verified: false,
        },
        {
            name: "ccdd",
            email: "ccdd@mail.com",
            coachifyId: "2239",
            verified: false,
        },
        {
            name: "Abcd",
            email: "abcd@mail.com",
            coachifyId: "2233",
            verified: false,
        },
        {
            name: "xyz",
            email: "xyz@mail.com",
            coachifyId: "2232",
            verified: false,
        },
        {
            name: "ccdd",
            email: "ccdd@mail.com",
            coachifyId: "2239",
            verified: false,
        },
        {
            name: "Abcd",
            email: "abcd@mail.com",
            coachifyId: "2233",
            verified: false,
        },
        {
            name: "xyz",
            email: "xyz@mail.com",
            coachifyId: "2232",
            verified: false,
        },
        {
            name: "ccdd",
            email: "ccdd@mail.com",
            coachifyId: "2239",
            verified: false,
        },
        {
            name: "Abcd",
            email: "abcd@mail.com",
            coachifyId: "2233",
            verified: false,
        },
        {
            name: "xyz",
            email: "xyz@mail.com",
            coachifyId: "2232",
            verified: false,
        },
        {
            name: "ccdd",
            email: "ccdd@mail.com",
            coachifyId: "2239",
            verified: false,
        },
    ];
    function verifyUserFunction(){
        console.log('userverified');
    }
    return (
        <div className='flex flex-col items-center justify-center h-[800px] w-[960px] gap-4 p-4'>
            <div className='flex basis-1/12 w-full gap-2'>
                <div className='rounded-[20px] bg-[#63a73a] basis-3/12 text-2xl flex justify-center items-center'>Name</div>
                <div className='rounded-[20px] bg-[#63a73a] basis-3/12 text-2xl flex justify-center items-center'>Coachify Id</div>
                <div className='rounded-[20px] bg-[#63a73a] basis-4/12 text-2xl flex justify-center items-center'>Email Id</div>
                <div className='rounded-[20px] bg-[#63a73a] basis-2/12 text-2xl flex justify-center items-center'>Verify</div>
            </div>
            <div className='flex basis-11/12  w-full gap-2 flex-col overflow-auto'>
                {
                    testUser.map((user) => {
                        return <div className='flex text-lg itim text-start gap-2'>
                            <div className='rounded-[20px] bg-neutral-800 basis-3/12 p-4'>
                                {user.name}
                            </div>
                            <div className='rounded-[20px] bg-neutral-800 basis-3/12 p-4'>
                                {user.coachifyId}
                            </div>
                            <div className='rounded-[20px] bg-neutral-800 basis-4/12 p-4'>
                                {user.email}
                            </div>
                            <div className=' flex items-center justify-center basis-2/12 p-4'>
                                <button className='h-12 w-12 bg-[#29cc7a] rounded-3xl' onClick={verifyUserFunction}>
                                ✔
                                </button>
                            </div>
                        </div>
                    })
                }
            </div>
        </div>
    )
}
