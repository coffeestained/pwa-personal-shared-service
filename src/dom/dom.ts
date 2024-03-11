type Available =
  "leftIntoView"
  | "rightIntoView"
  | "upIntoView"
  | "downIntoView"
  | "staging"
  | "class";

export class Dom {

  public _leftIntoViewObserver = new IntersectionObserver(
    this.leftIntoViewIntersection,
    {
      root: null,
      rootMargin: "0px",
      threshold: [.33,.66],
    }
  );
  public _rightIntoViewObserver = new IntersectionObserver(
    this.rightIntoViewIntersection,
    {
      root: null,
      rootMargin: "0px",
      threshold: [.33,.66],
    }
  );
  public _downIntoViewObserver = new IntersectionObserver(
    this.downIntoIntersection,
    {
      root: null,
      rootMargin: "0px",
      threshold: [.33,.66],
    }
  );
  public _upIntoViewObserver = new IntersectionObserver(
    this.upIntoIntersection,
    {
      root: null,
      rootMargin: "0px",
      threshold: [.33,.66],
    }
  );
  public _stagingObserver = new IntersectionObserver(
    this.stagingIntersection,
    {
      root: null,
      rootMargin: "0px",
      threshold: [.33,.66],
    }
  );

  constructor() {
    const styleSheet = document.createElement("style")
    styleSheet.innerText = `
    .base__leftIntoView {
      transition: all .5s;
      position: relative;
      opacity: 0;
      left: 150px;
    }
    .active__leftIntoView {
      opacity: 1;
      left: 0;
    }
    .base__rightIntoView {
      transition: all .5s;
      position: relative;
      opacity: 0;
      right: 150px;
    }
    .active__rightIntoView {
      opacity: 1;
      right: 0;
    }
    .base__downIntoView {
      transition: all .5s;
      position: relative;
      opacity: 0;
      top: 150px;
    }
    .active__downIntoView {
      opacity: 1;
      top: 0;
    }
    .base__upIntoView {
      transition: all .5s;
      position: relative;
      opacity: 0;
      bottom: 150px;
    }
    .active__upIntoView {
      opacity: 1;
      bottom: 0;
    }

    .base__staging {
      animation-name: bounce;
      animation-timing-function: cubic-bezier(0[.33,.66]80, 0.840, 0.420, 1);
      animation-iteration-count: 1;
    }

    @keyframes bounce {
        0%   { transform: scale(1,1)      translateY(0); }
        10%  { transform: scale(1.1,.9)   translateY(0); }
        30%  { transform: scale(.9,1.1)   translateY(-100px); }
        50%  { transform: scale(1.05,.95) translateY(0); }
        57%  { transform: scale(1,1)      translateY(-7px); }
        64%  { transform: scale(1,1)      translateY(0); }
        100% { transform: scale(1,1)      translateY(0); }
    }
    `
    document.head.appendChild(styleSheet);
  }

  public register(type: Available, element: any, threshold = 0, className = null) {
    element['threshold'] = threshold;
    if (type === "downIntoView") this._downIntoViewObserver.observe(element);
    if (type === "upIntoView") this._upIntoViewObserver.observe(element);
    if (type === "leftIntoView") this._leftIntoViewObserver.observe(element);
    if (type === "rightIntoView") this._rightIntoViewObserver.observe(element);
    if (type === "staging") this._stagingObserver.observe(element);
    if (type === "class") {
      this[`${className}`] = (elements) => {
        elements.map((element: any) => {
          if (
            element && 
            (
                !element.target.hasAttribute('lastTimestamp') || 
                (Number(element.target.getAttribute('lastTimestamp')) + 67 < new Date().getTime())
            )
        ) {
            if (element.isIntersecting && element.intersectionRatio >= element.target['threshold']) {
              element.target.classList.add(className);
            } else if (!element.isIntersecting) {
              element.target.classList.remove(className);
            }
            element.target.setAttribute('lastTimestamp', new Date().getTime());
          }
        });
      
      }
      this[`_${className}`] = new IntersectionObserver(
        this[`${className}`],
        {
          root: null,
          rootMargin: "0px",
          threshold: threshold,
        }
      );
      this[`_${className}`].observe(element);
    };
  }

  public destroy(type: Available, element: any, className = null) {
    if (type === "downIntoView") this._downIntoViewObserver.unobserve(element);
    if (type === "leftIntoView") this._leftIntoViewObserver.unobserve(element);
    if (type === "staging") this._stagingObserver.unobserve(element);
    if (type === "class") this[`_${className}`].unobserve(element);
  }

  private leftIntoViewIntersection(elements) {
    elements.map((element) => {
        if (
            element && 
            (
                !element.target.hasAttribute('lastTimestamp') || 
                (Number(element.target.getAttribute('lastTimestamp')) + 67 < new Date().getTime())
            )
        ) {
            if (element.isIntersecting && element.intersectionRatio >= element.target['threshold']) {
                element.target.classList.add('active__leftIntoView');
            }
            else if (!element.isIntersecting) {
                element.target.classList.remove('active__leftIntoView');
            }
            element.target.setAttribute('lastTimestamp', new Date().getTime());
        }
    });
}

private rightIntoViewIntersection(elements) {
    elements.map((element) => {
        if (
            element && 
            (
                !element.target.hasAttribute('lastTimestamp') || 
                (Number(element.target.getAttribute('lastTimestamp')) + 67 < new Date().getTime())
            )
        ) {
            if (element.isIntersecting && element.intersectionRatio >= element.target['threshold']) {
                element.target.classList.add('active__rightIntoView');
            }
            else if (!element.isIntersecting) {
                element.target.classList.remove('active__rightIntoView');
            }
            element.target.setAttribute('lastTimestamp', new Date().getTime());
        }
    });
}

private downIntoIntersection(elements) {
    elements.map((element) => {
        if (
            element && 
            (
                !element.target.hasAttribute('lastTimestamp') || 
                (Number(element.target.getAttribute('lastTimestamp')) + 67 < new Date().getTime())
            )
        ) {
            if (element.isIntersecting && element.intersectionRatio >= element.target['threshold']) {
                element.target.classList.add('active__downIntoView');
            }
            else if (!element.isIntersecting) {
                element.target.classList.remove('active__downIntoView');
            }
            element.target.setAttribute('lastTimestamp', new Date().getTime());
        }
    });
}

private upIntoIntersection(elements) {
    elements.map((element) => {
        if (
            element && 
            (
                !element.target.hasAttribute('lastTimestamp') || 
                (Number(element.target.getAttribute('lastTimestamp')) + 67 < new Date().getTime())
            )
        ) {
            if (element.isIntersecting && element.intersectionRatio >= element.target['threshold']) {
                element.target.classList.add('active__upIntoView');
            }
            else if (!element.isIntersecting) {
                element.target.classList.remove('active__upIntoView');
            }
            element.target.setAttribute('lastTimestamp', new Date().getTime());
        }
    });
}

private stagingIntersection(elements) {
    elements.map((element) => {
        if (
            element && 
            (
                !element.target.hasAttribute('lastTimestamp') || 
                (Number(element.target.getAttribute('lastTimestamp')) + 67 < new Date().getTime())
            )
        ) {
            if (element.isIntersecting && element.intersectionRatio >= element.target['threshold']) {
                element.target.classList.add('base__staging');
            }
            else {
                element.target.classList.remove('base__staging');
            }
            element.target.setAttribute('lastTimestamp', new Date().getTime());
        }
    });
  }
}

