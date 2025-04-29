import { Link } from "react-router-dom";

export const getBreadcrumbs = (pathname: string) => {
  if (pathname === "/") {
    return "Home";
  }
  if (pathname.startsWith("/product/")) {
    return (
      <span className="breadcrumbs">
        <Link to="/">Home</Link> / Product Details
      </span>
    );
  }
  return null;
};
