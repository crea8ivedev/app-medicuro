import CommonBackBtn from '../components/CommonBackBtn'

function Privacy() {
    const termsAndConditions = [
        "Ut lacinia justo sit amet lorem sodales accumsan. Proin malesuada eleifend fermentum. Donec condimentum, nunc at rhoncus faucibus, ex nisi laoreet ipsum, eu pharetra eros est vitae orci. Morbi quis rhoncus mi. Nullam lacinia ornare accumsan. Duis laoreet, ex eget rutrum pharetra, lectus nisl posuere risus, vel facilisis nisi tellus ac turpis.",
        "Ut lacinia justo sit amet lorem sodales accumsan. Proin malesuada eleifend fermentum. Donec condimentum, nunc at rhoncus faucibus, ex nisi laoreet ipsum, eu pharetra eros est vitae orci. Morbi quis rhoncus mi. Nullam lacinia ornare accumsan. Duis laoreet, ex eget rutrum pharetra, lectus nisl posuere risus, vel facilisis nisi tellus.",
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam."
    ];

    return (
        <div className='bg-sky-foam min-h-screen pb-16 relative'>
            <div className='common-bg absolute left-0 right-0'></div>
            <div className='flex flex-col p-5'>
                <CommonBackBtn label='Privacy Policy' />
            </div>
            <div className='flex w-full justify-center items-center md:mt-24'>
                <div className='bg-mint relative w-825 pt-10 pb-36 md:px-10 px-5 flex flex-col rounded-xl'>
                    <div className='common-right-design  z-10 bottom-5 right-5'></div>

                    <div>
                        <div className='text-ocean font-bold'>Last Update: 14/04/2025</div>
                        <div className='mt-3 mb-4'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent pellentesque congue lorem, vel tincidunt tortor placerat a. Proin ac diam quam. Aenean in sagittis magna, ut feugiat diam. Fusce a scelerisque neque, sed accumsan metus.</div>
                        <div>Nunc auctor tortor in dolor luctus, quis euismod urna tincidunt. Aenean arcu metus, bibendum at rhoncus at, volutpat ut lacus. Morbi pellentesque malesuada eros semper ultrices. Vestibulum lobortis enim vel neque auctor, a ultrices ex placerat. Mauris ut lacinia justo, sed suscipit tortor. Nam egestas nulla posuere neque tincidunt porta.</div>
                    </div>

                    <div className='text-ocean font-bold mt-4 text-xl'>Terms & Conditions</div>
                    <ul className='list-decimal px-10 md:px-5'>
                        {
                            termsAndConditions.map((item, index) => {
                                return <li className='my-3' key={index}>{item} </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default Privacy
