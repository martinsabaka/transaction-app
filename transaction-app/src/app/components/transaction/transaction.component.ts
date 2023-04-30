import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TransactionsService } from '../../services/transactions.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent {
  transaction: any = {};

  constructor(
    public transactionsService: TransactionsService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: any) => {
      // this.transaction = this.transactionsService.getTransactionDetail(params.day, Number(params.id));
      this.transactionsService.fetchTransactions().subscribe((data: any) => {
        // Sort the transactions by date
        this.transaction = data.days.find((day: any) => day.id === params.day)?.transactions
          .find((transaction: any) => transaction.id === Number(params.id));
        console.log(this.transaction);
      });
    });
  }

  redirectHome(): void {
    this.router.navigate(['/']);
  }
}
