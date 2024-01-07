import useSWR from "swr";
import { debounce } from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useCallback, useMemo, useState } from "react";

import { getPath } from "../../../config/urls";
import ModalWrapper from "../../../components/modal";
import ImageComponent from "../../../components/image";
import Pagination from "../../../components/pagination";
import { createStringifiedUrl } from "../../../lib/objects";
import SupervisorDetailsModal from "./supervisorDetailsModal";
import SearchIconImage from "../../../public/images/search-icon.svg";
import getStudentRequests from "../../../actions/student/getStudentRequests";
import getAvailableSupervisors from "../../../actions/student/getAvailableSupervisors";
import EmptyStateSVG from "../../../public/images/038-drawkit-nature-man-monochrome.svg";
import AvailableSupervisorsSkeleton from "../../../components/skeletons/student/availableSupervisors";

const AvailableSupervisors = ({
  auth,
  getStudentRequests,
  getAvailableSupervisors,
}) => {
  const [pageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [searchValue, setSearchValue] = useState("");
  const [selectedSupervisor, setSelectedSupervisor] = useState();
  const [openDetailsModal, setOpenDetailsModal] = useState(false);

  const toggleDetailsModal = useCallback((user) => {
    setSelectedSupervisor(user);
    setOpenDetailsModal((open) => !open);
  }, []);

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
    if (!auth.user?.id) return "";

    const params = { pageSize };

    return createStringifiedUrl(
      getPath("availableSupervisorsPath").route,
      params,
    );
  }, [auth.user?.id, pageSize]);

  const { data } = useSWR(baseUrl, getAvailableSupervisors);

  const studentRequestsUrl = useMemo(() => {
    return createStringifiedUrl(getPath("studentRequestsPath").route);
  }, []);

  const { data: existingRequestsData, mutate } = useSWR(
    studentRequestsUrl,
    getStudentRequests,
  );

  const existingRequests = useMemo(() => {
    if (!existingRequestsData?.result) return [];

    const requests = {};

    existingRequestsData.result.data.forEach((request) => {
      requests[request.supervisorDetails.id] = {
        requestId: request.id,
        supervisorId: request.supervisorDetails.id,
      };
    });
    return requests;
  }, [existingRequestsData?.result]);

  const afterRequest = () => mutate(studentRequestsUrl);

  const renderModal = () => {
    return (
      <ModalWrapper open={openDetailsModal} closeModal={toggleDetailsModal}>
        <SupervisorDetailsModal
          afterRequest={afterRequest}
          supervisor={selectedSupervisor}
          closeModal={toggleDetailsModal}
          request={existingRequests?.[selectedSupervisor?.userDetails?.id]}
        />
      </ModalWrapper>
    );
  };

  const renderSupervisorsList = () => {
    if (!data?.result) return <AvailableSupervisorsSkeleton />;

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
        <div className="request-card-list has-tp">
          {data.result.data.map((supervisor) => {
            const { userDetails } = supervisor;
            return (
              <div key={supervisor.id} className="request-card-list-card-item">
                <div className="request-card-list-card-item-inner">
                  <h5>
                    {userDetails.firstName} {userDetails.lastName}
                  </h5>
                  <p>Research topic</p>
                  <a
                    className="request-card-link"
                    onClick={() => toggleDetailsModal(supervisor)}
                  >
                    View details
                  </a>
                </div>
              </div>
            );
          })}
        </div>
        <Pagination
          pageSize={pageSize}
          extraTableClass="ext-one"
          currentPageNumber={pageNumber}
          onPageChange={handlePageChange}
          totalRecords={data.result.totalCount}
        />
      </>
    );
  };

  return (
    <>
      {renderModal()}
      <section className="request-section has-top">
        <div className="section-wrapper">
          <div className="container">
            <div className="request-block">
              <div className="dashboard-header">
                <div className="dashboard-header-inner">
                  <h3>Available Supervisors</h3>
                </div>
              </div>
              <div className="search-block is-flex is-align-items-flex-end is-justify-content-space-between">
                <h6 className="search-block-results"></h6>
                <div className="field is-grid">
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
                  <div className="control">
                    <select name id>
                      <option value>Name (A-Z)</option>
                    </select>
                    <label> Sort by </label>
                  </div>
                </div>
              </div>
              {renderSupervisorsList()}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

AvailableSupervisors.propTypes = {
  getStudentRequests: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
  getAvailableSupervisors: PropTypes.func.isRequired,
};

export default connect(null, { getAvailableSupervisors, getStudentRequests })(
  AvailableSupervisors,
);
