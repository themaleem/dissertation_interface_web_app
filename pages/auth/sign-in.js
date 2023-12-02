import SignIn from "../../components/auth/signIn";
import Footer from "../../components/layout/static/footer";
import authWrapper from "../../containers/hoc/authWrapper";

const SignInPage = ({ auth }) => {
  return (
    <>
      <SignIn auth={auth} />
      <Footer />
    </>
  );
};
SignInPage.propTypes = {};

export default authWrapper(SignInPage);
