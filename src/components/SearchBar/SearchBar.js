import SearchBar from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles } from '@material-ui/core/styles';

import SearchIcon from '@material-ui/icons/Search';



const useStyles = makeStyles((theme) => ({
    searchBar: {
        background: 'rgba(136,90,248,0.2)'
    }
    
}))

export default function(props) {
    const {handleSearch} = props;
    const classes = useStyles();
    const onChange = (event) => {
        // console.log(event.target.value);
        handleSearch(event.target.value);
    }
    // const keyPress = function keyPress(e){
    //     if(e.keyCode == 13){
    //        console.log('value', e.target.value);
    //        handleSearch(e.target.value);
    //     }
    // }
    return (
        <SearchBar className={classes.searchBar} fullWidth 
        placeholder="Search for a member" 
        type="search" 
        variant="outlined"
        InputProps={{
            startAdornment: (
                <InputAdornment position="start">
                    <SearchIcon />
                </InputAdornment>
            ),
        }}
        onChange={onChange}
        // onKeyDown={keyPress}
        />
    );
}