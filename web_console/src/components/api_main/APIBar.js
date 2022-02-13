import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {useToken, getUserName, logout, getUserInfo} from '../../user/user'
import {useHistory} from "react-router-dom";

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

function ButtonAppBar(props) {

    const {classes,webSiteName} = props
    const history = useHistory()
    const token = getUserInfo().token

    const loginOrReg = () => {
        if (token) {
            return <div><Button onClick={async () => {
                await logout()
                history.push("/api")
            }} color="inherit">Logout</Button>{getUserName()}</div>
        }
        return <div><Button onClick={() => {
            history.push("/api/view?action=userLogin")
        }} color="inherit">Login</Button>
            <Button onClick={() => {
                history.push("/api/view?action=userReg")
            }} color="inherit">Register</Button>
        </div>
    }

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon/>
                    </IconButton>

                    <Typography>
                        <Button onClick={() => {
                            history.push("/")
                        }} className={classes.menuButton} color="inherit" aria-label="Menu">Home</Button>
                    </Typography>

                    <Typography>
                        <Button onClick={() => {
                            history.push("/api")
                        }} className={classes.menuButton} color="inherit" aria-label="Menu">API Chain</Button>
                    </Typography>

                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        {webSiteName}
                    </Typography>
                    {
                        loginOrReg()
                    }

                </Toolbar>
            </AppBar>
        </div>
    );
}

ButtonAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);