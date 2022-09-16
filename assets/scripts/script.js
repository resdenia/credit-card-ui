class CreditCardHandler {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);
        this._inputs = this.form.querySelectorAll('input');
        this._cursor = 1;
    }

    init = () => {
        this.onChangeInfo();
        this.renderInitialCardNumber();
    };

    renderInitialCardNumber = () => {
        for (let i = 0; i < 16; i++) {
            const spanNumber = document.createElement('span');
            spanNumber.textContent = '0';
            document.querySelector('.card-number').appendChild(spanNumber);
        }
    };
    onSubmitHandler = () => {};
    onChangeCardNumber = () => {};
    seperationHandler = () => {};
    onChangeInfo = () => {
        this._inputs.forEach((input) => {
            input.addEventListener('keydown', (e) => {
                const { name, value } = e.target;

                const arrayInputValue = value.split('');
                if (name === 'cardNumber') {
                    if (arrayInputValue.length === 16) {
                        return;
                    }
                    if (e.which === 8) {
                        if (arrayInputValue.length === 0) {
                            return;
                        }
                        this._cursor = this._cursor - 1;
                        document.querySelector(
                            `[cardInfo='${name}'] span:nth-child(${this._cursor})`,
                        ).textContent = '0';
                        return;
                    }
                    this._cursor = this._cursor + 1;
                    document.querySelector(
                        `[cardInfo='${name}'] span:nth-child(${this._cursor})`,
                    ).textContent = arrayInputValue[arrayInputValue.length - 1];
                } else {
                    document.querySelector(`[cardInfo='${name}']`).textContent =
                        value;
                }
            });
        });
    };
}

const credit = new CreditCardHandler('.credit-card-form');
credit.init();
