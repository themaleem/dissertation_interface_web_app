import useSWR from "swr";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import { useCallback, useState } from "react";

import DepartmentModal from "./departmentModal";
import { getPath } from "../../../../config/urls";
import ModalWrapper from "../../../../components/modal";
import ImageComponent from "../../../../components/image";
import Pagination from "../../../../components/pagination";
import { dateWithSlashes } from "../../../../lib/dateUtils";
import { createStringifiedUrl } from "../../../../lib/objects";
import SearchIconImage from "../../../../public/images/search-icon.svg";
import DepartmentSkeleton from "../../../../components/skeletons/department";
import getDepartments from "../../../../actions/systemConfig/departments/getDepartments";
import EmptyStateSVG from "../../../../public/images/038-drawkit-nature-man-monochrome.svg";

const Departments = ({ getDepartments }) => {
  const [pageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [openModal, setOpenModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [actionType, setActionType] = useState("create");
  const [selectedDepartment, setSelectedDepartment] = useState();

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

  const baseUrl = createStringifiedUrl(getPath("departmentsPath").route, {
    pageSize,
    PageNumber: pageNumber,
    SearchByName: searchValue,
  });

  const toggleModal = useCallback((department = undefined) => {
    if (department) {
      setSelectedDepartment(department);
      setActionType("edit");
    } else {
      setActionType("create");
      setSelectedDepartment();
    }
    setOpenModal((state) => !state);
  }, []);

  const { data, mutate } = useSWR(baseUrl, getDepartments);

  const mutateResources = useCallback(() => mutate(baseUrl), [baseUrl, mutate]);

  const renderDepartmentModal = useCallback(() => {
    return (
      <ModalWrapper
        open={openModal}
        closeModal={toggleModal}
        options={{ closeOnEsc: false, closeOnOverlayClick: false }}
      >
        <DepartmentModal
          actionType={actionType}
          closeModal={toggleModal}
          department={selectedDepartment}
          mutateResources={mutateResources}
        />
      </ModalWrapper>
    );
  }, [actionType, openModal, toggleModal, mutateResources, selectedDepartment]);

  const renderDepartmentsList = () => {
    if (!data?.result) return <DepartmentSkeleton rows={5} />;

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
        <div className="custom-table dept">
          <div className="custom-table-row header">
            <div className="custom-table-cell">
              <span>S/N</span>
            </div>
            <div className="custom-table-cell">
              <span> Name</span>
            </div>
            <div className="custom-table-cell">
              <span>Email</span>
            </div>
            <div className="custom-table-cell">
              <span> Date Created</span>
            </div>
            <div className="custom-table-cell">
              <span> Actions</span>
            </div>
          </div>
          {data.result.data.map((department, index) => {
            return (
              <div key={index} className="custom-table-row">
                <div className="custom-table-cell">
                  <span> {index + 1} </span>
                </div>
                <div className="custom-table-cell">
                  <span title={department.name}> {department.name} </span>
                </div>
                <div className="custom-table-cell">
                  <span title={department.createdBy}>
                    {department.createdBy}
                  </span>
                </div>
                <div className="custom-table-cell">
                  <span title={dateWithSlashes(department.createdAt)}>
                    {dateWithSlashes(department.createdAt)}
                  </span>
                </div>
                <div className="custom-table-cell">
                  <button
                    type="button"
                    className="button"
                    onClick={() => toggleModal(department)}
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

  return (
    <>
      {renderDepartmentModal()}
      <section className="manage-admin-section">
        <div className="section-wrapper">
          <div className="container">
            <div className="request-block">
              <div className="dashboard-header">
                <div className="dashboard-header-inner">
                  <h3>Departments</h3>
                  <button
                    type="button"
                    onClick={() => toggleModal()}
                    className="button is-primary"
                  >
                    Add new department
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
                      placeholder="Search by name"
                    />
                    <span className="searxh-icon-img">
                      <ImageComponent src={SearchIconImage} alt="search icon" />
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="custom-table-wrapper">
              {renderDepartmentsList()}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

Departments.propTypes = { getDepartments: PropTypes.func.isRequired };

export default connect(null, { getDepartments })(Departments);
