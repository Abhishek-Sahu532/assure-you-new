import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import logo from "../../assets/images/logo.png";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useAlert } from "react-alert";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PersonIcon from "@material-ui/icons/Person";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import ListAltIcon from "@material-ui/icons/ListAlt";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { logoutUser } from "../../actions/userAction";
import "./navbar.css";

function Navbar({ user }) {
  const { isAuthenticated } = useSelector((state) => state.user);

  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const alert = useAlert();
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const pages = [
    { path: "/", component: "Home" },
    { path: "/products", component: "Products" },
    { path: "/contact", component: "Contact" },
    { path: "/about", component: "About" },
    { path: "/search", component: "Search" },
  ];

  const settings = [
    { icon: <ListAltIcon />, name: "Orders", func: orders },
    { icon: <PersonIcon />, name: "Profile", func: account },
    {
      icon: (
        <ShoppingCartIcon
          style={{ color: cartItems.length > 0 ? "tomato" : "unset" }}
        />
      ),
      name: `Cart(${cartItems.length})`,
      func: cart,
    },
    { icon: <ExitToAppIcon />, name: "Logout", func: logout },
  ];

  if (user && user.role === "admin") {
    settings.unshift({
      icon: <DashboardIcon />,
      name: "Dashboard",
      func: dashboard,
    });
  }

  function dashboard() {
    navigate("/admin/dashboard");
  }
  function orders() {
    navigate("/orders");
  }
  function account() {
    navigate("/account");
  }

  function cart() {
    navigate("/cart");
  }
  function logout() {
    dispatch(logoutUser());
    alert.success("Logout Successfully");
  }

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" className="navbar">
      <Container
        maxWidth="xl"
        sx={{ backgroundColor: "white", position: "fixed", zIndex: "10"  }}
      >
        <Toolbar disableGutters>
          {/* DESKTOP VIEW*/}
          <Typography
            component="div"
            noWrap
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
        
            }}
          >
            <img src={logo} alt="logo" width={"auto"} height={45} />
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
          >
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon sx={{ color: "blue" }} />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
                textDecoration: "none",
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.component} onClick={handleCloseNavMenu} >
                  <Typography
                    textAlign="center"
                    component="p"

                  >
                    <Link

                      to={page.path}
                    >
                      {page.component}{" "}
                    </Link>
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          {/*MOBILE VIEW */}
          <Typography
            noWrap
            component="div"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
            }}
          >
            <img src={logo} alt="logo" width={"auto"} height={40} />{" "}
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.component}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" , zIndex: "15"}}
              >
                <Link to={page.path}>{page.component} </Link>
              </Button>
            ))}
          </Box>
          {/* login component */}
          {!isAuthenticated ? (
            <Typography
              noWrap
              component="p"
              sx={{
                mr: 2,
                fontFamily: "Droid Sans",
                fontWeight: 600,
                backgroundColor: "white",
                fontSize: "18px",
              }}
            >
              <Link to="/login">Log In/ Sign Up</Link>
            </Typography>
          ) : (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="avatar"
                    src={user.avatar.url ? user.avatar.url : "./Profile.png"}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting.name} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center" onClick={setting.func}>
                      {" "}
                      {setting.name}{" "}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
