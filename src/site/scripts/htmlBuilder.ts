/**
 * Hyper Text Type Script
 * lib i made for the creation of html easily in js/ts
 * */

export class HtmlBuilder {
    htmlObject: any;

    constructor(type: string) {
        this.htmlObject = document.createElement(type);
    }

    setClasses(classes: string): any {
        this.htmlObject.setAttribute("class", classes);
        return this;
    }

    setText(text: string): any {
        this.htmlObject.innerText = text;
    }

    removeChildren(): any {
        this.htmlObject.innerHTML = "";
    }

    appendChild(child: HtmlBuilder): any {
        this.htmlObject.appendChild(child.build());
    }

    appendRawChild(child: any): any {
        this.htmlObject.appendChild(child);
    }

    build(): any {
        return this.htmlObject;
    }
}