import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Dialog,
  DialogContent,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Checkbox,
  FormControl,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormLabel,
  CircularProgress,
  TextField,
  MenuItem,
} from "@mui/material";

import cart_bleue from "../../assets/carte_bleue.png";
import visa from "../../assets/visa.png";
import master_card from "../../assets/american_express.png";
import paypal from "../../assets/paypal.png";
import empty_cart from "../../assets/empty-cart.png";

import { FaShippingFast } from "react-icons/fa";
import { MdSupportAgent } from "react-icons/md";
import { FaGift } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";
import { MdCurrencyExchange } from "react-icons/md";
import { IoChatboxEllipses } from "react-icons/io5";
import { AiFillInstagram } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { MdOutlineClose } from "react-icons/md";

import { MyContext } from "../../App";

import {
  updateDataFromApi,
  postData,
  fetchDataFromApi,
  deleteData,
} from "../../utils/api";

import { Collapse } from "react-collapse";
import ProductZoom from "../ProductZoom";
import ProductInfo from "../ProductInfo";
import CartPanel from "../CartPanel";

import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import AddAddress from "../../Pages/MyAccount/addAddress";

const Footer = () => {
  const [maxWidth, setMaxWidth] = useState("lg");
  const [fullWidth, setFullWidth] = useState(true);
  const context = useContext(MyContext);

  return (
    <>
      <footer className=" p-6 bg-[#fafafa] border-1 border-[rgba(0,0,0,0.1)]">
        <div className="container">
          <div className="scrollableBox flex items-center justify-center gap-2 lg:px-8 lg:pb-8 px-0 py-3 footerBoxWrap ">
            <div className="col flex items-center justify-center flex-col group w-[15%]">
              <FaShippingFast className="text-[50px] transition-all duration-300 group-hover:text-mocha-mousse group-hover:-translate-y-1" />
              <h3 className="text-[16px] font-[600] mt-3">Free shipping</h3>
              <p className="text-[12px] font-[500]">For all order over $200</p>
            </div>
            <div className="col flex items-center justify-center flex-col group w-[15%]">
              <MdCurrencyExchange className="text-[50px] transition-all duration-300 group-hover:text-mocha-mousse group-hover:-translate-y-1" />
              <h3 className="text-[16px] font-[600] mt-3">15 Days Returns</h3>
              <p className="text-[12px] font-[500]">For an Exchange Product</p>
            </div>
            <div className="col flex items-center justify-center flex-col group w-[15%]">
              <GiWallet className="text-[50px] transition-all duration-300 group-hover:text-mocha-mousse group-hover:-translate-y-1" />
              <h3 className="text-[16px] font-[600] mt-3">Secure Payment</h3>
              <p className="text-[12px] font-[500]">Payment Cards Accepted</p>
            </div>
            <div className="col flex items-center justify-center flex-col group w-[15%]">
              <FaGift className="text-[50px] transition-all duration-300 group-hover:text-mocha-mousse group-hover:-translate-y-1" />
              <h3 className="text-[16px] font-[600] mt-3">Special gifts</h3>
              <p className="text-[12px] font-[500]">
                Random gifts for random products
              </p>
            </div>
            <div className="col flex items-center justify-center flex-col group w-[15%]">
              <MdSupportAgent className="text-[50px] transition-all duration-300 group-hover:text-mocha-mousse group-hover:-translate-y-1" />
              <h3 className="text-[16px] font-[600] mt-3">Support 24/7</h3>
              <p className="text-[12px] font-[500]">Contact us Anytime</p>
            </div>
          </div>
        </div>
        <br />

        <div className="footer flex px-3 lg:px-0 flex-col lg:flex-row py-8">
          <div className="part1 w-full lg:w-[25%] border-r border-[rgba(0,0,0,0.1)]">
            <h2 className="text-[20px] font-[600] mb-4">Contact us</h2>
            <p className="text-[14px] font-[400] pb-4">
              Were bare bears - Bear stack!
              <br />
              123-San Francisco Bay U.S
            </p>
            <Link
              className="link text-[13px] "
              to={"mailto:someone@example.com"}
            >
              threebear@webarebears.com
            </Link>
            <span className="text-[25px] font-[600] block w-full mt-3 text-mocha-mousse">
              0123-456-789
            </span>

            <div className="flex items-center gap-2">
              <IoChatboxEllipses className="text-[40px] text-[rgba(0,0,0,0.5)]" />
              <span className="text-[16px] font-[600]  ">
                Online Chat <br /> Get Expert Help
              </span>
            </div>
          </div>
          <div className="part2 w-full lg:w-[40%] flex lg:pl-5 lg:mt-0 pl-0 mt-5 ">
            <div className="part2_col1 w-full lg:w-[50%]">
              <h2 className="text-[18px] font-[600] mb-4">Products</h2>
              <ul className="list">
                <li className="list-none text-[14px] w-full mb-1">
                  <Link className="link" to={"/"}>
                    Prices drop
                  </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-1">
                  <Link className="link" to={"/"}>
                    New products
                  </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-1">
                  <Link className="link" to={"/"}>
                    Best sales
                  </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-1">
                  <Link className="link" to={"/"}>
                    Contact us
                  </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-1">
                  <Link className="link" to={"/"}>
                    Sitemap
                  </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-1">
                  <Link className="link" to={"/"}>
                    Stores
                  </Link>
                </li>
              </ul>
            </div>
            <div className="part2_col2 w-full lg:w-[50%]">
              <h2 className="text-[18px] font-[600] mb-4">Our Company</h2>
              <ul className="list">
                <li className="list-none text-[14px] w-full mb-1">
                  <Link className="link" to={"/"}>
                    Delivery
                  </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-1">
                  <Link className="link" to={"/"}>
                    Legal Notice
                  </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-1">
                  <Link className="link" to={"/"}>
                    Term and conditions of use
                  </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-1">
                  <Link className="link" to={"/"}>
                    About us
                  </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-1">
                  <Link className="link" to={"/"}>
                    Secure Payment
                  </Link>
                </li>
                <li className="list-none text-[14px] w-full mb-1">
                  <Link className="link" to={"/"}>
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="part2 w-full lg:w-[35%] flex lg:flex-row flex-col lg:px-5 lg:mt-0 pl-0 mt-5 ">
            <h2 className="text-[18px] font-[600] mb-2 lg:mb-4">
              Subscribe to newsletter
            </h2>
            <p className="text-[13px]">
              Don't miss out—grab your exclusive discount today and save big
              before it's gone!"
            </p>
            <form className="mt-5">
              <input
                type="text"
                className="w-full h-[45px] !border outline-none rounded-sm !mb-4 !border-gray-300 focus:!border-[rgba(0,0,0,0.8)] !p-4"
                placeholder="Your Email Address"
              />
              <Button className="btn-challe">SUBSCRIBE</Button>
              <FormControlLabel
                className="mt-3 lg:mt-0 block w-full "
                control={<Checkbox defaultChecked />}
                label="I agree to the terms and conditions and privacy policy"
              />
            </form>
          </div>
        </div>
      </footer>

      <div className="bottomStrip border-t border-[rgba(0,0,0,0.1)] pt-3 py-[100px] lg:pb-3 bg-white">
        <div className="container flex items-center justify-between flex-col lg:flex-row gap-4 lg:gap-0 ">
          <ul className="flex items-center gap-2">
            <li className="list-none">
              <Link
                to={"/"}
                target="_blank"
                className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-cream-tan"
              >
                <FaFacebook className="text-[15px] group-hover:text-white" />
              </Link>
            </li>
            <li className="list-none">
              <Link
                to={"/"}
                target="_blank"
                className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-cream-tan"
              >
                <FaYoutube className="text-[15px] group-hover:text-white" />
              </Link>
            </li>
            <li className="list-none">
              <Link
                to={"/"}
                target="_blank"
                className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-cream-tan"
              >
                <FaPinterest className="text-[15px] group-hover:text-white" />
              </Link>
            </li>
            <li className="list-none">
              <Link
                to={"/"}
                target="_blank"
                className="w-[35px] h-[35px] rounded-full border border-[rgba(0,0,0,0.1)] flex items-center justify-center group hover:bg-cream-tan transition-all"
              >
                <AiFillInstagram className="text-[15px] group-hover:text-white" />
              </Link>
            </li>
          </ul>

          <p className="text-[13px] text-center mb-0">@2025 - We bare bears</p>

          <div className="flex items-center">
            <img src={cart_bleue} alt="image" />
            <img src={visa} alt="image" />
            <img src={master_card} alt="image" />
            <img src={paypal} alt="image" />
          </div>
        </div>
      </div>

      {/* Cart Panel */}
      <Drawer
        open={context?.openCartPanel?.open}
        onClose={() => {
          context.toggleCartPanel(false, {});
        }}
        anchor={"right"}
        className="cartPanel"
      >
        <div className="flex items-center justify-between py-3 px-4 gap-3 border-b border-[rgba(0,0,0,0.1)]">
          <h4>Shopping Cart ({context?.cartData?.length})</h4>
          <MdOutlineClose
            onClick={() => {
              context.toggleCartPanel(false, {});
            }}
            className="text-[20px] cursor-pointer"
          />
        </div>
        {context?.cartData?.length !== 0 ? (
          <CartPanel data={context?.cartData} />
        ) : (
          <div className="flex items-center justify-center flex-col pt-[100px] gap-5 ">
            <img src={empty_cart} className="w-[150px] " />
            <h4>There is nothing in your cart</h4>
            <Button
              className="btn-sm btn-challe"
              onClick={() => context?.toggleCartPanel(false, {})}
            >
              Continue Shopping
            </Button>
          </div>
        )}
      </Drawer>

      {/* Address Panel */}
      <Drawer
        open={context?.openAddressPanel?.open}
        onClose={() => {
          context.toggleAddressPanel(false, {});
        }}
        anchor={"right"}
        className="addressPanel"
      >
        <div className="flex items-center justify-between py-3 px-4 gap-3 border-b border-[rgba(0,0,0,0.1)]">
          <h4>
            {context?.addressMode === "add" ? "Add" : "Edit"} Delivery Address
          </h4>
          <MdOutlineClose
            onClick={() => {
              context.toggleAddressPanel(false, {});
            }}
            className="text-[20px] cursor-pointer"
          />
        </div>
        <div className="w-full max-h-[100vh] overflow-auto ">
          <AddAddress />
        </div>
      </Drawer>

      <Dialog
        open={context?.openProductDetailsModal?.open}
        onClose={context?.handleCloseProductDetailsModal}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        className="productDetailsModal"
        maxWidth={maxWidth}
        fullWidth={fullWidth}
      >
        <DialogContent>
          <div className="flex items-center w-full productDetailsModalContainer relative">
            <Button
              onClick={context?.handleCloseProductDetailsModal}
              className="!w-[40px] !h-[40px] !min-w-[40px] !rounded-full !text-[#000] !absolute top-[15px] right-[15px] "
            >
              <IoClose className="text-[12px]" />
            </Button>
            {context?.openProductDetailsModal?.item?.length !== 0 && (
              <>
                <div className="col1 w-[40%] px-3 py-4 ">
                  <ProductZoom
                    images={context?.openProductDetailsModal?.item?.images}
                  />
                </div>
                <div className="col2 p-8 w-[60%] productContent ">
                  <ProductInfo item={context?.openProductDetailsModal?.item} />
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Footer;
