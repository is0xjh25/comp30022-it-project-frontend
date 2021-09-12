import SearchBar from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { ThemeProvider, makeStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';



const useStyles = makeStyles((theme) => ({
    searchBar: {
        background: 'rgba(136,90,248,0.2)'
    }
    
}))

export default function MySearchBar() {
    const classes = useStyles();
    const onSubmit = (event) => {
        console.log(event)
    }
    return (
        <SearchBar className={classes.searchBar} fullWidth 
        placeholder="Search for a member" type="search" 
        variant="outlined" InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            )
        }}
        onChange={onSubmit}
        />
    );
}