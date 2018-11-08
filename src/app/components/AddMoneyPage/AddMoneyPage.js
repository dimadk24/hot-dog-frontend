import React from 'react'
import './AddMoneyPage.css'

class AddMoneyPage extends React.Component {
    componentWillMount() {
        this.timerId = window.setInterval(() => {
            this.props.updateBalance()
        }, 1000)
    }

    componentWillUnmount() {
        window.clearInterval(this.timerId);
    }

    render() {
        return (
            <div className="add-money-page">
                <div className="text">
                    <p>Пополните баланс для очистки сообщества:</p>
                </div>
                <form
                    action="https://money.yandex.ru/quickpay/confirm.xml"
                    method="post"
                    target="_blank"
                >
                    <input
                        type="hidden"
                        name="receiver"
                        value="410011043655449"
                    />
                    <input type="hidden" name="quickpay-form" value="shop" />
                    <input type="hidden" name="targets" value="Hot Dog" />

                    <div className="money-input-wrapper">
                        <p>
                            <label htmlFor="money-input">Сумма:</label>
                        </p>
                        <input
                            type="text"
                            name="sum"
                            placeholder="100 руб"
                            id="money-input"
                            className="money-input"
                            autoComplete="false"
                        />
                    </div>
                    <div className="payment-type-wrapper">
                        <p>Способ оплаты:</p>
                        <label>
                            <input type="radio" name="paymentType" value="PC" />
                            Яндекс.Деньгами
                        </label>
                        <label>
                            <input type="radio" name="paymentType" value="AC" />
                            Банковской картой
                        </label>
                    </div>
                    <input
                        type="hidden"
                        name="formcomment"
                        value="hot dog: пополнение баланса"
                    />
                    <input
                        type="hidden"
                        name="short-dest"
                        value="hot dog: пополнение баланса"
                    />
                    <input type="hidden" name="label" value={`hot-dog: ${window.user_id}`} />
                    <input
                        type="hidden"
                        name="successURL"
                        value="https://vk.com/app6731681_-171466987"
                    />
                    <button type="submit" className="submit-button">
                        Пополнить
                    </button>
                </form>
            </div>
        )
    }
}

export default AddMoneyPage
