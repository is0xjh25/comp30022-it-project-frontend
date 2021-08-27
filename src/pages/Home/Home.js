import Button from '@material-ui/core/Button';

import {Link} from 'react-router-dom';


function Home() {
  return (
    <div>
      <p>
        Hello World!
      </p>
      <p>
        This is the homepage.
      </p>
      <Link to='/swagger'>
        <Button variant='contained' color='primary'>
          API for backend
        </Button>
      </Link>
        
    </div>
  );
}

export default Home;
