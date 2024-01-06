import useSWR from "swr";
import Router from "next/router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import { useCallback, useState } from "react";
import { confirmDialog } from "primereact/confirmdialog";

import DetailsModal from "./detailsModal";
import { getPath } from "../../../config/urls";
import ModalWrapper from "../../../components/modal";
import ImageComponent from "../../../components/image";
import Pagination from "../../../components/pagination";
import { createStringifiedUrl } from "../../../lib/objects";
import { showNotification } from "../../../components/notification";
import SearchIconImage from "../../../public/images/search-icon.svg";
import getStudentInvites from "../../../actions/students/getInvites";
import deleteStudentInvite from "../../../actions/students/deleteStudentInvite";
import EmptyStateSVG from "../../../public/images/038-drawkit-nature-man-monochrome.svg";
import SupervisorsInvitesSkeleton from "../../../components/skeletons/supervisors/invites";

const inviteStudentPath = getPath("inviteStudentPath").href;

const StudentsInvitesList = ({ getStudentInvites, deleteStudentInvite }) => {
  const [pageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [modalType, setModalType] = useState("details");
  const [selectedInvite, setSelectedInvite] = useState();
  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  const debouncedNameSearch = useCallback(
    debounce((value) => setSearchValue(value), 300),
    [setSearchValue],
  );

  const handleInputChange = (event) => {
    const value = event.target.value.trim();
    if (value !== searchValue) debouncedNameSearch(value);
    setPageNumber(1);
  };

  const handlePageChange = (pageNum) => setPageNumber(pageNum);

  const baseUrl = createStringifiedUrl(getPath("studentInvitesPath").as, {
    pageSize,
    PageNumber: pageNumber,
    SearchByStudentId: searchValue,
  });

  const { data, mutate } = useSWR(baseUrl, getStudentInvites);

  const mutateResources = useCallback(() => mutate(baseUrl), [baseUrl, mutate]);

  const toggleDetailsModal = useCallback((academicYear) => {
    if (academicYear) {
      setSelectedInvite(academicYear);
    } else {
      setSelectedInvite();
    }
    setModalType("details");
    setOpenDetailsModal((open) => !open);
  }, []);

  const handleDeleteInvitation = useCallback(
    (invitationId) => {
      return deleteStudentInvite(invitationId)
        .then(() => {
          mutateResources();
          showNotification({
            severity: "success",
            detail: "Invitation has been deleted successfully",
          });
        })
        .catch((err) => {
          showNotification({ detail: err.message });
        });
    },
    [deleteStudentInvite, mutateResources],
  );

  const onDeleteInvitation = (invitationId) => {
    confirmDialog({
      icon: "pi pi-info-circle",
      header: "Delete Invitation",
      acceptClassName: "button is-primary",
      message: "Proceed to deleting this invitation?",
      accept: () => handleDeleteInvitation(invitationId),
    });
  };

  const renderDetailsModal = useCallback(() => {
    return (
      <ModalWrapper
        open={openDetailsModal}
        closeModal={toggleDetailsModal}
        options={{ closeOnEsc: false, closeOnOverlayClick: false }}
      >
        <DetailsModal
          modalType={modalType}
          setModalType={setModalType}
          invitation={selectedInvite}
          closeModal={toggleDetailsModal}
          mutateResources={mutateResources}
        />
      </ModalWrapper>
    );
  }, [
    modalType,
    selectedInvite,
    mutateResources,
    openDetailsModal,
    toggleDetailsModal,
  ]);

  const renderInvitesList = () => {
    if (!data?.result) return <SupervisorsInvitesSkeleton rows={5} />;

    if (data.result.totalCount === 0) {
      return (
        <div className="empty-state">
          <ImageComponent src={EmptyStateSVG} alt="empty state image" />
          <p>
            No results found. {searchValue && "Please try a different search."}
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="custom-table">
          <div className="custom-table-row header">
            <div className="custom-table-cell">
              <span>Name</span>
            </div>
            <div className="custom-table-cell">
              <span>Email</span>
            </div>
            <div className="custom-table-cell">
              <span>Student ID</span>
            </div>
            <div className="custom-table-cell">
              <span>Status</span>
            </div>
            <div className="custom-table-cell">
              <span>Actions</span>
            </div>
          </div>
          {data.result.data.map((invitation, index) => {
            return (
              <div key={index} className="custom-table-row">
                <div className="custom-table-cell">
                  <span title={invitation.firstName}>
                    {invitation.firstName} {invitation.lastName}
                  </span>
                </div>

                <div className="custom-table-cell">
                  <span title={invitation.email}>{invitation.email}</span>
                </div>
                <div className="custom-table-cell">
                  <span title={invitation.studentId}>
                    {invitation.studentId}
                  </span>
                </div>
                <div className="custom-table-cell">
                  <span> {invitation.status} </span>
                </div>
                <div className="custom-table-cell">
                  <button
                    type="button"
                    className="button"
                    onClick={() => toggleDetailsModal(invitation)}
                  >
                    View Details
                  </button>

                  <button
                    type="button"
                    className="button has-text-red"
                    onClick={() => onDeleteInvitation(invitation.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
        <Pagination
          pageSize={pageSize}
          currentPageNumber={pageNumber}
          onPageChange={handlePageChange}
          totalRecords={data.result.totalCount}
        />
      </>
    );
  };

  return (
    <>
      {renderDetailsModal()}
      <section className="manage-admin-section">
        <div className="section-wrapper">
          <div className="container">
            <div className="request-block">
              <div className="dashboard-header">
                <div className="dashboard-header-inner">
                  <h3>Pending Invites</h3>
                  <button
                    type="button"
                    className="button is-primary"
                    onClick={() => Router.push(inviteStudentPath)}
                  >
                    Invite new student
                  </button>
                </div>
              </div>
              <div className="search-block is-flex is-align-items-flex-end is-justify-content-space-between">
                <div className="field">
                  <p className="control has-icons-left no-label no-bts">
                    <input
                      type="text"
                      className="input"
                      onChange={handleInputChange}
                      placeholder="Search by Username"
                    />
                    <span className="searxh-icon-img">
                      <ImageComponent alt="Search Icon" src={SearchIconImage} />
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="custom-table-wrapper">{renderInvitesList()}</div>
          </div>
        </div>
      </section>
    </>
  );
};

StudentsInvitesList.propTypes = {
  getStudentInvites: PropTypes.func.isRequired,
  deleteStudentInvite: PropTypes.func.isRequired,
};

export default connect(null, { getStudentInvites, deleteStudentInvite })(
  StudentsInvitesList,
);
