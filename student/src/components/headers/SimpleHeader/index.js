import React from "react";
import styles from "./SimpleHeader.module.css";

import { Navbar, Nav } from "react-bootstrap";
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';

export default function index() {
  return (
    <div className={styles.header}>
      <Navbar classsName={styles.bg_light} expand="lg">
        <Navbar.Brand style={{color:"gray"}}></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto">
              <Button className={styles.header_button}>Signin</Button>
              <Divider orientation="vertical" flexItem />
              <Button className={styles.header_button}>Signup</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
