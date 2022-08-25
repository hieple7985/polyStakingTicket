// import React, { useEffect, memo } from 'react'
// import TextField from '@mui/material/TextField';
// import { StaticTimePicker } from '@mui/x-date-pickers/StaticTimePicker';
// import type {} from '@mui/x-date-pickers/themeAugmentation';

// import { ImCross } from 'react-icons/im'

// interface Props {
//   selectedTime: Date | null;
//   setSelectedTime: React.Dispatch<React.SetStateAction<Date | null>>;
//   setActiveTimeModal: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const TicketTimeModal: React.FC<Props> = ({selectedTime, setSelectedTime, setActiveTimeModal}: Props): React.ReactElement => {
//   const checkTime: Date = selectedTime ? selectedTime : new Date();
//   const [timeValue, setTimeValue] = React.useState<Date | null>(checkTime);
//   const confirmModal = (): void => {
//     setSelectedTime(timeValue)
//     setActiveTimeModal(false);
//   }
//   const cancelModal = (): void => {
//     setActiveTimeModal(false);
//   }

//   useEffect(() => {
//     timeValue && setTimeValue(new Date(timeValue.setSeconds(0, 0)))
//   }, [timeValue])
  
//   return (
//     <section className='modal-wrap'>
//       <div className='modal-bg'></div>
//       <div className='fixed-comp modal'>
//         <div className='modal-exit-btn'>
//           <button onClick={cancelModal}>
//             <i><ImCross /></i>
//           </button>
//         </div>
//         <div className='w-full mt-12 relative'>
//           <StaticTimePicker
//             displayStaticWrapperAs="desktop"
//             showToolbar={true}
//             value={timeValue}
//             onChange={(newValue) => {
//               setTimeValue(newValue);
//             }}
//             renderInput={(params) => <TextField {...params} />}
//           />
//         </div>
//         <div className='w-10/12'>
//           <div className='footer-full-w-btn my-6'>
//             <button className='primary-btn' onClick={confirmModal}>
//               OK
//             </button>
//           </div>
//         </div>
//       </div>
//     </section>
//   )
// }

// export default memo(TicketTimeModal)

export {}

// unused