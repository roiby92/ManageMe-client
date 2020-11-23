import { makeStyles } from '@material-ui/core'
import { inject, observer } from 'mobx-react'
import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper';
import { ViewState, EditingState } from '@devexpress/dx-react-scheduler';
import {
  Scheduler,
  MonthView,
  AppointmentForm,
  Toolbar,
  DateNavigator,
  Appointments,
  TodayButton,
  EditRecurrenceMenu,
  AppointmentTooltip,
  ConfirmationDialog
} from '@devexpress/dx-react-scheduler-material-ui';
import moment from 'moment'
import BookingForm from './BookingForm'
import BookingAppointment from './BookingAppointment'

const useStyles = makeStyles((theme) => ({
  calendarContainer: {
    maxWidth: '100%',
    [theme.breakpoints.up('sm')]: {
      height: 100
    },
    [theme.breakpoints.up('md')]: {
      height: 550
    },
    [theme.breakpoints.up('xl')]: {
      height: 700
    }
  }
}))

const TextEditor = (props) => {
  if (props.type === 'multilineTextEditor') {
    return null;
  } return <AppointmentForm.TextEditor {...props} />
};

const Calendar = inject('user')(observer((props) => {
  const { user, fetchBooking, booking } = props
  const classes = useStyles()
  const [addedAppointment, setAddedAppointment] = useState({})
  const [appointmentChanges, setAppointmentChanges] = useState({})
  const [editingAppointment, setEditingAppointment] = useState(undefined)


  async function commitChanges({ added, changed, deleted }) {
    if (added) {
      added.startDate = moment(added.startDate).format('YYYY/MM/DD HH:mm:ss')
      added.endDate = moment(added.endDate).format('YYYY/MM/DD HH:mm:ss')
      if(added.title !== "Booking"){
        added.name = added.title
      }
      await user.addNewBooking(added)
    }
    if (changed) {
      const id = booking.find(b => changed[b.id]).id
      changed = changed[id]
      const bookingToDB = {}
      for (let key in changed) {
        const newKey = key === 'startDate' ? 'start_date' : key === 'endDate' ? "end_date" : key
        if (key !== 'allDay' && key !== 'title') {
          changed[key] = newKey === 'start_date' || newKey === 'end_date' ? moment(changed[key]).format('YYYY/MM/DD HH:mm:ss') : changed[key]
          bookingToDB[newKey] = changed[key]
        }
      }
      bookingToDB.name = changed.title === "Booking" ? bookingToDB.name : changed.title
      await user.updateBooking(id, bookingToDB);
    }
    if (deleted !== undefined) {
      await user.deleteBooking(deleted)
    }
    fetchBooking()
    return { booking };
  }

  return (
    <Paper className={classes.calendarContainer}>
      <Scheduler
        data={booking}
        height='100%'
      >
        <ViewState
          defaultCurrentDate={Date.now()}
        />

        <EditingState
          onCommitChanges={commitChanges}

          addedAppointment={addedAppointment}
          onAddedAppointmentChange={(addedAppointment) => setAddedAppointment(addedAppointment)}

          appointmentChanges={appointmentChanges}
          onAppointmentChangesChange={(appointmentChanges) => setAppointmentChanges(appointmentChanges)}

          editingAppointment={editingAppointment}
          onEditingAppointmentChange={(editingAppointment) => setEditingAppointment(editingAppointment)}
        />

        <MonthView />
        <Toolbar />
        <DateNavigator />
        <TodayButton />
        <EditRecurrenceMenu />
        <ConfirmationDialog />
        <Appointments
          appointmentComponent={BookingAppointment}
        />
        <AppointmentTooltip
          showOpenButton
          showDeleteButton
        />
        <AppointmentForm
          basicLayoutComponent={BookingForm}
          textEditorComponent={TextEditor}
          messages={{ moreInformationLabel: '' }}
        />
      </Scheduler>
    </Paper>
  )
}))
export default Calendar