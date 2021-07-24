export default class PbpLoading extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({mode: 'open'});
    }
    play() {
        this.style.setProperty("--play-state", "running");
    }
    pause() {
        this.style.setProperty("--play-state", "paused");
    }
    connectedCallback() {
        const startPaused = this.hasAttribute("paused");
        const boxCount = +this.getAttribute("box-count") || 4;
        const duration = +this.getAttribute("duration") || (Math.sqrt(boxCount / 4));
        const boxes = new Array(boxCount).fill();

        const overlap = duration / (boxCount * 0.7);
        const p = 100 * overlap;

        const baprops = `
            content: "";
            position: absolute;
            display: block;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            border: var(--pbp-loading-border, 1px solid white);
            border-width: $WIDTH;
            animation: $DIM ${duration}s forwards alternate infinite;
            animation-delay: var(--delay);
            animation-play-state: var(--play-state);
        `;
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: inline-block;
                    --play-state: ${startPaused ? "paused" : "running"};
                }
                div {
                    display: grid;
                    grid-template-columns: ${boxes.map(() => `1fr`).join(' ')};
                    grid-gap: var(--pbp-loading-gap, 8px);
                }
                span {
                    display: inline-block;
                    position: relative;
                    height: var(--pbp-loading-box-size, 20px);
                    width: var(--pbp-loading-box-size, 20px);
                }
                @keyframes x {
                  0% {
                      transform: scaleX(var(--pbp-loading-grow, 150%));
                      opacity: 0;
                  }
                  ${p}% {
                      transform: scaleX(100%);
                      opacity: 1;
                  }
                }
                @keyframes y {
                  0% {
                      transform: scaleY(var(--pbp-loading-grow, 150%));
                      opacity: 0;
                  }
                  ${p}% {
                      transform: scaleY(100%);
                      opacity: 1;
                  }
                }
                span::before {
                    ${baprops.replace("$WIDTH", "1px 0 1px 0").replace("$DIM", "y")}
                }
                span::after {
                    ${baprops.replace("$WIDTH", "0 1px 0 1px").replace("$DIM", "x")}
                }
                */
            </style>
            <div>
                ${boxes.map((_, i) => `<span style="--delay:${i * overlap}s"></span>`).join('')}
            </div>
        `;
    }
}
customElements.define("pbp-loading", PbpLoading);
