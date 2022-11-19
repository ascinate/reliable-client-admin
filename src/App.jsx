import React, { Suspense, useEffect, useRef } from "react";
import IdleTimer from "react-idle-timer";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";
import moment from "moment";
import { Error404, dashboardPages } from "pages";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";

import "./App.scss";
import { useDispatch, useSelector } from "react-redux";
import { AutoAuthenticate, maintenanceStatus } from "store/Actions/AuthActions";
import { getAppModules, getUserModules } from "store/Actions/moduleActions";
import { initiateLockScreen } from "store/Slices/settingSlice";
import { ChangeMfaStatus } from "store/Slices/authSlice";
import { toast } from "react-toastify";
import { axios, getCurrentMFAStatus, getError } from "lib";
import { getDepartmentsByUserId } from "store";
import { getAppSettingsByTenant } from "store";
import { updateMaintenanceSettings } from "store";
import { ProtectedRoute } from "components/ProtectedRoute.component";
import { Spin } from "antd";
import { getDataCounts } from "store/Actions/count";
import setUpInterceptor from "lib/axios-interceptors";
import store from "store";

const SignIn = React.lazy(() => import("pages/sign-in/SignIn.page"));
const SignUp = React.lazy(() => import("pages/sign-up/SignUp.page"));
const ResetPassword = React.lazy(() =>
  import("pages/reset-password/ResetPassword.page")
);
const ForgotPassword = React.lazy(() =>
  import("pages/forgot-password/ForgotPassword.page")
);
const EmailVerification = React.lazy(() =>
  import("pages/email-verification/EmailVerification.page")
);
const ConfirmOtp = React.lazy(() =>
  import("pages/one-time-password/OneTimePassword.page")
);

function App() {
  const isLoggedIn = useSelector((state) => state?.auth?.isLoggedIn);
  const user = useSelector((state) => state?.auth?.user);
  const { token } = useSelector((state) => state?.auth);
  const { maintenance, maintenanceDetails, suspended } = useSelector(
    (state) => state.settings
  );

  //Set Timeout in seconds here
  const Timeout = 1000 * 900;
  // const Timeout = 10000; //test with 1m
  const idleTimer = useRef(null);

  const OnIdle = () => {
    dispatch(initiateLockScreen());
  };

  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await AutoAuthenticate(dispatch);
      await dispatch(getAppModules());
      await dispatch(maintenanceStatus());
      await dispatch(getAppSettingsByTenant({ isAdmin: true }));
    })();
  }, [dispatch]);

  useEffect(() => {
    if (user?.id && token) {
      (async () => {
        await dispatch(getDepartmentsByUserId({ id: user?.id }));
        await dispatch(getUserModules({ id: user?.id }));
        await dispatch(getDataCounts());
      })();
    }
  }, [user, token]);

  // Check MFA Status
  const checkMFAStatus = async () => {
    try {
      const { url } = getCurrentMFAStatus();
      const res = await axios.post(url, { userId: user?.id });
      if (res?.data?.is2faEnabled) {
        dispatch(ChangeMfaStatus());
      }
    } catch (e) {
      toast.error(getError(e));
    }
  };
  useEffect(() => {
    if (isLoggedIn) {
      checkMFAStatus();
    }
  }, [isLoggedIn, dispatch]);

  // maintenanceDetails
  useEffect(() => {
    if (maintenanceDetails?.isExpirationDateSpecified) {
      const { expirationDate } = maintenanceDetails;
      const dateIsAfter = moment().isAfter(moment(expirationDate));
      if (dateIsAfter) {
        const finalObject = {
          expirationDateTime: expirationDate,
          status: false,
          message: maintenanceDetails?.reason,
          byPassuserRoles: [],
          byPassUsers: [],
        };
        (async () => {
          await dispatch(
            updateMaintenanceSettings({ data: finalObject, isAdmin: true })
          );
        })();
        window.location.reload();
      }
    }
  }, [maintenanceDetails]);

  const navigate = useNavigate();

  setUpInterceptor({ store, navigate });

  return (
    <div className="App bg-custom-main flex items-center content-center">
      <IdleTimer ref={idleTimer} onIdle={OnIdle} timeout={Timeout} />
      <Suspense
        fallback={
          <div className="h-screen w-screen flex items-center justify-center">
            <Spin spinning size="large" />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/admin/sign-in" />} />
          <Route
            path="/admin"
            element={
              isLoggedIn ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <Navigate to="/admin/sign-in" />
              )
            }
          />
          <Route
            path="/admin/sign-up"
            element={
              isLoggedIn ? <Navigate to="/admin/dashboard" /> : <SignUp />
            }
          />
          <Route
            path="/admin/verify-email/:userId"
            element={
              suspended ? (
                <Navigate to="/admin/account-suspended" />
              ) : isLoggedIn ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <EmailVerification />
              )
            }
          />
          <Route
            path="/admin/reset-password"
            element={
              suspended ? (
                <Navigate to="/admin/account-suspended" />
              ) : isLoggedIn ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <ResetPassword />
              )
            }
          />
          <Route
            path="/admin/forgot-password"
            element={
              suspended ? (
                <Navigate to="/admin/account-suspended" />
              ) : isLoggedIn ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <ForgotPassword />
              )
            }
          />
          <Route
            path="/admin/one-time-password"
            element={
              suspended ? (
                <Navigate to="/admin/account-suspended" />
              ) : isLoggedIn ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <ConfirmOtp />
              )
            }
          />
          <Route
            path="/admin/sign-in"
            element={
              maintenance ? (
                <Navigate to="/admin/under-maintenance" />
              ) : isLoggedIn ? (
                <Navigate to="/admin/dashboard" />
              ) : (
                <SignIn />
              )
            }
          />
          <Route element={<ProtectedRoute />}>
            <Route
              path="/admin/dashboard/*"
              element={
                <Routes>
                  {dashboardPages.map(({ path, Component }) => (
                    <Route
                      key={path}
                      path={`${path}`}
                      index={path === "/"}
                      element={<Component />}
                    />
                  ))}
                </Routes>
              }
            />
          </Route>
          <Route path="*" element={<Error404 />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
