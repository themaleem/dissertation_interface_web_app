import Router from "next/router";
import PropTypes from "prop-types";
import useSWR, { mutate } from "swr";
import { connect } from "react-redux";
import { useCallback, useState } from "react";

import EditCohortModal from "./editCohortModal";
import { getPath } from "../../../../../config/urls";
import ModalWrapper from "../../../../../components/modal";
import Pagination from "../../../../../components/pagination";
import { createStringifiedUrl } from "../../../../../lib/objects";
import { toDayMonthYearLong } from "../../../../../lib/dateUtils";
import getCohorts from "../../../../../actions/systemConfig/cohort/getCohorts";
import PaginationSkeleton from "../../../../../components/skeletons/pagination";
import AdminUserSkeleton from "../../../../../components/skeletons/superadmin/adminUsers";
import { showNotification } from "../../../../../reducers/notification/notificationReducer";

const newDissertationCohortsPath = getPath("newDissertationCohortsPath").href;

const Cohorts = ({ auth, getCohorts }) => {
  const [pageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedCohort, setCohort] = useState();

  const handlePageChange = (pageNum) => setPageNumber(pageNum);

  const baseUrl = createStringifiedUrl(
    getPath("dissertationCohortsPath").route,
    { PageNumber: pageNumber },
  );

  const [openEditModal, setOpenEditModal] = useState(false);

  const toggleEditModal = useCallback((cohort) => {
    setCohort(cohort);
    setOpenEditModal((open) => !open);
  }, []);

  const { data } = useSWR(baseUrl, getCohorts);

  const mutateResources = useCallback(() => mutate(baseUrl), [baseUrl]);

  const renderEditModal = useCallback(() => {
    return (
      <ModalWrapper
        open={openEditModal}
        closeModal={toggleEditModal}
        options={{ closeOnEsc: false, closeOnOverlayClick: false }}
      >
        <EditCohortModal
          auth={auth}
          cohort={selectedCohort}
          closeModal={toggleEditModal}
          mutateResources={mutateResources}
        />
      </ModalWrapper>
    );
  }, [auth, mutateResources, openEditModal, selectedCohort, toggleEditModal]);

  const renderCohortList = useCallback(() => {
    if (!data?.result) return <AdminUserSkeleton rows={3} />;

    return (
      <>
        {data.result.data.map((cohort, index) => {
          return (
            <div key={index} className="custom-table-row">
              <div className="custom-table-cell">
                <span> {toDayMonthYearLong(cohort.startDate)} </span>
              </div>
              <div className="custom-table-cell">
                <span>
                  {toDayMonthYearLong(cohort.supervisionChoiceDeadline)}
                </span>
              </div>
              <div className="custom-table-cell">
                <span> {toDayMonthYearLong(cohort.endDate)}</span>
              </div>
              <div className="custom-table-cell">
                <button
                  type="button"
                  className="button"
                  onClick={() => toggleEditModal(cohort)}
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </>
    );
  }, [data?.result, toggleEditModal]);

  const renderPagination = useCallback(() => {
    if (!data?.result) return <PaginationSkeleton />;

    return (
      <Pagination
        pageSize={pageSize}
        currentPageNumber={pageNumber}
        onPageChange={handlePageChange}
        totalRecords={data.result.totalCount}
      />
    );
  }, [data?.result, pageNumber, pageSize]);

  return (
    <>
      {renderEditModal()}
      <section className="manage-admin-section">
        <div className="section-wrapper">
          <div className="container">
            <div className="request-block">
              <div className="dashboard-header">
                <div className="dashboard-header-inner">
                  <h3>Cohorts</h3>
                  <button
                    type="button"
                    className="button is-primary"
                    onClick={() => Router.push(newDissertationCohortsPath)}
                  >
                    New Dissertation Cohort
                  </button>
                </div>
              </div>
            </div>
            <div className="custom-table-wrapper">
              <div className="custom-table acayr">
                <div className="custom-table-row header">
                  <div className="custom-table-cell">
                    <span> Start Date</span>
                  </div>
                  <div className="custom-table-cell">
                    <span> Supervision Deadline</span>
                  </div>
                  <div className="custom-table-cell">
                    <span> End Date</span>
                  </div>
                  <div className="custom-table-cell">
                    <span> Actions</span>
                  </div>
                </div>
                {renderCohortList()}
              </div>
              {renderPagination()}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

Cohorts.propTypes = {
  getCohorts: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default connect(null, { showNotification, getCohorts })(Cohorts);
