import React from 'react'
import { Appointments } from '@devexpress/dx-react-scheduler-material-ui';

const BookingAppointment = ({
    children, style, ...restProps
}) => {
    return (
        <Appointments.Appointment
            {...restProps}
            style={{
                ...style,
                backgroundColor: restProps.data.color
            }}
        >
            {children}
        </Appointments.Appointment>
    )
}

export default BookingAppointment