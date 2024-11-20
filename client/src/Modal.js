import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Make sure to import Bootstrap styles

const Modal = ({ showModal, handleCloseModal }) => {
  return (
    // Show the modal if showModal is true
    showModal && (
      <div className="modal show" style={{ display: 'block' }} aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Done</h5>
              <button
                type="button"
                className="close"
                onClick={handleCloseModal}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <p>Operation completed successfully!</p>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCloseModal}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default Modal;
