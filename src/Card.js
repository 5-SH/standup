import React, { Component } from 'react'
import './Card.css'

export default class Card extends Component {
  render() {
    let cardInfo = this.props.cardInfo;
    if (cardInfo) {
      return (
        <a className="card" href={cardInfo.url} target="_blank">
          <div className="card_image">
            { 
              cardInfo.links.thumbnail !== undefined 
              && <img src={ cardInfo.links.thumbnail[0].href } 
                    alt={ cardInfo.meta.title } 
                    className="width100 card_img" />
            }
            
          </div>
          <div className="borderTop">
          <div className="card_text">
            <p className="card_title">{ cardInfo.meta.title }</p>
            <p className="card_desc">{ cardInfo.meta.description }</p>
            <p className="card_provider">{ cardInfo.meta.site }</p>
          </div>
          </div>
        </a>
      )
    }
    else {
      return null;
    }
  }
}