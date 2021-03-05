import React from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import DateFnsUtils from '@date-io/date-fns';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import ChipInput from 'material-ui-chip-input'

export default function AddProjectForm(props) {

   const handleFieldChange = (event) => {
      const alphanumeric = /^[0-9a-zA-Z\s]+$|^$/
      const proj = {...props.project}
      if (event.target.name === "projectName" && alphanumeric.test(event.target.value)) {
           proj.projectName=event.target.value
      }else
      if (event.target.name === "tags") {
           proj.tags=event.target.value
      }else
      if (event.target.name === "projectDescription" && alphanumeric.test(event.target.value)) {
           proj.projectDescription=event.target.value
      }
      props.updateFunction(proj)
    };

    const handleFromDateChange=(date) => {
        const proj = {...props.project}
        proj.projectStartDate=date
        props.updateFunction(proj)
    }

    const handleToDateChange=(date) => {
        const proj = {...props.project}
        proj.projectEndDate=date
        props.updateFunction(proj)
    }

    const handleTagsChange=(tags) => {
        const proj = {...props.project}
        proj.tags=tags
        props.updateFunction(proj)
    }

   return (
   <div style={{ width: '100%' }}>
      <div style={{'maxWidth':'50%','margin': 'auto'}}>
         <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                id="projectName"
                name="projectName"
                label="Project Name"
                value={props.project.projectName}
                onChange={event => handleFieldChange(event)}
                fullWidth
              />
            </Grid>
           <Grid item xs={12}>
             <TextField
               id="projectOwner"
               name="projectOwner"
               label="Project Owner"
               value={props.project.projectOwner}
               onChange={event => handleFieldChange(event)}
               fullWidth
             />
           </Grid>
           <MuiPickersUtilsProvider utils={DateFnsUtils}>
               <Grid item xs={12} sm={6}>
                <KeyboardDatePicker
                  required
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="projectStartDate"
                  label="Project Start Date"
                  value={props.project.projectStartDate}
                  onChange={date => handleFromDateChange(date)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  minDate="02.01.2020"
                  fullWidth
                />
               </Grid>

               <Grid item xs={12} sm={6}>
                <KeyboardDatePicker
                  required
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="projectEndDate"
                  label="Project End Date"
                  value={props.project.projectEndDate}
                  onChange={date => handleToDateChange(date)}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                  minDate="02.01.2020"
                  fullWidth
                />
               </Grid>
           </MuiPickersUtilsProvider>
            <Grid item xs={12}>
                <ChipInput
                    id="tags"
                    name="tags"
                    label="Tags"
                    fullWidth
                    defaultValue={[]}
                    onChange={(chips) => handleTagsChange(chips)}
                />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                id="projectDescription"
                name="projectDescription"
                label="Project description"
                value={props.projectDescription}
                onChange={event => handleFieldChange(event)}
                fullWidth
              />
            </Grid>
         </Grid>
      </div>
      </div>
   )
}