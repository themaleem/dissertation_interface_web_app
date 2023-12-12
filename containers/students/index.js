import useSWR, { mutate } from "swr";
import Router from "next/router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import { useCallback, useMemo, useState } from "react";
import { confirmDialog } from "primereact/confirmdialog";

import { getPath } from "../../config/urls";
import ModalWrapper from "../../components/modal";
import ImageComponent from "../../components/image";
import Pagination from "../../components/pagination";
import EditModal from "../superadmin/admins/editModal";
import { createStringifiedUrl } from "../../lib/objects";
import getStudents from "../../actions/students/getStudents";
import activateUser from "../../actions/superadmin/activateUser";
import SearchIconImage from "../../public/images/search-icon.svg";
import deactivateUser from "../../actions/superadmin/deactivateUser";
import { showNotification } from "../../reducers/notification/notificationReducer";
import EmptyStateSVG from "../../public/images/038-drawkit-nature-man-monochrome.svg";
import SupervisorsInvitesSkeleton from "../../components/skeletons/supervisors/invites";

const USER_TYPE = "Student";
const inviteStudentPath = getPath("inviteStudentPath").href;

const StudentsList = ({
  auth,
  getStudents,
  activateUser,
  deactivateUser,
  showNotification,
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

  const baseUrl = useMemo(() => {
    const params = {
      pageSize,
      PageNumber: pageNumber,
    };

    if (searchValue) params.SearchByUserName = searchValue;
    return createStringifiedUrl(getPath("studentsPath").route, params);
  }, [pageNumber, pageSize, searchValue]);

  const [openEditModal, setOpenEditModal] = useState(false);

  const toggleEditModal = useCallback((user) => {
    setSelectedUser(user);
    setOpenEditModal((open) => !open);
  }, []);

  const { data } = useSWR(baseUrl, getStudents);

  const mutateResources = useCallback(() => mutate(baseUrl), [baseUrl]);

  const handleActivateUser = useCallback(
    (email) => {
      return activateUser({ email })
        .then(() => {
          mutateResources();
          showNotification("Student has been activated successfully");
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
          showNotification("Student has been deactivated successfully");
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
      header: "Deactivate Student",
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
          userType={USER_TYPE}
          closeModal={toggleEditModal}
          mutateResources={mutateResources}
        />
      </ModalWrapper>
    );
  };

  const renderStudentsList = () => {
    if (!data?.result) return <SupervisorsInvitesSkeleton rows={5} />;

    if (data.result.totalCount === 0) {
      return (
        <div className="empty-state">
          <ImageComponent src={EmptyStateSVG} alt="empty state image" />
          <p>No results found. Please try a different search.</p>
        </div>
      );
    }

    return (
      <>
        <div className="custom-table">
          <div className="custom-table-row header">
            <div className="custom-table-cell">
              <span>Student ID</span>
            </div>
            <div className="custom-table-cell">
              <span>Email</span>
            </div>
            <div className="custom-table-cell">
              <span>Name</span>
            </div>
            <div className="custom-table-cell">
              <span>Status</span>
            </div>
            <div className="custom-table-cell">
              <span>Actions</span>
            </div>
          </div>
          {data.result.data.map((user, index) => {
            return (
              <div key={index} className="custom-table-row">
                <div className="custom-table-cell">
                  <span title={user.userName}> {user.userName} </span>
                </div>
                <div className="custom-table-cell">
                  <span title={user.email}>{user.email}</span>
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
      {renderEditModal()}
      <section className="manage-admin-section">
        <div className="section-wrapper">
          <div className="container">
            <div className="request-block">
              <div className="dashboard-header">
                <div className="dashboard-header-inner">
                  <h3>Students</h3>

                  <div className="btn-group">
                    <button type="button" className="button">
                      Upload a list
                    </button>
                    <button
                      type="button"
                      className="button is-primary"
                      onClick={() => Router.push(inviteStudentPath)}
                    >
                      Invite new student
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
                      placeholder="Search by Username"
                    />
                    <span className="searxh-icon-img">
                      <ImageComponent src={SearchIconImage} alt="search icon" />
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="custom-table-wrapper">{renderStudentsList()}</div>
          </div>
        </div>
      </section>
    </>
  );
};

StudentsList.propTypes = {
  getStudents: PropTypes.func.isRequired,
  activateUser: PropTypes.func.isRequired,
  deactivateUser: PropTypes.func.isRequired,
  showNotification: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default connect(null, {
  getStudents,
  activateUser,
  deactivateUser,
  showNotification,
})(StudentsList);
