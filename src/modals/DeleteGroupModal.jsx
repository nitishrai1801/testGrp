

import React, { Component } from 'react'
import {
    Button,
    ComposedModal,
    Form,
    ModalBody,
    ModalFooter,
    TextInput,
  } from "carbon-components-react";



export default class DeleteGroupModal extends Component {
    deleteGroup() {
        console.log("Groups to be delete is : ", this.props.groupId);
    }
    closeModal() {
        this.props.deleteModalCancel()
    }

    render() {
        const { isModalOpen } = this.props;
        return (
        <ComposedModal open={isModalOpen} onClose={() => this.closeModal()}>
            <ModalBody className="my-2 py-2" hasScrollingContent={true}>
            <Form className="" onSubmit={this.submit}>
            
            </Form>
            </ModalBody>
            <ModalFooter secondaryButtonText="Cancel">
            <Button kind="danger" onClick={() => this.deleteGroup()}>
                Delete
            </Button>
            </ModalFooter>
      </ComposedModal>
        )
    }
}

  
// const DeleteGroupModal = () => {
//     const { isModalOpen } = this.props;
//     return (
//         <ComposedModal open={isModalOpen} onClose={() => this.closeModal()}>
//         <ModalBody className="my-2 py-2" hasScrollingContent={true}>
//           <Form className="" onSubmit={this.submit}>
           
//           </Form>
//         </ModalBody>
//         <ModalFooter secondaryButtonText="Cancel">
//           <Button kind="danger" onClick={() => this.deleteGrup()}>
//             Delet
//           </Button>
//         </ModalFooter>
//       </ComposedModal>
//     )
// }

// export default DeleteGroupModal
