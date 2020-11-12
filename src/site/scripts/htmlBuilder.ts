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
        return this;
    }

    setSrc(text: string): any {
        this.htmlObject.setAttribute("src", text);
        return this;
    }

    onClick(text: string): any {
        this.htmlObject.setAttribute("onClick", text);
        return this;
    }

    removeChildren(): any {
        this.htmlObject.innerHTML = "";
        return this;
    }

    appendChild(child: HtmlBuilder): any {
        this.htmlObject.appendChild(child);
        return this;
    }

    appendRawChild(child: any): any {
        this.htmlObject.appendChild(child);
        return this;
    }

    build(): any {
        return this.htmlObject;
        return this;
    }
}