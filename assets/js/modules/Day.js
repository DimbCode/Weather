// Class Day

export class Day {

    constructor ({ date, icon, temperature }) {

        // System Props

        this._date = date;
        this._icon = icon;
        this._temperature = temperature;

    }

    // Methods

    createHTML() {
        return `
        
            <i class="${this._icon} day-item__icon"></i>

            <span class="day-item__name">
                ${this._date}
            </span>

            <strong class="day-item__temperature">
                ${this._temperature} °C
            </strong>
        
        `;
    }

    show(parentElement) {
        let day = document.createElement("div");
        
        day.className = "day-item";
        day.innerHTML = this.createHTML();

        parentElement.append(day);
    }

}