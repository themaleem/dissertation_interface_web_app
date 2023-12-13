import useSWR from "swr";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import Skeleton from "react-loading-skeleton";

import { getPath } from "../../../../../config/urls";
import { createStringifiedUrl } from "../../../../../lib/objects";
import SuspenseComponent from "../../../../../components/suspense";
import getCourses from "../../../../../actions/systemConfig/course/getCourses";
import AsyncSelectInput from "../../../../../components/inputs/asyncSelectInput";

const CourseSearch = ({
  id,
  auth,
  meta,
  multi,
  input,
  loading,
  onChange,
  clearable,
  className,
  searchable,
  getCourses,
  placeholder,
  defaultValue,
  cacheOptions,
  getOptionValue,
  getOptionLabel,
}) => {
  const baseUrl = createStringifiedUrl(getPath("activeCoursesPath").route);

  const { data } = useSWR(baseUrl, getCourses);

  const defaultOptions = (data?.result || []).map((course) => {
    return {
      value: course.id,
      label: course.name,
    };
  });

  let handleCourseSearch = (value, callback) => {
    const name = value.trim();
    if (!name.length) {
      callback(defaultOptions);
      return;
    }

    const url = createStringifiedUrl(baseUrl, { SearchByName: name });

    getCourses(url)
      .then((response) => {
        let options = [];
        if (response.result) {
          options = response.result.map((course) => ({
            value: course.id,
            label: course.name,
          }));
        }
        callback(options);
      })
      .catch();
  };

  handleCourseSearch = debounce(handleCourseSearch, 300);

  const renderSkeleton = () => <Skeleton height={35} width={200} />;

  const renderComponent = () => {
    return (
      <AsyncSelectInput
        id={id}
        meta={meta}
        multi={multi}
        input={input}
        onChange={onChange}
        className={className}
        clearable={clearable}
        searchable={searchable}
        placeholder={placeholder}
        cacheOptions={cacheOptions}
        defaultValue={defaultValue}
        getOptionLabel={getOptionLabel}
        getOptionValue={getOptionValue}
        defaultOptions={defaultOptions}
        loadOptions={handleCourseSearch}
      />
    );
  };

  return (
    <SuspenseComponent
      noAuth
      hasData
      auth={auth}
      skeleton={renderSkeleton}
      component={renderComponent}
      data={loading ? undefined : data}
    />
  );
};

CourseSearch.defaultProps = {
  multi: false,
  loading: false,
  meta: undefined,
  clearable: false,
  input: undefined,
  searchable: false,
  cacheOptions: false,
  onChange: undefined,
  placeholder: undefined,
  defaultValue: undefined,
  getOptionValue: undefined,
  getOptionLabel: undefined,
};

CourseSearch.propTypes = {
  multi: PropTypes.bool,
  loading: PropTypes.bool,
  onChange: PropTypes.func,
  clearable: PropTypes.bool,
  searchable: PropTypes.bool,
  cacheOptions: PropTypes.bool,
  placeholder: PropTypes.string,
  getOptionValue: PropTypes.func,
  getOptionLabel: PropTypes.func,
  input: PropTypes.instanceOf(Object),
  getCourses: PropTypes.func.isRequired,
  meta: PropTypes.objectOf(PropTypes.any),
  defaultValue: PropTypes.instanceOf(Array),
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default connect(null, { getCourses })(CourseSearch);
