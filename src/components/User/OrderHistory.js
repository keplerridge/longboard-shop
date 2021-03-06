import React, {Component} from 'react';
import testpicture from './../Boards/the-nigmatic-263109-unsplash.jpg';

class OrderHistory extends Component {
    render(){
        return(
            <div className='order'>
                <div className='order-history'>
                    <div className='order-history-picture-div'>
                        {!this.props.order.custom_product
                        ?(<div>
                            <img src={this.props.order.longboard_picture} alt='test' className='order-item-picture'/>
                          </div>)
                        :(<div>
                            <img src={testpicture} alt='test' className='order-item-picture'/>
                          </div>)
                        }
                    </div>
                    <div className='order-history-information'>
                        <div className='order-history-longboard-title'>
                            <p>{this.props.order.longboard_title}</p>
                        </div>
                        <div className='order-history-flexed-information'>
                            <div className='order-history-price'>
                                <p>${this.props.order.order_item_price}</p>
                            </div>
                            <div className='order-qty-date'>
                                <div className='order-history-qty'>
                                    <p>Qty: {this.props.order.quantity}</p>
                                </div>
                                <div className='order-history-date'>
                                    <p>{this.props.order.date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default OrderHistory