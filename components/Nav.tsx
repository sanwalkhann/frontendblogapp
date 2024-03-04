import Link from "next/link";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";

function Nav() {
  return (
    <div className="container mx-auto my-4 flex flex-col items-center justify-center px-0 py-3 sm:flex-col sm:justify-center sm:px-0 md:flex-row md:justify-between md:px-3 lg:flex-row lg:justify-between lg:px-3 xl:flex-row xl:justify-between xl:px-3 2xl:flex-row 2xl:justify-between 2xl:px-3">
      <a
        href="/"
        className="text-center text-2xl text-white transition-colors hover:text-yellow-800"
      >
        DreamBloggers
      </a>

      <nav className="md:justify-right mt-5 inline-flex items-start justify-center gap-3 text-left font-medium text-white sm:mt-5 sm:justify-center sm:gap-5 md:mt-0 md:gap-10 lg:mt-0 lg:gap-10 xl:mt-0 xl:gap-10 2xl:mt-0 2xl:gap-10">
        <Link
          href={"/"}
          className="nav-link transition-colors hover:text-yellow-800"
        >
          Home
        </Link>
        <Link
          href={"/tag/programming"}
          className="nav-link transition-colors hover:text-yellow-800"
        >
          Programming
        </Link>
        <Link
          href={"/tag/photography"}
          className="nav-link transition-colors hover:text-yellow-800"
        >
          Photography
        </Link>
        <Link
          href={"/tag/android"}
          className="nav-link transition-colors hover:text-yellow-800"
        >
          Android
        </Link>
        <Link
          href={"/tag/smart-phone"}
          className="nav-link transition-colors hover:text-yellow-800"
        >
          Smart Phone
        </Link>
        <Link
          href={"/page/about"}
          className="nav-link transition-colors hover:text-yellow-800"
        >
          About
        </Link>
      </nav>

      <div className="hidden flex-row items-center justify-between sm:hidden md:hidden lg:flex xl:flex 2xl:flex">
        <Link href="#" target="_blank" className="social-link">
          {" "}
          <FaFacebookF className="mx-3 text-white transition-colors hover:text-yellow-800" />{" "}
        </Link>
        <Link href="#" target="_blank" className="social-link">
          {" "}
          <FaTwitter className="mx-3 text-white transition-colors hover:text-yellow-800" />{" "}
        </Link>
        <Link href="#" target="_blank" className="social-link">
          {" "}
          <FaInstagram className="mx-3 text-white transition-colors hover:text-yellow-800" />{" "}
        </Link>
        <Link href="#" target="_blank" className="social-link">
          {" "}
          <FaLinkedinIn className="mx-3 text-white transition-colors hover:text-yellow-800" />{" "}
        </Link>

        <Link
          href="/signup"
          className="mx-auto inline-flex w-[150px] flex-col items-center justify-center gap-2.5 rounded-lg bg-[#dce8fc] px-5 py-2.5 text-center font-medium text-[rgba(35,46,82,1)] transition-colors hover:bg-yellow-800 hover:text-white "
          passHref
        >
          Login/Signup
        </Link>
      </div>
    </div>
  );
}

export default Nav;
