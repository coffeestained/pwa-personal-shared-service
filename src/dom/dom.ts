type Available =
  "leftIntoView"
  | "downIntoView";

export class Dom {

  public _leftIntoViewObserver = new IntersectionObserver(this.leftIntoViewIntersection);
  public _downIntoViewObserver = new IntersectionObserver(this.downIntoIntersection);

  constructor() {
    const styleSheet = document.createElement("style")
    styleSheet.innerText = `
    .base_leftIntoView {
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
    `
    document.head.appendChild(styleSheet);
  }

  public register(type: Available, element: any) {
    if (type === "downIntoView") this._downIntoViewObserver.observe(element);
    if (type === "leftIntoView") this._leftIntoViewObserver.observe(element);
  }

  private leftIntoViewIntersection(elements: any) {
    elements.map((element: any) => {
      if (element && element.classList) {
        if (element.isIntersecting) {
          element.classList.add('active__leftIntoView');
        } else {
          element.classList.remove('active__leftIntoView');
        }
      }
    });
  }

  private downIntoIntersection(elements: any) {
    elements.map((element: any) => {
      if (element && element.classList) {
        if (element.isIntersecting) {
          element.classList.add('active__downIntoView');
        } else {
          element.classList.remove('active__downIntoView');
        }
      }
    });
  }
}

