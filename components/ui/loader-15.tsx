'use client';

import React from 'react';

/**
 * Loader 15 (21st.dev) — адаптирован под ko:agency.
 * Переписан без styled-components: стили инлайнятся через <style>,
 * градиент перекрашен в фирменный красный (#E60000 → #FF6A00).
 */
const Loader = () => {
  return (
    <div className="koa-loader" role="status" aria-label="Загрузка">
      <style
        dangerouslySetInnerHTML={{
          __html: `
        .koa-loader { position: relative; width: 200px; height: 200px; }
        .koa-loader .gegga { width: 0; height: 0; }
        .koa-loader .snurra { filter: url(#koaGegga); }
        .koa-loader .halvan {
          animation: koaSnurra1 10s infinite linear;
          stroke-dasharray: 180 800;
          fill: none;
          stroke: url(#koaGradient);
          stroke-width: 23;
          stroke-linecap: round;
        }
        .koa-loader .strecken {
          animation: koaSnurra1 3s infinite linear;
          stroke-dasharray: 26 54;
          fill: none;
          stroke: url(#koaGradient);
          stroke-width: 23;
          stroke-linecap: round;
        }
        .koa-loader .skugga {
          filter: blur(5px);
          opacity: 0.3;
          position: absolute;
          inset: 0;
          transform: translate(3px, 3px);
        }
        @keyframes koaSnurra1 {
          0% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -403px; }
        }
        @media (prefers-reduced-motion: reduce) {
          .koa-loader .halvan, .koa-loader .strecken { animation: none; }
        }
      `,
        }}
      />
      <svg className="gegga">
        <defs>
          <filter id="koaGegga">
            <feGaussianBlur in="SourceGraphic" stdDeviation={7} result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10"
              result="inreGegga"
            />
            <feComposite in="SourceGraphic" in2="inreGegga" operator="atop" />
          </filter>
        </defs>
      </svg>
      <svg className="snurra" width={200} height={200} viewBox="0 0 200 200">
        <defs>
          <linearGradient id="koaLinjar">
            <stop className="stopp1" offset={0} stopColor="#E60000" />
            <stop className="stopp2" offset={1} stopColor="#FF6A00" />
          </linearGradient>
          <linearGradient
            y2={160}
            x2={160}
            y1={40}
            x1={40}
            gradientUnits="userSpaceOnUse"
            id="koaGradient"
            xlinkHref="#koaLinjar"
          />
        </defs>
        <path
          className="halvan"
          d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64"
        />
        <circle className="strecken" cx={100} cy={100} r={64} />
      </svg>
      <svg className="skugga" width={200} height={200} viewBox="0 0 200 200">
        <path
          className="halvan"
          d="m 164,100 c 0,-35.346224 -28.65378,-64 -64,-64 -35.346224,0 -64,28.653776 -64,64 0,35.34622 28.653776,64 64,64 35.34622,0 64,-26.21502 64,-64 0,-37.784981 -26.92058,-64 -64,-64 -37.079421,0 -65.267479,26.922736 -64,64 1.267479,37.07726 26.703171,65.05317 64,64 37.29683,-1.05317 64,-64 64,-64"
        />
        <circle className="strecken" cx={100} cy={100} r={64} />
      </svg>
    </div>
  );
};

export default Loader;
