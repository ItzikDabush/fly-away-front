import React from "react";
import { withStyles } from "@material-ui/core/styles";
import GitHubIcon from "@material-ui/icons/GitHub";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
const styles = theme => ({
  root: {
    background: theme.palette.primary.main,
    border: 0,
    borderRadius: 3,
    // boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "#cccccc",
    padding: "0 30px",
    textAlign: "center",
    
    // position: "absolute",
    // bottom: "0px",
    width: "100%",
    fontSize: "0.8rem"
  },
  links: {
    textDecoration: "none",
    color:'#cccccc' 
  }
 
});

function Footer(props) {
  console.log(props);
  const { classes } = props;
  return (
    <footer className={classes.root}>
    
      <a className={classes.links}href="https://www.linkedin.com/in/itzikdabush/" target="_blank">
        <GitHubIcon />
      </a>

      <a className={classes.links} href="https://www.linkedin.com/in/itzikdabush" target="_blank">
        <LinkedInIcon />
      </a>
      <p>Made with Fun and Love at Tel-Aviv</p>
      <p>© Itzik Dabush, {new Date().getFullYear()}</p>

    </footer>
  );
}

export default withStyles(styles)(Footer);
