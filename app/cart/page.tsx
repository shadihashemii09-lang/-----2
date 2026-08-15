import type { Metadata } from "next";
import { CartContent } from "@/components/cart/cart-content";

export const metadata: Metadata = {
  title: "سبد خرید",
  description: "سبد خرید تو در آئورا؛ مرور، ویرایش و تکمیل سفارش.",
};

export default function CartPage() {
  return <CartContent />;
}
