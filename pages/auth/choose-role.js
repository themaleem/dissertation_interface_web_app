import Footer from "../../components/layout/static/footer";
import ChooseRole from "../../components/auth/chooseRole";
import authWrapper from "../../containers/hoc/authWrapper";

const ChooseRolePage = ({ auth }) => {
  return (
    <>
      <ChooseRole auth={auth} />
      <Footer />
    </>
  );
};
ChooseRolePage.propTypes = {};

export default authWrapper(ChooseRolePage);
