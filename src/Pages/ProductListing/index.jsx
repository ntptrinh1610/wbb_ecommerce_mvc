import React, { use, useContext, useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import ProductItem from "../../components/ProductItem";

import { TfiLayoutGrid4Alt } from "react-icons/tfi";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { BsFillGridFill } from "react-icons/bs";
import { MdMenu } from "react-icons/md";

import {
  Button,
  Typography,
  Breadcrumbs,
  Link,
  Menu,
  MenuItem,
  Pagination,
} from "@mui/material";
import ProductItemListView from "../../components/ProductItemListView";
import ProductLoading from "../../components/Loading";
import ProductLoadingGrid from "../../components/Loading/productLoadingGrid";
import { postData } from "../../utils/api";
import { MyContext } from "../../App";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}
const SearchPage = () => {
  const [itemView, setItemView] = useState("grid");
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedSortVal, setSelectedSortVal] = useState("None");

  const open = Boolean(anchorEl);
  const context = useContext(MyContext);

  useEffect(() => {
    context?.setIsOpenFilterBtn(true);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSortBy = (name, order, products, value) => {
    setSelectedSortVal(value);
    postData(`/api/product/sortBy`, {
      products: products,
      sortBy: name,
      order: order,
    }).then((res) => {
      setProductData(res);
      setAnchorEl(null);
    });
  };

  return (
    <section className="pt-5">
      <div className="container">
        <div role="presentation" onClick={handleClick}>
          <Breadcrumbs aria-label="breadcrumb">
            <Link
              className="link transition"
              underline="hover"
              color="inherit"
              href="/"
            >
              Home
            </Link>
            <Link underline="hover" color="inherit" href="/" className="link">
              Fashion
            </Link>
            <Typography sx={{ color: "text.primary" }}>Breadcrumbs</Typography>
          </Breadcrumbs>
        </div>
      </div>
      <div className="bg-white p-2 mt-4 ">
        <div className="container flex gap-3 ">
          <div
            className={`lg:z-[100] transition-all z-[102] p-3 lg:p-0 w-full sidebarWrapper fixed -bottom-[100%] left-0 lg:static lg:w-[20%] bg-white lg:opacity-100 opacity-0 ${
              context?.openFilter ? "open" : ""
            } `}
          >
            <Sidebar
              productData={productData}
              setProductData={setProductData}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              page={page}
              setTotalPages={setTotalPages}
            />
          </div>
          {context?.windowWidth < 992 && (
            <div
              className={`filter_overlay w-full h-full bg-[rgba(0,0,0,0.5)] fixed top-0 left-0 z-[101] ${
                context?.openFilter ? "block" : "hidden"
              } `}
              onClick={() => context?.setOpenFilter(false)}
            ></div>
          )}
          <div className="rightContent w-full lg:w-[80%] pt-3">
            <div className="sticky top-[50px] z-[51] bg-[#f1f1f1] p-2 w-full mb-3 rounded-md flex items-center justify-between">
              <div className="col1 flex items-center itemViewActions">
                <Button
                  onClick={() => setItemView("list")}
                  className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] ${
                    itemView === "list" && "active"
                  } `}
                >
                  <MdMenu className="text-[rgba(0,0,0,0.2)]" />
                </Button>
                <Button
                  onClick={() => setItemView("grid")}
                  className={`!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] ${
                    itemView === "grid" && "active"
                  } `}
                >
                  <BsFillGridFill className="text-[rgba(0,0,0,0.2)]" />
                </Button>
                <span className="hidden sm:block text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]">
                  There are{" "}
                  {productData?.data?.length !== 0
                    ? productData?.data?.length
                    : 0}{" "}
                  &nbsp; products
                </span>
              </div>
              <div className="col2 ml-auto flex items-center justify-end gap-3 pr-4">
                <span className="text-[14px] font-[500] pl-3 text-[rgba(0,0,0,0.7)]">
                  Sort By
                </span>
                <Button
                  id="basic-button"
                  aria-controls={open ? "basic-menu" : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? "true" : undefined}
                  onClick={handleClick}
                  className="!bg-[rgba(255,255,255,0.6)] !text-[12px] !text-[#000] !capitalize !border-1 !border-[#000]"
                >
                  {selectedSortVal}
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  <MenuItem
                    onClick={handleClose}
                    className="!text-[12px] !text-[#000] !capitalize"
                  >
                    Sales, highest to lowest
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleSortBy("name", "asc", productData, "Name, A to Z")
                    }
                    className="!text-[12px] !text-[#000] !capitalize"
                  >
                    Name, A to Z
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleSortBy("name", "desc", productData, "Name, Z to A")
                    }
                    className="!text-[12px] !text-[#000] !capitalize"
                  >
                    Name, Z to A
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleSortBy(
                        "price",
                        "asc",
                        productData,
                        "Price, low to high"
                      )
                    }
                    className="!text-[12px] !text-[#000] !capitalize"
                  >
                    Price, low to high
                  </MenuItem>
                  <MenuItem
                    onClick={() =>
                      handleSortBy(
                        "price",
                        "desc",
                        productData,
                        "Price, high to low"
                      )
                    }
                    className="!text-[12px] !text-[#000] !capitalize"
                  >
                    Price, high to low
                  </MenuItem>
                </Menu>
              </div>
            </div>
            <div
              className={`grid ${
                itemView === "grid"
                  ? "grid-cols-1 place-items-center sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 "
                  : "grid-cols-1 md:grid-cols-1"
              } gap-4 `}
            >
              {itemView === "grid" ? (
                <>
                  {isLoading ? (
                    <ProductLoading />
                  ) : (
                    // isLoading ? <ProductLoadingGrid view={itemView} />
                    productData?.data?.length !== 0 &&
                    productData?.data?.map((item, index) => {
                      return <ProductItem key={index} item={item} />;
                    })
                  )}
                </>
              ) : (
                <>
                  {isLoading ? (
                    <ProductLoading />
                  ) : (
                    productData?.data?.length !== 0 &&
                    productData?.data?.map((item, index) => {
                      return <ProductItemListView key={index} item={item} />;
                    })
                  )}
                </>
              )}
            </div>
            <div className="flex items-center justify-center mt-5">
              {totalPages > 1 && (
                <div className="flex items-center justify-center mt-10 ">
                  <Pagination
                    count={totalPages}
                    page={page}
                    showFirstButton
                    showLastButton
                    onChange={(e, value) => setPage(value)}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchPage;
