import PropTypes from "prop-types";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import Skeleton from "react-loading-skeleton";

import { getPath } from "../../../../config/urls";
import useWithSWR from "../../../../components/swr/withSwr";
import { dateWithSlashes } from "../../../../lib/dateUtils";
import { createStringifiedUrl } from "../../../../lib/objects";
import SuspenseComponent from "../../../../components/suspense";
import AsyncSelectInput from "../../../../components/inputs/asyncSelectInput";
import getAcademicYear from "../../../../actions/systemConfig/getAcademicYears";

const AcademicYearSearch = ({
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
  getAcademicYear,
  getOptionLabel,
}) => {
  const baseUrl = createStringifiedUrl(
    getPath("systemConfigurationPath").route,
  );

  const { data } = useWithSWR({
    auth,
    baseUrl,
    fetcher: getAcademicYear,
  });

  const defaultOptions = (data?.result.data || []).map((academicYear) => {
    return {
      value: academicYear.id,
      label: `${dateWithSlashes(academicYear.startDate)} - ${dateWithSlashes(
        academicYear.endDate,
      )}`,
    };
  });

  let handleAcademicYearSearch = (value, callback) => {
    const date = value.trim();
    if (!date.length) {
      callback(defaultOptions);
      return;
    }

    const url = createStringifiedUrl(baseUrl, { SearchByStartYear: date });

    getAcademicYear(url)
      .then((response) => {
        let options = [];
        if (response.result) {
          options = response.result.data.map((academicYear) => ({
            value: academicYear.id,
            label: `${dateWithSlashes(
              academicYear.startDate,
            )} - ${dateWithSlashes(academicYear.endDate)}`,
          }));
        }
        callback(options);
      })
      .catch();
  };

  handleAcademicYearSearch = debounce(handleAcademicYearSearch, 300);

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
        loadOptions={handleAcademicYearSearch}
      />
    );
  };

  return (
    <SuspenseComponent
      hasData
      auth={auth}
      skeleton={renderSkeleton}
      component={renderComponent}
      data={loading ? undefined : data}
    />
  );
};

AcademicYearSearch.defaultProps = {
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

AcademicYearSearch.propTypes = {
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
  defaultValue: PropTypes.instanceOf(Array),
  getAcademicYear: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default connect(null, { getAcademicYear })(AcademicYearSearch);
