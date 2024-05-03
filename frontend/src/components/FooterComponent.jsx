import React from "react";

const FooterComponent = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="row">
          <div className="col">
            <ul className="list-unstyled"><h2>Контакти:</h2>
              <li>
                <a href="mailto:frankocampus@gmail.com">
                  frankocampus@gmail.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        <hr />
        <div className="row">
          <p className="col-sm">Developed by “some team”</p>
        </div>
        <div className="row">
        <p className="col-sm">
            &copy;{new Date().getFullYear()} LVIV | Franko Campus | Усі права захищено | Політика конфіденційності 
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
