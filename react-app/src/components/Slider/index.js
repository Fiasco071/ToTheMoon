import React, { useRef, useState } from "react";
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './index.css'
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';

import 'swiper/swiper.min.css'
import 'swiper/modules/pagination/pagination.min.css'
import QuickViewGraph from '../Dashboard/QuickViewGraph';

const Slider = () => {
    const assets = useSelector(state => state.assets)
    const history = useHistory()
    return (
        <>
        {Object.values(assets).map(asset => (

            <div className="port-quickview-large-box">
            <h2>{asset.stock.ticker} ${asset.stock.i_price * asset.num_shares}</h2>
            <QuickViewGraph className='qvl-chart' />
            <div className="port-qv-info-box">
                <div className="qv-text-lboxes">
                    <p>Price</p>
                    <p className="qvl-value">${asset.stock.i_price}</p>
                </div>
                <div className="qv-text-lboxes">
                    <p>Shares</p>
                    <p className="qvl-value two">{asset.num_shares}</p>
                </div>
            </div>
        </div>))}
        <Swiper
            spaceBetween={0}
            slidesPerView={5}

        >
            {Object.values(assets).map(asset => (
                <SwiperSlide>
                    <div className="port-quickview-box" onClick={() => (history.push(`/stocks/${asset.stock.id}`))}>
                        <h2>{asset.stock.ticker}</h2>
                        <div className="qv-text-boxes">
                            <p>Price</p>
                            <p className="qv-value">${asset.stock.i_price}</p>
                        </div>
                        <div className="qv-text-boxes">
                            <p>Shares</p>
                            <p className="qv-value two">{asset.num_shares}</p>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper ></>
  );
};

export default Slider