// import React from "react";

// const SupervisorDashboardBody = () => {
//   return (
//     <section className="list-section">
//       <div className="section-wrapper">
//         <div className="container">
//           <div className="list-section-left">
//             <div className="list-section-list no-header">
//               <div className="list-section-list-card-item aligned-tp">
//                 <div className="list-section-list-card-item-inner">
//                   <div className="list-section-list-card-initials-wrapper">
//                     <img src="../assets/images/pic.png" alt />
//                   </div>
//                   <div>
//                     <h6>John Doe</h6>
//                     <p className="sub">johndoe@sheffielduniversity.co.uk</p>
//                     <p className="sm">Computing</p>
//                   </div>
//                 </div>
//                 <button className="button">Edit</button>
//               </div>
//               <div className="list-section-list-card-item aligned-tp">
//                 <div className="list-section-list-card-item-inner">
//                   <div className="list-section-list-card-initials-wrapper blu-bg">
//                     <img src="../assets/images/basil_file-solid.svg" alt />
//                   </div>
//                   <div>
//                     <h6>Research topic</h6>
//                     <p>
//                       Lorem ipsum dolor sit amet, consectetur adipiscing elit.
//                       Aliquam gravida libero ac laoreet vehicula. Sed tortor
//                       nunc, mattis vitae ante quis, dignissim lobortis arcu.
//                       Integer sed arcu vel libero convallis semper. Aliquam
//                       vehicula efficitur accumsan.
//                     </p>
//                   </div>
//                 </div>
//                 <button className="button">Edit</button>
//               </div>
//               <div className="list-section-list-card-item aligned-tp">
//                 <div className="list-section-list-card-item-inner">
//                   <div className="list-section-list-card-initials-wrapper is-grey">
//                     <img src="../assets/images/people.svg" alt />
//                   </div>
//                   <div>
//                     <h6>Supervision slot</h6>
//                     <p className="lg">26</p>
//                   </div>
//                 </div>
//                 <button className="button">Upload</button>
//               </div>
//             </div>
//           </div>
//           <div className="list-section-right">
//             <div className="dashboard-header">
//               <div className="dashboard-header-inner">
//                 <h3>Supervisors</h3>
//                 <button className="button">View all</button>
//               </div>
//             </div>
//             <div className="list-section-list">
//               <div className="list-section-list-card-item">
//                 <div className="list-section-list-card-item-inner">
//                   <div className="list-section-list-card-initials-wrapper">
//                     JD
//                   </div>
//                   <div>
//                     <h6>John Doe</h6>
//                     <p>Computing</p>
//                   </div>
//                 </div>
//                 <button className="button">Request</button>
//               </div>
//               <div className="list-section-list-card-item">
//                 <div className="list-section-list-card-item-inner">
//                   <div className="list-section-list-card-initials-wrapper">
//                     JD
//                   </div>
//                   <div>
//                     <h6>John Doe</h6>
//                     <p>Computing</p>
//                   </div>
//                 </div>
//                 <button className="button">Request</button>
//               </div>
//               <div className="list-section-list-card-item">
//                 <div className="list-section-list-card-item-inner">
//                   <div className="list-section-list-card-initials-wrapper">
//                     JD
//                   </div>
//                   <div>
//                     <h6>John Doe</h6>
//                     <p>Computing</p>
//                   </div>
//                 </div>
//                 <button className="button">Request</button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default SupervisorDashboardBody;

import PropTypes from "prop-types";

import Profile from "./profile";
// import SupervisorList from "./supervisorList";
// import ApprovedSupervisor from "../approvedSupervisor";

const SupervisorDashboardBody = ({
  auth,
  // data,
}) => {
  return (
    <section className="list-section">
      <div className="section-wrapper">
        <div className="container">
          <Profile auth={auth} />
          {/* {hasApprovedRequest ? (
            <ApprovedSupervisor data={data} auth={auth} />
          ) : (
            <SupervisorList auth={auth} />
          )} */}
        </div>
      </div>
    </section>
  );
};

SupervisorDashboardBody.propTypes = {
  // data: PropTypes.instanceOf(Object).isRequired,
  auth: PropTypes.instanceOf(Object).isRequired,
};

export default SupervisorDashboardBody;
