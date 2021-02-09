import React from 'react'
import TextField from '@material-ui/core/TextField';

export default function Settings() {



   return (
    <form onSubmit="" noValidate>
              <TextField id="mo"
                         name="project_name" // find an array of short names of week days
                         label="Project Name"
                          InputLabelProps={{
                            shrink: true,
                          }}

                         placeholder="Project Name"
              />

   </form>
   )
}