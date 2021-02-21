import React from 'react'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

export default function AddTaskForm() {
   const classes = useStyles();
   return (
      <div style={{ width: '100%' }}>
         <div style={{'maxWidth':'50%','margin': 'auto'}}>
            <Grid container spacing={3}>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="taskName"
                  name="taskName"
                  label="Task Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="taskId"
                  name="taskId"
                  label="Task ID"
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="totalHours"
                  name="totalHours"
                  label="Total Hours"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="projectId"
                  name="projectId"
                  label="Project ID"
                  fullWidth
                />
              </Grid>
            </Grid>
         </div>
         {/*<div  className={classes.table}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Task Name</TableCell>
                  <TableCell align="right">Task ID</TableCell>
                  <TableCell align="right">Total Hours</TableCell>
                  <TableCell align="right">Project ID</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.name}>
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.calories}</TableCell>
                    <TableCell align="right">{row.fat}</TableCell>
                    <TableCell align="right">{row.carbs}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
         </div>*/}
         </div>
   )
}