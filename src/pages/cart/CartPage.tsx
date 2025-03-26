import React, { useEffect, useState } from "react";
import { Tabs } from "antd";
import { useNavigate } from "react-router-dom";

import { useCustomNavigate } from "../../hooks/customNavigate";
import DynamicBreadcrumb from "../../components/Breadcrumb/Breadcrumb";
import MyCart from "../../components/cartTabs/MyCart";
import PurchasedOrders from "../../components/cartTabs/PurchasedCart";
import CancelledOrders from "../../components/cartTabs/CancelledCart";
import {
  Cart,
  CartItem,
  CartStatusEnum,
  SearchCartByStatus,
} from "../../models/Cart.model";
import CartService from "../../services/cart.service";
import CheckoutPage from "../checkout/CheckoutPage";
import { handleNotify } from "../../utils/handleNotify";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store/store";
import { updateCartCount } from "../../redux/slices/cartSlice";

const CartPage: React.FC = () => {
  const navigate = useCustomNavigate();
  const routerNavigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(true);
  const [cartStatus, setCartStatus] = useState<string>(
    location.pathname.replace("/cart/", "")
  );
  const [selectedCarts, setSelectedCarts] = useState<CartItem[]>([]);
  const [carts, setCarts] = useState<Cart[]>([]);
  const initialCartSearchParams = (
    cartStatus: CartStatusEnum
  ): SearchCartByStatus => ({
    pageInfo: {
      pageNum: 1,
      pageSize: 10,
    },
    searchCondition: {
      keyword: "",
      category_id: "",
      status: cartStatus,
      is_deleted: false,
    },
  });

  const fetchCart = async (refetch?: boolean) => {
    setIsLoading(!refetch && true);
    try {
      const status = cartStatus as CartStatusEnum;
      const response = await CartService.getCartsByStatus(
        initialCartSearchParams(status),
        dispatch
      );
      setCarts(response.data?.pageData || []);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemoveCart = async (cartItem: CartItem) => {
    const newCarts = carts.filter((cart) => cart._id !== cartItem._id);
    const updatedSelectedCarts = selectedCarts.filter(
      (cartItem) =>
        !selectedCarts.some((selected) => selected._id === cartItem._id)
    );
    setCarts(newCarts);
    setSelectedCarts(updatedSelectedCarts);
    handleNotify("Course Removed", "Check out some others.");
    const response = await CartService.deleteCart(cartItem._id);
    if (response) dispatch(updateCartCount(newCarts.length));
  };

  const handleAddToCheckout = async () => {

    const backup = selectedCarts
    const cartsBackup = carts

    if (selectedCarts.length > 0) {
      const updatedCarts = carts.filter(
        (cartItem) =>
          !selectedCarts.some((selected) => selected._id === cartItem._id)
      );
      setCarts(updatedCarts);
      setSelectedCarts([]);
      dispatch(updateCartCount(updatedCarts.length));

      const response = await CartService.updateStatusCart({
        status: CartStatusEnum.WAITING_PAID,
        items: selectedCarts.map(
          (cartItem) =>
            ({ _id: cartItem._id, cart_no: cartItem.cart_no } as CartItem)
        ),
      }, true);
      handleNotify(
        "Added To Awaiting",
        "Your cart item(s) are awaiting payment."
      );

      if (!response.success) {
        setCarts(cartsBackup)
        setSelectedCarts(backup);
        dispatch(updateCartCount(backup.length));
      }
    }
  };



  const handleStatusUpdate = async (cartItem: CartItem, message: string, description: string, status: CartStatusEnum) => {
    const backup = carts;
    const newCarts = carts.filter((cart) => cart._id !== cartItem._id);
    setCarts(newCarts);
    handleNotify(
      message, description
    );

    const response = await CartService.updateStatusCart({
      status: status,
      items: [cartItem],
    });
    if (!response.success) setCarts(backup)
  };

  const handleRepurchaseCart = async (cartItem: CartItem) => {
    await handleStatusUpdate(cartItem,"Added To Awaiting",
      "Your cart item(s) are awaiting payment.", CartStatusEnum.WAITING_PAID)
  }

  const handleCancelCart = async (cartItem: CartItem) => {
    await handleStatusUpdate(cartItem,"Cancelled payment for selected course",
      "You can still find this course in the cancelled payment tab.", CartStatusEnum.CANCEL)
  }



  const handleCheckout = async () => {
    const response = await CartService.updateStatusCart({
      status: CartStatusEnum.COMPLETED,
      items: carts, 
    }, true);
    if (response) {
      handleNotify(
        "Your order was placed successfully",
        "Happy studying! A copy of the receipt will be sent to your email shortly."
      );
      setCarts([])
      navigate("/cart/completed");
    }
  };





  useEffect(() => {
    window.scrollTo(0, 0)
    fetchCart();
  }, [cartStatus]);

  useEffect(() => {
    // Update URL with cart status after `/cart/`
    routerNavigate(`/cart/${cartStatus.toLowerCase()}`);
  }, [cartStatus, routerNavigate]);

  const toggleSelectCart = (cartItem: CartItem) => {
    if (
      selectedCarts.some((selectedCart) => selectedCart._id === cartItem._id)
    ) {
      setSelectedCarts(
        selectedCarts.filter(
          (selectedCart) => selectedCart._id !== cartItem._id
        )
      );
    } else {
      setSelectedCarts([...selectedCarts, cartItem]);
    }
  };

  const total = carts
    .filter((cart) =>
      selectedCarts.some((selectedCart) => selectedCart._id === cart._id)
    )
    .reduce((sum, cart) => sum + cart.price * (1 - cart.discount / 100), 0);

  const discounted = carts
    .filter((cart) =>
      selectedCarts.some((selectedCart) => selectedCart._id === cart._id)
    )
    .reduce((sum, cart) => sum + cart.price * (cart.discount / 100), 0);

  return (
    <div className=" mx-auto px-4 py-8 font-jost min-h-screen">
      <DynamicBreadcrumb />
      <Tabs
        defaultActiveKey={cartStatus}
        className="custom-tabs font-jost"
        onChange={(e) => {
          setCarts([]);
          setCartStatus(e);
        }}
        items={[
          {
            key: CartStatusEnum.NEW,
            label: "My Cart",
            children: (
              <MyCart
                isLoading={isLoading}
                carts={carts}
                navigate={navigate}
                removeCart={handleRemoveCart}
                selectedCarts={selectedCarts}
                toggleSelectCart={toggleSelectCart}
                total={total}
                onCheckOut={handleAddToCheckout}
                discounted={discounted}
              />
            ),
          },
          {
            key: CartStatusEnum.WAITING_PAID,
            label: "Awaiting Payment",
            children: (
              <CheckoutPage
                isLoading={isLoading}
                carts={carts}
                cancelCart={handleCancelCart}
                checkout={handleCheckout}
              />
            ),
          },
          {
            key: CartStatusEnum.COMPLETED,
            label: "Purchased",
            children: (
              <PurchasedOrders
                carts={carts}
                navigate={navigate}
                total={total}
                isLoading={isLoading}
              />
            ),
          },
          {
            key: CartStatusEnum.CANCEL,
            label: "Cancelled",
            children: (
              <CancelledOrders
                removeCart={handleRemoveCart}
                repurchaseCart={handleRepurchaseCart}
                carts={carts}
                navigate={navigate}
                total={total}
                isLoading={isLoading}
              />
            ),
          },
        ]}
      />
    </div>
  );
};

export default CartPage;
