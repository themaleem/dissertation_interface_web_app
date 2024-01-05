import PropTypes from "prop-types";

import ImageComponent from "../../../../components/image";
import { toDayMonthYearLong } from "../../../../lib/dateUtils";
import CloseSVGImage from "../../../../public/images/close.svg";

const DetailsModal = ({ dissertationCohort, closeModal, toggleEditModal }) => {
  return (
    <div className="modal-card">
      <header className="modal-card-head">
        <p className="modal-card-title">Academic year</p>
        <button
          type="button"
          aria-label="close"
          className="close-btn"
          onClick={closeModal}
        >
          <ImageComponent src={CloseSVGImage} alt="close-icon" />
        </button>
      </header>
      <section className="modal-card-body">
        <div className="modal-form-content">
          <div className="text-content-block">
            <div className="is-flex text-declartn is-align-item-center">
              <p className="text-key">Start date:</p>
              <p className="text-val">
                {toDayMonthYearLong(dissertationCohort.startDate)}
              </p>
            </div>
            <div className="is-flex text-declartn is-align-item-center">
              <p className="text-key">End date:</p>
              <p className="text-val">
                {toDayMonthYearLong(dissertationCohort.endDate)}
              </p>
            </div>
            <div className="is-flex text-declartn is-align-item-center">
              <p className="text-key">Status:</p>
              <p className="text-val">{dissertationCohort?.status}</p>
            </div>
            <div className="is-flex text-declartn is-align-item-center">
              <p className="text-key">Date created:</p>
              <p className="text-val">{dissertationCohort.createdAt}</p>
            </div>
            <div className="is-flex text-declartn is-align-item-center">
              <p className="text-key">Created by:</p>
              <p className="text-val">{dissertationCohort.createdBy}</p>
            </div>

            {dissertationCohort?.updatedAt && (
              <div className="is-flex text-declartn is-align-item-center">
                <p className="text-key">Last modified:</p>
                <p className="text-val">26 / January / 2024</p>
              </div>
            )}
            {dissertationCohort?.updatedBy && (
              <div className="is-flex text-declartn is-align-item-center">
                <p className="text-key">Last modified by:</p>
                <p className="text-val">Sunkanmi Daniels</p>
              </div>
            )}
          </div>
        </div>
      </section>
      <footer className="modal-card-foot left">
        <button
          type="button"
          className="button text-blue is-white"
          onClick={toggleEditModal}
        >
          Edit details
        </button>
        <button
          type="button"
          onClick={closeModal}
          className="button is-white text-red"
        >
          Close
        </button>
      </footer>
    </div>
  );
};

DetailsModal.propTypes = {
  closeModal: PropTypes.func.isRequired,
  toggleEditModal: PropTypes.func.isRequired,
  dissertationCohort: PropTypes.instanceOf(Object).isRequired,
};

export default DetailsModal;
