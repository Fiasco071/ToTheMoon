import './index.css'

const LandingPage = () => {
    return (
        <div className='landing-wrapper'>
            <div className='landing'>
                <div className='landing-nav-bar'>

                    <div className='landing-nav-bar-icon'>
                        To The Moon
                    </div>

                    <div className='landing-nav-bar-nav'>
                        <div className='landing-nav-bar-nav-links'>
                            <a href='#'>Link1</a>
                            <a href='#'>Link2</a>
                            <a href='#'>Link3</a>
                            <a href='#'>Link4</a>
                            <a href='#'>Link5</a>
                        </div>
                        <div className='landing-nav-bar-log-buttons'>
                            <a href='#'>Log In</a>
                            <a href='#'>Sign Up</a>
                        </div>
                    </div>
                </div>

                <div className='landing-content-box-1'>
                    <div className='landing-content-box-1-textbox'>
                        <h1>Simulate <br /> Stock Data</h1>
                        <p>Commission-free investing, plus the tools you need to put your money in motion. Sign up and get your first stock for free. Certain limitations and fees apply.</p>

                        <a href='#' className='signup-button'>Sign Up</a>
                    </div>
                    <div className='landing-content-box-1-animationbox'>
                        <div class="css-1ed05sj"><img class="css-6qh47t" draggable="false" role="presentation" src="https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/1x__36a396f664677ed80a2459d1dca75f00.png" srcset="https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/1x__36a396f664677ed80a2459d1dca75f00.png, https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/2x__c7dcadbbb72fc298e85e94844f68342c.png 2x, https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/3x__7c5da6ba049983f3558423906f16f0af.png 3x"/><div className="css-idtc8"><img class="css-6qh47t" draggable="false" role="presentation" src="https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/1x__284c8d0c799d3c9649ca021c00228275.png" srcset="https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/1x__284c8d0c799d3c9649ca021c00228275.png, https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/2x__ff9c36e27d7018cf707b95d8675793a3.png 2x, https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/3x__45f00d7b296cb52968f1bca4ef766fc1.png 3x" /></div></div>
                        </div>

                    </div>

                    <div className='landing-content-box-2'>
                        See our fee schedule to learn more about cost.
                    </div>

                    <div className='landing-content-box-3'>
                        <div className='landing-content-box-3-imgbox'>
                            <img src="https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/balloon__ef7d8a9bb1c7845fcb7a6799c35d513e.svg"></img>
                        </div>
                        <div className='landing-content-box-3-textbox'>
                            <h1>Introducing IPO Access</h1>
                            <p>Get in at the IPO price. Now, you can become one of the first public investors in upcoming IPOs.</p>

                            <div className='box-3-textbox-bullet-box'>
                                <img src='https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/comeall__c29b103566f44e51d624989e65ecf3be.svg' />
                                <div className='box-3-textbox-bullet'>
                                    <p>It's your turn</p>
                                    <p>No minimum account balances or special status requirements.</p>
                                </div>
                            </div>
                            <div className='box-3-textbox-bullet-box'>
                                <img src='https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/one-first__d86b9ee63a8475364159f2d21ea5f01f.svg' />
                                <div className='box-3-textbox-bullet'>
                                    <p>Be one of the first</p>
                                    <p>Request shares in new companies before their stock starts trading on public exchanges.</p>
                                </div>
                            </div>
                            <div className='box-3-textbox-bullet-box'>
                                <img src='https://cdn.robinhood.com/assets/generated_assets/brand/_next/static/images/fair-shot__fb09db580d0ada2e8626a6e46094bb27.svg' />
                                <div className='box-3-textbox-bullet'>
                                    <p>Get a fair shot</p>
                                    <p>While IPO shares are limited, IPO Access gives you the same opportunity to invest, regardless of order size or account value.</p>
                                </div>
                            </div>
                            <p className='box-3-link'>IPO Accesss disclosure</p>
                        </div>

                    </div>
                </div>
            </div>
            );
}

            export default LandingPage