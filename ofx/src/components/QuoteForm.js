import React, {Component} from 'react';

// form validation
const validateForm = (errors, states) => {
    let valid = true;
    // all error fileds are empty(user's inputs are all correct)
    Object.values(errors).forEach(
        (val) => val.length > 0 && (valid = false)
    );

    // make sure required fields are not empty
    if (states.firstname == null) {
        valid = false;
    }

    if (states.lastname == null) {
        valid = false;
    }

    if (states.fromCurrency == null) {
        valid = false;
    }

    if (states.toCurrency == null) {
        valid = false;
    }

    if (states.amount == null) {
        valid = false;
    }

    if (states.fromCurrency != null && states.toCurrency != null && states.fromCurrency == states.toCurrency) {
        valid = false;
        alert("From Currency and To Currency can not be the same!")
    }

    return valid;
}

class QuoteForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstname: null,
            lastname: null,
            email: null,
            tel: null,
            fromCurrency: null,
            toCurrency: null,
            amount: null,
            errors: {
                firstname: '',
                lastname: '',
                email: '',
                tel: '',
                fromCurrency: '',
                toCurrency: '',
                amount: ''
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    // form submit
    handleSubmit(e) {
        e.preventDefault();
        if(validateForm(this.state.errors, this.state)) {
            // api request
            fetch(`https://api.ofx.com/PublicSite.ApiService/OFX/spotrate/Individual/${this.state.fromCurrency}/${this.state.toCurrency}/${this.state.amount}?format=json`)
                .then(res => res.json())
                .then((result) => {
                    // get response
                    const customerRate = result.ComparisonRate;
                    const customerAmount = result.CustomerAmount;
                    // jump to show page
                    this.props.history.push(`/show?cr=${customerRate}&fc=${this.state.fromCurrency}&amount=${this.state.amount}&tc=${this.state.toCurrency}&ca=${customerAmount}`);
                }, error => {
                    console.log(error)
                });
        }else{
            // validation failed
            console.error('Invalid Form')
        }
    }

    handleChange(e) {
        const {name, value} = e.target;
        let errors = this.state.errors;

        switch (name) {
            case 'firstname':
                //errors.firstname = value.length < 10 ? 'first name must be less than 10 characters' : '';
                if (!value) {
                    errors.firstname = 'first name can not be empty';
                } else if (value.length > 10) {
                    errors.firstname = 'first name must be less than 10 characters';
                } else {
                    errors.firstname = '';
                }
                break;
            case 'lastname':
                //errors.lastname = value.length < 10 ? 'last name must be less than 10 characters' : '';
                if (!value) {
                    errors.lastname = 'first name can not be empty';
                } else if (value.length > 10) {
                    errors.lastname = 'first name must be less than 10 characters';
                } else {
                    errors.lastname = '';
                }
                break;
            case 'email':
                errors.email = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value) ? '' : 'Invalid email address!';
                break;
            case 'tel':
                if (isNaN(Number(value))) {
                    errors.tel = 'Must be a number';
                } else if(value.length <= 2) {
                    errors.tel = 'Must be greater than 2 numbers';
                } else if(value.length >=14) {
                    errors.tel = 'Must be less than 14 numbers';
                } else {
                    errors.tel = '';
                }
                break;
            case 'fromCurrency':
                errors.fromCurrency = value ? '' : 'Please choose a currency';
                break;
            case 'toCurrency':
                errors.toCurrency = value ? '' : 'Please choose a currency';
                break;
            case 'amount':
                if (isNaN(Number(value))) {
                    errors.amount = 'Must be a number';
                } else if(!value) {
                    errors.amount = 'Amount can not be empty';
                } else {
                    errors.amount = '';
                }
                break;
            default:
                break;
        }

        this.setState({
            errors,
            [name]: value
        }, () => {
            //console.log(errors)
        })
    }

    render() {
        const {errors} = this.state;

        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="line">Quick Quote</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <form onSubmit={this.handleSubmit}>
                            <div className="row form-pd">
                                <div className="col-12">
                                    <div className="form-row">
                                        <div className="col-6">
                                            <label htmlFor="firstname">
                                                First Name <i className="text-danger">*</i>
                                            </label>
                                            <input type="text"
                                                className="form-control"
                                                id="firstname"
                                                name="firstname"
                                                placeholder="First Name"
                                                onChange={this.handleChange}
                                            />
                                            {errors.firstname.length > 0 &&
                                            <i className='text-danger'>{errors.firstname}</i>}
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="lastname">
                                                Last Name <i className="text-danger">*</i>
                                            </label>
                                            <input type="text"
                                                className="form-control"
                                                id="lastname"
                                                name="lastname"
                                                placeholder="Last Name"
                                                onChange={this.handleChange}
                                            />
                                            {errors.lastname.length > 0 &&
                                            <i className='text-danger'>{errors.lastname}</i>}
                                        </div>
                                    </div>
                                    <div className="form-row mt-3">
                                        <div className="col-12">
                                            <label htmlFor="email">Email</label>
                                            <input type="text"
                                                className="form-control"
                                                id="email"
                                                name="email"
                                                placeholder="Email"
                                                onChange={this.handleChange}
                                            />
                                            {errors.email.length > 0 &&
                                            <i className='text-danger'>{errors.email}</i>}
                                        </div>
                                    </div>
                                    <div className="form-row mt-3">
                                        <div className="col-12">
                                            <label htmlFor="tel">Telephone / Mobile</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <select className="input-group-text"
                                                        onChange={this.handleChange}>
                                                        <option value="australia">+61</option>
                                                        <option value="china">+86</option>
                                                        <option value="australia">+61</option>
                                                        <option value="china">+86</option>
                                                    </select>
                                                </div>
                                                <input type="text"
                                                    className="form-control"
                                                    id="tel"
                                                    name="tel"
                                                    placeholder=""
                                                    onChange={this.handleChange}
                                                />
                                            </div>
                                            {errors.tel.length > 0 &&
                                            <i className='text-danger'>{errors.tel}</i>}
                                        </div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-row mt-4">
                                        <div className="col-6">
                                            <label htmlFor="fromCurrency">
                                                From Currency <i className="text-danger">*</i>
                                            </label>
                                            <select className="form-control"
                                                name="fromCurrency"
                                                onChange={this.handleChange}>
                                                <option value="">Select Currency</option>
                                                <option value="AUD">Australia Dollar(AUD)</option>
                                                <option value="USD">Unitd State Dollar(USD)</option>
                                                <option value="GBP">British Pound(USD)</option>
                                            </select>
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="toCurrency">
                                                To Currency <i className="text-danger">*</i>
                                            </label>
                                            <select className="form-control"
                                                name="toCurrency"
                                                onChange={this.handleChange}>
                                                <option value="">Select Currency</option>
                                                <option value="AUD">Australia Dollar(AUD)</option>
                                                <option value="USD">Unitd State Dollar(USD)</option>
                                                <option value="GBP">British Pound(GBP)</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-row mt-4">
                                        <div className="col-6">
                                            <label htmlFor="amount">
                                                Amount <i className="text-danger">*</i>
                                            </label>
                                            <input type="text"
                                                className="form-control"
                                                id="amount"
                                                name="amount"
                                                onChange={this.handleChange}
                                            />
                                            {errors.amount.length > 0 &&
                                            <i className='text-danger'>{errors.amount}</i>}
                                        </div>
                                    </div>
                                    <div className="form-row mt-5 justify-content-center">
                                        <div className="col-6">
                                            <button className="btn btn-info btn-block">Get Quote</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default QuoteForm;
