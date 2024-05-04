import { Pipe, PipeTransform } from '@angular/core';
import { BigNumber, ethers } from 'ethers';

@Pipe({
  name: 'weiToEth'
})
export class WeiToEthPipe implements PipeTransform {

  /**
   * Function converts price in BigNumber to string
   * 
   * @param price - Price in BigNumber
   * @returns Price in string
   *
   */
  transform(price: BigNumber | string | number): string {
    if(typeof(price) === 'string'){
      price = BigNumber.from(price)
    }
    if(typeof(price) === 'number'){
      price = BigNumber.from(price)
    }
    return ethers.utils.formatEther(price)
  }

}
