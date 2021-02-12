import React from 'react'
import TextField from '@material-ui/core/TextField';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Layout from "../components/Layout";

export default function Settings() {
   return (
   <Layout>
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
   </Layout>
   )
}