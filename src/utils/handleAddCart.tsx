import { message } from "antd";
import { Course } from "../models/Course.model";
import CartService from "../services/cart.service";
import { handleNotify } from "./handleNotify";




export const handleAddCart = async (userRole : string, course: Course, navigate: any) => {
  
    if (!userRole) {
      message.destroy();
      message.error(<span className="text-lg font-jost">You must be logged in to do this action. <a className="text-orange-500 underline" onClick={() => navigate("/login")}>Login</a></span>)
      return;
    }
    handleNotify("Course Added to Cart",`You have added "${course.name}" to your cart.`)
    console.log(course._id)
    const response = await CartService.createCart(course._id)

    if (!response.success) 
    {
      handleNotify(
        "Error adding item to to cart, please try again.",
        `You have added "${course.name}" to your cart.`,
      );
      return true
    }
}