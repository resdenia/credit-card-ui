const INPUT_TYPE = 'deleteContentBackward';
const CARD_NUMBER_IDENTIFIER = 'cardNumber';

const settings = {
    cardNumberClass: '.card-number',
    errorClass: 'error-display',
};

class CreditCardHandler {
    constructor(formSelector) {
        this.form = document.querySelector(formSelector);

        this._inputs = Array.from(this.form.querySelectorAll('input'));
        this._cursor = 1;
    }

    resetValidation = () => {
        this._inputs.forEach((inputs) => {
            this._hideError(inputs, this._setting);
        });
    };

    _showError = (input) => {
        const error = input.validationMessage;
        const errorElement = document.querySelector(`.${input.name}-error`);
        errorElement.textContent = error;
        errorElement.classList.add(settings.errorClass);
    };

    _hideError = (input) => {
        const errorElement = document.querySelector(`.${input.name}-error`);
        errorElement.textContent = '';
        errorElement.classList.remove(settings.errorClass);
    };

    disableButton = () => {
        this._button.disabled = true;
        this._button.classList.add(this._setting.inactiveButtonClass);
    };

    _enableButton = () => {
        this._button.disabled = false;
        this._button.classList.remove(this._setting.inactiveButtonClass);
    };

    _toggleInputError = (input) => {
        if (input.validity.valid) {
            this._hideError(input);
        } else {
            this._showError(input);
        }
    };
    _isValid = () => {
        return this._inputs.every((input) => input.validity.valid);
    };
    init = () => {
        this.onChangeInfo();
        this.renderInitialCardNumber();
        this.onSubmitHandler();
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
    onSubmitHandler = () => {
        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this._inputs.forEach((input) => {
                this._toggleInputError(input);
            });
            if (!this._isValid()) {
                return;
            }
            this.form.style.display = 'none';
            document.querySelector('.on-submission-successful').style.display =
                'flex';
        });
    };
    onChangeInfo = () => {
        this._inputs.forEach((input) => {
            input.addEventListener('input', (e) => {
                const { name, value } = e.target;
                const arrayInputValue = value.split('');
                if (name === CARD_NUMBER_IDENTIFIER) {
                    if (isNaN(arrayInputValue[arrayInputValue.length - 1])) {
                        arrayInputValue.pop();
                        e.target.value = arrayInputValue.join('');
                        return;
                    }

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
