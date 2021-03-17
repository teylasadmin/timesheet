import React from 'react'
import {useState, useEffect} from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import fetch from 'isomorphic-unfetch';
import useSWR from 'swr'

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'taskName', headerName: 'Task name', width: 200 },
  { field: 'projectName', headerName: 'Project name', width: 200 },
  {
    field: 'taskDescription',
    headerName: 'Task description',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 260,
  },
  {
    field: 'taskHourAllowance',
    headerName: 'Task hour allowance',
    type: 'number',
    width: 90,
  },
];
const handleSelectTask = () => {

}
/*

const rows = [
  { id: 1, taskName: 'UI development', projectName: 'Timesheeet React Project', taskDescription: 'Development Front-end', taskHourAllowance: 35 },
  { id: 2, taskName: 'Back-end development', projectName: 'Timesheeet React Project', taskDescription: 'Development Back-end in Java', taskHourAllowance: 42 },
  { id: 3, taskName: 'Prod support', projectName: 'Timesheeet React Project', taskDescription: 'Nightly PROD support', taskHourAllowance: 45 },
  { id: 4, taskName: 'Dev Ops', projectName: 'Timesheeet React Project', taskDescription: 'Project Deployment and Build', taskHourAllowance: 16 },
  { id: 5, taskName: 'Holiday', projectName: 'Miscellaneous', taskDescription: 'Time Off', taskHourAllowance: 16 },
  { id: 6, taskName: 'Training', projectName: 'Miscellaneous', taskDescription: 'Training', taskHourAllowance: 16 },
];
*/

async function getProjectTasks(...args) {
  console.log(...args);
  const[url, projectId] = args;
  const res = await fetch(`${url}?id=${projectId}`);
  return res.json();
}

export default function TaskSelect(props) {

  const [selectedTasks, setSelectedTasks] = useState([]);

  const handleRowSelection = (e) => {
    // remove it if it's already present - this means the user unchecked it
    if (selectedTasks.map(i=>i.id).includes(e.data.id)){
      for(var i = 0; i < selectedTasks.length; i++){
        if (selectedTasks[i].id === e.data.id){
          selectedTasks.splice(i, 1);
        }
      }
    } else {
      // user clicked it - add it to the list of rows to keep.
      selectedTasks.push(e.data);
    }
    console.log("Tasks to add: " + selectedTasks);
    console.log("Tasks JSONs: "+ JSON.stringify(selectedTasks, null, 2));
    //setDeletedRows([...deletedRows, ...rows.filter((r) => r.id === e.data.id)]);
    //console.log("All rows: " + rows);
  };

  const handleRowsSelection = (newSelection) => {

    setSelectedTasks([]);
    newSelection.rowIds.map(t=> rows.filter(r => r.id==t));
    setSelectedTasks(newSelection);

    console.log("Tasks ALl to add: " + selectedTasks);
    console.log("All Tasks JSONs: "+ JSON.stringify(selectedTasks, null, 2));
    //setDeletedRows([...deletedRows, ...rows.filter((r) => r.id === e.data.id)]);
    //console.log("All rows: " + rows);
  };

  const handleSelectTask = () => {
    props.selectedTasks(selectedTasks);
    props.closeModalCallback();
  }
/*
     async function getInitialProps(ctx) {
      console.log("About to read tasks from mongo")
      const res = await fetch("http://localhost:3000/api/projects?id=604f69876dd713535c416f83");
      const json = await res.json();
      return { rows: json.taskList }
    }*/
  const { data, error } = useSWR(['/api/projects','604f69876dd713535c416f83'], getProjectTasks)

  if (error) return <div>failed to load</div>
  if (!data) return <div>loading...</div>

    console.log("DATA from swr stringify: ",JSON.stringify(data.taskList))
    //console.log("DATA from swr: ", data.taskList)

    //console.log("DATA from swr: ", JSON.parse(data)) //JSON.parse(JSON.stringify(data)).taskList
    console.log("ERROR from swr: ", error)
    //console.log("DATA raw from swr: ", data.json())

  return (
    <div>
     <div style={{ height: 400, width: '100%' }}>
      <DataGrid
          rows={data.taskList}
          columns={columns}
          pageSize={6}
          checkboxSelection
 /*         onSelectionChange={(newSelection) => {
            console.log("SELECTION: ",newSelection.rowIds);
          }}*/
          //onSelectionChange={handleRowsSelection}
          onRowSelected={handleRowSelection}
      />
     </div>
     <span className="horizontal-line" />
      <Button variant="contained" color="primary" onClick={handleSelectTask}>
          Add Tasks
      </Button>
    </div>
  );
}


/*export async function getProjectTasks {
  console.log("About to read tasks from mongo")
  const res = await fetch("http://localhost:3000/api/projects?id=604f69876dd713535c416f83");
  const json = await res.json();
  return json.taskList;
}*/
/*export async function getServerSideProps() {
   console.log("Hello from the other side")
   return {
     props: {
        data: "Michal",
     }
   }
}*/

/*export async function getServerSideProps() {
  console.log("About to read tasks from mongo")
  const res = await fetch("http://localhost:3000/api/projects?id=604f69876dd713535c416f83");
  const json = await res.json();
  return {
    props: {
      data: json.taskList,
    },
  };
}*/
