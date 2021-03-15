import React from 'react'
import {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';


import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import TableContainer from '@material-ui/core/TableContainer';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import 'react-day-picker/lib/style.css';
import dateFnsFormat from 'date-fns/format';
import { getMonth, getDate, format, addDays,parseISO, startOfWeek } from 'date-fns';
import WeekSelection from './WeekSelection'
import TaskSelection from './TaskSelection'
import styles from './basicTable.module.css'

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});


export default function BasicTable() {
    const classes = useStyles();
    const [tasks, setTasks] = useState([
      {taskName:'Default', mo:'', tu:'', we:'', th:'', fr:'', sa:'', su:'', taskTotal: 0}
    ])

    const [weekDates, setWeekDates] = useState([]);
    const [totalHours, setTotalHours] = useState({total_mo:0, total_tu:0, total_we:0, total_th:0, total_fr:0, total_sa:0, total_su:0, grandTotal:0 })

    {
    /*
      set date as monday of the current week in a format yyyy/MM/dd
    */
    }
    const [dateSelected, setDateSelected] = useState(format(startOfWeek(new Date(), { weekStartsOn: 1 }),'yyyy/MM/dd'));
    const [tasksSelected, setTasksSelected] = useState([]);

    const handleAddTask = () => {
      const values = [...tasks];
      values.push({taskName:'Default', mo:'', tu:'', we:'', th:'', fr:'', sa:'', su:'', taskTotal: 0});
      setTasks(values);
    };

    const handleRemoveTask = index => {
      const values = [...tasks]; // cloning an array
      values.splice(index, 1);
      setTasks(values); // setTasks is asynchronous !!! and it doesn't take effect


      handleDayTotal('mo', values);
      handleDayTotal('tu', values);
      handleDayTotal('we', values);
      handleDayTotal('th', values);
      handleDayTotal('fr', values);
      handleDayTotal('sa', values);
      handleDayTotal('su', values);

      handleGrandTotal();

      console.log("Total hours per day : ", totalHours)
    };

/*    const handleSubmit = e => {
      e.preventDefault();
      console.log("TASKS: ", JSON.stringify(tasks, null, 2));
    };*/

      /**
        Good article about CORS: https://stackoverflow.com/questions/43871637/no-access-control-allow-origin-header-is-present-on-the-requested-resource-whe
      **/
      const handleSubmit = async event => {
        event.preventDefault()
        let data = {"weekStart":dateSelected, "data":tasks}
        const res = await fetch('http://localhost:3000/api/timesheets', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data)
        }).catch((error) => {
                   console.log(error)
                });

        console.log(res)
      }

    const calculateTotal = (numbers) => {
      return Object.entries(numbers).reduce((finalValue, [key, value]) => {
        if (value === "") {
          // if entered value is empty string "", omits it
          return finalValue;
        }
        return finalValue + parseInt(value);
      }, 0);
    }


    const handleTaskTotal = (e, index) => {
      let {taskName, taskTotal, ...numbers} = tasks[index];
      tasks[index].taskTotal = calculateTotal(numbers);
    }

    /**
       compute total hours per day
    **/
    const handleDayTotal = (day, newTasksArr) => {
       let dayValue = newTasksArr.map(task => (task[day])).reduce((finalValue, value) => {
                                                         if (value === "") {
                                                           // if entered value is empty string "", omits it
                                                           return finalValue;
                                                         }
                                                         return finalValue + parseInt(value);
                                                       }, 0);

       totalHours["total_"+day]  = dayValue
    }

    const handleGrandTotal = () => {
      let {grandTotal, ...totals} = totalHours
      totalHours.grandTotal = calculateTotal(totals);
    }

    const getDateLabel = (date) => {
      return format(date, 'EEEE dd/MM')
    }

    const handleTaskChange = (index, event) => {
      const re = /^[0-9]+$|^$/

      const values = [...tasks];
      if (event.target.name === "taskName") {
        values[index].taskName = event.target.value;
      } else
      if (event.target.name === "mo" && re.test(event.target.value)) {
        values[index].mo = event.target.value;
        handleDayTotal('mo', tasks)
      } else
      if (event.target.name === "tu" && re.test(event.target.value)) {
        values[index].tu = event.target.value;
        handleDayTotal('tu', tasks)
      } else
      if (event.target.name === "we" && re.test(event.target.value)) {
        values[index].we = event.target.value;
        handleDayTotal('we', tasks)
      } else
      if (event.target.name === "th" && re.test(event.target.value)) {
        values[index].th = event.target.value;
        handleDayTotal('th', tasks)
      } else
      if (event.target.name === "fr" && re.test(event.target.value)) {
        values[index].fr = event.target.value;
        handleDayTotal('fr', tasks)
      } else
      if (event.target.name === "sa" && re.test(event.target.value)) {
        values[index].sa = event.target.value;
        handleDayTotal('sa', tasks)
      } else
      if (event.target.name === "su" && re.test(event.target.value)) {
        values[index].su = event.target.value;
        handleDayTotal('su', tasks)
      }
      setTasks(values);
      handleTaskTotal(event, index);
      handleGrandTotal();
    };

    const callbackDateFunction = (dateRange) => {
          setDateSelected(dateRange)
    }

    const callbackTasksFunction = (pTasksSelected) => {
          setTasksSelected(pTasksSelected)
          pTasksSelected.map(stask => { // maybe useEffect should be used for that
            tasks.push({taskName: stask.taskName, mo:'', tu:'', we:'', th:'', fr:'', sa:'', su:'', taskTotal: 0});
          })
    }

  return (
  <form noValidate onSubmit={handleSubmit}>
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="simple table">

        <TableBody>
           <TableRow>
              <TableCell>
                <WeekSelection selectedDate={callbackDateFunction}/>
              </TableCell>
              <TableCell>
                <TaskSelection selectedTasks={callbackTasksFunction}/>
              </TableCell>
           </TableRow>
           {
              tasks.map((task, index) => (
                   <TableRow key={`${task}~${index}`} >
                      <TableCell component="th" scope="{task.taskName}">
                        <TextField id="taskName"
                                   name="taskName" // find an array of short names of week days
                                   label="Task name"
                                   inputProps={{className:'digitsOnly', disabled:'true'}}
                                    InputLabelProps={{
                                      shrink: true,
                                    }}
                                   value={task.taskName}
                                   placeholder="NA"

                        />
                      </TableCell>
                      <TableCell align="right">
                          <TextField id="mo"
                                     name="mo" // find an array of short names of week days
                                     label={getDateLabel(new Date(dateSelected))}
                                     inputProps={{className:'digitsOnly'}}
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                     value={task.mo}
                                     placeholder="0"
                                     onChange={event => handleTaskChange(index, event)}
                          />
                      </TableCell>
                      <TableCell align="right">
                         <TextField id="tu"
                                    name="tu"
                                    label={getDateLabel(addDays(new Date(dateSelected), 1))}
                                     InputLabelProps={{
                                       shrink: true,
                                     }}
                                    value={task.tu}
                                    placeholder="0"
                                    onChange={event => handleTaskChange(index, event)}
                         />
                       </TableCell>
                      <TableCell align="right">
                          <TextField id="we"
                                      name="we"
                                      label={getDateLabel(addDays(new Date(dateSelected), 2))}
                                       InputLabelProps={{
                                         shrink: true,
                                       }}
                                      value={task.we}
                                      placeholder="0"
                                      onChange={event => handleTaskChange(index, event)}
                          />
                      </TableCell>
                      <TableCell align="right">
                          <TextField id="th"
                                     name="th"
                                     label={getDateLabel(addDays(new Date(dateSelected), 3))}
                                      InputLabelProps={{
                                        shrink: true,
                                      }}
                                     value={task.th}
                                     placeholder="0"
                                     onChange={event => handleTaskChange(index, event)}
                          />
                      </TableCell>
                      <TableCell align="right">
                           <TextField id="fr"
                                      name="fr"
                                      label={getDateLabel(addDays(new Date(dateSelected), 4))}
                                       InputLabelProps={{
                                         shrink: true,
                                       }}
                                      value={task.fr}
                                      placeholder="0"
                                      onChange={event => handleTaskChange(index, event)}
                           />
                      </TableCell>
                      <TableCell align="right">
                           <TextField id="sa"
                                      name="sa"
                                      label={getDateLabel(addDays(new Date(dateSelected), 5))}
                                       InputLabelProps={{
                                         shrink: true,
                                       }}
                                      value={task.sa}
                                      placeholder="0"
                                      onChange={event => handleTaskChange(index, event)}
                           />
                      </TableCell>
                      <TableCell align="right">
                           <TextField id="su"
                                      name="su"
                                      label={getDateLabel(addDays(new Date(dateSelected), 6))}
                                       InputLabelProps={{
                                         shrink: true,
                                       }}
                                      value={task.su}
                                      placeholder="0"
                                      onChange={event => handleTaskChange(index, event)}
                           />
                      </TableCell>
                      <TableCell align="right"><h3><span className="badge badge-secondary">{task.taskTotal}</span></h3></TableCell>
                      <TableCell align="right"><Button type="button"
                                                       disabled={tasks.length===1}
                                                       variant="contained"
                                                       color="secondary"
                                                       size="small"
                                                       startIcon={<DeleteIcon />}
                                                       onClick={() => handleRemoveTask(index)}>Delete</Button>
                      </TableCell>
                   </TableRow>
              ))



           }

          <TableRow>
              <TableCell/>
              <TableCell align="right"><h3><span className="badge badge-secondary">{totalHours.total_mo}</span></h3></TableCell>
              <TableCell align="right"><h3><span className="badge badge-secondary">{totalHours.total_tu}</span></h3></TableCell>
              <TableCell align="right"><h3><span className="badge badge-secondary">{totalHours.total_we}</span></h3></TableCell>
              <TableCell align="right"><h3><span className="badge badge-secondary">{totalHours.total_th}</span></h3></TableCell>
              <TableCell align="right"><h3><span className="badge badge-secondary">{totalHours.total_fr}</span></h3></TableCell>
              <TableCell align="right"><h3><span className="badge badge-secondary">{totalHours.total_sa}</span></h3></TableCell>
              <TableCell align="right"><h3><span className="badge badge-secondary">{totalHours.total_su}</span></h3></TableCell>
              <TableCell align="right"><h3><span className="badge badge-primary">{totalHours.grandTotal}</span></h3></TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Button type="submit" size="small" variant="contained" color="primary">Submit</Button>
      {/*<button type="button" className="btn btn-lg btn-success" onClick={() => handleAddTask()}>Add Task</button>*/}
    </TableContainer>
{/*            <pre>
              {JSON.stringify(tasks, null, 2)}
            </pre>*/}
   </form>
  );
}
