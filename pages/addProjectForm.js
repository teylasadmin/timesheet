import React from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function AddProjectForm(props) {

   const handleFieldChange = (event) => {
      const proj = {...props.project}

      if (event.target.name === "projectName") {
           proj.projectName=event.target.value
      }else
      if (event.target.name === "projectStartDate") {
           proj.projectStartDate=event.target.value
      }else
      if (event.target.name === "projectEndDate") {
           proj.projectEndDate=event.target.value
      }else
      if (event.target.name === "tags") {
           proj.tags=event.target.value
      }
      props.updateFunction(proj)
    };

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
           <Grid item xs={12} sm={6}>
             <TextField
               required
               id="projectStartDate"
               name="projectStartDate"
               label="Project Start Date"
               value={props.project.projectStartDate}
               onChange={event => handleFieldChange(event)}
               fullWidth
             />
           </Grid>
           <Grid item xs={12} sm={6}>
             <TextField
               required
               id="projectEndDate"
               name="projectEndDate"
               label="Project End Date"
               value={props.project.projectEndDate}
               onChange={event => handleFieldChange(event)}
               fullWidth
             />
           </Grid>

            <Grid item xs={12}>
              <TextField
                required
                id="tags"
                name="tags"
                label="Tags"
                value={props.tags}
                onChange={event => handleFieldChange(event)}
                fullWidth
              />
            </Grid>
         </Grid>
      </div>
      </div>
   )
}