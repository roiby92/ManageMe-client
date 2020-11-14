// import { MenuItem } from '@material-ui/core'
// import { inject, observer } from 'mobx-react'
// import React from 'react'
// import {
//   AppointmentForm,
// } from '@devexpress/dx-react-scheduler-material-ui';

// const MeetingForm = inject('user')(observer((props) => {
//   const { user, appointmentData } = props


//   return (
//           <AppointmentForm.BasicLayout
//             appointmentData={appointmentData}
//             onFieldChange={onFieldChange}
//             {...restProps}
//           >
//             <AppointmentForm.Label
//               text="Name"
//               type="title"
//             />
//             <AppointmentForm.TextEditor
//               value={appointmentData.name}
//               name="name"
//               key="name"
//               onChange={onCustomFieldChange}
//               placeholder="Custom field"
//             />
//             {appointmentData.channel ? <>
//             <AppointmentForm.Label
//               text="Number of guests"
//               type="title"
//             />
//             <AppointmentForm.TextEditor
//               value={appointmentData.guests}
//               name="guests"
//               key="guests"
//               onChange={onCustomFieldChange}
//               placeholder="Guests"
//             />
//             <AppointmentForm.Label
//               text="Channel"
//               type="title"
//             />
//             <AppointmentForm.TextEditor
//               value={appointmentData.channel}
//               name="channel"
//               key="channel"
//               onChange={onCustomFieldChange}
//               placeholder="Channel"
//             />
//             </> : null}
//             <AppointmentForm.Label
//               text="Property"
//               type="title"
//             />
//             <AppointmentForm.TextEditor
//               value={appointmentData.property}
//               select
//               name="property"
//               key="property"
//               onChange={onCustomFieldChange}
//               placeholder="Property"
//             >
//               {user.properties.map(p => {
//                 return (<MenuItem key={p.id} value={p.id}>
//                   {p.name}
//                 </MenuItem>)
//               })}
//               </AppointmentForm.TextEditor>
//             <AppointmentForm.Label
//               text="Phone"
//               type="title"
//             />
//             <AppointmentForm.TextEditor
//               value={appointmentData.phone}
//               name='phone'
//               key='phone'
//               onChange={onCustomFieldChange}
//               placeholder="Phone"
//             />
//             <AppointmentForm.Label
//               text="Email"
//               type="title"
//             />
//             <AppointmentForm.TextEditor
//               value={appointmentData.email}
//               name='email'
//               key='email'
//               onChange={onCustomFieldChange}
//               placeholder="Email"
//             />
//           </AppointmentForm.BasicLayout>
//   )
// }))
// export default MeetingForm