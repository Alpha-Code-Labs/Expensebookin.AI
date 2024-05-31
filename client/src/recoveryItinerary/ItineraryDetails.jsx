
import { cancel, check_circle, double_arrow, receipt, round_circle } from '../assets/icon';

import { formatDate } from "../utils/handyFunctions";


const ItineneryDetails= ({ tripStatus ,selectedItineraryIds,handleSelect ,icon ,mode ,preferences ,actionBtnText ,routeData , handleOpenOverlay}) => {
    
  
    // const targetDate = new Date('02-Dec-2023');

    // // Get the current date
    // const currentDate = new Date();


  


  


  


    
    return (
      <>
          {/* <div className='Prefrence flex items-center w-full h-[40px] justify-end'>
       <div className=' flex '>
     <span className='mr-2 text-gray-800 font-inter'>Preferences :</span>
     <div className='flex items-center font-cabin'>
       <div className='flex items-center mr-2 text-gray-600'>
         <img src={receipt} alt='seat' className='mr-1' width={16} height={16}/>
         <span>{preferences[0]}</span>
       </div>
       <div className='flex items-center'>
         <img src={receipt} alt='food' className='mr-1' width={16} height={16}/>
         <span>{preferences[1]}</span>
       </div>
     </div>
     </div>
   </div> */}



        {mode.map((tripData, index) => (
         
  
          <div className='Itinenery mb-5' key={index}>
            <div className='h-auto w-auto border-[1px] border-slate-300 bg-slate-50 hover:border-purple-500 rounded-md cursor-pointer'>
              <div className='flex flex-row py-3 px-2 divide-x'>
                <div className='flex items-center flex-grow divide-x '>
                  <div className='flex items-start justify-start flex-col shrink w-auto md:w-[200px] mr-4'>
                    {/* <div className='flex items-center justify-center mb-2'>
                      <div className='pl-2'>
                        <img src={icon} alt="calendar" width={16} height={16} />
                      </div>
                      <span className="ml-2 tracking-[0.03em] font-cabin leading-normal text-gray-800 text-sm">
                        Class: {tripData.travelClass}
                      </span>
                    </div> */}
                    <div className='ml-4 max-w-[200px] w-auto'>
                      <span className='text-xs font-cabin'>
                        <div className='ml-4 max-w-[200px] w-auto'>
                          <span className='text-xs font-cabin'>
                            {formatDate(tripData.date)}, {tripData.time}
                          </span>
                        </div>
                      </span>
                    </div>
                  </div>
                  <div className='flex grow  items-center justify-center '>
                    <div className="flex text-xs text-gray-800 font-medium px-2 gap-4 justify-around">
                      <div className='flex text-lg font-cabin w-3/7 items-center text-center'>
                        <span className=''>
                          {tripData.bkd_from}
                          </span>
                      </div>
                      <div className='flex justify-center items-center w-1/7 min-w-[20px] min-h-[20px]'>
                        <div className='p-4 bg-slate-100 rounded-full'>
                          <img src={double_arrow} alt="double arrow" width={20} height={20} />
                        </div>
                      </div>
                      <span className='flex text-lg font-cabin w-3/7 items-center text-center'>
                        {tripData.bkd_to}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-center m-4 pl-5">  
                {tripData.status==="paid and cancelled" && tripStatus !== 'paid and cancelled'&&
                ( 
                  <div onClick={()=>handleSelect(tripData.itineraryId)}>{selectedItineraryIds.includes(tripData.itineraryId)? <img src={check_circle} width={20} height={20}/>:<img src={round_circle} width={20} height={20}/>}</div>
    //             <div className='flex justify-end items-center px-8'>
                  
    //             <div
    //             className={`flex w-auto items-center px-3 pt-[6px] pb-2 py-3 rounded-[12px] text-[14px] font-medi cursor-pointerum tracking-[0.03em] bg-red-100 text-red-900`}
    //             onClick={() => {
    //               handleOpenModal(tripData.itineraryId);
                
    //             }}>
    //             {actionBtnText}
                
    //             </div>
             
              
    // <Modal
    //   handleOperation={tripRecoveryApi}
    //   isOpen={isModalOpen}
    //   onClose={handleCloseModal}
    //   itineraryId={tripData.itineraryId}
    //   content="Are you sure ! you want to cancel the Onboarding Travel ?"
    //   // onConfirm={handleConfirm}
    //   handleOpenOverlay={handleOpenOverlay}
    //   onCancel={handleCancel}
    //   routeData={routeData}
    // />
             
    //         </div>
            )}
             </div>  
    
              </div>
              {/* <div className='flight hotel and cab flex flex-row py-3 px-2 divide-x '>
          
            <div className='flex flex-1 flex-col  font-cabin px-3 py-3'>
           
  
             <SubItinerary titleText={'Onboarding Transfer'} 
              pickupTime={tripData.boardingTransfer.prefferedTime} 
              pickupAddress={tripData.boardingTransfer.pickupAddress}
              dropAddress={tripData.boardingTransfer.dropAddress}
              itineraryId={tripData.boardingTransfer.itineraryId}
              routeData={routeData}
              handleOpenOverlay={handleOpenOverlay}
              
              
              
              />
  
  
            </div>
            <div className='flex flex-1 flex-col px-3 py-3 font-cabin w-1/2'>
              <SubItinerary titleText={'Hotel Transfer'} 
              pickupTime={tripData.hotelTransfer.prefferedTime} 
              pickupAddress={tripData.hotelTransfer.pickupAddress}
              dropAddress={tripData.hotelTransfer.dropAddress}
              itineraryId={tripData.hotelTransfer.itineraryId}
              routeData={routeData}
              handleOpenOverlay={handleOpenOverlay}
              />
  
  
  
            </div>
          
  
  
        </div> */}
            </div>
          </div>
        ))}
  
 


      </>

    );
  };
  
  
  
  

  export default ItineneryDetails
// import React, { useState } from "react";
// import Modal from "../components/Modal";
// import { cancel, double_arrow, receipt } from '../assets/icon';
// import { tripRecovery } from '../utils/tripApi';
// import { urlRedirection } from "../utils/handyFunctions";
// import { DASHBOARD_URL } from "../utils/url";

// const ItineneryDetails = ({ icon, airplane, preferences, actionBtnText, routeData, handleOpenOverlay }) => {
//   const [selectedItineraryIds, setSelectedItineraryIds] = useState([]);

//   const toggleSelection = (itineraryId) => {
//     const isSelected = selectedItineraryIds.includes(itineraryId);
//     const updatedSelection = isSelected
//       ? selectedItineraryIds.filter((id) => id !== itineraryId)
//       : [...selectedItineraryIds, itineraryId];

//     setSelectedItineraryIds(updatedSelection);
//   };

//   return (
//     <>
//     <div className="py-2 px-3 bg-gray-100 w-[80px] rounded-lg" onClick={()=>{(console.log(selectedItineraryIds)),urlRedirection(DASHBOARD_URL)}}>
//       <h1>Recover</h1>
//     </div>
//       <div className='Prefrence flex items-center w-full h-[40px] justify-end'>
//         <div className=' flex '>
//           <span className='mr-2 text-gray-800 font-inter'>Preferences :</span>
//           <div className='flex items-center font-cabin'>
//             <div className='flex items-center mr-2 text-gray-600'>
//               <img src={receipt} alt='seat' className='mr-1' width={16} height={16} />
//               <span>{preferences[0]}</span>
//             </div>
//             <div className='flex items-center'>
//               <img src={receipt} alt='food' className='mr-1' width={16} height={16} />
//               <span>{preferences[1]}</span>
//             </div>
//           </div>
//         </div>
//       </div>

//       {airplane.map((tripData, index) => (
//         <div className='Itinenery mb-5' key={index}>
//           <div className='h-auto w-auto border border-slate-300 rounded-md'>
//             <div className='flex flex-row py-3 px-2 divide-x'>
//               <div className='flex items-center flex-grow divide-x '>
//                 <div className='flex items-start justify-start flex-col shrink w-auto md:w-[200px] mr-4'>
//                   <div className='flex items-center justify-center mb-2'>
//                     <div className='pl-2'>
//                       <img src={icon} alt="calendar" width={16} height={16} />
//                     </div>
//                     <span className="ml-2 tracking-[0.03em] font-cabin leading-normal text-gray-800 text-sm">
//                       Class: {tripData.travelClass}
//                     </span>
//                   </div>
//                   <div className='ml-4 max-w-[200px] w-auto'>
//                     <span className='text-xs font-cabin'>
//                       <div className='ml-4 max-w-[200px] w-auto'>
//                         <span className='text-xs font-cabin'>
//                           {tripData.departure.date}, {tripData.departure.time}
//                         </span>
//                       </div>
//                     </span>
//                   </div>
//                 </div>
//                 <div className='flex grow  items-center justify-center '>
//                   <div className="flex text-xs text-gray-800 font-medium px-2 gap-4 justify-around">
//                     <div className='flex text-lg font-cabin w-3/7 items-center text-center'>
//                       <span className=''>
//                         {tripData.from}
//                       </span>
//                     </div>
//                     <div className='flex justify-center items-center w-1/7 min-w-[20px] min-h-[20px]'>
//                       <div className='p-4 bg-slate-100 rounded-full'>
//                         <img src={double_arrow} alt="double arrow" width={20} height={20} />
//                       </div>
//                     </div>
//                     <span className='flex text-lg font-cabin w-3/7 items-center text-center'>
//                       {tripData.to}
//                     </span>
//                   </div>
//                 </div>
//               </div>
//               <div onClick={() => toggleSelection(tripData.itineraryId)}>
//                 {selectedItineraryIds.includes(tripData.itineraryId) ? "selected" : "unselected"}
//               </div>
//             </div>
//           </div>
//         </div>
//       ))}

//       {airplane.map((tripData, index) => (
//         <div className='Itinenery mb-5' key={index}>
//           {tripData.return.itineraryId ? (
//             <div className='h-auto w-auto border flex-col border-slate-300 rounded-md'>
//               <div className='flex flex-row py-3 px-2 divide-x'>
//                 <div className='flex items-center flex-grow divide-x '>
//                   <div className='flex items-start justify-start flex-col shrink w-auto md:w-[200px] mr-4'>
//                     <div className='flex items-center justify-center mb-2'>
//                       <div className='pl-2'>
//                         <img src={icon} alt="calendar" width={16} height={16} />
//                       </div>
//                       <span className="ml-2 tracking-[0.03em] font-cabin leading-normal text-gray-800 text-sm">
//                         Class: {tripData.travelClass}
//                       </span>
//                     </div>
//                     <div className='ml-4 max-w-[200px] w-auto'>
//                       <span className='text-xs font-cabin'>
//                         <div className='ml-4 max-w-[200px] w-auto'>
//                           <span className='text-xs font-cabin'>
//                             {tripData.return.date}, {tripData.return.time}
//                           </span>
//                         </div>
//                       </span>
//                     </div>
//                   </div>
//                   <div className='flex grow  items-center justify-center '>
//                     <div className="flex text-xs text-gray-800 font-medium px-2 gap-4 justify-around">
//                       <div className='flex text-lg font-cabin w-3/7 items-center text-center'>
//                         <span className=''>
//                           {tripData.to}
//                         </span>
//                       </div>
//                       <div className='flex justify-center items-center w-1/7 min-w-[20px] min-h-[20px]'>
//                         <div className='p-4 bg-slate-100 rounded-full'>
//                           <img src={double_arrow} alt="double arrow" width={20} height={20} />
//                         </div>
//                       </div>
//                       <span className='flex text-lg font-cabin w-3/7 items-center text-center'>
//                         {tripData.from}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//                 <div onClick={() => toggleSelection(tripData.return.itineraryId)}>
//                   {selectedItineraryIds.includes(tripData.return.itineraryId) ? "selected" : "unselected"}
//                 </div>
//               </div>
//             </div>
//           ) : null}
//         </div>
//       ))}
//     </>
//   );
// };

// export default ItineneryDetails;


// import React,{useState} from "react";
// import Modal from "../components/Modal";
// import { cancel, double_arrow, receipt  } from '../assets/icon';
// import TravelRequestData from "../utils/travelrequest";
// import {tripRecovery} from '../utils/tripApi';
// import { titleCase } from "../utils/handyFunctions";



// /// format for Recovery Cancelled Trip line items or Trips
// const ItineneryDetails= ({onToggleCheck,isChecked, icon ,airplane ,preferences ,actionBtnText ,routeData ,handleOpenOverlay}) => {
    
//     return (
//       <>
//           <div className='Prefrence flex items-center w-full h-[40px] justify-end'>
//        <div className=' flex '>
//      <span className='mr-2 text-gray-800 font-inter'>Preferences :</span>
//      <div className='flex items-center font-cabin'>
//        <div className='flex items-center mr-2 text-gray-600'>
//          <img src={receipt} alt='seat' className='mr-1' width={16} height={16}/>
//          <span>{preferences[0]}</span>
//        </div>
//        <div className='flex items-center'>
//          <img src={receipt} alt='food' className='mr-1' width={16} height={16}/>
//          <span>{preferences[1]}</span>
//        </div>
//      </div>
//      </div>
//    </div>
//         {airplane.map((tripData, index) => (
  
//           <div className='Itinenery mb-5' key={index}>
//             <div className='h-auto w-auto border border-slate-300 rounded-md'>
//               <div className='flex flex-row py-3 px-2 divide-x'>
//                 <div className='flex items-center flex-grow divide-x '>
//                   <div className='flex items-start justify-start flex-col shrink w-auto md:w-[200px] mr-4'>
//                     <div className='flex items-center justify-center mb-2'>
//                       <div className='pl-2'>
//                         <img src={icon} alt="calendar" width={16} height={16} />
//                       </div>
//                       <span className="ml-2 tracking-[0.03em] font-cabin leading-normal text-gray-800 text-sm">
//                         Class: {tripData.travelClass}
//                       </span>
//                     </div>
//                     <div className='ml-4 max-w-[200px] w-auto'>
//                       <span className='text-xs font-cabin'>
//                         <div className='ml-4 max-w-[200px] w-auto'>
//                           <span className='text-xs font-cabin'>
//                             {tripData.departure.date}, {tripData.departure.time}
//                           </span>
//                         </div>
//                       </span>
//                     </div>
//                   </div>
//                   <div className='flex grow  items-center justify-center '>
//                     <div className="flex text-xs text-gray-800 font-medium px-2 gap-4 justify-around">
//                       <div className='flex text-lg font-cabin w-3/7 items-center text-center'>
//                         <span className=''>
//                           {tripData.from}
//                           </span>
//                       </div>
//                       <div className='flex justify-center items-center w-1/7 min-w-[20px] min-h-[20px]'>
//                         <div className='p-4 bg-slate-100 rounded-full'>
//                           <img src={double_arrow} alt="double arrow" width={20} height={20} />
//                         </div>
//                       </div>
//                       <span className='flex text-lg font-cabin w-3/7 items-center text-center'>
//                         {tripData.to}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
                
//                {/* {tripData.departure.status==='paid and cancelled' && ( */}
//                  {/* <div className='flex justify-end items-center px-8'>
//                   {tripData.departure.status==='paid and cancelled' ? (
//                      <div
//                      className={`flex w-auto items-center px-3 pt-[6px] pb-2 py-3 rounded-[12px] text-[14px] font-medi cursor-pointerum tracking-[0.03em] bg-red-100 text-red-900`}
//                      onClick={() => handleOpenModal(tripData.departure.itineraryId)}>
//                      {actionBtnText}
                     
//                      </div>
//                   ): (
//                     <div
//                     className={`flex w-auto items-center px-3 pt-[6px] pb-2 py-3 rounded-[12px] text-[14px] font-medi cursor-pointerum tracking-[0.03em] bg-red-100 text-red-900`}>
//                     {titleCase(tripData.departure.status)}
                    
//                     </div>
//                   )}
                
              
               
//                <Modal
//                handleOpenOverlay={handleOpenOverlay}
//                handleOperation={tripRecovery}
//        isOpen={isModalOpen}
//        onClose={handleCloseModal}
//        itineraryId={selectedItineraryId}
//        content="Are you sure ! you want to cancel the Onboarding Travel ?"
       
//        onCancel={handleCancel}
//        routeData={routeData}
//      />
              
//              </div> */}
//                {/* )} */}

//                {/* <div
//                      className={`flex w-auto items-center px-3 pt-[6px] pb-2 py-3 rounded-[12px] text-[14px] font-medi cursor-pointerum tracking-[0.03em] bg-red-100 text-red-900`}
//                      onClick={() => handleOpenModal(tripData.departure.itineraryId)}>
//                      {actionBtnText}
                     
//                </div> */}
//                {/* ////checkbox */}

//                <label className="inline-flex items-center cursor-pointer">
//   <div
//     key={index}
//     className={`relative rounded-full border-2 ${
//       isChecked[index] ? "border-green-500 bg-green-100" : "border-gray-300"
//     } w-10 h-10 transition-all duration-300 transform hover:scale-110`}
   
//     onClick={() => {onToggleCheck("flight", tripData.departure.itineraryId); console.log(tripData.departure.itineraryId)}}
//   >
//     <svg
//       className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-green-500 ${
//         isChecked[index] ? "opacity-100" : "opacity-0"
//       }`}
//       fill="none"
//       stroke="currentColor"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth="2"
//       viewBox="0 0 24 24"
//     >
//       <path d="M5 13l4 4L19 7"></path>
//     </svg>
//   </div>
//   <span className="ml-3 text-lg text-gray-700">
//     {isChecked[index] ? "Checked" : "Check me"}
//   </span>
// </label>
//                {/* ////checkbox */}

    
//               </div>
//               <div className='flight hotel and cab flex flex-row py-3 px-2 divide-x '>
          
//             {/* <div className='flex flex-1 flex-col  font-cabin px-3 py-3'>
           
  
//              <SubItinerary titleText={'Onboarding Transfer'} 
//               pickupTime={tripData.boardingTransfer.prefferedTime} 
//               pickupAddress={tripData.boardingTransfer.pickupAddress}
//               dropAddress={tripData.boardingTransfer.dropAddress}
//               itineraryId={tripData.boardingTransfer.itineraryId}
//               status={tripData.boardingTransfer.status}
//               routeData={routeData}
//               handleOpenOverlay={handleOpenOverlay}
              
              
              
//               />
  
  
//             </div>
//             <div className='flex flex-1 flex-col px-3 py-3 font-cabin w-1/2'>
//               <SubItinerary titleText={'Hotel Transfer'} 
//               pickupTime={tripData.hotelTransfer.prefferedTime} 
//               pickupAddress={tripData.hotelTransfer.pickupAddress}
//               dropAddress={tripData.hotelTransfer.dropAddress}
//               itineraryId={tripData.hotelTransfer.itineraryId}
//               status={tripData.hotelTransfer.status}
//               routeData={routeData}
//               handleOpenOverlay={handleOpenOverlay}
//               />
  
  
  
//             </div> */}
          
  
  
//         </div>
//             </div>
//           </div>
//         ))}
  
 
//   {airplane.map((tripData, index) => (
//   <div className='Itinenery mb-5' key={index}>
//     {tripData.return.itineraryId ? (
//       <div className='h-auto w-auto border flex-col border-slate-300 rounded-md'>
//         <div className='flex flex-row py-3 px-2 divide-x'>
//           <div className='flex items-center flex-grow divide-x '>
//             <div className='flex items-start justify-start flex-col shrink w-auto md:w-[200px] mr-4'>
//               <div className='flex items-center justify-center mb-2'>
//                 <div className='pl-2'>
//                   <img src={icon} alt="calendar" width={16} height={16} />
//                 </div>
//                 <span className="ml-2 tracking-[0.03em] font-cabin leading-normal text-gray-800 text-sm">
//                   Class: {tripData.travelClass}
//                 </span>
//               </div>
//               <div className='ml-4 max-w-[200px] w-auto'>
//                 <span className='text-xs font-cabin'>
//                   <div className='ml-4 max-w-[200px] w-auto'>
//                     <span className='text-xs font-cabin'>
//                       {tripData.return.date}, {tripData.return.time}
//                     </span>
//                   </div>
//                 </span>
//               </div>
//             </div>
//             <div className='flex grow  items-center justify-center '>
//               <div className="flex text-xs text-gray-800 font-medium px-2 gap-4 justify-around">
//                 <div className='flex text-lg font-cabin w-3/7 items-center text-center'>
//                   <span className=''>
//                     {tripData.to}
//                   </span>
//                 </div>
//                 <div className='flex justify-center items-center w-1/7 min-w-[20px] min-h-[20px]'>
//                   <div className='p-4 bg-slate-100 rounded-full'>
//                     <img src={double_arrow} alt="double arrow" width={20} height={20} />
//                   </div>
//                 </div>
//                 <span className='flex text-lg font-cabin w-3/7 items-center text-center'>
//                   {tripData.from}
//                 </span>
//               </div>
//             </div>
//           </div>
//           {/* {tripData.return.status==='paid and cancelled' && (
//           <div className='flex justify-end items-center px-8'>
//             <div
//               className={`flex w-auto items-center px-3 pt-[6px] pb-2 py-3 rounded-[12px] text-[14px] font-medi cursor-pointerum tracking-[0.03em] bg-red-100 text-red-900`}
//               onClick={() => handleOpenModal2(tripData.return.itineraryId)}
//             >
//              {actionBtnText}
//             </div>
//             <Modal
//             handleOpenOverlay={handleOpenOverlay}
//             handleOperation={tripRecovery}
//               isOpen={isModalOpen2}
//               onClose={handleCloseModal2}
//               content={`Are you sure! you want to Return Travel`}
//               itineraryId={selectedItineraryId}
//               // onConfirm={handleConfirm}
//               onCancel={handleCancel}
//               routeData={routeData}
//             />
//           </div>)
// } */}


//   {/* ////checkbox */}

//   <label className="inline-flex items-center cursor-pointer">
//   <div
//     key={index}
//     className={`relative rounded-full border-2 ${
//       isChecked[index] ? "border-green-500 bg-green-100" : "border-gray-300"
//     } w-10 h-10 transition-all duration-300 transform hover:scale-110`}
//     onClick={() => onToggleCheck("flight", tripData.return.itineraryId)}
//   >
//     <svg
//       className={`absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 text-green-500 ${
//         isChecked[index] ? "opacity-100" : "opacity-0"
//       }`}
//       fill="none"
//       stroke="currentColor"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//       strokeWidth="2"
//       viewBox="0 0 24 24"
//     >
//       <path d="M5 13l4 4L19 7"></path>
//     </svg>
//   </div>
//   <span className="ml-3 text-lg text-gray-700">
//     {isChecked[index] ? "Checked" : "Check me"}
//   </span>
// </label>

// {/* ////checkbox */}
//         </div>
//       </div>
//     ) : null}
//   </div>
// ))}

//       </>

//     );
//   };
  
  
  
//   const SubItinerary = ({titleText ,pickupTime ,pickupAddress ,dropAddress , itineraryId,routeData ,status,handleOpenOverlay })=>{
  
  
//     const [isModalOpen, setIsModalOpen] = useState(false);
  
//     const handleOpenModal = () => {
//       setIsModalOpen(true);
//     };
  
//     const handleCloseModal = () => {
//       setIsModalOpen(false);
//     };
  
//     // const handleConfirm = () => {
//     //   // Handle the confirmation logic
//     //   console.log('Confirmed');
//     // };
  
//     const handleCancel = () => {
//       // Handle the cancellation logic
//       console.log('Cancelled');
//     };
    
  
//     return(
  
//       // <div className='flex flex-1 flex-col ml-2 font-cabin'>
//       <div className='flex flex-row justify-between items-center'>
//       <div className=''>
//               <h1 className='font-medium text-lg mb-2'>{titleText  ||    '--'} </h1>
  
//               <div className='text-sm'>
//                 <span className='text-gray-800'>Preferred Time : </span>
//                 {pickupTime  ||    '--'}
  
//               </div>
//               <div className='flex flex-col '>
//               <div className='text-sm w-auto'>
//                 <span className='text-gray-800 text-center'>Pick-Up : </span>
//                 {/* {tripData.boardingTransfer.pickupAddress} */}
//                 {pickupAddress ||    '--'}
               
  
//               </div>
//               <div className='text-sm'>
//               <span className='text-gray-800 '>Drop-Off : </span>
//               {dropAddress  ||    '--'}
               
  
//               </div>
//               </div>
//       </div>
//       {status==='paid and cancelled' && 
//       (<>
//         <div onClick={handleOpenModal} className='p-3 bg-slate-100 rounded-full m-4 hover:bg-red-100'>
//         <img src={cancel} alt="double arrow" width={20} height={20} />
//   </div>
//   <Modal
//   handleOpenOverlay={handleOpenOverlay}
//   handleOperation={tripRecovery}
//       isOpen={isModalOpen}
//       onClose={handleCloseModal}
//       itineraryId={itineraryId}          
//       content={<div>
//         <h1 className="font-bold font-inter  ">Are you sure ?</h1>
//         <p className="font-medium font-cabin ">This itinerary will be cancel after confirm !</p>
//       </div>}
//       // onConfirm={handleConfirm}
//       onCancel={handleCancel}
//       routeData={routeData}
//     />
//     </>
//       )}
     
  
//       </div>
      
  
         
  
  
            
//     )
//   }

//   export default ItineneryDetails