// "use client";

// import React, { useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { motion, AnimatePresence } from "framer-motion";

// import ImageComponent from "../image";
// import CloseImage from "../../public/images/close.svg";
// import {
//   hideNotification,
//   removeNotification,
// } from "../../reducers/notification/notificationReducer";

// const Notification = () => {
//   const dispatch = useDispatch();
//   const notifications = useSelector((state) => state.notification);
//   const timeoutsRef = useRef({});

//   useEffect(() => {
//     notifications.forEach((notification) => {
//       if (notification.visible && !timeoutsRef.current[notification.id]) {
//         timeoutsRef.current[notification.id] = setTimeout(() => {
//           dispatch(hideNotification(notification.id));
//         }, 3000);
//       }
//     });

//     return () => {
//       Object.values(timeoutsRef.current).forEach(clearTimeout);
//     };
//   }, [notifications, dispatch]);

//   const handleClose = (id) => {
//     clearTimeout(timeoutsRef.current[id]);
//     dispatch(hideNotification(id));
//   };

//   return (
//     <div className="toaster-container">
//       <AnimatePresence>
//         {notifications.map(
//           ({ id, message, visible }) =>
//             visible && (
//               <motion.div
//                 key={id}
//                 initial={{ y: "-100%", opacity: 0 }}
//                 animate={{ y: "0%", opacity: 1 }}
//                 // exit={{ y: "-100%", opacity: 0 }}
//                 exit={{ opacity: 0, transition: { duration: 2 } }}
//                 onAnimationComplete={() =>
//                   !visible && dispatch(removeNotification(id))
//                 }
//                 className="toaster"
//               >
//                 <div className="toaster-message">{message}</div>
//                 <span
//                   className="toaster-close-icon"
//                   onClick={() => handleClose(id)}
//                 >
//                   <ImageComponent alt="front-arrow" src={CloseImage} />
//                 </span>
//               </motion.div>
//             ),
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Notification;

// @note new
// @note new
// @note new
// @note new

// "use client";

// import React, { useEffect, useRef } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { motion, AnimatePresence } from "framer-motion";

// import ImageComponent from "../image";
// import CloseImage from "../../public/images/close.svg";
// import {
//   hideNotification,
//   removeNotification,
// } from "../../reducers/notification/notificationReducer";

// const Notification = () => {
//   const dispatch = useDispatch();
//   const notifications = useSelector((state) => state.notification);
//   const timeoutsRef = useRef({});

//   useEffect(() => {
//     notifications.forEach((notification) => {
//       if (notification.visible && !timeoutsRef.current[notification.id]) {
//         timeoutsRef.current[notification.id] = setTimeout(() => {
//           dispatch(hideNotification(notification.id));
//         }, 3000);
//       }
//     });

//     return () => {
//       Object.values(timeoutsRef.current).forEach(clearTimeout);
//     };
//   }, [notifications, dispatch]);

//   const handleClose = (id) => {
//     clearTimeout(timeoutsRef.current[id]);
//     dispatch(hideNotification(id));
//   };

//   return (
//     <div className="toaster-container">
//       <AnimatePresence>
//         {notifications.map(
//           ({ id, message, visible }) =>
//             visible && (
//               <motion.div
//                 key={id}
//                 initial={{ y: "-100%", opacity: 0 }}
//                 animate={{ y: "0%", opacity: 1 }}
//                 // exit={{ y: "-100%", opacity: 0 }}
//                 exit={{ opacity: 0, transition: { duration: 2 } }}
//                 onAnimationComplete={() =>
//                   !visible && dispatch(removeNotification(id))
//                 }
//                 className="toaster"
//               >
//                 <div className="toaster-message">{message}</div>
//                 <span
//                   className="toaster-close-icon"
//                   onClick={() => handleClose(id)}
//                 >
//                   <ImageComponent alt="front-arrow" src={CloseImage} />
//                 </span>
//               </motion.div>
//             ),
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export default Notification;

// @note new
// @note new
// @note new
// @note new

"use client";

import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

import ImageComponent from "../image";
import CloseImage from "../../public/images/close.svg";
import {
  hideNotification,
  removeNotification,
} from "../../reducers/notification/notificationReducer";

const Notification = () => {
  const dispatch = useDispatch();
  const notifications = useSelector((state) => state.notification);

  useEffect(() => {
    const timeouts = notifications.map((notification) => {
      if (notification.visible) {
        return setTimeout(() => {
          dispatch(hideNotification(notification.id));
        }, 3000);
      }
      return null;
    });

    return () => {
      timeouts.forEach((timeout) => {
        if (timeout) {
          clearTimeout(timeout);
        }
      });
    };
  }, [notifications, dispatch]);

  const handleClose = (id) => {
    dispatch(hideNotification(id));
  };

  return (
    <div className="toaster-container">
      <AnimatePresence>
        {notifications.map(
          ({ id, message, visible }) =>
            visible && (
              <motion.div
                key={id}
                initial={{ y: "-100%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 2 } }}
                onAnimationComplete={() => {
                  if (!visible) {
                    dispatch(removeNotification(id));
                  }
                }}
                className="toaster"
              >
                <div className="toaster-message">{message}</div>
                <span
                  className="toaster-close-icon"
                  onClick={() => handleClose(id)}
                >
                  <ImageComponent alt="close-icon" src={CloseImage} />
                </span>
              </motion.div>
            ),
        )}
      </AnimatePresence>
    </div>
  );
};

export default Notification;
