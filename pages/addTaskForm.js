import React from 'react'
import {useState, useEffect} from 'react';
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
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';


const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
    maxWidth: 800,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export default function AddTaskForm(props) {
   const classes = useStyles();

  const {taskList} = props.project;

  const [newTask, setNewTask] = useState({id:1, taskName:'', taskTotalHours:'',projectId:'4321',taskDescription:''});

  const handleFieldChange = (event) => {
     const alphanumeric = /^[0-9a-zA-Z\s]+$|^$/
     const values = {...newTask};

     if (event.target.name === "taskName" && alphanumeric.test(event.target.value)) {
          values.taskName=event.target.value
     }else
     if (event.target.name === "totalHours") {
          values.taskTotalHours=event.target.value
     }else
     if (event.target.name === "taskDescription" && alphanumeric.test(event.target.value)) {
          values.taskDescription=event.target.value
     }
     setNewTask(values);
   };



    const handleAddTask = () => {
      const values = [...taskList];
      values.push(newTask);
      const updatedProject = {...props.project, taskList: values}
      props.updateFunction(updatedProject)
    };



    const handleRemoveTask = index => {
      const values = [...taskList]; // cloning an array
      values.splice(index, 1);
      //setTasks(values); // setTasks is asynchronous !!! and it doesn't take effect
      const updatedProject = {...props.project, taskList: values}
      props.updateFunction(updatedProject)
    };

{/*
    const handleSubmit = e => {
      e.preventDefault();
      console.log("TASKS: ", JSON.stringify(tasks, null, 2));
    };
*/}
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
                  inputProps={{autoComplete:'off'}}
                  value={newTask.taskName}
                  onChange={event => handleFieldChange(event)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="id"
                  name="id"
                  label="Task ID"
                  value={newTask.id}
                  disabled
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="totalHours"
                  name="totalHours"
                  label="Total Hours"
                  inputProps={{autoComplete:'off'}}
                  value={newTask.taskTotalHours}
                  onChange={event => handleFieldChange(event)}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  id="projectId"
                  name="projectId"
                  label="Project ID"
                  value={newTask.projectId}
                  fullWidth
                  disabled
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  id="taskDescription"
                  name="taskDescription"
                  label="Task description"
                  inputProps={{autoComplete:'off'}}
                  value={newTask.taskDescription}
                  onChange={event => handleFieldChange(event)}
                  fullWidth
                />
              </Grid>
              <Grid container justify="flex-end">
                   <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleAddTask()}>
                        Add Task
                   </Button>
              </Grid>
            </Grid>
         </div>
         {taskList.length > 0 &&
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
                  <TableCell/>
                </TableRow>
              </TableHead>
              <TableBody>
                {taskList.map((task, index) => (
                  <TableRow key={`${task}~${index}`}>
                    <TableCell component="th" scope="row">
                      {task.id}
                    </TableCell>
                    <TableCell align="right">{task.taskName}</TableCell>
                    <TableCell align="right">{task.taskTotalHours}</TableCell>
                    <TableCell align="right">{task.projectId}</TableCell>
                    <TableCell align="right">{task.taskDescription}</TableCell>
                    <TableCell align="right">
                          <Button
                            variant="contained"
                            color="secondary"
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                            size="small"
                            onClick={() => handleRemoveTask(index)}
                          >
                            Delete
                          </Button>
                    </TableCell>
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