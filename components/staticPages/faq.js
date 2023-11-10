import { useState } from "react";

import Image from "../image";
import MinusImage from "../../public/images/minus.svg";
import PlusImage from "../../public/images/plus.svg";

const accordionItems = [
  {
    id: "collapseOne",
    heading: "Where should research data be stored?",
    body: "Unless otherwise advised, research data for Masters and Undergraduate projects should be stored on the F drive.",
  },
  {
    id: "collapseTwo",
    heading: "What are the necessary ethics considerations?",
    body: "For your dissertation project, you must give ethical consideration to all aspects of your project. You must complete an Ethics Form, that has to be signed by your supervisor before any data gathering. The signed Ethics Form should be included and appendix to your Dissertation report.",
  },
  {
    id: "collapseThree",
    heading: "What is the acceptable referencing style?",
    body: "The APA 7 style of referencing.",
  },
  {
    id: "collapseFour",
    heading: "What is our research strategy?",
    body: "Our research strategy focuses on three high-impact areas – areas where new challenges demand innovative and boundary-breaking solutions, and where success can drive significant improvements to the lives of individuals and communities the world over, including within our own region.",
  },
  {
    id: "collapseFive",
    heading: "What is the content and structure of the dissertation?",
    body: "An MSc Dissertation is typically between 12,000 and 15,000 words in length. This may however depend upon your subject area and chosen research approach. A dissertation that is largely based upon interview data and observation records can be of greater length than a dissertation that is based upon software development and statistical data, for example, as it will usually make intensive use of interview quotations or observation records. A useful guideline is that the dissertation should enable you to formulate and justify a clear argument concerning your research question. Quantity does not equal quality.",
  },
];

const FAQSection = () => {
  const [openAccordion, setOpenAccordion] = useState();

  const toggleAccordion = (accordionId) => {
    setOpenAccordion(openAccordion === accordionId ? undefined : accordionId);
  };

  return (
    <section className="faq-section">
      <div className="container">
        <div className="faq-title">
          <h4>Frequently Asked Questions</h4>
          <p>
            We are answering the most frequent questions. No worries if you do
            not find the exact one. You can find out more here
          </p>
        </div>
        <div className="faq-list">
          {accordionItems.map(({ id, body, heading }) => {
            return (
              <div
                key={id}
                className={`faq-list-item${
                  openAccordion === id ? " is-opened" : ""
                }`}
              >
                <div
                  onClick={() => toggleAccordion(id)}
                  className="faq-list-item-header"
                >
                  <span className="plus-minus">
                    <Image
                      alt="close"
                      src={MinusImage}
                      className="close-trigger"
                    />
                    <Image
                      alt="open"
                      src={PlusImage}
                      className="open-trigger"
                    />
                  </span>
                  <h6>{heading}</h6>
                </div>
                <div className="faq-list-item-body">
                  <div className="faq-list-item-body-inner-wrapper">
                    <p>{body}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

FAQSection.propTypes = {};

export default FAQSection;
