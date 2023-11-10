import PropTypes from "prop-types";

import Home from "../components/staticPages/home";
import authWrapper from "../containers/hoc/authWrapper";
import StaticPageLayout from "../components/layout/static/staticpageLayout";

const HomePage = ({ auth }) => (
  <StaticPageLayout>
    <Home auth={auth} />
  </StaticPageLayout>
);

HomePage.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default authWrapper(HomePage);
