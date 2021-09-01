import { Button } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import './Organisation.css';

const useStyles = makeStyles((theme) => ({
    typography: {
        button: {
            textTransform: 'none'
        },
    },

}));

export default function Org() {
    
    const classes = useStyles();

    return (

    <div className={classes.root}>
        <Typography component="h2" color="text.primary">
            My Orgnizations
        </Typography>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Box className={classes.root} bgcolor="success.light">
                    <Button>
                        The University of Melbourne
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box className={classes.root} bgcolor="info.main">
                    <Button>
                        Organization 2
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box className={classes.org} bgcolor="info.main">
                    <Button>
                        Organization 3
                    </Button>
                </Box>
            </Grid>
            <Grid item xs={12}>
                <Box className={classes.org} bgcolor="text.disabled">
                    <Button>
                        +
                    </Button>
                </Box>
            </Grid>
        </Grid>
        </div>
    );
}
