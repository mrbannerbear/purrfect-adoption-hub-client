import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

const useStyles = {
  footer: {
    padding: '64px',
    backgroundColor: '#FDE3C8', 
    color: '#ffffff',
  },
  footerTitle: {
    fontSize: '1.2rem',
    fontWeight: 'bold',
    marginBottom: '16px',
  },
  linkContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  link: {
    color: '#7C7C7C', 
    textDecoration: 'none',
    marginRight: '16px',
    '&:hover': {
      textDecoration: 'underline',
    },
  },
};

const Footer = () => {
  return (
    <footer style={useStyles.footer}>
      <Container>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} sm={6}>
            <Typography variant="body2">
              <span className="px-4 text-3xl font-semibold text-orange-600">
                purr<span className="text-gray-600">fect </span>
                <span className="font-normal text-xs md:text-sm"> Adoption Hub</span>
              </span>
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="body2" align="right" style={useStyles.linkContainer}>
              <Link href="#" style={useStyles.link}>Careers</Link>
              <Link href="#" style={useStyles.link}>Legal</Link>
              <Link href="#" style={useStyles.link}>About</Link>
              <Link href="#" style={useStyles.link}>Socials</Link>
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export default Footer;
