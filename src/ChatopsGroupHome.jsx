import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";

import GroupsDBData from "./data/groupData";
import {
  Button,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
  OverflowMenu,
  OverflowMenuItem,
} from "carbon-components-react";
import { Edit32, RowDelete32 } from "@carbon/icons-react";
import Breadcrumb from "./utils/BreadcrumbUtil";
import ReactDOM from "react-dom";
import DeleteGroupModal from "./modals/DeleteGroupModal";

class ChatopsGroupsHome extends Component {
  // 13/10/2021
  headers = ["Group Name", "Group Description", "Owner", "Admin", "", ""];
  links = {
    Home: "/mui/home",
    Groups: "/mui/groups",
  };
  // 13/10/2021
  state = {
    deleteGroupId: "",
    groupData: [],
    isLoading: false,
    error: "",
    emailID: "Nitish.Rai1@kyndryl.com",
    isDeleteModalOpen: false,
  };

  componentDidMount() {
    const groupList = GroupsDBData.map((grpDB) => {
      const group = {};
      //13/10
      group.id = grpDB._id;
      group.groupName = grpDB.name;
      group.groupDescription = grpDB.description;

      group.owner = grpDB.owners.map((ownerObj) => ownerObj.emailId).toString();
      group.admin = grpDB.administrators
        .map((adminObj) => adminObj.emailId)
        .toString();
      group.editable = true;
      return group;
    });

    // let dummyData = [
    //   {
    //     _id: "1",
    //     groupName: "Nit_test",
    //     groupDescription: "Test Group",
    //     loggedInUserRole: "Owner",
    //     owner: "Nitish.Rai1@ocean.ibm.com",
    //     admin: "None",
    //   },
    //   {
    //     _id: "2",
    //     groupName: "NGR_test",
    //     groupDescription: "Chatops Group for testing",
    //     loggedInUserRole: "Owner",
    //     owner: "Nitish.Rai1@ocean.ibm.com",
    //     admin: "None",
    //   },
    //   {
    //     _id: "3",
    //     groupName: "NGR",
    //     groupDescription: "my Group",
    //     loggedInUserRole: "Owner",
    //     owner: "Nitish.Rai1@ocean.ibm.com",
    //     admin: "None",
    //   },
    // ];
    // this.setState({ groupData: dummyData, isLoading: false });
    this.setState({ groupData: groupList, isLoading: false });
  }

  createGroup() {}
  onGroupClick() {}

  openDeleteModal = (groupId) => {
    console.log("openDeleteModal:: Group Id clieked to delete: ", groupId);
    this.setState({ isDeleteModalOpen: true, deleteGroupId: groupId });
  };
  onDeletModalCancel = () => {
    this.setState({ isDeleteModalOpen: false });
  };

  render() {
    let editGroupIcon = (
      <Edit32 className="iconEditSize editIconPA" aria-label="Add" />
    );
    let deleteRow = (
      <RowDelete32 className="iconEditSize editIconPA" aria-label="Delete" />
    );
    const delete__enabled = {
      cursor: "pointer",
    };

    const delete__disabled = {
      cursor: "not-allowed",
      opacity: "50%",
      hover: "none",
    };
    let rows = this.state.groupData.map((group) => {
      let redirectUrl = `/mui/groups/create?${group.id}`;
      return (
        <TableRow key={group._id}>
          <TableCell onClick="">
            <Link to={`/mui/groups/groupdetails/${group.groupName}`}>
              <p onClick={() => this.onGroupClick()}>{group.groupName}</p>
            </Link>
          </TableCell>
          <TableCell>{group.groupDescription}</TableCell>
          {/* <TableCell>{group.loggedInUserRole}</TableCell> */}
          <TableCell>{group.owner}</TableCell>
          <TableCell>{group.admin}</TableCell>
          <TableCell>
            {group.editable ? (
              <Link id={group.id} to={redirectUrl}>
                {editGroupIcon}
              </Link>
            ) : (
              <p>{editGroupIcon} </p>
            )}
          </TableCell>
          <TableCell>
            <div id={group.id} onClick={() => this.openDeleteModal(group.id)} style={delete__enabled}>
              {deleteRow}
            </div>
          </TableCell>
          {/* <TableCell>
              <OverflowMenu
                    ariaLabel="Onboard / Edit Account"
                    title="Onboard Account"
                    aria-label="Onboard / Edit Account"
                    aria-labelledby="Onboard / Edit Account"
                    iconDescription="Onboard / Edit Account"
                    selectorPrimaryFocus="option-two"
                  >
                    {overflowMenu}
              </OverflowMenu>          
          </TableCell> */}
        </TableRow>
      );
    });
    return (
      <div>
        <div className="headerDiv mainMargin sectionMargin">
          <Breadcrumb header="Groups" links={this.links} />
        </div>
        <section className="sectionMargin mainMargin">
          <div className="searchDivMain my-2">
            <Link class="addBtnPACss" to="/mui/groups/create">
              <Button
                className="addAccBtn addBtnCss addBtnPACss"
                onClick={this.createGroup()}
              >
                Create Group
              </Button>
            </Link>
          </div>
          <Table>
            <TableHead>
              <TableRow>
                {this.headers.map((header) => (
                  <TableHeader key={header}>{header}</TableHeader>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>{rows}</TableBody>
          </Table>
        </section>
        {typeof document === "undefined"
          ? null
          : ReactDOM.createPortal(
              <DeleteGroupModal
                groupId={this.state.deleteGroupId}
                isModalOpen={this.state.isDeleteModalOpen}
                deleteModalCancel={() => this.onDeletModalCancel()}
              />,
              document.body
            )}
      </div>
    );
  }
}

export default withRouter(ChatopsGroupsHome);
