import React, { Component } from "react";
import ReactDOM from "react-dom";
import Breadcrumb from "./utils/BreadcrumbUtil";
import {
  Tabs,
  Tab,
  Button,

  Form,
} from "carbon-components-react";
import UserList from "./UserList";
import { Link } from "react-router-dom";
import CreateUserModel from "./modals/CreateUserModel";
import groupDataDB from "./data/groupData";
// import groupData from "./data/groupData";

const AddUserButton = ({ buttonText, onAddUserClick, userType }) => {
  return (
    <div className="searchDivMain my-2">
      <Button
        className="addAccBtn  addBtnPACss"
        onClick={() => onAddUserClick(userType)}
      >
        {buttonText}
      </Button>
    </div>
  );
};

export default class GroupDetails extends Component {
  links = {
    Home: "/mui/home",
    Groups: "/mui/groups",
    "Group Detail": "/mui/groupDetails",
  };
  userTypeOwner = "OWNER";
  userTypeAdmin = "ADMINISTRATOR";
  userTypeMember = "MEMBER";
  loggedInUserEmail = "Nitish.Rai1@kyndryl.com";
  state = {
    name: "",
    description: "",
    owners: [],
    administrators: [],
    members: [],
    isAdmin: false,
    isOwner: false,
    isMember: false,
    addUserType: "", //
    isModalOpen: false,
    modalData: [],
    addUserButtonText: "",
  };

  componentDidMount() {
    // fetch from backend API

    // local data
    const grpName = this.props.match.params.groupName;
    console.log("group name from router : ", grpName);

    const userData = groupDataDB.find((grpDB) => grpDB.name === grpName);
    console.log("userData: ", userData);

    userData.isAdmin = userData.administrators.some(
      (admin) => admin.emailId === this.loggedInUserEmail
    );
    userData.isOwner = userData.owners.some(
      (owner) => owner.emailId === this.loggedInUserEmail
    );
    userData.isMember = userData.members.some(
      (member) => member.emailId === this.loggedInUserEmail
    );

    this.setState(userData);
  }

  componentDidUpdate() {
    console.log("Updated State is: ", this.state);
  }

  addUser(userType) {
    console.log("User type to add : ", userType);
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }
  saveUser(userEmail) {
    console.log("user Emails is : ", userEmail);
    this.setState({ isModalOpen: false });
  }

  render() {
    const { groupName, groupDescription } = this.props;
    return (
      <div>
        <div className="headerDiv mainMargin sectionMargin">
          <Breadcrumb header="Groups" links={this.links} />
        </div>
        <section className="sectionMargin mainMargin">
          <div>
            <Form>
              <label>Group Name: {this.state.name}</label>
              <label>Description: {this.state.description} </label>
            </Form>
          </div>
          <Tabs type="container">
            <Tab id="owners" label="Owners">
              {this.state.isOwner && (
                <AddUserButton
                  buttonText="Add Owner"
                  userType={this.userTypeOwner} //
                  onAddUserClick={(type) => this.addUser(type)}
                />
              )}

              <UserList users={this.state.owners} />
            </Tab>
            <Tab id="admin" label="Administrators">
              {(this.state.isAdmin || this.state.isOwner) && (
                <AddUserButton
                  buttonText="Add Admin"
                  userType={this.userTypeAdmin} //
                  onAddUserClick={(type) => this.addUser(type)}
                />
              )}
              <UserList users={this.state.administrators} />
            </Tab>
            <Tab id="member" label="Members" title="Members">
              {(this.state.isAdmin || this.state.isOwner) && (
                <AddUserButton
                  buttonText="Add Member"
                  userType={this.userTypeMember}
                  onAddUserClick={(type) => this.addUser(type)}
                />
              )}
              <UserList users={this.state.members} />
            </Tab>
          </Tabs>
          {typeof document === "undefined"
            ? null
            : ReactDOM.createPortal(
                <CreateUserModel
                  isModalOpen={this.state.isModalOpen}
                  onCloseModal={() => this.closeModal()}
                  onSaveUser={(userEmail) => this.saveUser(userEmail)}
                  addUserButtonText={this.state.addUserButtonText}
                />,
                document.body
              )}
        </section>
      </div>
    );
  }
}
