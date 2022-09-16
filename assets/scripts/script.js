const INPUT_TYPE = 'deleteContentBackward';
const CARD_NUMBER_IDENTIFIER = 'cardNumber';

const settings = {
    cardNumberClass: '.card-number',
};

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
            document
                .querySelector(settings.cardNumberClass)
                .appendChild(spanNumber);
        }
    };

    onChangeInfo = () => {
        this._inputs.forEach((input) => {
            input.addEventListener('input', (e) => {
                const { name, value } = e.target;
                const arrayInputValue = value.split('');
                if (name === CARD_NUMBER_IDENTIFIER) {
                    if (arrayInputValue.length > 16) {
                        return;
                    }
                    if (e.inputType === INPUT_TYPE) {
                        this._cursor = this._cursor - 1;
                        document.querySelector(
                            `[cardInfo='${name}'] span:nth-child(${this._cursor})`,
                        ).textContent = '0';
                        return;
                    }
                    document.querySelector(
                        `[cardInfo='${name}'] span:nth-child(${this._cursor})`,
                    ).textContent =
                        arrayInputValue[
                            arrayInputValue.length === 1
                                ? 0
                                : arrayInputValue.length - 1
                        ];
                    this._cursor = this._cursor + 1;
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
