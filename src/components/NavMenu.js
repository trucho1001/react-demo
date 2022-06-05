import React, { Component } from "react";
import { Collapse, Container, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from "reactstrap";
import { Link } from "react-router-dom";
import "./NavMenu.css";
import authService from "./api-authorization/AuthorizeService";

export class NavMenu extends Component {
  static displayName = NavMenu.name;

  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
      authenticated: false,
    };
  }

  componentDidMount() {
    this._subscription = authService.subscribe(() => this.authenticationChanged());
    this.populateAuthenticationState();
  }

  componentWillUnmount() {
    authService.unsubscribe(this._subscription);
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }

  async populateAuthenticationState() {
    const authenticated = await authService.isAuthenticated();
    this.setState({ ready: true, authenticated });
  }

  async authenticationChanged() {
    this.setState({ ready: false, authenticated: false });
    await this.populateAuthenticationState();
  }

  render() {
    return (
      <header>
        <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3" light>
          <Container>
            <NavbarBrand tag={Link} to="/">
              EVF
            </NavbarBrand>
            {this.state.authenticated && (
              <>
                <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed} navbar>
                  <ul className="navbar-nav flex-grow">
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/">
                        Home
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/overview">
                        train/admin
                      </NavLink>
                    </NavItem>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/public">
                        train/public
                      </NavLink>
                    </NavItem>
                    {/* <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/swagger" target={"_blank"}>
                        Swagger
                      </NavLink>
                    </NavItem>
                    <LoginMenu></LoginMenu>
                    <NavItem>
                      <NavLink tag={Link} className="text-dark" to="/fetch-data">
                        Fetch data
                      </NavLink>
                    </NavItem> */}
                  </ul>
                </Collapse>
              </>
            )}
          </Container>
        </Navbar>
      </header>
    );
  }
}
