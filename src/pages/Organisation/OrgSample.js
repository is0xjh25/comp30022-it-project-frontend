import { Button } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import PersonOutlineOutlinedIcon from '@material-ui/icons/PersonOutlineOutlined';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import './Organisation.css';

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
        component: "h2",
        color: "primary.main",
    },

    // 一个box的class，规定box css
    // 三个不同颜色的css
    orgGrid: {
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
        marginTop: theme.spacing(3),
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        height: 48,
        border: 4,
        borderRadius: 8,
        boxShadow: '0 5px 5px 2px rgba(105, 105, 105, .3)',
        // m: 1,
        // borderColor: 'text.primary',
        // alignItems: 'center',
        // color: theme.palette.success.main,
    },
    memberBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 48,
        border: 4,
        borderRadius: 8,
        boxShadow: '0 5px 5px 2px rgba(105, 105, 105, .3)',
        alignSelf: strentch,
        // color: theme.palette.info.main,
    },
    plusBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        height: 48,
        border: 4,
        borderRadius: 8,
        boxShadow: '0 5px 5px 2px rgba(105, 105, 105, .3)',
        // alignItems: 'center',
        // color: theme.palette.success.main,
    },
}));

export default function Org() {
    
    const classes = useStyles();

    return (

    <div className={classes}>
        <Typography className={classes.topic}>
            My Orgnizations
        </Typography>
        <Grid className={classes.orgGrid} container spacing={5}>
            <Grid item alignItems={'center'} xs={8}>
                <Box className={classes.ownBox} bgcolor="success.main">
                    <Button alignItems='center'>
                        The University of Melbourne
                    </Button>

                    <IconButton aria-label="personOutlined">
                        <PersonOutlineOutlinedIcon />
                    </IconButton>
                    
                    <IconButton aria-label="delete">
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </Grid>
            <Grid item alignItems="center" xs={8}>
                <Box className={classes.memberBox} bgcolor="info.main">
                    <Button>
                        Organization 2
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={8}>
                <Box className={classes.memberBox} bgcolor="info.main">
                    <Button>
                        Organization 3
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={8}>
                <Box className={classes.plusBox} bgcolor="text.disabled">
                    <Button>
                        +
                    </Button>
                </Box>
            </Grid>
        </Grid>
        </div>
    );
}
