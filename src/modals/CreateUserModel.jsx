import {
  Button,
  ComposedModal,
  Form,
  ModalBody,
  ModalFooter,
  TextInput,
} from "carbon-components-react";
import React, { Component } from "react";

export default class CreateUserModel extends Component {
  state = {
    userName: "",
    email: ""
  }
  closeModal() {
    this.props.onCloseModal();
  }

  addUser() {
    this.props.onSaveUser(this.state.email);
  }
  handleInputChange = (e) => {
    e.preventDefault();
/// Email Validation
    console.log(`Input ${e.target.name}: ${e.target.value}`);
    this.setState({ [e.target.name]: e.target.value });
  };
  
  emailChangeHandler( ) {}
  render() {
    const { isModalOpen } = this.props;
    return (
      <ComposedModal open={isModalOpen} onClose={() => this.closeModal()}>
        <ModalBody className="my-2 py-2" hasScrollingContent={true}>
          <Form className="" onSubmit={this.submit}>
            {/* <TextInput
              labelText={
                <>
                  Name <b style={{ color: "red" }}>*</b>
                </>
              }
              placeholder="Name"
              name="userName"
              onChange={(event) =>this.handleInputChange(event)}
              defaultValue={this.state.userName}
              // readOnly={this.state.id}
              required
            /> */}
            <TextInput
              labelText={
                <>
                  Email Address <b style={{ color: "red" }}>*</b>
                </>
              }
              placeholder="Email Address"
              name="email"
              onChange={(e) => this.handleInputChange(e)}
              defaultValue={this.state.email}
              // readOnly={this.state.id}
              required
            />
          </Form>
        </ModalBody>
        <ModalFooter secondaryButtonText="Cancel">
          <Button kind="primary" onClick={() => this.addUser()}>
            Add
          </Button>
        </ModalFooter>
      </ComposedModal>
    );
  }
}
