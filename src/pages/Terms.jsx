import { Link, useNavigate } from "react-router-dom"
import PrivacyComp from '../components/Privacy'
import { useEffect, useRef, useState } from "react"


const Terms = ({withButton = false , setIsTerms }) => {
  return <div>
    <div className='mb-5 text-center'>
      <div>By continuing, you agree to </div>
      <div>
        <span className='text-bluewave font-bold'>Terms of Use </span> and{' '}
        <span className='text-bluewave font-bold cursor-pointer'> <span onClick={() => setIsTerms(false)}> Privacy Policy. </span> </span>
      </div>
    </div>

    <div className='text-sm mt-14'>
      Lorem ipsum dolor sit amet, consectetur
      adipiscing elit. Praesent pellentesque congue
      lorem, vel tincidunt tortor placerat a. Proin ac diam
      quam. Aenean in sagittis magna, ut feugiat diam.
      Fusce a scelerisque neque, sed accumsan metus.
    </div>

    <div className='mt-4 mb-3 text-sm'>
      Nunc auctor tortor in dolor luctus, quis euismod
      urna tincidunt. Aenean arcu metus, bibendum at
      rhoncus at, volutpat ut lacus. Morbi pellentesque
      malesuada eros semper ultrices. Vestibulum
      lobortis enim vel neque auctor, a ultrices ex
      placerat. Mauris ut lacinia justo, sed suscipit tortor.
      Nam egestas nulla posuere neque tincidunt porta.
    </div>

    <div className='text-navy font-bold my-3 text-xl mx-3'>
      Terms & Conditions
    </div>
    <ul className='mx-3'>
      <li className='list-decimal text-sm'>
        Ut lacinia justo sit amet lorem sodales accumsan. Proin malesuada
        eleifend fermentum. Donec condimentum, nunc at rhoncus faucibus, ex
        nisi laoreet ipsum, eu pharetra eros est vitae orci. Morbi quis
        rhoncus mi. Nullam lacinia ornare accumsan. Duis laoreet, ex eget
        rutrum pharetra, lectus nisl posuere risus, vel facilisis nisi tellus
        ac turpis.
      </li>
    </ul>

    {
      withButton &&
      <div className='text-center mt-4'>
        <button
          className="common-btn my-4 cursor-pointer font-outfit w-full md:w-auto"
          onClick={() => setIsTerms(false)}
        >
          Accept
        </button>
      </div>
    }

  </div>
}


const Privacy = ({onClick}) => {
  return <div>
     <PrivacyComp onButtonClick={onClick} withCheckboxAndButton={true}/>
  </div>
}

const TermsAndPrivacy = ({ setStep, withButton = false }) => {
  const [isTerms, setIsTerms] = useState(true)
  return (
  <div className={`relative   hide-scrollbar ${isTerms ? "overflow-" : "overflow-auto max-h-[670px] "}`}>
  <div className={`${isTerms ? "block" : "hidden"}`}>
    <Terms withButton={withButton} setIsTerms={setIsTerms} />
  </div>

  <div className={`${isTerms ? "mt-6 hidden" : "mt-0 block"}`}>
    <Privacy onClick={() => setStep(0)} />
  </div>
</div>
  )
}

export default TermsAndPrivacy




