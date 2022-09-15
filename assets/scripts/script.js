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
                if (e.target.name === 'cardNumber') {
                    if (e.target.value.toString().split('').length / 4 > 4) {
                        return;
                    }
                    const position =
                        e.target.value.toString().split('').length / 4;
                    console.log(Math.floor(position));
                    document.querySelector(
                        `[cardInfo='${
                            e.target.name
                        }'] span:nth-child(${Math.floor(position + 1)})`,
                    ).textContent = e.target.value;
                } else {
                    document.querySelector(
                        `[cardInfo='${e.target.name}']`,
                    ).textContent = e.target.value;
                }
            });
        });
    };
}

const credit = new CreditCardHandler('.credit-card-form');
credit.init();
