import { useState } from "react";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { Field, Form } from "react-final-form";

import { required } from "../../../../../lib/objects";
import { FORM_WITH_DIRT } from "../../../../../config/form";
import ImageComponent from "../../../../../components/image";
import TextArea from "../../../../../components/inputs/textarea";
import FileIcon from "../../../../../public/images/basil_file-solid.svg";
import { showNotification } from "../../../../../components/notification";
import updateResearchTopic from "../../../../../actions/student/updateResearchTopic";

const ResearchTopic = ({ researchTopic, afterRequest }) => {
  const dispatch = useDispatch();
  const [showEditTopic, setShowEditTopic] = useState(false);

  const toggleEditTopic = () => setShowEditTopic((state) => !state);

  const initialValues = {
    research_topic: researchTopic,
  };

  const updateStudentResearchTopic = (values) => {
    const data = { researchTopic: values.research_topic };

    return dispatch(updateResearchTopic(data))
      .then(() => {
        toggleEditTopic();
        afterRequest();
        showNotification({
          severity: "success",
          detail: "Research topic has been updated.",
        });
      })
      .catch((err) => {
        showNotification({ detail: err.message });
      });
  };

  return showEditTopic ? (
    <div className="list-section-list-card-item no-flex">
      <Form
        subscription={FORM_WITH_DIRT}
        initialValues={initialValues}
        onSubmit={updateStudentResearchTopic}
        render={({ dirty, submitting, handleSubmit, hasValidationErrors }) => {
          return (
            <form autoComplete="off">
              <div className="field">
                <Field
                  validate={required}
                  component={TextArea}
                  name="research_topic"
                  labelText="Brief description of research topic"
                />
              </div>
              <div className="field-footer">
                <div className="btn-group">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className={`button is-primary is-lg${
                      submitting ? " is-loading-custom" : ""
                    }`}
                    disabled={hasValidationErrors || !dirty || submitting}
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={toggleEditTopic}
                    className="button is-primary is-lg no-bg"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </form>
          );
        }}
      />
    </div>
  ) : (
    <div className="list-section-list-card-item aligned-tp">
      <div className="list-section-list-card-item-inner">
        <div className="list-section-list-card-initials-wrapper blu-bg">
          <ImageComponent src={FileIcon} alt="file" />
        </div>
        <div>
          <h6>Research Topic</h6>
          <p>{researchTopic}</p>
        </div>
      </div>
      <button type="button" onClick={toggleEditTopic} className="button">
        Edit
      </button>
    </div>
  );
};

ResearchTopic.propTypes = {
  afterRequest: PropTypes.func.isRequired,
  researchTopic: PropTypes.string.isRequired,
};

export default ResearchTopic;
