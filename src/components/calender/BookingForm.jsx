import React from 'react'
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import PropertiesDropDown from './PropertiesDropDown'

const BookingForm = ({ onFieldChange, appointmentData, ...restProps }) => {
  
  const onCustomFieldChange = (e) => {
    onFieldChange({ [e.target.name]: e.target.value });
  };

  return (
    <AppointmentForm.BasicLayout
      appointmentData={appointmentData}
      onFieldChange={onFieldChange}
      {...restProps}
    >
      {appointmentData.title === 'Booking' && <>
      <AppointmentForm.Label
        text="Name"
        type="title"
      />
      <AppointmentForm.TextEditor
        value={appointmentData.name}
        name="name"
        key="name"
        onChange={onCustomFieldChange}
        placeholder="Custom field"
      />
        <AppointmentForm.Label
          text="Number of guests"
          type="title"
        />
        <AppointmentForm.TextEditor
          value={appointmentData.guests}
          name="guests"
          key="guests"
          onChange={onCustomFieldChange}
          placeholder="Guests"
        />
        <AppointmentForm.Label
          text="Channel"
          type="title"
        />
        <AppointmentForm.TextEditor
          value={appointmentData.channel}
          name="channel"
          key="channel"
          onChange={onCustomFieldChange}
          placeholder="Channel"
        />
      </>}
      <AppointmentForm.Label
        text="Property"
        type="title"
      />
      <PropertiesDropDown onCustomFieldChange={onCustomFieldChange} appointmentData={appointmentData} />
      <AppointmentForm.Label
        text="Phone"
        type="title"
      />
      <AppointmentForm.TextEditor
        value={appointmentData.phone}
        name='phone'
        key='phone'
        onChange={onCustomFieldChange}
        placeholder="Phone"
      />
      <AppointmentForm.Label
        text="Email"
        type="title"
      />
      <AppointmentForm.TextEditor
        value={appointmentData.email}
        name='email'
        key='email'
        onChange={onCustomFieldChange}
        placeholder="Email"
      />
    </AppointmentForm.BasicLayout>
  )
}
export default BookingForm