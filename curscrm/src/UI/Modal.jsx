import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const MyVerticallyCenteredModal = (props) => {
     return (
          <Modal
               {...props}
               aria-labelledby="contained-modal-title-vcenter"
               centered
          >
               <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                    </Modal.Title>
               </Modal.Header>
               <Modal.Body>
                    <h4>Ваш Заказ успешно оформлен</h4>

               </Modal.Body>
               {/* <Modal.Footer>
                    <Button onClick={props.onHide}>Close</Button>
               </Modal.Footer> */}
          </Modal>
     );
}

export default MyVerticallyCenteredModal;