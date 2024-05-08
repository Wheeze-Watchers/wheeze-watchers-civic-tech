import { NavLink } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <h1>Not Found</h1>
      <NavLink to="/">Click here to go to the HomePage!</NavLink>
    </>
  );
}
