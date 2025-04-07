import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import { Dropdown } from "primereact/dropdown";

import debounce from "lodash/debounce";
import { connect } from "react-redux";
import { getPath } from "../../config/urls";
import useWithSWR from "../swr/withSwr";
import { dateWithSlashes } from "../../lib/dateUtils";
import { createStringifiedUrl } from "../../lib/objects";
import getAcademicYear from "../../actions/systemConfig/getAcademicYears";
import getCourses from "../../actions/systemConfig/course/getCourses";
import SuspenseComponent from "../suspense";
import Skeleton from "react-loading-skeleton";

const AcademicYearSearchB = ({
  id,
  auth,
  meta,
  multi,
  input,
  loading,
  onChange,
  getCourses,
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
  const [value, setValue] = useState("");
  const [options, setOptions] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [loadDefault, setLoadDefault] = useState(false);

  const baseUrl = createStringifiedUrl(getPath("activeCoursesPath").route);

  const { data } = useWithSWR({
    auth,
    baseUrl,
    fetcher: getCourses,
  });

  // const defaultOptions = (data?.result || []).map((course) => {
  //   return {
  //     value: course.id,
  //     label: course.name,
  //   };
  // });

  // const defaultOptions = useMemo(() => {
  //   return (data.result || []).map((course) => {
  //     return {
  //       value: course.id,
  //       label: course.name,
  //     };
  //   });
  // }, [data.result]);

  useEffect(() => {
    if (data.result && !loadDefault) {
      const formattedOptions = (data.result || []).map((course) => ({
        value: course.id,
        label: course.name,
      }));
      setOptions(formattedOptions);
      setLoadDefault(true);
    }
    // @note might not need data here
  }, [data, loadDefault]);

  const handleDropdownChange = (e) => {
    setValue(e.value);
  };

  const searchDepartments = debounce((event) => {
    setFetching(true);
    const url = createStringifiedUrl(baseUrl, {
      SearchByName: event.query,
    });

    getCourses(url)
      .then((response) => {
        if (response.result) {
          const newOptions = response.result.data.map((course) => ({
            value: course.id,
            label: course.name,
          }));
          setOptions(newOptions);
        }
      })
      .catch(() => {
        setOptions([]);
      })
      .finally(() => {
        setFetching(false);
      });
  }, 300);

  const renderSkeleton = () => <Skeleton height={35} width={200} />;

  const renderComponent = () => {
    return (
      <Dropdown
        id={id}
        options={options}
        value={input?.value || value}
        onChange={handleDropdownChange}
        placeholder={placeholder}
        disabled={loading}
        className={className}
        filter={searchable}
        showClear={clearable}
        filterBy="label"
        onFilter={searchDepartments}
        loading={fetching}
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

export default connect(null, { getAcademicYear, getCourses })(
  AcademicYearSearchB,
);
