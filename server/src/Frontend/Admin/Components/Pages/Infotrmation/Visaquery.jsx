import React, { useState, useEffect } from 'react'
import { Link } from "react-router-dom";
import Api from '../HomePage/Api';

const Visaquery = () => {
  const [cont, setCont] = useState([""])
  const [contt, setContt] = useState([""])
  const [app, setApp] = useState([""])
  const [appValue, setAppV] = useState("")
  const [appp, setAppp] = useState(false)
  const [data, setData] = useState({
    id: "",

    country: "",

  })
  const handeleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    setData({ ...data, [name]: value })


  }
  console.log(data)
  //##### get Visa query start ######


  const contactList = async () => {
    try {
      const res = await Api.get("/atms/api/v1/visa")
      if (res.data.data) {
        setContt(res.data)
        setCont(res.data.data.reverse())
      }
    } catch (err) {
      console.log(err.code)
    }

  }
  //##### get Visa query end ######

  //##### get approve query start ######
  const appList = async () => {
    try {
      const res = await Api.get("/atms/api/v1/approve")
      if (res.data.data) {

        setApp(res.data.data.reverse())
      }
    } catch (err) {
      console.log(err.code)
    }

  }
  //##### get approve query end ########

  //############ visa Card start ###############
  const ContCard = cont && cont?.map((info, i) => (
    <div key={i} className="p-4 w-[300px] shadow-xl rounded-md border  ">
      <div className='p-2 my-2 rounded-md bg-[#343e4e] shadow-lg  text-white'>

        <p>{info?.userName}</p>
        <p>{info?.email}</p>
        <p>{info?.age}</p>
        <p>{info?.location}</p>

      </div>

      <div className='p-2 my-2 rounded-md bg-[#343e4e] shadow-lg '>
        <p className='text-cyan-700 font-medium'>SSC</p>
        <p className='text-pink-200'>{info?.ssc}</p>
        <p className='text-cyan-700 font-medium'>HSC</p>
        <p className='text-purple-200 '>{info?.hsc}</p>
        <p className='text-cyan-700 font-medium'>BSC</p>
        <p className='text-purple-200 '>{info?.bsc}</p>
        <p className='text-cyan-700 font-medium'>Master</p>
        <p className='text-purple-200 '>{info?.master}</p>
        <p className='text-cyan-700 font-medium'>SSC</p>

      </div>

      <div className=' p-2 my-2 rounded-md bg-[#343e4e] shadow-lg '>
        <p className='text-cyan-700 font-medium'>IELTS</p>
        <p className='text-pink-200'><span className='text-cyan-700 font-medium mr-2'>Reading:</span> {info?.ieltRead}</p>
        <p className='text-pink-200'><span className='text-cyan-700 font-medium mr-2'>Writing:</span> {info?.ieltWrite}</p>
        <p className='text-pink-200'><span className='text-cyan-700 font-medium mr-2'>Speaking:</span> {info?.ieltSpeak}</p>
        <p className='text-pink-200'><span className='text-cyan-700 font-medium mr-2'>Listening:</span>{info?.ieltListen}</p>
        <p className='text-pink-200'><span className='text-cyan-700 font-medium mr-2'>Over View:</span>{info?.ieltOver}</p>
      </div>
      <p className='text-cyan-700 font-medium'> {info?.time}</p>

      <hr />
      <div className='flex justify-between'>

        <p onClick={() => { setData({ ...data, id: info._id }); setAppp(!appp); }} className="text-end text-green-500 font-semibold text-base cursor-pointer">Approve</p>

        <p onClick={() => handle(info._id)} className=" text-end text-red-500 font-semibold text-base cursor-pointer">Delete</p>
      </div>
    </div>

  ))
  //############ visa Card end ###############
  //############ approve Card satr ###############
  const AppCard = app && app?.map((info, i) => (
    <div key={i} className="p-4 w-[300px] shadow-xl rounded-md border  ">
      <div className='p-2 my-2 rounded-md bg-[#343e4e] shadow-lg  text-white'>

        <p className='font-semibold text-yellow-800 text-center'>{info?.country}</p>
        <p>{info?.userName}</p>
        <p>{info?.email}</p>
        <p>{info?.age}</p>
        <p>{info?.location}</p>
        <p className='font-semibold text-green-300 '>{info?.agreeWithUs}</p>

      </div>

      <div className='p-2 my-2 rounded-md bg-[#343e4e] shadow-lg '>
        <p className='text-cyan-700 font-medium'>SSC</p>
        <p className='text-pink-200'>{info?.ssc}</p>
        <p className='text-cyan-700 font-medium'>HSC</p>
        <p className='text-purple-200 '>{info?.hsc}</p>
        <p className='text-cyan-700 font-medium'>BSC</p>
        <p className='text-purple-200 '>{info?.bsc}</p>
        <p className='text-cyan-700 font-medium'>Master</p>
        <p className='text-purple-200 '>{info?.master}</p>
        <p className='text-cyan-700 font-medium'>SSC</p>

      </div>

      <div className=' p-2 my-2 rounded-md bg-[#343e4e] shadow-lg '>
        <p className='text-cyan-700 font-medium'>IELTS</p>
        <p className='text-pink-200'><span className='text-cyan-700 font-medium mr-2'>Reading:</span> {info?.ieltRead}</p>
        <p className='text-pink-200'><span className='text-cyan-700 font-medium mr-2'>Writing:</span> {info?.ieltWrite}</p>
        <p className='text-pink-200'><span className='text-cyan-700 font-medium mr-2'>Speaking:</span> {info?.ieltSpeak}</p>
        <p className='text-pink-200'><span className='text-cyan-700 font-medium mr-2'>Listening:</span>{info?.ieltListen}</p>
        <p className='text-pink-200'><span className='text-cyan-700 font-medium mr-2'>Over View:</span>{info?.ieltOver}</p>
      </div>
      <p className='text-cyan-700 font-medium'> {info?.time}</p>

      <hr />
      <div className='flex justify-between'>



        <p onClick={() => handl(info._id)} className=" text-end text-red-500 font-semibold text-base cursor-pointer">Delete</p>
      </div>
    </div>

  ))
  //############ approve Card end ###############
  //############ approve delete start ###############
  const handl = async (id) => {
    try {
      const confirm = window.confirm("Are you sure? ")
      if (!confirm) {
        return
      }

      const res = await Api.delete(`/atms/api/v1/approve/${id}`)
      alert(res.data.message)
      appList()
    } catch (error) {
      console.log(error.status)
    }
  }
  //############ approve delete end ###############

  //############ visa Card delte start ###############
  const handle = async (id) => {
    try {
      const confirm = window.confirm("Are you sure? ")
      if (!confirm) {
        return
      }

      const res = await Api.delete(`/atms/api/v1/visa/${id}`)
      alert(res.data.message)
      contactList()
    } catch (error) {
      console.log(error.status)
    }
  }
  //############ visa Card delete end ###############
  //############ approve create start ###############
  const appfun = async () => {
    try {
      if (data.country === "") {
        alert("Fill the Country")
        return
      }
      const id = data.id
      const country = data.country
      await Api.post(`/atms/api/v1/approve/${id}`, { country })

      setAppp(false)
      setData({
        id: "",
        country: ""
      })
      alert("Visa approved")
      contactList()
      appList()

    } catch (err) {
      console.error("Error:", err.status)
    }

  }
  //############ approve create end ###############


  //############useEffect star ##########
  useEffect(() => {
    contactList()
    appList()
  }, [])
  //############useEffect end##########
  //############Log start##########
  console.log(cont)
  console.log("Approve:", app)

  //############Log end##########
  return (
    <div className=' m-7 lg:w-full w-[60%] text-white'>
      <p className='text-center font-medium text-cyan-700 mt-8'>{contt?.message ? contt?.message : "NO VISA QUERY"}</p>
      {contt?.message &&
        <>
          <div className=' flex flex-wrap gap-2'>{ContCard}</div>

          {appp &&
            <div className=" mb-7 mt-8">
              <div className="">
                {" "}
                <div>
                  <label className="mb-2 md:text-lg  text-gray-400">Country</label>
                </div>{" "}
                <div>
                  <select

                    name='country'
                    required
                    size="lg"
                    color="blue"
                    className="border py-2 px-3 bg-[#21262E] text-white resize-none
                  rounded w-[20%] "
                    label=" Replay"
                    onChange={(e) => handeleChange(e)}
                  >
                    <option value="CANADA">CANADA</option>
                    <option value="UK" >UK</option>
                    <option value="CHAINA">CHAINA</option>
                    <option value="UNITED STATES" > UNITED STATES</option>
                    <option value="DENMARK" > DENMARK</option>
                    <option value="SOUTH KOREA" > SOUTH KOREA</option>
                    <option value="AUSTRALIA" > AUSTRALIA</option>
                  </select>
                  <button onClick={appfun} className="block text-green-500 text-center w-[20%] mt-2 rounded-md py-[10px] border-deep-orange-500 font-semibold border  text-base cursor-pointer">SEND</button>

                </div>
              </div>
            </div>

          } </>}
      <div className='border-b' ></div>
      <p className="mb-2 mt-10 md:text-lg  text-gray-400">Approve</p>
      <div className=' flex flex-wrap gap-2 '>



        {AppCard}</div>
    </div>
  )
}

export default Visaquery