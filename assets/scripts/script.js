class CreditCardHandler {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        this._inputs = this.form.querySelectorAll('input');
    }

    init = () => {
        this.onChangeInfo();
    };
    onSubmitHandler = () => {};
    onChangeCardNumber = () => {};
    onChangeInfo = () => {
        this._inputs.forEach((input) => {
            input.addEventListener('input', (e) => {
                document.querySelector(
                    `[cardInfo='${e.target.name}']`,
                ).textContent = e.target.value;
            });
        });
    };
}

const credit = new CreditCardHandler('.credit-card-form');
credit.init();
