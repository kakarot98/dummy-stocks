import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  NavLink,
} from "react-router-dom";
import { Toolbar, AppBar, Typography, Container } from "@mui/material";

function NavBar() {
  return (
    <>
      <AppBar component="nav" position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h4"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 4,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".05rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              DUMMY-STOCKS
            </Typography>

            <NavLink
              to="/"
              style={({ isActive }) => ({
                color: "inherit",
                textDecoration: "inherit",
                padding: ".5rem",
                backgroundColor: isActive ? "#175da3" : "#1976d2",
              })}
            >
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/"
                sx={{
                  mr: 2,
                  ml: 3,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 600,
                  letterSpacing: ".05rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Home
              </Typography>
            </NavLink>

            <NavLink
              to="/portfolio"
              style={({ isActive }) => ({
                color: "inherit",
                textDecoration: "inherit",
                padding: ".5rem",
                backgroundColor: isActive ? "#175da3" : "#1976d2",
              })}
            >
              <Typography
                variant="h6"
                noWrap
                component="a"
                href="/portfolio"
                sx={{
                  mr: 2,
                  ml: 3,
                  display: { xs: "none", md: "flex" },
                  fontFamily: "monospace",
                  fontWeight: 600,
                  letterSpacing: ".05rem",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                Portfolio
              </Typography>
            </NavLink>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}

export default NavBar;
