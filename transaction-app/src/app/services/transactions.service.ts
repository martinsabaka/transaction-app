import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { 
  Transaction,
  Day,
  TransactionsResponse 
} from '../model/transactions';

@Injectable({
  providedIn: 'root'
})
export class TransactionsService {
  constructor(private http: HttpClient) {  }
  
  // fetches all transactions
  fetchTransactions(): Observable<TransactionsResponse> {
    const url = 'http://localhost:8080/api/transactions';
    
    return this.http.get<TransactionsResponse>(url).pipe(
      catchError((error) => {
        console.error(error);
        return [];
      }),
      map((data: TransactionsResponse) => data)
    );
  }

  getTransactionDetail(transactionDay: string, transactionId: number): any {
    return this.fetchTransactions().subscribe((data: TransactionsResponse) => {
      // Sort the transactions by date
      return data.days.find((day: Day) => day.id === transactionDay)?.transactions
        .find((transaction: Transaction) => transaction.id === transactionId);

    });
  }

  /**
   * fetches current exchange rate
   * I at first didn't see that exchangeRate was part of the api response 
   * so I made this method to always have current exchange rate
   *  It is not used in the current code though
   * */ 
  getCurrentExchangeRate() : Observable<any> {
    const apiKey = "8wpHTKGTlesohcWNFpQB6MESoqM2IFeAena2GsZS";
    const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}&currencies=EUR`;

    return this.http.get(url).pipe(
      map((response) => response),
      catchError((error) => {
        console.error(error);
        return [];
      })
    );
  }

  usdToEurConvertor({ amount, currencyRate }: { 
    amount: number, 
    currencyRate: number 
  }): number {
    return currencyRate ? amount * (1 / currencyRate) : amount
  }
}
