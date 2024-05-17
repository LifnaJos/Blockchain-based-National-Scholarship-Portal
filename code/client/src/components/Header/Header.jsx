import React from "react";
import "./Header.css";
import logo from "../images/ISP_logo.png";

function Header() {
  return (
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a href="/" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <img src={logo} alt="" height="60px" width="60px" class="logo" />
        <span class="fs-4">Intelligent Scholarship Portal</span>
      </a>

      <ul class="nav nav-pills">
        <a href="/" aria-current="page"><button>Home</button></a>
      </ul>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js" integrity="sha384-C6RzsynM9kWDrMNeT87bh95OGNyZPhcTNXj1NW7RuBCsyN/o0jlpcV8Qyq46cDfL" crossorigin="anonymous"></script>
    </header>

  );
}

export default Header;
