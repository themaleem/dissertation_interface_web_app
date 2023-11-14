import Link from "next/link";
import PropTypes from "prop-types";
import { useCallback } from "react";
import { useRouter } from "next/router";

import FAQSection from "./faq";
import ImageComponent from "../image";
import { getPath } from "../../config/urls";
import CcImage from "../../public/images/cc.svg";
import DocImage from "../../public/images/doc.svg";
import HeroImage from "../../public/images/rafiki.png";
import HealthImage from "../../public/images/health.svg";
import BulbImage from "../../public/images/tabler_bulb.svg";

const homePath = getPath("homePath").href;
const signInPath = getPath("signInPath").href;
const adminDashboardPath = getPath("adminDashboardPath").href;

const Home = ({ auth }) => {
  const router = useRouter();

  const renderHeroButton = useCallback(() => {
    if (!auth.user)
      return (
        <button
          type="button"
          className="button"
          onClick={() => router.push(signInPath)}
        >
          Get Started
        </button>
      );

    return (
      <button
        type="button"
        className="button"
        onClick={() => router.push(adminDashboardPath)}
      >
        Go to Dashboard
      </button>
    );
  }, [auth.user, router]);

  return (
    <>
      <header>
        <section className="hero-section">
          <div className="container">
            <div>
              <div className="hero-section-inner">
                <div className="hero-section-content">
                  <h1>Dissertation Interface</h1>
                  <p>
                    Sheffield Hallam University's research focuses on three key
                    themes: enabling healthier lives, building stronger
                    communities and driving future economies.
                  </p>
                  {renderHeroButton()}
                </div>
                <ImageComponent alt="hero-img" src={HeroImage} />
              </div>
            </div>
          </div>
        </section>
      </header>
      <section className="research-section">
        <div className="container">
          <div className="researh-box">
            <div className="aside">
              <div>
                <h3>Research areas</h3>
                <p>
                  Our four research institutes support several specialist
                  centres, as well as research within specific academic
                  departments.
                </p>
              </div>
              <div>
                <h4>Mission</h4>
                <p>
                  Our mission is simple: we transform lives. Our research is
                  characterised by a focus on real world impact - informed by
                  international, national and regional policy priorities -
                  addressing the social, economic, environmental and cultural
                  challenges of today.
                </p>
              </div>
            </div>
            <div className="tiles-container">
              <div className="tiles-item">
                <div>
                  <ImageComponent alt="cc-img" src={CcImage} />
                  <h5>Culture and Creativity Research Institute</h5>
                  <p>
                    This is the home of arts and humanities research, innovation
                    and enterprise...
                  </p>
                </div>
                <Link passHref href={homePath}>
                  Read more
                </Link>
              </div>
              <div className="tiles-item">
                <div>
                  <ImageComponent alt="health-img" src={HealthImage} />
                  <h5>Health Research Institute</h5>
                  <p>
                    It brings together academics and professionals who deliver
                    research, innovation and knowledge exchange in health and
                    wellbeing..
                  </p>
                </div>
                <Link passHref href={homePath}>
                  Read more
                </Link>
              </div>
              <div className="tiles-item">
                <div>
                  <ImageComponent alt="bulb-img" src={BulbImage} />
                  <h5>Industry and Innovation Research Institute</h5>
                  <p>
                    The vision is to be the leading provider of applied research
                    excellence delivering materials..
                  </p>
                </div>
                <Link passHref href={homePath}>
                  Read more
                </Link>
              </div>
              <div className="tiles-item">
                <div>
                  <ImageComponent alt="doc-img" src={DocImage} />

                  <h5>Social and Economic Research Institute</h5>
                  <p>
                    This is an interdisciplinary research institute committed to
                    cutting edge, high quality...
                  </p>
                </div>
                <Link passHref href={homePath}>
                  Read more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      <FAQSection />
    </>
  );
};

Home.propTypes = {
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default Home;
