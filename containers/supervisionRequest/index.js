import useSWR from "swr";
import { debounce } from "lodash";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useCallback, useMemo, useState } from "react";

import { getPath } from "../../config/urls";
import ImageComponent from "../../components/image";
import Pagination from "../../components/pagination";
import SupervisorRequestItem from "./supervisorRequestItem";
import SearchIconImage from "../../public/images/search-icon.svg";
import { capitalize, createStringifiedUrl } from "../../lib/objects";
import getSupervisonRequests from "../../actions/superadmin/getSupervisionRequests";
import EmptyStateSVG from "../../public/images/038-drawkit-nature-man-monochrome.svg";
import SupervisionRequestsSkeleton from "../../components/skeletons/supervisor/supervisionRequests";

const SupervisorRequestsList = ({
  auth,
  path,
  status,
  getSupervisonRequests,
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
    const params = {
      pageSize,
      PageNumber: pageNumber,
      FilterByStatus: status,
    };
    if (searchValue) params.SearchByUserName = searchValue;
    return createStringifiedUrl(getPath(path).route, params);
  }, [pageNumber, pageSize, path, searchValue, status]);

  const { data } = useSWR(baseUrl, getSupervisonRequests);

  const renderSupervisionRequestsList = () => {
    if (!data?.result)
      return <SupervisionRequestsSkeleton rows={12} status={status} />;

    if (data.result.totalCount === 0) {
      return (
        <div className="empty-state">
          <ImageComponent src={EmptyStateSVG} alt="empty state image" />
          <p>
            No {status} requests found.{" "}
            {searchValue && "Please try a different search."}
          </p>
        </div>
      );
    }

    return (
      <>
        <div className="request-card-list has-tp">
          {data.result.data.map((request) => {
            return (
              <SupervisorRequestItem
                auth={auth}
                key={request.id}
                request={request}
              />
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
    <section className="request-section has-top">
      <div className="section-wrapper">
        <div className="container">
          <div className="request-block">
            <div className="dashboard-header">
              <div className="dashboard-header-inner">
                <h3>{capitalize(status)} requests</h3>
              </div>
            </div>
            <div className="search-block is-flex is-align-items-flex-end is-justify-content-space-between">
              <h6 className="search-block-results"></h6>
              <div className="field is-grid">
                <p className="control has-icons-left no-label no-bts">
                  <input
                    type="text"
                    className="input"
                    placeholder="Search list"
                    onChange={handleInputChange}
                  />
                  <span className="searxh-icon-img">
                    <ImageComponent src={SearchIconImage} alt="search icon" />
                  </span>
                </p>
                <div className="control no-bts">
                  <select name id>
                    <option value>Name (A-Z)</option>
                  </select>
                  <label htmlFor> Sort by </label>
                </div>
              </div>
            </div>
            {renderSupervisionRequestsList()}
          </div>
        </div>
      </div>
    </section>
  );
};

SupervisorRequestsList.propTypes = {
  path: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
  getSupervisonRequests: PropTypes.func.isRequired,
};

export default connect(null, { getSupervisonRequests })(SupervisorRequestsList);
