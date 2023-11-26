import qs from "qs";
import PropTypes from "prop-types";
import { useRouter } from "next/router";
import { useCallback, useEffect, useMemo, useState } from "react";

import { doNothing, getFragmentsFromPath } from "../../lib/objects";
import { getPath } from "../../config/urls";

const CustomTabs = ({
  tabs,
  pathName,
  parsedHref,
  tabsObject,
  onTabSelect,
}) => {
  const router = useRouter();
  const { tab } = getFragmentsFromPath(router.asPath);
  const [selectedIndex, setSelectedIndex] = useState();

  const routeToFragment = useCallback(
    (href, fragments, as = undefined) => {
      const arr = (as || router.asPath).split("#");

      if (arr.length > 1) arr.pop();
      router.replace(href, `${arr.join("#")}#${qs.stringify(fragments)}`, {
        shallow: true,
      });
    },
    [router],
  );

  const tabKeys = useMemo(() => Object.keys(tabsObject), [tabsObject]);

  const onSelect = useCallback(
    (idx) => {
      const { href } = getPath(pathName);
      routeToFragment(href, { tab: tabKeys[idx] }, parsedHref);
    },
    [pathName, routeToFragment, tabKeys, parsedHref],
  );

  useEffect(() => {
    if (tabsObject[tab] === undefined) {
      onSelect(0);
    } else {
      const idx = tabsObject[tab];
      setSelectedIndex(idx);
      onTabSelect(tabKeys[idx]);
    }
  }, [tab, tabKeys, onSelect, tabsObject, onTabSelect]);

  if (selectedIndex === undefined) return null;

  return (
    <>
      <div className="sub-navigation">
        <div className="container">
          {tabs.map(({ title, tabIndex }) => {
            return (
              <a
                key={title}
                href={`#tab=${tabKeys[tabIndex]}`}
                onClick={() => onSelect(tabIndex)}
                className={selectedIndex === tabIndex ? "is-active" : ""}
              >
                {title}
              </a>
            );
          })}
        </div>
      </div>
      {tabs.map(
        ({ panel, tabIndex }) => selectedIndex === tabIndex && <>{panel}</>,
      )}
    </>
  );
};

CustomTabs.defaultProps = {
  onTabSelect: doNothing,
  parsedHref: undefined,
};

CustomTabs.propTypes = {
  parsedHref: PropTypes.func,
  onTabSelect: PropTypes.func,
  tabs: PropTypes.instanceOf(Array).isRequired,
};

export default CustomTabs;
