import Router from "next/router";
import PropTypes from "prop-types";
import useSWR, { mutate } from "swr";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import { useCallback, useState } from "react";

import EditModal from "./courseModal";
import { getPath } from "../../../../../config/urls";
import ModalWrapper from "../../../../../components/modal";
import ImageComponent from "../../../../../components/image";
import Pagination from "../../../../../components/pagination";
import { createStringifiedUrl } from "../../../../../lib/objects";
import SearchIconImage from "../../../../../public/images/search-icon.svg";
import getCourses from "../../../../../actions/systemConfig/course/getCourses";
import PaginationSkeleton from "../../../../../components/skeletons/pagination";
import AdminUserSkeleton from "../../../../../components/skeletons/superadmin/adminUsers";

const newCoursePath = getPath("newCoursePath").href;

const Courses = ({ auth, getCourses }) => {
  const [pageSize] = useState(10);
  const [pageNumber, setPageNumber] = useState(1);
  const [selectedCourse, setSelectedCourse] = useState();
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

  const baseUrl = createStringifiedUrl(getPath("coursesPath").route, {
    pageSize,
    PageNumber: pageNumber,
    SearchByName: searchValue,
  });

  const [openEditModal, setOpenEditModal] = useState(false);

  const toggleEditModal = useCallback((course) => {
    setSelectedCourse(course);
    setOpenEditModal((open) => !open);
  }, []);

  const { data } = useSWR(baseUrl, getCourses);

  const mutateResources = useCallback(() => mutate(baseUrl), [baseUrl]);

  const renderEditModal = () => {
    return (
      <ModalWrapper
        open={openEditModal}
        closeModal={toggleEditModal}
        options={{ closeOnEsc: false, closeOnOverlayClick: false }}
      >
        <EditModal
          auth={auth}
          course={selectedCourse}
          closeModal={toggleEditModal}
          mutateResources={mutateResources}
        />
      </ModalWrapper>
    );
  };

  const renderCourseList = useCallback(() => {
    if (!data?.result) return <AdminUserSkeleton rows={3} />;

    return (
      <>
        {data.result.data.map((course, index) => {
          return (
            <div key={index} className="custom-table-row">
              <div className="custom-table-cell">
                <span> {index + 1} </span>
              </div>
              <div className="custom-table-cell">
                <span title="johndoe@sheffielduni.co">{course.name}</span>
              </div>
              <div className="custom-table-cell">
                <span> {course.createdBy} </span>
              </div>
              <div className="custom-table-cell">
                <span title="John Doe">{course.department.name}</span>
              </div>
              <div className="custom-table-cell">
                <button
                  type="button"
                  className="button"
                  onClick={() => toggleEditModal(course)}
                >
                  Edit
                </button>
              </div>
            </div>
          );
        })}
      </>
    );
  }, [data, toggleEditModal]);

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
                  <h3>Courses</h3>
                  <button
                    type="button"
                    className="button is-primary"
                    onClick={() => Router.push(newCoursePath)}
                  >
                    Add new course
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
                      <ImageComponent src={SearchIconImage} />
                    </span>
                  </p>
                </div>
              </div>
            </div>
            <div className="custom-table-wrapper">
              <div className="custom-table">
                <div className="custom-table-row header">
                  <div className="custom-table-cell">
                    <span>S/N</span>
                  </div>
                  <div className="custom-table-cell">
                    <span>Name</span>
                  </div>
                  <div className="custom-table-cell">
                    <span>Created By</span>
                  </div>
                  <div className="custom-table-cell">
                    <span>Dapartment</span>
                  </div>
                  <div className="custom-table-cell">
                    <span>Actions</span>
                  </div>
                </div>
                {renderCourseList()}
              </div>
              {renderPagination()}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

Courses.propTypes = {
  getCourses: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default connect(null, { getCourses })(Courses);
