import useSWR from "swr";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import { useCallback, useState } from "react";

import { getPath } from "../../config/urls";
import ImageComponent from "../../components/image";
import Pagination from "../../components/pagination";
import SearchIconImage from "../../public/images/search-icon.svg";
import { capitalize, createStringifiedUrl } from "../../lib/objects";
import AdminUserSkeleton from "../../components/skeletons/superadmin/adminUsers";
import getSupervisonRequests from "../../actions/superadmin/getSupervisionRequests";
import EmptyStateSVG from "../../public/images/038-drawkit-nature-man-monochrome.svg";

const SupervisionRequestList = ({ getSupervisonRequests }) => {
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

  const baseUrl = createStringifiedUrl(
    getPath("supervisionRequestsPath").route,
    {
      pageSize,
      PageNumber: pageNumber,
      SearchBySupervisor: searchValue,
    },
  );

  const { data, mutate } = useSWR(baseUrl, getSupervisonRequests);

  // const mutateResources = useCallback(() => mutate(baseUrl), [baseUrl]);

  const renderSupervisionRequestsList = () => {
    if (!data?.result) return <AdminUserSkeleton rows={5} />;

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
              <span>S/N</span>
            </div>
            <div className="custom-table-cell">
              <span>Student</span>
            </div>
            <div className="custom-table-cell">
              <span>Supervisor</span>
            </div>
            <div className="custom-table-cell">
              <span>Status</span>
            </div>
            <div className="custom-table-cell">
              <span>Actions</span>
            </div>
          </div>
          {data.result.data.map((request, index) => {
            const { status, studentDetails, supervisorDetails } = request;

            return (
              <div key={request.id} className="custom-table-row">
                <div className="custom-table-cell">
                  <span> {index + 1} </span>
                </div>
                <div className="custom-table-cell">
                  <span
                    title={`${supervisorDetails.firstName} ${supervisorDetails.lastName}`}
                  >
                    {supervisorDetails.firstName} {supervisorDetails.lastName}
                  </span>
                </div>
                <div className="custom-table-cell">
                  <span
                    title={`${studentDetails.firstName} ${studentDetails.lastName}`}
                  >
                    {studentDetails.firstName} {studentDetails.lastName}
                  </span>
                </div>
                <div className="custom-table-cell">
                  <span> {capitalize(status)} </span>
                </div>
                <div className="custom-table-cell">
                  <span> {index + 1} </span>
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
    <section className="manage-admin-section">
      <div className="section-wrapper">
        <div className="container">
          <div className="request-block">
            <div className="dashboard-header">
              <div className="dashboard-header-inner">
                <h3>Supervision Requests</h3>
              </div>
            </div>
            <div className="search-block is-flex is-align-items-flex-end is-justify-content-space-between">
              <div className="field">
                <p className="control has-icons-left no-label no-bts">
                  <input
                    type="text"
                    className="input"
                    onChange={handleInputChange}
                    placeholder="Search by Supervisor"
                  />
                  <span className="searxh-icon-img">
                    <ImageComponent src={SearchIconImage} alt="search icon" />
                  </span>
                </p>
              </div>
            </div>
          </div>
          <div className="custom-table-wrapper">
            {renderSupervisionRequestsList()}
          </div>
        </div>
      </div>
    </section>
  );
};

SupervisionRequestList.propTypes = {
  getSupervisonRequests: PropTypes.func.isRequired,
};

export default connect(null, { getSupervisonRequests })(SupervisionRequestList);
