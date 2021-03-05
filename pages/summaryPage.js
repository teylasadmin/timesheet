import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import ChipInput from 'material-ui-chip-input'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Chip from '@material-ui/core/Chip';
import * as moment  from 'moment';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'left',
    flexWrap: 'wrap',
    listStyle: 'none',
    padding: theme.spacing(0.5),
    margin: 0,
    backgroundColor:"lightgrey"
  },
  chip: {
    margin: theme.spacing(0.5),
  },
}));


export default function SummaryPage(props) {
  const classes = useStyles();

   return (
   <div style={{ width: '100%' }}>
      <div style={{'maxWidth':'50%','margin': 'auto'}}>
         <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                required
                label="Project Name"
                variant="filled"
                disabled
                value={props.project.projectName}
                fullWidth
              />
            </Grid>
           <Grid item xs={12}>
             <TextField
               label="Project Owner"
               value={props.project.projectOwner}
               disabled
               variant="filled"
               fullWidth
             />
           </Grid>
           <Grid item xs={12} sm={6}>
                <TextField
                  label="Project Start Date"
                  value={moment(props.project.projectStartDate).format('D/MM/YYYY')}
                  disabled
                  variant="filled"
                  fullWidth
                />

           </Grid>
           <Grid item xs={12} sm={6}>
                <TextField
                  label="Project End Date"
                  value={moment(props.project.projectEndDate).format('D/MM/YYYY')}
                  disabled
                  variant="filled"
                  fullWidth
                />
           </Grid>
            <Grid item xs={12}>
               <Paper component="ul"  className={classes.root}>
                {props.project.tags.map((tag, index) => {
                         return (<li key={index}>
                            <Chip
                              label={tag}
                              disabled
                              color="primary"
                              className={classes.chip}
                            />
                          </li>)
                  })}
                </Paper>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                label="Project description"
                value={props.project.projectDescription}
                disabled
                variant="filled"
                fullWidth
              />
            </Grid>
         </Grid>
      </div>
               {props.project.taskList.length > 0 &&
               <div   style={{'maxWidth':'70%','margin': 'auto', 'marginTop':'50px'}}>
                 <Grid container spacing={3}>
                  <Table aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell>Task ID</TableCell>
                        <TableCell align="right">Task Name</TableCell>
                        <TableCell align="right">Total Hours</TableCell>
                        <TableCell align="right">Project ID</TableCell>
                        <TableCell align="right">Task description</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {props.project.taskList.map((task, index) => (
                        <TableRow key={`${task}~${index}`}>
                          <TableCell component="th" scope="row">
                            {task.id}
                          </TableCell>
                          <TableCell align="right">{task.taskName}</TableCell>
                          <TableCell align="right">{task.taskTotalHours}</TableCell>
                          <TableCell align="right">{task.projectId}</TableCell>
                          <TableCell align="right">{task.taskDescription}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                  </Grid>
               </div>
               }
      </div>
   )
}