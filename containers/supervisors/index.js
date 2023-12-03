import useSWR, { mutate } from "swr";
import Router from "next/router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import { useCallback, useState } from "react";
import { confirmDialog } from "primereact/confirmdialog";

import { getPath } from "../../config/urls";
import ModalWrapper from "../../components/modal";
import ImageComponent from "../../components/image";
import Pagination from "../../components/pagination";
import EditModal from "../superadmin/admins/editModal";
import { createStringifiedUrl } from "../../lib/objects";
import activateUser from "../../actions/superadmin/activateUser";
import SearchIconImage from "../../public/images/search-icon.svg";
import getAdminUsers from "../../actions/superadmin/getAdminUsers";
import deactivateUser from "../../actions/superadmin/deactivateUser";
import PaginationSkeleton from "../../components/skeletons/pagination";
import AdminUserSkeleton from "../../components/skeletons/superadmin/adminUsers";
import { showNotification } from "../../reducers/notification/notificationReducer";
import resendConfirmationEmail from "../../actions/superadmin/resendConfirmationEmail";

const newAdminPath = getPath("newAdminPath").href;

const SupervisorsList = ({
  auth,
  activateUser,
  getAdminUsers,
  deactivateUser,
  showNotification,
  resendConfirmationEmail,
}) => {
  const [pageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedUser, setSelectedUser] = useState();
  const [searchValue, setSearchValue] = useState("");

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

  const baseUrl = createStringifiedUrl(getPath("adminUsersPath").route, {
    pageSize,
    PageNumber: pageNumber,
    SearchByUserName: searchValue,
  });

  const [openEditModal, setOpenEditModal] = useState(false);

  const toggleEditModal = useCallback((user) => {
    setSelectedUser(user);
    setOpenEditModal((open) => !open);
  }, []);

  const { data, error, isLoading } = useSWR(baseUrl, getAdminUsers);

  const mutateResources = useCallback(() => mutate(baseUrl), [baseUrl]);

  const handleActivateUser = useCallback(
    (email) => {
      return activateUser({ email })
        .then(() => {
          mutateResources();
          showNotification("Admin has been activated successfully");
        })
        .catch((err) => {
          showNotification(err.message);
        });
    },
    [activateUser, mutateResources, showNotification],
  );

  const handleDeactivateUser = useCallback(
    (email) => {
      return deactivateUser({ email })
        .then(() => {
          mutateResources();
          showNotification("Admin has been deactivated successfully");
        })
        .catch((err) => {
          showNotification(err.message);
        });
    },
    [deactivateUser, mutateResources, showNotification],
  );

  const onDeactivateUser = (email) => {
    confirmDialog({
      icon: "pi pi-info-circle",
      header: "Deactivate Admin",
      acceptClassName: "button is-primary",
      accept: () => handleDeactivateUser(email),
      message: "Are you sure you want to deactivate account?",
    });
  };

  const onActivateUser = (email) => {
    confirmDialog({
      header: "Activate account",
      acceptClassName: "button is-primary",
      accept: () => handleActivateUser(email),
      message: "Are you sure you want to activate account?",
    });
  };

  const handleResendConfirmationEmail = (email) => {
    return resendConfirmationEmail({ email })
      .then(() => {
        showNotification("Email confirmation link has been sent");
      })
      .catch();
  };

  const renderEditModal = () => {
    return (
      <ModalWrapper
        open={openEditModal}
        closeModal={toggleEditModal}
        options={{ closeOnEsc: false, closeOnOverlayClick: false }}
      >
        <EditModal
          auth={auth}
          user={selectedUser}
          closeModal={toggleEditModal}
          mutateResources={mutateResources}
        />
      </ModalWrapper>
    );
  };

  const renderAdminUserList = () => {
    if (!data?.result) return <AdminUserSkeleton rows={3} />;

    return (
      <>
        {data.result.data.map((user, index) => {
          return (
            <div key={index} className="custom-table-row">
              <div className="custom-table-cell">
                <span title={user.userName}> {user.userName} </span>
              </div>
              <div className="custom-table-cell">
                <span title={user.email}>
                  {user.email}
                  {!user.emailConfirmed && (
                    <a
                      onClick={() => handleResendConfirmationEmail(user.email)}
                    >
                      Resend confirm email
                    </a>
                  )}
                </span>
              </div>

              <div className="custom-table-cell">
                <span title={`${user.firstName} ${user.lastName}`}>
                  {user.firstName} {user.lastName}
                </span>
              </div>

              <div className="custom-table-cell">
                <span> {user.isLockedOut ? "Inactive" : "Active"} </span>
              </div>
              <div className="custom-table-cell">
                <button
                  type="button"
                  className="button"
                  onClick={() => toggleEditModal(user)}
                >
                  Edit
                </button>
                {user.isLockedOut ? (
                  <button
                    type="button"
                    className="button has-text-green"
                    onClick={() => onActivateUser(user.email)}
                  >
                    Activate
                  </button>
                ) : (
                  <button
                    type="button"
                    className="button has-text-red"
                    onClick={() => onDeactivateUser(user.email)}
                  >
                    Deactivate
                  </button>
                )}
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
      {renderEditModal()}
      <section className="manage-admin-section">
        <div className="section-wrapper">
          <div className="container">
            <div className="request-block">
              <div className="dashboard-header">
                <div className="dashboard-header-inner">
                  <h3>Supervisors</h3>

                  <div className="btn-group">
                    <button type="button" className="button">
                      Upload a list
                    </button>
                    <button
                      type="button"
                      className="button is-primary"
                      onClick={() => Router.push(newAdminPath)}
                    >
                      Invite new supervisor
                    </button>
                  </div>
                </div>
              </div>
              <div className="search-block is-flex is-align-items-flex-end is-justify-content-space-between">
                <div className="field">
                  <p className="control has-icons-left no-label no-bts">
                    <input
                      type="text"
                      className="input"
                      onChange={handleInputChange}
                      placeholder="Search by Staff ID"
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
                    <span> Staff ID</span>
                  </div>
                  <div className="custom-table-cell">
                    <span> Email</span>
                  </div>
                  <div className="custom-table-cell">
                    <span> Name</span>
                  </div>
                  <div className="custom-table-cell">
                    <span> Status</span>
                  </div>
                  <div className="custom-table-cell">
                    <span> Actions</span>
                  </div>
                </div>
                {/* {renderAdminUserList()} */}
              </div>
              {/* {renderPagination()} */}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

SupervisorsList.propTypes = {
  activateUser: PropTypes.func.isRequired,
  getAdminUsers: PropTypes.func.isRequired,
  deactivateUser: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
  resendConfirmationEmail: PropTypes.func.isRequired,
};

export default connect(null, {
  activateUser,
  getAdminUsers,
  deactivateUser,
  showNotification,
  resendConfirmationEmail,
})(SupervisorsList);