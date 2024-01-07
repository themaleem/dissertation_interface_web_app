import Skeleton from "react-loading-skeleton";

import ImageComponent from "../../image";
import FileIcon from "../../../public/images/basil_file-solid.svg";
import FileIconRed from "../../../public/images/basil_file-solid-red.svg";

const RequestDetailModal = () => {
  return (
    <>
      <section className="modal-card-body">
        <div className="modal-stacked-content">
          <div className="list-section-list-card-item aligned-tp">
            <div className="list-section-list-card-item-inner">
              <div className="list-section-list-card-initials-wrapper">
                <Skeleton circle width={50} height={50} />
              </div>
              <div>
                <h6>
                  <Skeleton width={150} height={25} />
                </h6>
                <p className="sub">
                  <Skeleton width={100} height={15} />
                </p>
                <p className="sm">
                  <Skeleton width={80} height={15} />
                </p>
              </div>
            </div>
          </div>
          <div className="list-section-list-card-item aligned-tp">
            <div className="list-section-list-card-item-inner">
              <div className="list-section-list-card-initials-wrapper blu-bg">
                <ImageComponent src={FileIcon} alt="file" />
              </div>
              <div>
                <h6>
                  <Skeleton width={130} height={25} />
                </h6>
                <p>
                  <Skeleton width={300} height={15} />
                  <Skeleton width={300} height={15} />
                  <Skeleton width={300} height={15} />
                </p>
              </div>
            </div>
          </div>
          <div className="list-section-list-card-item aligned-tp">
            <div className="list-section-list-card-item-inner">
              <div className="list-section-list-card-initials-wrapper is-grey">
                <ImageComponent src={FileIconRed} alt="file-icon-red" />
              </div>
              <div>
                <h6>
                  <Skeleton width={130} height={25} />
                </h6>
                <p className="lg">
                  <Skeleton width={80} height={15} />
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <footer className="modal-card-foot">
        <Skeleton width={80} height={25} />

        <Skeleton width={80} height={25} />
      </footer>
    </>
  );
};

export default RequestDetailModal;
