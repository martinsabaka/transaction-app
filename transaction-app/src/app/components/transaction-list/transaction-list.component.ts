import { Component } from '@angular/core';
import { TransactionsService } from '../../services/transactions.service';
import {
  Day,
} from '../../model/transactions';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.scss']
})
export class TransactionListComponent {
  transactions: any[] = [];

  constructor(
    public transactionsService: TransactionsService,
  ){}

  ngOnInit() {
    this.transactionsService.fetchTransactions().subscribe(data => {
      // Sort the transactions by date
      this.transactions = data.days.sort((a: Day, b: Day)=> Date.parse(b.id) - Date.parse(a.id));
    });
  }
}
