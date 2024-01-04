import PropTypes from "prop-types";
import useSWR, { mutate } from "swr";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import { useCallback, useMemo, useState } from "react";
import { confirmDialog } from "primereact/confirmdialog";

import AddModal from "./addModal";
import { getPath } from "../../config/urls";
import ModalWrapper from "../../components/modal";
import ImageComponent from "../../components/image";
import Pagination from "../../components/pagination";
import { createStringifiedUrl } from "../../lib/objects";
import { showNotification } from "../../components/notification";
import SearchIconImage from "../../public/images/search-icon.svg";
import getSupervisors from "../../actions/supervisors/getSupervisors";
import EmptyStateSVG from "../../public/images/038-drawkit-nature-man-monochrome.svg";
import SupervisorsInvitesSkeleton from "../../components/skeletons/supervisors/invites";
import removeSupervisorFromCohort from "../../actions/supervisors/removeSupervisorFromCohort";

const CohortSupervisorsList = ({
  auth,
  getSupervisors,
  dissertationCohortId,
  removeSupervisorFromCohort,
}) => {
  const [pageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
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
    const params = { pageSize, PageNumber: pageNumber, dissertationCohortId };

    if (searchValue) params.SearchByUserName = searchValue;

    return createStringifiedUrl(
      getPath("assignedCohortSupevisors").route,
      params,
    );
  }, [dissertationCohortId, pageNumber, pageSize, searchValue]);

  const [openAddModal, setOpenAddModal] = useState(false);

  const toggleAddModal = useCallback(() => {
    setOpenAddModal((open) => !open);
  }, []);

  const { data } = useSWR(baseUrl, getSupervisors);

  const mutateResources = useCallback(() => mutate(baseUrl), [baseUrl]);

  const renderAddModal = () => {
    return (
      <ModalWrapper
        open={openAddModal}
        closeModal={toggleAddModal}
        options={{ closeOnEsc: false, closeOnOverlayClick: false }}
      >
        <AddModal
          auth={auth}
          closeModal={toggleAddModal}
          mutateResources={mutateResources}
          dissertationCohortId={dissertationCohortId}
        />
      </ModalWrapper>
    );
  };

  const handleRemoveFromCohort = useCallback(
    (supervisionCohortId) => {
      return removeSupervisorFromCohort(supervisionCohortId)
        .then(() => {
          mutateResources();
          showNotification({
            severity: "success",
            detail: "Supervisor has been removed successfully!",
          });
        })
        .catch((err) => {
          showNotification({ detail: err.message });
        });
    },
    [removeSupervisorFromCohort, mutateResources],
  );

  const onRemoveFromCohort = (supervisionCohortId) => {
    confirmDialog({
      icon: "pi pi-info-circle",
      header: "Remove Supervisor",
      acceptClassName: "button is-primary",
      accept: () => handleRemoveFromCohort(supervisionCohortId),
      message: "Are you sure you want to remove supervisor from cohort?",
    });
  };

  const renderCohortSupervisorsList = () => {
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
              <span>Staff ID</span>
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
          {data.result.data.map((supervisor, index) => {
            const { userDetails } = supervisor;

            return (
              <div key={index} className="custom-table-row">
                <div className="custom-table-cell">
                  <span title={userDetails.userName}>
                    {userDetails.userName}{" "}
                  </span>
                </div>
                <div className="custom-table-cell">
                  <span title={userDetails.email}>{userDetails.email}</span>
                </div>

                <div className="custom-table-cell">
                  <span
                    title={`${userDetails.firstName} ${userDetails.lastName}`}
                  >
                    {userDetails.firstName} {userDetails.lastName}
                  </span>
                </div>

                <div className="custom-table-cell">
                  <span>
                    {userDetails.isLockedOut ? "Inactive" : "Active"}{" "}
                  </span>
                </div>
                <div
                  className="custom-table-cell"
                  onClick={() => onRemoveFromCohort(supervisor.id)}
                >
                  <button type="button" className="button">
                    Remove
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
      {renderAddModal()}
      <section className="manage-admin-section">
        <div className="section-wrapper">
          <div className="container">
            <div className="request-block">
              <div className="dashboard-header">
                <div className="dashboard-header-inner">
                  <h3>Active Cohort Supervisors</h3>
                  <div className="btn-group">
                    <button
                      type="button"
                      onClick={toggleAddModal}
                      className="button is-primary"
                    >
                      Add supervisors
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
              {renderCohortSupervisorsList()}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

CohortSupervisorsList.propTypes = {
  getSupervisors: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
  removeSupervisorFromCohort: PropTypes.func.isRequired,
};

export default connect(null, { getSupervisors, removeSupervisorFromCohort })(
  CohortSupervisorsList,
);
