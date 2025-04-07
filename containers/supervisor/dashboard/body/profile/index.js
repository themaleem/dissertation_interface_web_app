import useSWR from "swr";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { useCallback, useMemo } from "react";

import ProfileSection from "./profileSection";
import ResearchTopicSection from "./researchTopic";
import { getPath } from "../../../../../config/urls";
import ResearchProposalSection from "./researchProposal";
import Suspense from "../../../../../components/suspense";
import { createStringifiedUrl } from "../../../../../lib/objects";
import getSupervisor from "../../../../../actions/supervisor/getSupervisor";
import ProfileSkeleton from "../../../../../components/skeletons/student/profile";

const Profile = ({ auth, getSupervisor }) => {
  const baseUrl = useMemo(() => {
    if (!auth.user?.id) return "";

    return createStringifiedUrl(
      getPath("supervisorPath", { id: auth.user.id }).as,
    );
  }, [auth.user?.id]);

  const { data, mutate } = useSWR(baseUrl, getSupervisor);

  const afterRequest = useCallback(() => mutate(baseUrl), [baseUrl, mutate]);

  const renderProfile = () => {
    const {
      supervisorDetails: {
        department,
        //  researchTopic,
        // researchProposal
      },
      userDetails: { user, profilePicture },
    } = data.result;

    return (
      <div className="list-section-left">
        <div className="list-section-list no-header">
          <ProfileSection
            user={user}
            department={department}
            afterRequest={afterRequest}
            profilePictureData={profilePicture}
          />
          {/* <ResearchTopicSection
            afterRequest={afterRequest}
            researchTopic={researchTopic}
          />
          <ResearchProposalSection
            afterRequest={afterRequest}
            researchProposalData={researchProposal}
          /> */}
        </div>
      </div>
    );
  };

  return (
    <Suspense
      hasData
      auth={auth}
      data={data?.result}
      component={renderProfile}
      skeleton={ProfileSkeleton}
    />
  );
};

Profile.propTypes = {
  getSupervisor: PropTypes.func.isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default connect(null, { getSupervisor })(Profile);
