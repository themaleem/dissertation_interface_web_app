import Router from "next/router";
import PropTypes from "prop-types";
import useSWR, { mutate } from "swr";
import { connect } from "react-redux";
import { useCallback, useState } from "react";
import Skeleton from "react-loading-skeleton";

import EditCohortModal from "./editCohortModal";
import { getPath } from "../../../../config/urls";
import Suspense from "../../../../components/suspense";
import ModalWrapper from "../../../../components/modal";
import ImageComponent from "../../../../components/image";
import Pagination from "../../../../components/pagination";
import { createStringifiedUrl } from "../../../../lib/objects";
import { toDayMonthYearLong } from "../../../../lib/dateUtils";
import getCohorts from "../../../../actions/systemConfig/cohort/getCohorts";
import AcademicYearSkeleton from "../../../../components/skeletons/academicYear";
import getActiveCohort from "../../../../actions/systemConfig/cohort/getActiveCohort";
import EmptyStateSVG from "../../../../public/images/038-drawkit-nature-man-monochrome.svg";

const newDissertationCohortsPath = getPath("newDissertationCohortsPath").href;
const activeDissertationCohortPath = getPath(
  "activeDissertationCohortPath",
).href;

const Cohorts = ({ auth, getCohorts, getActiveCohort }) => {
  const [pageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedCohort, setCohort] = useState();

  const handlePageChange = (pageNum) => setPageNumber(pageNum);

  const baseUrl = createStringifiedUrl(
    getPath("dissertationCohortsPath").route,
    { PageNumber: pageNumber },
  );

  const activeCohortUrl = createStringifiedUrl(
    getPath("activeDissertationCohortPath").route,
  );

  const { data: activeCohortData } = useSWR(activeCohortUrl, getActiveCohort);

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

  const renderCohortList = () => {
    if (!data?.result) return <AcademicYearSkeleton rows={5} />;

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

  const activeCohortButtonSkeleton = () => <Skeleton width={120} height={50} />;

  const activeCohortButton = () => (
    <button
      type="button"
      className="button"
      onClick={() => Router.push(activeDissertationCohortPath)}
    >
      Go to Active Cohort
    </button>
  );

  const renderActiveCohortButton = () => {
    return (
      <Suspense
        auth={auth}
        data={activeCohortData}
        component={activeCohortButton}
        hasData={activeCohortData?.isSuccess}
        skeleton={activeCohortButtonSkeleton}
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
                  <h3>Cohorts</h3>

                  <div className="btn-group">
                    {renderActiveCohortButton()}
                    <button
                      type="button"
                      className="button is-primary"
                      onClick={() => Router.push(newDissertationCohortsPath)}
                    >
                      Create New Cohort
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="custom-table-wrapper">{renderCohortList()}</div>
          </div>
        </div>
      </section>
    </>
  );
};

Cohorts.propTypes = {
  getCohorts: PropTypes.func.isRequired,
  getActiveCohort: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default connect(null, { getCohorts, getActiveCohort })(Cohorts);
