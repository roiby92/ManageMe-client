import { inject, observer } from 'mobx-react'
import React from 'react'
import { AppointmentForm } from '@devexpress/dx-react-scheduler-material-ui';
import { MenuItem } from '@material-ui/core'

const PropertiesDropDown = inject('user')(observer((props) => {
  const { properties } = props.user
  const { onCustomFieldChange } = props
  const { appointmentData } = props

  return (
    <AppointmentForm.TextEditor
      value={appointmentData.property}
      select
      name="property"
      key="property"
      onChange={onCustomFieldChange}
      placeholder="Property"
    >
      {properties.map(p => {
        return (<MenuItem key={p.id} value={p.id}>
          {p.name}
        </MenuItem>)
      })}
    </AppointmentForm.TextEditor>
  )
}))

export default PropertiesDropDown