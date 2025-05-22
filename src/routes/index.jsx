const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <Layout />
        </>
      ),
    },
    {
      path: "/products",
      element: (
        <>
          <LayoutProduct />
        </>
      ),
    },
    {
      path: "/login",
      element: (
        <>
          <Login />
        </>
      ),
    },
    {
      path: "/sign-up",
      element: (
        <>
          <SignUp />
        </>
      ),
    },
    // {
    //   path: "/product/upload",
    //   element: (
    //     <>
    //       <AddProduct />
    //     </>
    //   ),
    // },
    {
      path: "/homeSlider/list",
      element: (
        <>
          <LayoutHomeSB />
        </>
      ),
    },
    {
      path: "/category/list",
      element: (
        <>
          <LayoutCategory />
        </>
      ),
    },
    {
      path: "/subCat/list",
      element: (
        <>
          <SubLayoutCategory />
        </>
      ),
    },
    {
      path: "/users",
      element: (
        <>
          <UserCategory />
        </>
      ),
    },
    {
      path: "/orders",
      element: (
        <>
          <OrderCategory />
        </>
      ),
    },
    {
      path: "/forgot-password",
      element: (
        <>
          <ForgotPassword />
        </>
      ),
    },
    {
      path: "/verify-account",
      element: (
        <>
          <VerifyAccount />
        </>
      ),
    },
    {
      path: "/change-password",
      element: (
        <>
          <ChangePassword />
        </>
      ),
    },
  ]);

  export default router