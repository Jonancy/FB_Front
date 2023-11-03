import { BrowserRouter, Route, Routes, useNavigate } from "react-router-dom";
import { allRoutes } from "../allRoutes/allRoutes";
import MainLayout from "../../layouts/main/mainLayout";
import AuthLayout from "../../layouts/auth/authLayout";
import { useSelector } from "react-redux";
// import { PrivateWrapper } from "../auth/privateWrapper";
import { Fragment } from "react";
import { PrivateWrapper } from "../auth/privateWrapper";





const MainLayoutWrapper = ({ routes, children }) => {
  // Ensure that routes.hasLayout evaluates correctly and that MainLayout is a valid component.
  const MainWrapper = routes.hasLayout ? MainLayout : Fragment;

  // Check that AuthWrapper is set to PrivateWrapper correctly.
  const AuthWrapper = routes.requiredAuth ? PrivateWrapper : Fragment;

  return (
    <AuthWrapper>
      <MainWrapper>{children}</MainWrapper>
    </AuthWrapper>
  );
};



export const Router = () => {
  

  return (
    <BrowserRouter>
      <Routes>
        {allRoutes.map((values) => (
          <Route
            path={values.path}
            key={values.id}
            element={
              // values.isAuthPage ? (
              //   <AuthLay routes={values}>
              //     <values.element/>
              //   </AuthLay>
              // ) : (
                <MainLayoutWrapper routes={values}>
                  <values.element />
                </MainLayoutWrapper>
              // )
            }
          />
        ))}
      </Routes>
    </BrowserRouter>

  );
};
