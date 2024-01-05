import Router from "next/router";
import PropTypes from "prop-types";
import useSWR, { mutate } from "swr";
import { connect } from "react-redux";
import { useCallback, useState } from "react";

import { getPath } from "../../../config/urls";
import ModalWrapper from "../../../components/modal";
import ImageComponent from "../../../components/image";
import DetailsModal from "./academicYear/detailsModal";
import Pagination from "../../../components/pagination";
import { toDayMonthYearLong } from "../../../lib/dateUtils";
import { capitalize, createStringifiedUrl } from "../../../lib/objects";
import AcademicYearSkeleton from "../../../components/skeletons/academicYear";
import getAcademicYears from "../../../actions/systemConfig/getAcademicYears";
import EmptyStateSVG from "../../../public/images/038-drawkit-nature-man-monochrome.svg";

const newAcademicYearPath = getPath("newAcademicYearPath").href;

const SystemConfiguration = ({ auth, getAcademicYears }) => {
  const [pageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [modalType, setModalType] = useState("details");
  const [openDetailsModal, setOpenDetailsModal] = useState(false);
  const [selectedAcademicYear, setSelectedAcademicYear] = useState();

  const handlePageChange = (pageNum) => setPageNumber(pageNum);

  const baseUrl = createStringifiedUrl(
    getPath("systemConfigurationPath").route,
    { pageSize, PageNumber: pageNumber },
  );

  const toggleDetailsModal = useCallback((academicYear) => {
    if (academicYear) {
      setSelectedAcademicYear(academicYear);
    } else {
      setSelectedAcademicYear();
    }
    setModalType("details");
    setOpenDetailsModal((open) => !open);
  }, []);

  const { data } = useSWR(baseUrl, getAcademicYears);

  const mutateResources = useCallback(() => mutate(baseUrl), [baseUrl]);

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
          closeModal={toggleDetailsModal}
          mutateResources={mutateResources}
          academicYear={selectedAcademicYear}
        />
      </ModalWrapper>
    );
  }, [
    modalType,
    mutateResources,
    openDetailsModal,
    toggleDetailsModal,
    selectedAcademicYear,
  ]);

  const renderAcademicYears = () => {
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
              <span> End Date</span>
            </div>
            <div className="custom-table-cell">
              <span> Status</span>
            </div>
            <div className="custom-table-cell">
              <span> Actions</span>
            </div>
          </div>
          {data.result.data.map((academicYear, index) => {
            return (
              <div key={index} className="custom-table-row">
                <div className="custom-table-cell">
                  <span>{toDayMonthYearLong(academicYear.startDate)}</span>
                </div>
                <div className="custom-table-cell">
                  <span>{toDayMonthYearLong(academicYear.endDate)}</span>
                </div>
                <div className="custom-table-cell">
                  <span>{capitalize(academicYear.status)} </span>
                </div>
                <div className="custom-table-cell">
                  <button
                    type="button"
                    className="button"
                    onClick={() => toggleDetailsModal(academicYear)}
                  >
                    View Details
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
                  <h3>Academic Year</h3>
                  <button
                    type="button"
                    className="button is-primary"
                    onClick={() => Router.push(newAcademicYearPath)}
                  >
                    New academic year
                  </button>
                </div>
              </div>
            </div>
            <div className="custom-table-wrapper">{renderAcademicYears()}</div>
          </div>
        </div>
      </section>
    </>
  );
};

SystemConfiguration.propTypes = {
  getAcademicYears: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default connect(null, { getAcademicYears })(SystemConfiguration);
