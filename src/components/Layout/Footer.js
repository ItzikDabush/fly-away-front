import React from "react";
import { withStyles } from "@material-ui/core/styles";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import Paper from "@material-ui/core/Paper";

const styles = theme => ({
  root: {
    // background: theme.palette.secondary.dark,
    border: 0,
    color: theme.palette.text.secondary,
    padding: "5px 30px",
    textAlign: "center",
    width: "100%",
    fontSize: "0.8rem",
    position: 'relative',
    bottom: 0,
    marginTop: '20px',  },
  links: {
    textDecoration: "none",
    color: theme.palette.text.secondary,
    marginLeft: "10px"
  },
  container: {
    marginTop: '20px'
  }
});

const Footer = ({ classes }) => {
  return (
    <Paper elevation={0} square className={classes.container}>
      <footer className={classes.root}>
        <a
          className={classes.links}
          href="https://github.com/ItzikDabush"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon />
        </a>
        <a
          className={classes.links}
          href="https://www.linkedin.com/in/itzikdabush"
          target="_blank"
          rel="noopener noreferrer"
        >
          <LinkedInIcon />
        </a>
        <p>Made with Fun and Love at Tel-Aviv</p>
        <p>© Itzik Dabush, {new Date().getFullYear()}</p>
      </footer>
    </Paper>
  );
};

export default withStyles(styles, { withTheme: true })(Footer);
