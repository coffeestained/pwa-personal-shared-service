type Available =
  "leftIntoView"
  | "downIntoView"
  | "staging";

export class Dom {

  public _leftIntoViewObserver = new IntersectionObserver(this.leftIntoViewIntersection);
  public _downIntoViewObserver = new IntersectionObserver(this.downIntoIntersection);
  public _stagingObserver = new IntersectionObserver(this.stagingIntersection);

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

    .base__staging {
      animation-name: bounce;
      animation-timing-function: cubic-bezier(0.280, 0.840, 0.420, 1);
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

  public register(type: Available, element: any) {
    if (type === "downIntoView") this._downIntoViewObserver.observe(element);
    if (type === "leftIntoView") this._leftIntoViewObserver.observe(element);
    if (type === "staging") this._stagingObserver.observe(element);
  }

  private leftIntoViewIntersection(elements: any) {
    elements.map((element: any) => {
      if (element) {
        if (element.isIntersecting && element.intersectionRect.y > 30) {
          element.target.classList.add('active__leftIntoView');
        } else if (!element.isIntersecting && element.intersectionRect.y < 0) {
          element.target.classList.remove('active__leftIntoView');
        }
      }
    });
  }

  private downIntoIntersection(elements: any) {
    elements.map((element: any) => {
      if (element) {
        if (element.isIntersecting && element.intersectionRect.y > 30) {
          element.target.classList.add('active__downIntoView');
        } else if (!element.isIntersecting && element.intersectionRect.y < 0) {
          element.target.classList.remove('active__downIntoView');
        }
      }
    });
  }

  private stagingIntersection(elements: any) {
    elements.map((element: any) => {
      if (element) {
        if ((element.isIntersecting) && ((element.intersectionRect.y < 30 && element.intersectionRect.y > 1))) {
          element.target.classList.add('base__staging');
        } else {
          element.target.classList.remove('base__staging');
        }
      }
    });
  }
}

