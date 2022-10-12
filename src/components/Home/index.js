import './index.css'

const Home = () => (
  <div className="home-bg-container">
    <div className="home-content-container">
      <h1 className="home-content-header">Clothes That Get You Noticed</h1>
      <img
        className="home-content-column-image"
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
        alt="clothes that get you noticed"
      />
      <p className="home-content-description">
        Fashion is part of the daily air and it does not quite help that it
        changes all the time. Clothes have always been a marker of the era and
        we are in a revolution.Your fashion makes you been seen and heard that
        way you are. So, celebrate the seasons new and exciting fashion in your
        own way.
      </p>
      <button className="home-content-shop-now-button" type="button">
        Shop Now
      </button>
    </div>
    <img
      className="home-row-image"
      src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-home-img.png"
      alt="clothes that get you noticed"
    />
  </div>
)

export default Home
