import {
    TextField as SearchBar,
    InputAdornment
} from '@mui/material';
import SearchIcon from '@material-ui/icons/Search';

import { useSnackbar } from 'notistack';

export default function(props) {
    
    const { enqueueSnackbar } = useSnackbar();
    const {handleSearch} = props;
    const onChange = (event) => {
        handleSearch(event.target.value);
    }

    return (
        <SearchBar fullWidth 
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
        sx={{
            bgcolor: 'rgba(136,90,248,0.2)'
        }}
        />
    );
}