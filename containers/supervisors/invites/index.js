import Router from "next/router";
import useSWR, { mutate } from "swr";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import { useCallback, useState } from "react";
import { confirmDialog } from "primereact/confirmdialog";

import { getPath } from "../../../config/urls";
import ModalWrapper from "../../../components/modal";
import ImageComponent from "../../../components/image";
import Pagination from "../../../components/pagination";
// import EditModal from "../../superadmin/admins/editModal";
import { createStringifiedUrl } from "../../../lib/objects";
import SearchIconImage from "../../../public/images/search-icon.svg";
import PaginationSkeleton from "../../../components/skeletons/pagination";
import getSupervisorInvites from "../../../actions/supervisors/getInvites";
import AdminUserSkeleton from "../../../components/skeletons/superadmin/adminUsers";
import { showNotification } from "../../../reducers/notification/notificationReducer";
import DetailsModal from "./detailsModal";
import deleteSupervisorInvite from "../../../actions/supervisors/deleteSupervisorInvite";

const inviteSupervisorPath = getPath("inviteSupervisorPath").href;

const SupervisorsInvitesList = ({
  auth,
  showNotification,
  getSupervisorInvites,
  deleteSupervisorInvite,
}) => {
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

  const baseUrl = createStringifiedUrl(getPath("supervisorInvitesPath").as, {
    pageSize,
    PageNumber: pageNumber,
    SearchByStaffId: searchValue,
  });

  const { data } = useSWR(baseUrl, getSupervisorInvites);

  const mutateResources = useCallback(() => mutate(baseUrl), [baseUrl]);

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
      return deleteSupervisorInvite(invitationId)
        .then(() => {
          mutateResources();
          showNotification("Invitation has been deleted successfully");
        })
        .catch((err) => {
          showNotification(err.message);
        });
    },
    [deleteSupervisorInvite, mutateResources, showNotification],
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
    if (!data?.result) return <AdminUserSkeleton rows={3} />;

    return (
      <>
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
                <span title={invitation.staffId}>{invitation.staffId}</span>
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
      </>
    );
  };

  const renderPagination = () => {
    if (!data?.result) return <PaginationSkeleton />;

    return (
      <Pagination
        pageSize={pageSize}
        currentPageNumber={pageNumber}
        onPageChange={handlePageChange}
        totalRecords={data.result.totalCount}
      />
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
                    onClick={() => Router.push(inviteSupervisorPath)}
                  >
                    Invite new supervisor
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
                      <ImageComponent src={SearchIconImage} alt="search icon" />
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="custom-table-wrapper">
              <div className="custom-table">
                <div className="custom-table-row header">
                  <div className="custom-table-cell">
                    <span>Name</span>
                  </div>
                  <div className="custom-table-cell">
                    <span>Email</span>
                  </div>
                  <div className="custom-table-cell">
                    <span>User ID</span>
                  </div>
                  <div className="custom-table-cell">
                    <span>Status</span>
                  </div>
                  <div className="custom-table-cell">
                    <span>Actions</span>
                  </div>
                </div>

                {renderInvitesList()}
              </div>
              {renderPagination()}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

SupervisorsInvitesList.propTypes = {
  showNotification: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
  getSupervisorInvites: PropTypes.func.isRequired,
  deleteSupervisorInvite: PropTypes.func.isRequired,
};

export default connect(null, {
  showNotification,
  getSupervisorInvites,
  deleteSupervisorInvite,
})(SupervisorsInvitesList);