import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { NavLink } from 'react-router-dom';

const useStyles = {
  footer: {
    padding: '64px', 
    backgroundColor: '#FBD38D', 
    color: '#ffffff',
  },
  footerTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  link: {
    display: 'block',
    color: '#ffffff',
    textDecoration: 'none',
    marginBottom: '8px',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
  socialIcon: {
    marginRight: '16px',
    color: '#ffffff',
  },
};

const Footer = () => {
  return (
    <footer style={useStyles.footer}>
      <Container>
        <Grid container spacing={3} alignItems="left">
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" align="right">
              <span className="px-4 text-3xl font-semibold text-orange-600">
                purr<span className="text-gray-600">fect </span>
                <span className="font-normal text-xs md:text-sm"> Adoption Hub</span>
              </span>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
