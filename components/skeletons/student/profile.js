import Skeleton from "react-loading-skeleton";

import ImageComponent from "../../image";
import FileIcon from "../../../public/images/basil_file-solid.svg";
import FileIconRed from "../../../public/images/basil_file-solid-red.svg";

const Profile = () => {
  return (
    <div className="list-section-left">
      <div className="list-section-list no-header">
        <div className="list-section-list-card-item aligned-tp">
          <div className="list-section-list-card-item-inner">
            <div className="list-section-list-card-initials-wrapper">
              <Skeleton circle width={50} height={50} className="picture" />
            </div>
            <div>
              <h6>
                <Skeleton width={100} height={20} />
              </h6>
              <p className="sub">
                <Skeleton width={160} height={20} />
              </p>
              <p className="sm">
                <Skeleton width={60} height={15} />
              </p>
            </div>
          </div>
          <div className="btn-group">
            <Skeleton width={60} height={25} />
          </div>
        </div>
        <div className="list-section-list-card-item aligned-tp">
          <div className="list-section-list-card-item-inner">
            <div className="list-section-list-card-initials-wrapper blu-bg">
              <ImageComponent src={FileIcon} alt="file" />
            </div>
            <div>
              <h6>
                <Skeleton width={250} height={25} />
              </h6>
              <p>
                <Skeleton width={250} height={15} />
                <Skeleton width={250} height={15} />
                <Skeleton width={250} height={15} />
                <Skeleton width={120} height={15} />
              </p>
            </div>
          </div>

          <div className="btn-group">
            <Skeleton width={60} height={25} />
          </div>
        </div>
        <div className="list-section-list-card-item aligned-tp">
          <div className="list-section-list-card-item-inner">
            <div className="list-section-list-card-initials-wrapper">
              <ImageComponent src={FileIconRed} alt="file" />
            </div>
            <div>
              <h6>
                <Skeleton width={250} height={25} />
              </h6>
              <p>
                <Skeleton width={60} height={15} />
              </p>
            </div>
          </div>
          <div className="btn-group">
            <Skeleton width={60} height={25} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
