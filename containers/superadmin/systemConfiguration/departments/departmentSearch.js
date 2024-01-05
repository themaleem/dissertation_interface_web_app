import useSWR from "swr";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import Skeleton from "react-loading-skeleton";

import { getPath } from "../../../../config/urls";
import { createStringifiedUrl } from "../../../../lib/objects";
import SuspenseComponent from "../../../../components/suspense";
import AsyncSelectInput from "../../../../components/inputs/asyncSelectInput";
import getDepartments from "../../../../actions/systemConfig/departments/getDepartments";

const DepartmentSearch = ({
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
  placeholder,
  defaultValue,
  cacheOptions,
  getOptionValue,
  getDepartments,
  getOptionLabel,
}) => {
  const baseUrl = createStringifiedUrl(getPath("activeDepartmentsPath").route);

  const { data } = useSWR(baseUrl, getDepartments);

  const defaultOptions = (data?.result || []).map((department) => {
    return {
      value: department.id,
      label: department.name,
    };
  });

  let handleDepartmentSearch = (value, callback) => {
    const name = value.trim();
    if (!name.length) {
      callback(defaultOptions);
      return;
    }

    const url = createStringifiedUrl(baseUrl, { SearchByName: name });

    getDepartments(url)
      .then((response) => {
        let options = [];
        if (response.result) {
          options = response.result.map((department) => ({
            value: department.id,
            label: department.name,
          }));
        }
        callback(options);
      })
      .catch();
  };

  handleDepartmentSearch = debounce(handleDepartmentSearch, 300);

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
        loadOptions={handleDepartmentSearch}
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

DepartmentSearch.defaultProps = {
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

DepartmentSearch.propTypes = {
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
  meta: PropTypes.objectOf(PropTypes.any),
  getDepartments: PropTypes.func.isRequired,
  defaultValue: PropTypes.instanceOf(Array),
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default connect(null, { getDepartments })(DepartmentSearch);
