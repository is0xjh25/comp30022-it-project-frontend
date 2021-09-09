import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import Box from '@material-ui/core/Box';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    palette: {
        background: {
          default: '#757ce8'
        }
      },
    typography: {
        button: {
            textTransform: 'none'
        },
    },

    topic: {
        marginTop: theme.spacing(5),
        marginLeft: theme.spacing(20),
        display: 'flex',
        // border: 10,
        // alignItems: 'space-around',
        justifyContent: 'flex-start',
        component: "h1",
        color: "primary.main",
    },

    // 一个box的class，规定box css
    // 三个不同颜色的css
    manageGrid: {
        alignItems: 'flex-start',
        direction: 'column',
        justifyContent: 'space-around',
        warp: 'nowrap',
        // color: 'rgb(255, 255, 0)',
        border: 5,
        borderRadius: 5,
        bgcolor: 'background.paper',
        borderColor: 'text.primary',
        m: 1,
        // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
        padding: '30px',
    },
    ownBox: {
        // marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 60,
        border: 4,
        borderRadius: 8,
        boxShadow: '0 5px 5px 2px rgba(105, 105, 105, .3)',
        // m: 1,
        // borderColor: 'text.primary',
        // alignItems: 'center',
        color: theme.palette.success.main,
    },
    memberBox: {
        display: 'flex',
        flexDirection: 'rous',
        justifyContent: 'center',
        height: 60,
        border: 4,
        borderRadius: 8,
        boxShadow: '0 5px 5px 2px rgba(105, 105, 105, .3)',
        // alignSelf: strentch,
        // color: theme.palette.info.main,
    },
    plusBox: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 60,
        border: 4,
        borderRadius: 8,
        boxShadow: '0 5px 5px 2px rgba(105, 105, 105, .3)',
        // alignItems: 'center',
        // color: theme.palette.success.main,
    },
}));

export default function Department() {
    // read in the user's organisation info from backend api

    const [loading, setLoading] = useState(true);
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        // fetch(url)
        //     .then(response => response.json())
        //     .then(json => console.log(json))

        // make up some fake data for testing
        const data = [
            {
                "department_id": 1,
                "name": "Department of Informatics",
                "owner_id": 100,
                "ownership": "own"
            },
            {
                "department_id": 2,
                "name": "Department of Digimon",
                "owner_id": 100,
                "ownership": "own"
            },
            {
                "department_id": 3,
                "name": "Department of Room Service",
                "owner_id": 200,
                "ownership": "member"
            },
            {
                "department_id": 4,
                "name": "Department of Department",
                "owner_id": 300,
                "ownership": "member"
            }
        ]
        return () => {
            // setLoading(false);
            setDepartments(data);
        }
    }, [loading])
    

    // identify organisation data from json
    // create different boxes for different authority levels
    // boxes has link buttons directs to department pages
 
        
    const classes = useStyles();

    // console.log(this.state.loading);
    // console.log(this.state.organisations);

    const testButton = <div>
            <Button onClick = {() => setLoading(false)}>test</Button>
        </div>;

    if (loading) {
        return <div>loading...
        {testButton}
        </div>
    }

    // if (departments.length()==0) {
    //     return <div>No valid department</div>
    // }

    
    const output = [];
    departments.map((department) => {
        output.push(
            department.ownership === "own" ? 
                <Grid item alignItems={'center'} xs={8}>
                    <Box className={classes.ownBox} bgcolor="success.main">
                        <Button alignItems='center'>
                            {department.name}
                        </Button>

                        <IconButton aria-label="personOutlined">
                            <PersonOutlineOutlinedIcon />
                        </IconButton>
                        
                        <IconButton aria-label="delete">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Grid>
            :
                <Grid item alignItems="center" xs={8}>
                    <Box className={classes.memberBox} bgcolor="info.main">
                        <Button>
                            {department.name}
                        </Button>
                    </Box>
                </Grid>
        )
        
    });

    return (
        <div>
            <Typography className={classes.topic}>
                My Departments
            </Typography>
            <Grid className={classes.manageGrid} container spacing={5}>
                {output}
                <Grid item xs={8}>
                    <Box className={classes.plusBox} bgcolor="text.disabled">
                        <Button>
                            +
                        </Button>
                    </Box>
                </Grid>
            </Grid>
        </div>
    )
}
