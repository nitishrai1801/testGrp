import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "carbon-components-react";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import DeleteGroupModal from "./modals/DeleteGroupModal";
import { Edit32, RowDelete32 } from "@carbon/icons-react";

export default class UserList extends Component {
  headers = ["Email Address", ""];
  state = {
    isDeleteModalOpen: false
  }
  openDeleteModal = () => {
    this.setState({ isDeleteModalOpen: true });
  };
  onDeletModalCancel = () => {
    this.setState({ isDeleteModalOpen: false });
  };
  render() {
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
    let rows = this.props.users.map((user) => {
      return (
        <TableRow key={user._id}>
          {/* <TableCell>{user.name}</TableCell> */}
          <TableCell style={{width: "25%"}}>{user.emailId}</TableCell>
          <TableCell style={{width: "25%"}}>
          <div onClick={() => this.openDeleteModal()} style={delete__enabled}>
              {deleteRow}
            </div>
          </TableCell>
        </TableRow>
      );
    });
    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              {this.headers.map((header) => (
                <TableHeader style={{width: "25%"}} key={header}>{header}</TableHeader>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{rows}</TableBody>
        </Table>
        {!this.props.users.length && (
          <div className="App">
            <p>No records found</p>
          </div>
        )}

{typeof document === "undefined"
          ? null
          : ReactDOM.createPortal(
              <DeleteGroupModal
                isModalOpen={this.state.isDeleteModalOpen}
                deleteModalCancel={() => this.onDeletModalCancel()}
              />,
              document.body
            )}
      </div>
    );
  }
}
