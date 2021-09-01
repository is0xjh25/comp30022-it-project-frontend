import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Title } from '@material-ui/icons';

// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//     },
//     paper: {
//       padding: theme.spacing(2),
//       textAlign: 'center',
//       color: theme.palette.text.secondary,
//     },
//   }));

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
        },
    },
}));

export default function Org() {
    
    const classes = useStyles();

    return (

    //     <Typography component="h2" variant="h6" color="text.primary">
    //         My Orgnizations
    //     </Typography>
  

    <div className={classes.root}>
        <Typography component="h2" color="text.primary">
            My Orgnizations
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Box className={classes.org} bgcolor="success.main" color="white">
                    <Button color="white" p={2}>
                        Unimelb
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box className={classes.org} bgcolor="info.main">
                    <Button color="white" p={4}>
                        Organization 2
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box className={classes.org} bgcolor="info.main">
                    <Button color="white" p={4}>
                        Organization 3
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box className={classes.org} bgcolor="text.disabled">
                    <Button color="white" p={4}>
                        Find Orgnizations
                    </Button>
                </Box>
            </Grid>
        </Grid>
        </div>
    );
}
