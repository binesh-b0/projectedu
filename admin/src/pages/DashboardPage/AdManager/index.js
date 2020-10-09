import React, { useState, useEffect } from "react";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import { Link } from "react-router-dom";
import { NoEncryption } from "@material-ui/icons";
import { Switch, Route, Redirect, withRouter, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography, Grid } from "@material-ui/core";
import AdListing from './AdListing/index';
import TextAd from './TextAd';
import PhotoAd from "./PhotoAd";

const useStyles = makeStyles((theme) => ({
    root: {
        marginTop: 24,
        backgroundColor: "white",
    },
    link: {
        color: theme.palette.grey[800],
        fontSize: 14,
        fontWeight: theme.typography.fontWeightRegular,
        "&:hover, &:focus": {
            textDecoration: "none",
            color: theme.palette.primary,
        },
    },
    heading: {
        fontWeight: 600
    }
}));

function AdManager() {
    const classes = useStyles();

    return (
        <Container className={classes.root}>
            <Grid
                container
                direction="row"
                justify="flex-start"
            >
                <Typography variant="h6" className={classes.heading}>
                    Advertisement Board
                </Typography>
            </Grid>
            <Switch>
                <Route exact path="/app/ad" component={AdListing} />
                <Route exact path="/app/ad/textad" component={TextAd} />
                <Route exact path="/app/ad/photoad" component={PhotoAd}/>
            </Switch>
        </Container>
    )
}

function ActiveLastBreadcrumb(exam, location) {
    const classes = useStyles();

    return (
        <Breadcrumbs separator="›" aria-label="breadcrumb">
            <Link className={classes.link} to="/app/exams">
                Exams
        </Link>
            {location.pathname.substring(location.pathname.lastIndexOf('/') + 1) != 'exams`' && (
                <Link className={classes.link} color="textPrimary" aria-current="page">
                    {location.pathname.substring(location.pathname.lastIndexOf('/') + 1)}
                </Link>
            )}
            {location.pathname == '/app/exams/add' && (
                <Link className={classes.link} color="textPrimary" aria-current="page">
                    Add new exam
                </Link>
            )}
        </Breadcrumbs>
    );
}

export default withRouter(AdManager);
