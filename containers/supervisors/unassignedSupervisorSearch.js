import { useMemo } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import debounce from "lodash/debounce";
import Skeleton from "react-loading-skeleton";

import { getPath } from "../../config/urls";
import useWithSWR from "../../components/swr/withSwr";
import { createStringifiedUrl } from "../../lib/objects";
import SuspenseComponent from "../../components/suspense";
import getSupervisors from "../../actions/supervisors/getSupervisors";
import AsyncSelectInput from "../../components/inputs/asyncSelectInput";

const UnassignedSupervisorSearch = ({
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
  getSupervisors,
  getOptionLabel,
  dissertationCohortId,
}) => {
  const baseUrl = useMemo(() => {
    const params = {};

    if (dissertationCohortId)
      params.dissertationCohortId = dissertationCohortId;

    return createStringifiedUrl(
      getPath("unassignedCohortSupevisors").route,
      params,
    );
  }, [dissertationCohortId]);

  const { data } = useWithSWR({
    auth,
    baseUrl,
    fetcher: getSupervisors,
  });

  const defaultOptions = (data?.result.data || []).map((supervisor) => {
    return {
      value: supervisor.id,
      label: supervisor.userName,
    };
  });

  let handleSupervisorSearch = (value, callback) => {
    const username = value.trim();
    if (!username.length) {
      callback(defaultOptions);
      return;
    }

    const params = { SearchByUserName: username };
    if (dissertationCohortId)
      params.dissertationCohortId = dissertationCohortId;

    const url = createStringifiedUrl(baseUrl, params);

    getSupervisors(url)
      .then((response) => {
        let options = [];
        if (response.result) {
          options = response.result.data.map((supervisor) => ({
            value: supervisor.id,
            label: supervisor.userName,
          }));
        }
        callback(options);
      })
      .catch();
  };

  handleSupervisorSearch = debounce(handleSupervisorSearch, 300);

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
        loadOptions={handleSupervisorSearch}
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

UnassignedSupervisorSearch.defaultProps = {
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
  dissertationCohortId: undefined,
};

UnassignedSupervisorSearch.propTypes = {
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
  dissertationCohortId: PropTypes.string,
  meta: PropTypes.objectOf(PropTypes.any),
  defaultValue: PropTypes.instanceOf(Array),
  getSupervisors: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default connect(null, { getSupervisors })(UnassignedSupervisorSearch);
