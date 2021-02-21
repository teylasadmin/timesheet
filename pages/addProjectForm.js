import React from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

export default function AddProjectForm() {
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
                fullWidth
              />
            </Grid>
           <Grid item xs={12}>
             <TextField
               id="projectOwner"
               name="projectOwner"
               label="Project Owner"
               fullWidth
             />
           </Grid>
           <Grid item xs={12} sm={6}>
             <TextField
               required
               id="projectStartDate"
               name="projectStartDate"
               label="Project Start Date"
               fullWidth
             />
           </Grid>
           <Grid item xs={12} sm={6}>
             <TextField
               required
               id="projectEndDate"
               name="projectEndDate"
               label="Project End Date"
               fullWidth
             />
           </Grid>

            <Grid item xs={12}>
              <TextField
                required
                id="tags"
                name="tags"
                label="Tags"
                fullWidth
              />
            </Grid>
         </Grid>
      </div>
      </div>
   )
}