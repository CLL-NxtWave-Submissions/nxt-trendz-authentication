import './index.css'

const Header = () => (
  <div className="header-bg-container">
    <div className="header-brand-container">
      <img
        className="header-brand-logo"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
        alt="website logo"
      />
      <ul className="header-row-nav-button-list">
        <li>
          <button type="button" className="nav-button logout-button-with-text">
            Home
          </button>
        </li>

        <li>
          <button type="button" className="nav-button logout-button-with-text">
            Products
          </button>
        </li>

        <li>
          <button type="button" className="nav-button logout-button-with-text">
            Cart
          </button>
        </li>
      </ul>
      <button type="button" className="nav-button logout-button-with-icon">
        <img
          className="nav-icon logout-button-icon"
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-log-out-img.png"
          alt="nav logout"
        />
      </button>
      <ul className="header-column-nav-button-list">
        <li>
          <button type="button" className="nav-button">
            <img
              className="nav-icon"
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-icon.png"
              alt="nav home"
            />
          </button>
        </li>

        <li>
          <button type="button" className="nav-button">
            <img
              className="nav-icon"
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-products-icon.png"
              alt="nav products"
            />
          </button>
        </li>

        <li>
          <button type="button" className="nav-button">
            <img
              className="nav-icon"
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-cart-icon.png"
              alt="nav cart"
            />
          </button>
        </li>
      </ul>
    </div>
  </div>
)

export default Header
