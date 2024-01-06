// Change Location Class

export class ChangeLocation {

    constructor ({ parentElement, openClass, currentInfo }) {

        // Independent Objects

        this._currentInfo = currentInfo;

        // Class Elements

        this._parentElement = document.querySelector(parentElement);
        this._skipBtn = this._parentElement.querySelector("*[data-role=skip-btn]");
        this._openBtn = this._parentElement.querySelector("*[data-role=change-btn]");
        this._input = this._parentElement.querySelector("*[data-role=search-input]");

        // System Props

        this._openClass = openClass;
        this._lat;
        this._lon;
        this._regexp = /^\d\d\.\d\d\d\d \d\d\.\d\d\d\d$/i

        // Start Settings

        this.addEvents();

    }

    // Methods

    setCity() {
        this._currentInfo.setWeather(this._lat, this._lon);
    }

    openSearch() {
        this._parentElement.classList.add(this._openClass);
    }

    hiddenSearch() {
        this._parentElement.classList.remove(this._openClass);
    }

    addEvents() {
        this._openBtn.addEventListener("click", () => {
            this.openSearch();
        });

        this._skipBtn.addEventListener("click", () => {
            this.hiddenSearch();
        });

        this._input.addEventListener("change", (event) => {
            const input = event.currentTarget;
            const inputValue = input.value.trim();

            if (this._regexp.test(inputValue)) {
                [this._lat, this._lon] = inputValue.split(" ");
                this.setCity();
            }   else {
                alert("Введен неправильный шаблон координат.\nПример: xx.xxxx xx.xxxx")
            }
            
            input.blur();
        });
    }

}
