import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Warning from '../Warning'

export class AutoGenForm {
    
    constructor(props) {                
        this.action = props.action
        this.forms = []
        this.elements = []
        this.instances = []
        this.submit = props.submit
    }

    useStyles = ()=> makeStyles(theme => ({
        paper: {
          marginTop: theme.spacing(8),
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        },
        avatar: {
          margin: theme.spacing(1),
          backgroundColor: theme.palette.secondary.main,
        },
        form: {
          width: '100%', // Fix IE 11 issue.
          marginTop: theme.spacing(1),
        },
        submit: {
          margin: theme.spacing(3, 0, 2),
        },
      }));

    push(item){
        this.elements.push(item)
    }

    pushInstance(item){
      this.instances.push(item)
    }

    build() {
        const classes = this.useStyles();
    
    return (
        
      <Container component="main" maxWidth="xs" ref={(item)=>this.containerRef = item}>
        <CssBaseline />
        <div>
            <Warning ref={(item)=>{this.warningRef = item}}></Warning>
        </div>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {this.action}
          </Typography>          
          <form className={classes.form} noValidate>
            {this.elements}
            
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={this.submit}
            >
              Commit
            </Button>            
          </form>
        </div>        
      </Container>
    );
    }
}