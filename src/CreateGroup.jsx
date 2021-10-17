import { Button, Form, TextInput } from "carbon-components-react";
import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import Breadcrumb from "./utils/BreadcrumbUtil";

class CreateGroup extends Component {
  state = {
    groupName: "",
    groupDescription: "",
  };
  links = {
    Home: "/mui/home",
    Groups: "/mui/groups",
    Create: "/mui/groups/create",
  };

  handleInputChange = (e) => {
    e.preventDefault();
    // Validations
    if (
      (e.target.value &&
        e.target.value.includes("script") &&
        e.target.value.includes("<")) ||
      e.target.value.includes(">")
    ) {
      this.setState({
        ["inValid_" + e.target.name]: "Invalid Input.",
      });
      return;
    }
    if (
      e.target.name === "groupName" &&
      e.target.value &&
      e.target.value.match(/[!<>#%]/)
    ) {
      this.setState({
        ["inValid_" + e.target.name]:
          "Value should not contain !<>#% Characters.",
      });
      return;
    } else {
      this.setState({
        ["inValid_" + e.target.name]: undefined,
      });
    }
    console.log(`Input ${e.target.name}: ${e.target.value}`);
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit(event) {
    event.preventDefault();
    const grpData = {
      grpName: this.state.groupName,
      grpDescription: this.state.groupDescription,
    };

    console.log("Group Data is : ", grpData);
  }

  // 13/10/2021
  componentDidMount(){
   
    const groupdId = this.props.location.search.split('?')[1];
    
    console.log(`geoup id for which edit has to happen : ${groupdId}`)
  }
  render() {
    return (
      <div>
        <div className="headerDiv mainMargin sectionMargin">
          <Breadcrumb header="Groups" links={this.links} />
        </div>
        <section className="sectionMargin mainMargin paddingCostom">
          <Form className="formMain" onSubmit={(event) => this.onSubmit(event)}>
            <TextInput
              labelText={
                <>
                  Group Name <b style={{ color: "red" }}>*</b>
                </>
              }
              placeholder="Group Name"
              name="groupName"
              id="groupName"
              onChange={(event) => this.handleInputChange(event)}
              defaultValue={this.state.groupName}
              // readOnly={this.state.id}
              required
            />
            {this.state["inValid_groupName"] && (
              <small className="danger">
                <b className="errorMsg">{this.state["inValid_groupName"]}</b>
              </small>
            )}
            <TextInput
              labelText={
                <>
                  Group Description <b style={{ color: "red" }}>*</b>
                </>
              }
              placeholder="Description"
              name="groupDescription"
              id="groupDescription"
              onChange={(event) => this.handleInputChange(event)}
              defaultValue={this.state.groupDescription}
              // readOnly={this.state.id}
              required
            />
            <Button className="addAccBtn addBtnCss addBtnPACss" type="submit">
              Create Group
            </Button>
          </Form>
        </section>
      </div>
    );
  }
}

export default withRouter(CreateGroup);
