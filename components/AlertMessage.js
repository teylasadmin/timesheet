/*
import { NextPage } from 'next'

interface Props {
  userAgent?: string;
}

const AlertMessage: NextPage<Props> = ({ userAgent }) => (
  <main>Your user agent: {userAgent}</main>
)

AlertMessage.getInitialProps = async ({ req }) => {
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent
  return { userAgent }
}

export default AlertMessage*/
import React from 'react'
import Alert from '@material-ui/lab/Alert';

export default function AlertMessage(props) {
   const showAlert = props.display
   if(showAlert) {
      return (<Alert onClose={() => {}} severity={props.severity}>{props.message}</Alert>);
   } else return null;
}
