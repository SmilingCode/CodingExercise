import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import url from 'url';

// transfer to currency format
const toCurrencyFormat = (num) => {
    if(num){
        if(isNaN(num)) {
            return;
        }
        num = typeof num == "string"?parseFloat(num):num //switch string to number
        num = num.toFixed(2);   //save 2-digits
        num = parseFloat(num);
        num = num.toLocaleString(); // currency mode
        //handle decimal
        if(num.indexOf(".")==-1){
            num = num+".00";
        }else{
            num = num.split(".")[1].length<2?"$"+num+"0":"$"+num;
        }
        return num;
    }else{
        return num = null;
    }
}

class QuoteShow extends Component {
    constructor(props) {
        super(props);
        this.state = {
            customerRate: '',
            fromCurrency: '',
            amount: '',
            toCurrency: '',
            customerAmount: ''
        }
    }

    componentDidMount() {
        // 'get' request info
        const search = this.props.location.search;

        const customerRate = url.parse(search, true).query.cr;
        const fromCurrency = url.parse(search, true).query.fc;
        const amount = toCurrencyFormat(url.parse(search, true).query.amount);
        const toCurrency = url.parse(search, true).query.tc;
        const customerAmount = url.parse(search, true).query.ca;

        // store user input to state
        this.setState({
            customerRate,
            fromCurrency,
            amount,
            toCurrency,
            customerAmount
        })
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <h3 className="line">Quick Show</h3>
                    </div>
                </div>
                <div className="row result-div justify-content-center">
                    <div className="col-8 col-sm-6">
                        <div className="row">
                            <div className="col-12 style1">
                                OFX Customer Rate
                            </div>
                            <div className="col-12 text-center style2">
                                <h1 className="bg-font">{this.state.customerRate}</h1>
                            </div>
                            <div className="col-12 style1">
                                From
                            </div>
                            <div className="col-12">
                                <strong className="style3">{this.state.fromCurrency}</strong> &nbsp;<strong className="style4">{this.state.amount}</strong>
                            </div>
                            <div className="col-12 style1">
                                To
                            </div>
                            <div className="col-12">

                                <strong className="style3">{this.state.toCurrency}</strong>  &nbsp;<strong className="style4">{this.state.customerAmount}</strong>
                            </div>
                            <div className="col-12">
                                <div className="row mt-4 justify-content-center">
                                    <div className="col-9">
                                        <Link to={'/'}>
                                            <button className="btn btn-info btn-block btn-sm">
                                                START NEW QUOTE
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default QuoteShow;
