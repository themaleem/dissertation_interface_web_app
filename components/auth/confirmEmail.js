import Link from "next/link";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import ImageComponent from "../image";
import { getPath } from "../../config/urls";
import Logo from "../../public/images/logo.svg";
import { createStringifiedUrl } from "../../lib/objects";
import confirmEmail from "../../actions/auth/confirmEmail";
import BackArrowImage from "../../public/images/back-arrow.svg";
import FrontArrowImage from "../../public/images/front-arrow.svg";
import { showNotification } from "../../reducers/notification/notificationReducer";

const homePath = getPath("homePath").href;
const signInPath = getPath("signInPath").href;
const resetPasswordPath = getPath("resetPasswordPath").href;

const ConfirmEmail = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const userName = router.query.username?.trim();
  const token = router.query.activationToken?.trim().replace(/ /g, "+");

  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (!token || !userName) return undefined;

    dispatch(confirmEmail({ userName, token }))
      .then((res) => {
        if (!res) {
          setShowError(true);
          return undefined;
        }

        dispatch(
          showNotification("Your email has been confirmed successfully"),
        );

        const { passwordResetToken } = res;
        const passwordResetUrl = createStringifiedUrl(resetPasswordPath, {
          username: userName,
          activationToken: passwordResetToken,
        });

        return router.replace(passwordResetUrl);
      })
      .catch(() => {
        return setShowError(true);
      });
  }, [dispatch, router, token, userName]);

  return (
    <section className="form-wrapper">
      <div className="form-card-wrapper">
        <div>
          <div className="form-card">
            <div className="form-card-header">
              <Link
                passHref
                href={homePath}
                className="form-card-nav-link is-flex is-align-items-center"
              >
                <ImageComponent alt="back-arrow" src={BackArrowImage} />
                Back to homepage
              </Link>

              <div className="form-card-nav-link-inner">
                <h3>Confirm Email</h3>
                <ImageComponent
                  src={Logo}
                  alt="logo"
                  className="form-card-logo"
                />
              </div>
            </div>

            <form className="form-container" autoComplete="off">
              {showError ? (
                <p className="form-container-sub-text">
                  Something went wrong while trying to confirm your email. This
                  might be due to invalid/expired account confirmation link. Or
                  an already confirmed email. Please contact an admin if you
                  require any assistance
                </p>
              ) : (
                <p className="form-container-sub-text">
                  Please hold on while we try to confirm your email.
                </p>
              )}
              <div className="is-flex is-align-items-center is-justify-content-space-between form-card-footer">
                <span />
              </div>
            </form>
          </div>
          <div className="form-card-bt-strip no-bg">
            <p>Don’t have an account?</p>
            <Link href={signInPath} className="is-flex is-align-item-center">
              Get started here
              <ImageComponent alt="front-arrow" src={FrontArrowImage} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

ConfirmEmail.propTypes = {};

export default ConfirmEmail;
