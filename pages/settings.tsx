import React from 'react'
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import Layout from "../components/Layout";
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddProjectForm from './addProjectForm';
import AddTaskForm from './addTaskForm';
import SummaryPage from './summaryPage';



const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
    marginTop:'50px'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
   // marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1)
  },
}));

const steps = ['Add Project', 'Add Tasks', 'Review project'];

function getStepContent(step, project, updateFunction) {
  switch (step) {
    case 0:
      return <AddProjectForm project={project} updateFunction={updateFunction}/>;
    case 1:
      return <AddTaskForm project={project}  updateFunction={updateFunction}/>;
    case 2:
      return <SummaryPage project={project}/>;
    default:
      throw new Error('Unknown step');
  }
}

export default function Settings() {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep(activeStep + 1);
    console.log(JSON.stringify(project, null, 2))
  };

  const handleSaveProject = async event => {
     event.preventDefault()
    debugger;
     const res = await fetch('http://localhost:3000/api/projects', {
       method: 'post',
       headers: {
         'Content-Type': 'application/json',
       },
       body: JSON.stringify(project)
     }).catch((error) => {
                console.log(error)
             });

     console.log(res)
   }

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  const [project, setProject] = React.useState({projectName:'',
                                                projectOwner:'Michal Stachurski',
                                                projectStartDate:new Date(),
                                                projectEndDate:new Date(),
                                                tags:[],
                                                projectDescription:'',
                                                taskList:[]});

  return (
    <Layout>
      <CssBaseline />
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Add Project & Tasks forms
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <div>
            {activeStep === steps.length ? (
              <>
                <Typography variant="h5" gutterBottom>
                  Your project has been created.
                </Typography>
                <Typography variant="subtitle1">
                  Your project number is #2001539. Now you can assign resources to the project.
                </Typography>
              </>
            ) : (
              <>
                {getStepContent(activeStep, project, setProject)}
                <div className={classes.buttons} style={{padding:'10px', marginTop:'10px'}}>
                  {activeStep !== 0 && (
                    <Button variant="contained" onClick={handleBack} className={classes.button} >
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={activeStep === steps.length - 1 ? handleSaveProject : handleNext}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Save project' : 'Next'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </Paper>
    </Layout>
  );
}
