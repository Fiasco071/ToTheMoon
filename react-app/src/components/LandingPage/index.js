import "./index.css";
import LoginFormModal from "../LoginFormModal";
import SignUpFormModal from "../SignUpFormModal";
import iconImage from "../../img/icon.png";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { getAllSimData } from "../../store/simulation_data";

const LandingPage = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllSimData());
  }, [dispatch]);
  return (
    <div className="landing-wrapper">
      <div className="landing">
        <div className="landing-nav-bar">
          <img className="home-iconImage" src={iconImage} />
          <div className="home-iconImage-text">To The Moon</div>

          <div className="landing-nav-bar-nav">
            <div className="landing-nav-bar-nav-links"></div>
            <div className="landing-nav-bar-log-buttons">
              <LoginFormModal />
              <SignUpFormModal />
            </div>
          </div>
        </div>

        <div className="landing-content-box-1">
          <div className="landing-content-box-1-textbox">
            <h1>
              Join a new generation <br /> of investors
            </h1>

            <SignUpFormModal />
          </div>

          <img
            className="css-6qh47t"
            src="https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/intro-background@1x__a7e1489efad180ee10a6e4d50c56d857.png"
          />
        </div>

        <div className="landing-content-box-2">
          See our fee schedule to learn more about cost.
        </div>

        <div className="landing-content-box-3">
          <div className="landing-content-box-3-imgbox">
            <img src="https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/balloon__ef7d8a9bb1c7845fcb7a6799c35d513e.svg"></img>
          </div>
          <div className="landing-content-box-3-textbox">
            <h1>Introducing IPO Access</h1>
            <p>
              Get in at the IPO price. Now, you can become one of the first
              public investors in upcoming IPOs.
            </p>

            <div className="box-3-textbox-bullet-box">
              <img src="https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/comeall__c29b103566f44e51d624989e65ecf3be.svg" />
              <div className="box-3-textbox-bullet">
                <p>It's your turn</p>
                <p>
                  No minimum account balances or special status requirements.
                </p>
              </div>
            </div>
            <div className="box-3-textbox-bullet-box">
              <img src="https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/one-first__d86b9ee63a8475364159f2d21ea5f01f.svg" />
              <div className="box-3-textbox-bullet">
                <p>Be one of the first</p>
                <p>
                  Request shares in new companies before their stock starts
                  trading on public exchanges.
                </p>
              </div>
            </div>
            <div className="box-3-textbox-bullet-box">
              <img src="https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/fair-shot__fb09db580d0ada2e8626a6e46094bb27.svg" />
              <div className="box-3-textbox-bullet">
                <p>Get a fair shot</p>
                <p>
                  While IPO shares are limited, IPO Access gives you the same
                  opportunity to invest, regardless of order size or account
                  value.
                </p>
              </div>
            </div>
            <p className="box-3-link">IPO Accesss disclosure</p>
          </div>
        </div>
        {/* <div className="box-4-wrapper"> */}
        <div className="box-4-wrapper">
          <div className="landing-content-box-4">
            <div className="landing-content-box-2-textbox">
              <h1>Our Products</h1>
              <h2>Stocks & Funds </h2>
              {/* <p>Options Gold | Crypto</p> */}
              <p>
                Get access to the markets. Invest commission-free in individual
                companies or bundles of investments (ETFs).
              </p>

              {/* <a href="#" className="landing-button">
                Learn about Stocks & Funds
              </a> */}
            </div>
            <div>
              <img
                className="box-4-image"
                draggable="false"
                role="presentation"
                src="https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/1x__b8f3a854780a088fe18bebe63df09581.png"
                srcSet="https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/1x__b8f3a854780a088fe18bebe63df09581.png, https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/2x__5df2bc2eacf940aec8941d4618def751.png 2x, https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/3x__7bdf5f4619ac7fb88345295d59f41c12.png 3x"
              />
            </div>
          </div>
        </div>
        <div className="landing-content-box-5"></div>
      </div>
    </div>
  );
};

export default LandingPage;
